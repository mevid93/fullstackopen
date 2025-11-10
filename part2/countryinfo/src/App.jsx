import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'
import countryService from './services/countryService'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  // Get initial data (all countries)
  useEffect(() => {
    countryService.getAll().then(response => {
      setCountries(response.data)
    })
  }, [])

  // Filter data
  var filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  var count = filteredCountries.length

  return (
    <div>
      <div>
        find countries: <input value={filter} onChange={(event) => setFilter(event.target.value)} />
      </div>
      {filter !== "" && count > 10 && <p>Too many matches, specify another filter</p>}
      {filter !== "" && count <= 10 && count > 1 && <CountryList countries={filteredCountries} setFilter={setFilter} />}
      {filter !== "" && count == 1 && <CountryDetails country={filteredCountries[0]} />}
    </div>
  )
}

export default App
