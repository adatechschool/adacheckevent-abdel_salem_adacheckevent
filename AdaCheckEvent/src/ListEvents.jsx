import React, { useEffect, useState } from 'react'
import CardEvent from './CardEvent'

const ListEvents = () => {
    const [events, setEvents]= useState([])
    const [page, setPage]= useState(0)
    const [number, setNumber]= useState(0)
    const numberLimit = 5
    // let l = 1
    // console.log(l , "L")
    console.log(number, "number")
    console.log('event',events)
    console.log('page',page)
    const fetchEvent= async() =>{
        const res = await fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=${numberLimit}&offset=${page}`)
        const data = await res.json()


        console.log(data.results)
        // setEventsOffset([])
        setEvents(data.results)
        // setEventsOffset(([...events, ...data.results]))
    }
    useEffect(()=>{
        fetchEvent()
    },[page])
    const Next=()=>{
        setPage((p) => p+ numberLimit)
        // if (eventsOffset === 1){
        //     setEventsOffset(eventsOffset +1)
        // }
    
    //   const start = (eventsOffset -1 ) * numberLimit 
    //   const slice = events.slice(start, start + numberLimit)

    //   console.log(events, "evenements")
    //   setEvents(slice)
    //   console.log(slice, "slice")

    //   setNumber(start)
    //   setEventsOffset(eventsOffset +1)
    }

  return (
    <div>
        
        {events.map((event)=>{return <CardEvent key={event.id} event={event}/>})}
        <button onClick={()=>Next()}>page suivante</button>

        

    </div>
  )
}

export default ListEvents


        
        