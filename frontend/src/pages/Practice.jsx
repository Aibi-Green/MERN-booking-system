import { useEffect, useState } from "react"

function Practice() {
  const [token, setToken] = useState()

  const handleSet = () => {
    setToken("010")
    const setTimeStored = new Date()

    setTimeout(() => {
      setToken(null)
    }, 3000); // 3000 milliseconds = 3 seconds
  }

  return (
    <div className="relative h-lvh flex flex-col max-w-[500px] m-auto gap-10">
      {
        (token) ?
        <div className="bg-green-700 text-white p-4">{`Token: ${token}`}</div> :
        <div className="bg-red-700 text-white p-4">No token stored...</div>
      }
      <button onClick={() => handleSet()} className="bg-slate-600 text-white p-3 rounded-full">
        SET TOKEN
      </button>
    </div>
  )
}

export default Practice