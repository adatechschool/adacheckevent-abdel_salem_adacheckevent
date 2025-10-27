import React, { useEffect, useState } from 'react'

const ListEvents = () => {
    const [events, setEvents]= useState([])
    const fetchEvent= async() =>{
        const res = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20')
        const data = await res.json()
        console.log(data.results)
        setEvents(data)
    }
    useEffect(()=>{
        fetchEvent()
    },[])
  return (
    <div>ListEvents</div>
  )
}

export default ListEvents