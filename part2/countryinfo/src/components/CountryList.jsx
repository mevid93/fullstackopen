
const CountryList = ({ countries, setFilter }) => {
  
  return (
    <ul>
      {countries.map((country, i) =>
        <li key={i}>
          {country.name.common} <button onClick={() => setFilter(country.name.common)}>Show</button>
        </li>
      )}
    </ul>
  )
}

export default CountryList