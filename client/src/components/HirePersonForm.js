import React from "react";
import { Formik } from "formik";
import uuid from "uuid";
import * as Yup from "yup";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too short!")
    .max(10, "Too long")
    .required("MANDATORY!!!!!!"),
  lastName: Yup.string()
    .min(2, "Too short lastNAME!")
    .max(10, "Too long lastNAME")
    .required("laStNameeee is MANDATORY!!!!!!")
});

const HirePersonForm = props => {
  const { hirePerson } = props;
  const fields = [
    { label: "etunimi", id: "firstName" },
    { label: "sukunimi", id: "lastName" }
  ];

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        firstName: "Foo",
        lastName: "Bar"
      }}
      onSubmit={values => {
        const newPerson = {
          ...values,
          age: 25,
          gender: "m",
          id: uuid()
        };
        hirePerson(newPerson);
      }}
    >
      {({ values, errors, handleSubmit, handleChange }) => {
        return (
          <form onSubmit={handleSubmit}>
            {fields.map(x => (
              <div key={x.id}>
                <label>{x.label}</label>
                <input
                  type="text"
                  id={x.id}
                  value={values[x.id]}
                  onChange={handleChange}
                />
                {errors[x.id] && <div>{errors[x.id]}</div>}
              </div>
            ))}
            ;
            <div>
              <button type="submit">PALKKAA!</button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default HirePersonForm;
