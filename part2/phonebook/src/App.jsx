import { useState, useEffect } from "react"
import personService from "./services/PersonService"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [notification, setNotification] = useState(null)

  // Get the initial data
  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const showNotificationToUser = (text, isError = false) => {
    const notification = { message: text, isError };
    setNotification(notification);
    setTimeout(() => { setNotification(null) }, 5000)
  }

  const filteredPersons = persons.filter((p) => p.name.toLowerCase().includes(searchKey.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter searchKey={searchKey} setSearchKey={setSearchKey} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setNotification={showNotificationToUser} />
      <h2>Numbers</h2>
      <Persons persons={persons} visiblePersons={filteredPersons}
        setPersons={setPersons} setNotification={showNotificationToUser} />
    </div>
  )
}

export default App