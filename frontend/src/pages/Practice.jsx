import {useState} from "react"
import ViewDialog from "../components/ViewDialog";

function Practice() {
  const [hidden, setHidden] = useState(false)

  const handleClick = () => {
    setHidden(!hidden)
    console.log(hidden);
    
  }

  return (
    <div className="relative h-lvh">
      <button onClick={() => handleClick()}>Show</button>
      {
        !hidden && 
        <ViewDialog>
        </ViewDialog>}
    </div>
  )
}

export default Practice