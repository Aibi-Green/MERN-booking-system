import { EyeIcon, EyeOffIcon } from "lucide-react"
import Input from "../ui/Input"
import Label from "../ui/Label"
import { useEffect, useRef, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { editAccountPassword } from "../../api/UsersApi"
import { jwtDecode } from "jwt-decode"
import RegisterButton from "../buttons/RegisterButton"

function EditPasswordForm() {
  const [hiddenPass, setHiddenPass] = useState(true)
  const [hiddenConf, setHiddenConf] = useState(true)
  const currPasswordRef = useRef()
  const newPasswordRef = useRef()
  const [validations, setValidations] = useState(undefined)
  const [payload, setPayload] = useState(undefined)
  const { token } = useAuthContext()

  useEffect(() => {
    if (payload) {
      editAccountPassword(jwtDecode(token)._id, payload, setValidations)
      setPayload(undefined)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload])

  

  const handleSubmit = (e) => {
    e.preventDefault()

    setPayload({
      curr_password: currPasswordRef.current.value,
      new_password: newPasswordRef.current.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10" noValidate>
      <div>
        <span className="text-lg font-bold">Change Password</span>
        <hr />
      </div>

      <Label htmlFor="password" text="Current Password">
        <Input id="password" name="password" type={(hiddenPass) ? "password" : "text"} placeholder="Enter current password" ref={currPasswordRef} icon={
          (hiddenPass) ?
            <EyeOffIcon className="size-6 opacity-80" onClick={() => setHiddenPass(false)} /> :
            <EyeIcon className="size-6 opacity-80" onClick={() => setHiddenPass(true)} />
        } />
        {/* <span className="text-red-400 text-sm">
          {(validations && validations.curr_password) ? validations.curr_password : ""}
        </span> */}
      </Label>

      <Label htmlFor="confirm_password" text="New Password">
        <Input id="confirm_password" name="confirm_password" ref={newPasswordRef} type={(hiddenConf) ? "password" : "text"} placeholder="Enter new password" icon={
          (hiddenConf) ?
            <EyeOffIcon className="size-6 opacity-80" onClick={() => setHiddenConf(false)} /> :
            <EyeIcon className="size-6 opacity-80" onClick={() => setHiddenConf(true)} />
        } />
        {/* <span className="text-red-400 text-sm">
          {(validations && validations.new_password) ? validations.new_password : ""}
        </span> */}
      </Label>

      <div className="flex justify-center">
        <span className={(validations && validations.status == "success") ? ("text-green-500") : ("text-red-500")}>{(validations) ? validations.message : ""}</span>
      </div>

      <div className="flex flex-col gap-2">
        <RegisterButton text="Submit" isLink={false} />
      </div>
    </form>
  )
}

export default EditPasswordForm