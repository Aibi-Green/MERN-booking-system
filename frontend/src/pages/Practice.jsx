import { useState } from "react"
import ViewDialog from "../components/ViewDialog";

function Practice() {
  const [hidden, setHidden] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()

  }

  return (
    <div className="relative h-lvh">
      <form method="POST" onSubmit={handleClick}>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" name="query" placeholder="Type something..." />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default Practice