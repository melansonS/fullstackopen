import React, { useState, useEffect } from "react";
import peopleService from "./services/people";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    peopleService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const personInPhonebook = persons.find((person) => person.name === newName);
    console.log({ personInPhonebook });
    if (personInPhonebook) {
      const confimration = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confimration) {
        peopleService
          .updatePerson(personInPhonebook.id, {
            ...personInPhonebook,
            number: newNumber,
          })
          .then((newPerson) => {
            console.log(newPerson);
            setPersons(
              persons.map((person) =>
                person.id !== newPerson.id ? person : newPerson
              )
            );
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      peopleService
        .createPerson(newPerson)
        .then((person) => setPersons(persons.concat(person)));
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id, name) => {
    const confirmation = window.confirm(`Delete ${name} ?`);
    if (confirmation) {
      peopleService
        .deletePerson(id)
        .catch((err) => console.log("Unable to delete person - ", err));

      setPersons(persons.filter((person) => person.id !== id));
    }
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
      <Persons peopleToShow={peopleToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
