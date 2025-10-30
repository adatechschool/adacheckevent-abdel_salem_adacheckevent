import React, { useState } from 'react'

const CardEvent = ({event}) => {

const [showMore , setShowMore] = useState(false)

const full = event.description?.replace(/<[^>]*>/g, '')
const isLong = full?.length >100
const short = isLong ? full.slice(0,100) + "..." : full
  return (
    <div>
        <h1>{event.title}</h1>

        <p>{showMore ? full : short}</p>

        {isLong && (
        <button onClick={() => setShowMore((v) => !v)}>
          {showMore ? "Voir moins" : "Voir plus"}
        </button>
        )}

        <img src={event.cover_url} alt="image" />

    </div>
  )
}

export default CardEvent


