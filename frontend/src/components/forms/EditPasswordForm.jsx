import { EyeIcon, EyeOffIcon } from "lucide-react"
import Input from "../ui/Input"
import Label from "../ui/Label"
import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { editAccountPassword } from "../../api/UsersApi"
import RegisterButton from "../buttons/RegisterButton"
import CancelButton from "../buttons/CancelButton"
import InlineError from "../InlineError"
import { handlePasswordValidations } from "../validations/FormValidations"
import Dialog from "../ui/Dialog"
import LoaderIcon from "../ui/LoaderIcon"

function EditPasswordForm() {
  const [form, setForm] = useState({
    curr_password: '',
    new_password: '',
    conf_password: ''
  })
  const {token} = useAuthContext()
  const [hiddenPass, setHiddenPass] = useState(true)
  const [hiddenNew, setHiddenNew] = useState(true)
  const [hiddenConf, setHiddenConf] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [validations, setValidations] = useState(null)

  useEffect(() => {
    if (validations && Object.keys(validations).length == 0) {
      if (form.new_password == form.conf_password){
        setOpenDialog(true)
        console.log("Updating password!")
        editAccountPassword(token, form, setIsLoading)
      }
      setValidations(null)
    }
  }, [validations, token, form])

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handlePasswordValidations(setValidations, form)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10" noValidate>
      {/* <div>
        <span className="text-lg font-bold">Change Password</span>
        <hr />
      </div> */}

      {/* <button type="button" onClick={() => console.log(form)}>form</button>
      <button type="button" onClick={() => console.log(openDialog)}>openDialog</button>
      <button type="button" onClick={() => console.log(validations)}>validations</button> */}

      <div className="flex flex-col gap-10">
        <Label htmlFor="curr_password" text="Current Password">
          <Input id="curr_password" name="curr_password" type={(hiddenPass) ? "password" : "text"}
            placeholder="Enter current password" onChange={handleForm}
            icon={
              (hiddenPass) ?
                <EyeOffIcon className="size-6 opacity-80" onClick={() => setHiddenPass(false)} /> :
                <EyeIcon className="size-6 opacity-80" onClick={() => setHiddenPass(true)} />
            } />
          <InlineError validations={validations} property="curr_password" />
        </Label>

        <Label htmlFor="new_password" text="New Password">
          <Input id="new_password" name="new_password" type={(hiddenNew) ? "password" : "text"}
            placeholder="Enter new password" onChange={handleForm}
            icon={
              (hiddenNew) ?
                <EyeOffIcon className="size-6 opacity-80" onClick={() => setHiddenNew(false)} /> :
                <EyeIcon className="size-6 opacity-80" onClick={() => setHiddenNew(true)} />
            } />
          <InlineError validations={validations} property="new_password" />
        </Label>

        <Label htmlFor="conf_password" text="Confirm Password">
          <Input id="conf_password" name="conf_password" type={(hiddenConf) ? "password" : "text"}
            placeholder="Confirm password" onChange={handleForm}
            icon={
              (hiddenConf) ?
                <EyeOffIcon className="size-6 opacity-80" onClick={() => setHiddenConf(false)} /> :
                <EyeIcon className="size-6 opacity-80" onClick={() => setHiddenConf(true)} />
            } />
          <InlineError validations={validations} property="conf_password" />
        </Label>
      </div>

      {/* <FormErrors errorArr={(validations && validations.password) ? [validations.password] : []} /> */}

      <div className="flex flex-col gap-2">
        <RegisterButton text="Submit" isLink={false} />
        <CancelButton isLink={true} to="/profile" />
      </div>

      {
        (openDialog) &&
        <Dialog>
          {/* asdfsdf
          <button onClick={() => setOpenDialog(false)}>Close Dialog</button> */}
          {
            (!isLoading) ?
              <div className='flex flex-col gap-2'>
                <span>Password has been successfully updated!</span>
                <div className='flex gap-2'>
                  <CancelButton text="Go Back" isLink={true} to="/profile" className="w-full" />
                </div>
              </div>
              :
              <div className='italic flex flex-col gap-5'>
                Processing...
                <LoaderIcon iconClassName="size-8" />
              </div>
          }
        </Dialog>
      }
    </form>
  )
}

export default EditPasswordForm