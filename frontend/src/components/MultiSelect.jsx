import { useEffect, useState } from "react"
// import { formattedRequirements } from '../assets/Data.jsx'
import PropTypes from 'prop-types'
import { getTypesAndReq } from "../api/ReqTypesApi"
import LoaderIcon from "./ui/LoaderIcon"

function MultiSelect({ initialValue, onData }) {
  const [selectedPlaces, setSelectedPlaces] = useState([])
  const [formattedRequirements, setFormattedRequirements] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getTypesAndReq(setFormattedRequirements, setIsLoading)
  }, [])

  useEffect(() => {
    setSelectedPlaces((initialValue != undefined) ? initialValue : [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedRequirements])

  useEffect(() => {
    onData(selectedPlaces);
  }, [selectedPlaces, onData])

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

  return (<>
    {
      (isLoading) ?
      <LoaderIcon className="grow siz" iconClassName="size-14" />
      : 
      <div className="flex flex-col gap-2">
      {
        formattedRequirements.map((type) => (
          <div key={type._id}>
            <div className='bg-slate-100 px-2 py-1 rounded-md'>{type.name}</div>
            <div className='p-4 flex flex-row flex-wrap gap-2 justify-center'>
              {
                type.places.map((place) => (
                  <span key={place._id} onClick={() => handleClick(place._id)}
                    className={`border-slate-300 border rounded-full px-3 py-1 select-none active:bg-green-500 ${selectedPlaces.includes(place._id) ? "bg-green-400" : "bg-transparent"}`}>
                    {place.name}
                  </span>
                ))
              }
            </div>
          </div>
        ))
      }

      {/* <button onClick={() => console.log(types)}>Show requirement types</button>
      <button onClick={() => console.log(requirements)}>Show requirements</button> */}
      {/* <div onClick={() => console.log(selectedPlaces)}>Show selected places from multiselect</div>
      <div onClick={() => console.log(initialValue)}>Show initialValue from multiselect</div> */}
    </div>
    }
  </>)
}

MultiSelect.propTypes = {
  onData: PropTypes.func,
  initialValue: PropTypes.array
}

export default MultiSelect