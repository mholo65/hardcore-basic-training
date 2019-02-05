import React from "react";
import PersonList from "./PersonList";
import HirePersonForm from "./HirePersonForm";
import personService from "../services/person";
import { List } from "immutable";

import styles from "./App.pcss";

class App extends React.PureComponent {
  state = {
    error: false,
    counter: 0,
    persons: List()
  };

  async componentDidMount() {
    const persons = await personService.getPersons();

    this.setState({
      persons: List(persons)
    });
  }

  hirePerson = person => {
    this.setState(oldState => {
      return {
        persons: oldState.persons.concat([person])
      };
    });
  };

  firePerson = id => {
    this.setState(oldState => {
      return {
        persons: oldState.persons.filter(p => p.id !== id),
        counter: oldState.counter + 1
      };
    });
  };

  static getDerivedStateFromError(error) {
    return { error: true, errorMessage: error };
  }

  render() {
    const { persons, counter, error } = this.state;

    if (error) {
      return (
        <div>
          <h1>OOPS, Something went wrong</h1>
          <p>Plööööööööö!</p>
        </div>
      );
    }

    const isGood = person => person.age < 30 && person.gender === "m";
    const goodPersons = persons.filter(isGood);
    const badPersons = persons.filter(p => !isGood(p));

    return (
      <div>
        <marquee>
          <h1>
            <i>Hello React Training! {counter}</i>
          </h1>
        </marquee>
        <marquee direction="up">
          <p>
            Dear sir or madam, you must be <strong>suckling</strong> on a{" "}
            <em>duckling!</em>
          </p>
        </marquee>

        <HirePersonForm hirePerson={this.hirePerson} />

        <div className={styles.wrapper}>
          <PersonList
            persons={goodPersons}
            title={"Hyvät"}
            firePerson={this.firePerson}
          />
          <PersonList
            persons={badPersons}
            title={"Pahat"}
            firePerson={this.firePerson}
            showMetadata
          />
        </div>
      </div>
    );
  }
}

export default App;
