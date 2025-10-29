import React, { useState } from 'react'

const SearchBar = ({ allEvents, setFilteredEvents ,setPage, setAllEvents}) => {
    const [input, setInput]= useState('')
    const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setInput(value)
    
    
  
  if (value === "") {
      setFilteredEvents([]);
      setPage(0);
      return;
    }

    const filtered = allEvents.filter(
      (event) =>
        (event.title?.toLowerCase() ?? "").includes(value) ||
        (event.description?.toLowerCase() ?? "").includes(value)
    );

    setFilteredEvents(filtered);
    setPage(0);
  };
  return (
    <div>
        <input type="text" placeholder='recherche ton evenment' value={input} onChange={
  handleSearch
} />

        
    </div>

  )
}

export default SearchBar