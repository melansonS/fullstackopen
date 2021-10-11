import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ]);
    setNewName("");
    setNewNumber("");
  };

  const peopleToShow =
    searchValue === ""
      ? persons
      : persons.filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} setSearchValue={setSearchValue} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} />
    </div>
  );
};

export default App;
