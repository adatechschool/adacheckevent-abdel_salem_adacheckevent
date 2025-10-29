import React, { useState } from 'react'

const SearchBar = ({ events, setFilteredEvents ,setPage}) => {
    const [input, setInput]= useState('')
    const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setInput(value)
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(value) ||
        event.description.toLowerCase().includes(value)
    )
    setFilteredEvents(filtered)
    
  }
  return (
    <div>
        <input type="text" placeholder='recherche ton evenment' value={input} onChange={(e) => {
  handleSearch(e)
  setPage(0)
  
}} />
{input && events.filter(
        (event) =>
          event.title.toLowerCase().includes(input) ||
          event.description.toLowerCase().includes(input)
      ).length === 0 && (
        <p style={{ color: 'crimson', marginTop: '8px' }}>
          Aucun événement trouvé ❌
        </p>
      )}
        
    </div>

  )
}

export default SearchBar