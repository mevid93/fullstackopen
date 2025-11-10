import { useState } from "react"
import personService from "../services/PersonService"

const PersonForm = ({ persons, setPersons, setNotification }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const updatePerson = (person) => {
    if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
      return;
    }

    const updatedPerson = { ...person, number: newNumber };

    personService.update(person.id, updatedPerson)
      .then(response => {
        const newPersons = persons.map(p => p.id !== person.id ? p : response.data);
        setPersons(newPersons);
        setNewName('');
        setNewNumber('');
        setNotification(`Updated ${response.data.name}`);
      })
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      return;
    }

    const person = persons.find(p => p.name === newName);
    if (person !== undefined) {
      updatePerson(person);
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personService.create(newPerson)
      .then(response => {
        const newPersons = persons.concat([response.data]);
        setPersons(newPersons);
        setNewName('');
        setNewNumber('');
        setNotification(`Added ${response.data.name}`);
      })
  }

  return (
    <form onSubmit={addPerson} >
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;