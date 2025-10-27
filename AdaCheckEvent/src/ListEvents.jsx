import React, { useEffect, useState } from 'react'
import CardEvent from './CardEvent'

const ListEvents = () => {
    const [events, setEvents]= useState([])
    const [number, setNumber]= useState(20)
    console.log('sdsddd',events)
    console.log(number)
    const fetchEvent= async() =>{
        const res = await fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=${number}`)
        const data = await res.json()
        console.log(data.results)
        setEvents(data.results)
    }
    useEffect(()=>{
        fetchEvent()
    },[number])
    const handleNumberEvents=()=>{
        setNumber(number+20)
    }
  return (
    <div>
        
        {events.map((event)=>{return <CardEvent key={event.id} event={event}/>})}
        <button onClick={()=>handleNumberEvents()}>ajoute nouvel evenment</button>

        

    </div>
  )
}

export default ListEvents


        
        