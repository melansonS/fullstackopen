import React from "react";
import Person from "./Person";

const Persons = ({ peopleToShow }) => {
  return (
    <>
      {peopleToShow.map((person) => (
        <Person person={person} key={person.id} />
      ))}
    </>
  );
};

export default Persons;
