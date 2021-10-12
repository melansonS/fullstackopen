import React, { useState, useEffect } from "react";
import peopleService from "./services/people";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import AlertBox from "./components/AlertBox";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    peopleService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const personInPhonebook = persons.find((person) => person.name === newName);

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
            setIsError(false);
            setAlertMessage(`${newPerson.name}'s number has been updated!`);
            setPersons(
              persons.map((person) =>
                person.id !== newPerson.id ? person : newPerson
              )
            );
            setTimeout(() => setAlertMessage(null), 4000);
          })
          .catch((err) => {
            setIsError(true);
            setAlertMessage(
              `Information on ${personInPhonebook.name} has been removed from the server`
            );
            setTimeout(() => {
              setIsError(false);
              setAlertMessage(null);
            }, 4000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      peopleService.createPerson(newPerson).then((person) => {
        setIsError(false);
        setAlertMessage(`${person.name} was added!`);
        setPersons(persons.concat(person));
        setTimeout(() => setAlertMessage(null), 4000);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id, name) => {
    const confirmation = window.confirm(`Delete ${name} ?`);
    if (confirmation) {
      peopleService
        .deletePerson(id)
        .then(() => {
          setIsError(false);
          setAlertMessage(`${name} has been deleted!`);
          setTimeout(() => setAlertMessage(null), 4000);
        })
        .catch((err) => {
          setIsError(true);
          setAlertMessage(
            `Information on ${name} has already been removed from the server`
          );
          setTimeout(() => {
            setIsError(false);
            setAlertMessage(null);
          }, 4000);
        });

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
      <AlertBox message={alertMessage} error={isError} />
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
