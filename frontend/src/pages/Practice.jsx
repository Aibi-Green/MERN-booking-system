import { useEffect, useState } from "react"
import { formattedRequirements } from '../assets/Data.jsx'

function Practice() {
  const [selectedPlaces, setSelectedPlaces] = useState([])

  useEffect(() => {
    console.log(selectedPlaces);
  }, [selectedPlaces])

  const handleClick = (id) => {
    if (!selectedPlaces.includes(id)) {
      setSelectedPlaces((prevSelected) => {
        return [...prevSelected, id]
      })
    } else {
      setSelectedPlaces((prevSelected) => {
        return prevSelected.filter((prevId) => {
          return (prevId != id)
        })
      })
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {
        formattedRequirements.map((type) => (
          <div key={type._id}>
            <div className='bg-slate-100 px-2 rounded-md'>{type.name}</div>
            <div className='p-4 flex flex-row flex-wrap gap-2'>
              {
                type.places.map((place) => (
                  <span key={place._id} onClick={() => handleClick(place._id)}
                  className={`border-slate-600 border rounded-full px-3 py-1
                hover:bg-green-400 select-none active:bg-green-500 ${selectedPlaces.includes(place._id) ? "bg-green-400" : "bg-transparent"}`}>
                    {place.name}
                  </span>
                ))
              }
            </div>
          </div>
        ))
      }
      <button className="border border-black w-[200px] self-center" onClick={() => console.log(selectedPlaces)}>Show selected places</button>
    </div>
  )
}

export default Practice