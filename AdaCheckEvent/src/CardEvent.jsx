import React from 'react'

const CardEvent = ({event}) => {
  return (
    <div>
        <h1>{event.title}</h1>
        <p>{event.lead_text.slice(0,100)+'...'}</p>
        <img src={event.cover_url} alt="image" />
        <a href={event.contact_url}>see more</a>
    </div>
  )
}

export default CardEvent