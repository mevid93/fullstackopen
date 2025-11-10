
const Filter = ({ searchKey, setSearchKey }) => {
  return (
    <div>
      filter shown with: <input value={searchKey} onChange={(event) => setSearchKey(event.target.value)} />
    </div>
  )
}

export default Filter;