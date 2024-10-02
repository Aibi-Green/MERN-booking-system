import { EyeIcon, EyeOffIcon } from "lucide-react";
import Input from "../ui/Input";
import Label from "../ui/Label";
import RegisterButton from "../buttons/RegisterButton";
import CancelButton from "../buttons/CancelButton";
import { useEffect, useState } from "react";
import { handleRegisterFormValidations } from "../validations/FormValidations.jsx";
import { signup } from "../../api/UsersApi";
import { useNavigate } from "react-router-dom";
import InlineError from "../InlineError.jsx";
import Dialog from "../ui/Dialog.jsx";
import LoaderIcon from "../ui/LoaderIcon.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

function RegisterForm() {
  const {token, loginNewToken} = useAuthContext()
  const defaultForm = {
    username: '',
    email: '',
    name: '',
    contact_person: '',
    contact_number: '',
    password: '',
    confirm_password: '',
  }
  const [form, setForm] = useState(defaultForm)
  const [validations, setValidations] = useState(null)
  const [hiddenPass, setHiddenPass] = useState(true)
  const [hiddenConf, setHiddenConf] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (token)
      navigate('/userbookings')
  }), [token]

  useEffect(() => {
    if (validations && Object.keys(validations).length == 0) {
      setOpenDialog(true)
      signup(form, loginNewToken, setIsLoading)
    }
  }, [validations, form, navigate, loginNewToken])

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleRegisterFormValidations(setValidations, form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-semibold">Create an Account</span>
        <hr />
      </div>

      <div className="flex flex-col gap-6">
        <Label htmlFor="username" text="Username">
          {/* <Input id="username" name="username" type="text" placeholder="Enter your username" withCheck={true} loading={loadingUsername} /> */}
          <Input id="username" name="username" type="text" placeholder="Enter your username" onChange={handleForm} />
          <InlineError validations={validations} property="username" />
        </Label>

        <Label htmlFor="email" text="Email">
          <Input id="email" name="email" type="email" placeholder="Enter your email" onChange={handleForm} />
          <InlineError validations={validations} property="email" />
        </Label>

        <Label htmlFor="name" text="Organization/Company Name" className="relative">
          <Input id="name" name="name" type="text" placeholder="Enter your organization's name" onChange={handleForm} />
          <InlineError validations={validations} property="name" />
        </Label>

        <Label htmlFor="contact_person" text="Contact Person">
          <Input id="contact_person" name="contact_person" type="text" placeholder="Enter person's name to contact" onChange={handleForm} />
          <InlineError validations={validations} property="contact_person" />
        </Label>

        <Label htmlFor="contact_number" text="Contact Number">
          <Input id="contact_number" name="contact_number" type="text" placeholder="Enter your contact number" onChange={handleForm} />
          <InlineError validations={validations} property="contact_number" />
        </Label>

        <Label htmlFor="password" text="Password">
          <Input id="password" name="password" type={(hiddenPass) ? "password" : "text"}
            placeholder="Create new password" onChange={handleForm}
            icon={
              (hiddenPass) ?
                <EyeOffIcon className="size-6 opacity-80" onClick={() => setHiddenPass(false)} /> :
                <EyeIcon className="size-6 opacity-80" onClick={() => setHiddenPass(true)} />
            } />
          <InlineError validations={validations} property="password" />
        </Label>

        <Label htmlFor="confirm_password" text="Confirm Password">
          <Input id="confirm_password" name="confirm_password" type={(hiddenConf) ? "password" : "text"}
            placeholder="Confirm Password" onChange={handleForm}
            icon={
              (hiddenConf) ?
                <EyeOffIcon className="size-6 opacity-80" onClick={() => setHiddenConf(false)} /> :
                <EyeIcon className="size-6 opacity-80" onClick={() => setHiddenConf(true)} />
            } />
          <InlineError validations={validations} property="confirm_password" />
        </Label>
      </div>

      {/* <div className="flex justify-center h-[1rem]">
        <div className="text-red-500">{errors}</div>
      </div> */}

      <div className="flex flex-col gap-2">
        <RegisterButton text="Submit" isLink={false} />
        <CancelButton text="I have an Account" to="/login" isLink={true} />
      </div>

      {
        (openDialog) &&
        <Dialog>
          {/* asdfsdf
          <button onClick={() => setOpenDialog(false)}>Close Dialog</button> */}
          {
            (!isLoading) ?
              <div className='flex flex-col gap-2'>
                <span>New Account created!</span>
                <div className='flex gap-2'>
                  <CancelButton text="Continue" isLink={true} to="/userbookings" className="w-full" />
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

export default RegisterForm