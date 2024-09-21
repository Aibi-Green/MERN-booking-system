import { EyeIcon, EyeOffIcon } from "lucide-react"
import Input from "./Input"
import Label from "./Label"
import { useState } from "react"

function PasswordInput() {
  const [hidden, setHidden] = useState(true)

  return (
    <div>
      <Label htmlFor="password" text="Password" className="opacity-80">
        <Input id="password" name="password" placeholder="Enter your password" type={(hidden) ? "password" : "text"} icon={
          (hidden) ? 
          <EyeOffIcon className="size-6 opacity-80" onClick={() => setHidden(false)} /> : 
          <EyeIcon className="size-6 opacity-80" onClick={() => setHidden(true)} />} />
      </Label>
    </div>
  )
}

export default PasswordInput