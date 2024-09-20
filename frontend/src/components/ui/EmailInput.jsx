import { Mail } from "lucide-react"
import Input from "./Input"
import Label from "./Label"

function EmailInput() {
  return (
    <div>
      <Label htmlFor="email" text="Email Address" className="opacity-80">
        <Input id="email" name="email" placeholder="Enter your Email" type="email" icon={<Mail className="size-6 opacity-80" />} />
      </Label>
    </div>
  )
}

export default EmailInput