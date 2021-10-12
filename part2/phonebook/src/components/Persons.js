import React from "react";
import Person from "./Person";

const Persons = ({ peopleToShow, handleDelete }) => {
  return (
    <>
      {peopleToShow.map((person) => (
        <Person person={person} key={person.id} handleDelete={handleDelete} />
      ))}
    </>
  );
};

export default Persons;
