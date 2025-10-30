import React from 'react'

const FetchZipCode = ({zipCodeSelected, setZipCodeSelected, zipCode}) => {
  return (
    <div>
        <label >
            Choisissez votre arrondissement
            <select value={zipCodeSelected} onChange={e=>setZipCodeSelected(e.target.value)} >
                {zipCode.map(zip=>{
                    return( <option key={zip} value={zip}> {zip}</option> )
})}
            </select>
        </label>
    </div>
  )
}

export default FetchZipCode