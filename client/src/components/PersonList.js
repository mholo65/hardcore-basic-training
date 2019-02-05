import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import Person from "./Person";
import posed, { PoseGroup } from "react-pose";

const PosedContainer = posed.div({
  enter: {
    x: 0,
    scale: 1.0,
    rotate: 0
  },
  exit: {
    x: "-150%",
    scale: 0.1,
    rotate: 270
  }
});

const PersonList = props => {
  const { persons, title, firePerson, showMetadata } = props;
  const count = persons.count();
  const average = persons.reduce((total, x) => total + x.age, 0) / count;

  return (
    <div>
      <h2>{title}</h2>
      {showMetadata && (
        <div>
          <h3>({count} kpl)</h3>
          <h3>{average.toFixed(2)} vuotta vanhaa</h3>
        </div>
      )}
      <PoseGroup>
        {persons
          .sortBy(p => p.firstName)
          .sortBy(p => p.lastName)
          .map(x => (
            <PosedContainer key={x.id} initialPose="exit" pose="enter">
              <Person person={x} firePerson={firePerson} />
            </PosedContainer>
          ))}
      </PoseGroup>
    </div>
  );
};

PersonList.defaultProps = {
  showMetadata: false
};

PersonList.propTypes = {
  showMetadata: PropTypes.bool.isRequired,
  firePerson: PropTypes.func.isRequired,
  persons: ImmutablePropTypes.list.isRequired,
  title: PropTypes.string.isRequired
};

export default PersonList;
