import personService from '../services/PersonService'

const Persons = ({ persons, visiblePersons, setPersons, setNotification }) => {

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);

    if (!window.confirm(`Delete ${person.name}`)) {
      return;
    }

    personService.remove(id)
      .then(response => {
        const newPersons = persons.filter(p => p.id !== id);
        setPersons(newPersons);
        setNotification(`Deleted ${person.name}`);
      })
      .catch(error => {
        setNotification(`Information of ${person.name} has already been removed from server`, true);
      })
  }

  return (
    <ul>
      {visiblePersons.map((person) =>
        <li key={person.id}>
          {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
      )}
    </ul>
  )
}

export default Persons;