import React from "react";

const Person = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number}{" "}
    <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
  </p>
);

export default Person;
