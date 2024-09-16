import {useState} from "react"
import DeleteDialog from "../components/DeleteDialog";

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
        <DeleteDialog>
          Are you sure want to delete this booking?
        </DeleteDialog>}
    </div>
  )
}

export default Practice