import { EyeIcon, EyeOffIcon } from "lucide-react";
import Input from "../ui/Input";
import Label from "../ui/Label";
import RegisterButton from "../buttons/RegisterButton";
import CancelButton from "../buttons/CancelButton";
import { useEffect, useRef, useState } from "react";
import { handleRegisterFormValidations } from "../validations/FormValidations.jsx";
import { signup } from "../../api/UsersApi";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [validations, setValidations] = useState(undefined)
  const [payload, setPayload] = useState(undefined)
  const [hiddenPass, setHiddenPass] = useState(true)
  const [hiddenConf, setHiddenConf] = useState(true)
  const navigate = useNavigate()

  const usernameRef = useRef()
  const emailRef = useRef()
  const nameRef = useRef()
  const contactPersonRef = useRef()
  const contactNumberRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  useEffect(() => {
    if (payload) {
      handleRegisterFormValidations(setValidations, payload)
    }
  }, [payload])

  useEffect(() => {
    if (payload && validations && Object.keys(validations).length == 0) {
      signup(payload)
      // setPayload(undefined)
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations])

  const handleSubmit = (e) => {
    e.preventDefault()

    setPayload({
      username: usernameRef.current.value,
      email: emailRef.current.value,
      name: nameRef.current.value,
      contact_person: contactPersonRef.current.value,
      contact_number: contactNumberRef.current.value,
      password: passwordRef.current.value,
      confirm_password: confirmPasswordRef.current.value
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold">Create an Account</span>
        <hr />
      </div>

      <div className="flex flex-col gap-6">
        <Label htmlFor="username" text="Username">
          {/* <Input id="username" name="username" type="text" placeholder="Enter your username" withCheck={true} loading={loadingUsername} /> */}
          <Input id="username" name="username" type="text" placeholder="Enter your username" ref={usernameRef} />
          <span className="text-red-400 text-sm">
            {(validations && validations.username) ? validations.username : ""}
          </span>
        </Label>

        <Label htmlFor="email" text="Email">
          <Input id="email" name="email" type="email" placeholder="Enter your email" ref={emailRef} />
          <span className="text-red-400 text-sm">
            {(validations && validations.email) ? validations.email : ""}
          </span>
        </Label>

        <Label htmlFor="name" text="Organization/Company Name" className="relative">
          <Input id="name" name="name" type="text" placeholder="Enter your organization's name" ref={nameRef} />
          <span className="text-red-400 text-sm">
            {(validations && validations.name) ? validations.name : ""}
          </span>
        </Label>

        <Label htmlFor="contact_person" text="Contact Person">
          <Input id="contact_person" name="contact_person" type="text" placeholder="Enter person's name to contact" ref={contactPersonRef} />
          <span className="text-red-400 text-sm">
            {(validations && validations.contact_person) ? validations.contact_person : ""}
          </span>
        </Label>

        <Label htmlFor="contact_number" text="Contact Number">
          <Input id="contact_number" name="contact-number" type="text" placeholder="Enter your contact number" ref={contactNumberRef} />
          <span className="text-red-400 text-sm">
            {(validations && validations.contact_number) ? validations.contact_number : ""}
          </span>
        </Label>

        <Label htmlFor="password" text="Password">
          <Input id="password" name="password" type={(hiddenPass) ? "password" : "text"} placeholder="Create new password" ref={passwordRef} icon={
            (hiddenPass) ?
              <EyeOffIcon className="size-6 opacity-80" onClick={() => setHiddenPass(false)} /> :
              <EyeIcon className="size-6 opacity-80" onClick={() => setHiddenPass(true)} />
          } />
          <span className="text-red-400 text-sm">
            {(validations && validations.password) ? validations.password : ""}
          </span>
        </Label>

        <Label htmlFor="confirm_password" text="Confirm Password">
          <Input id="confirm_password" name="confirm_password" ref={confirmPasswordRef} type={(hiddenConf) ? "password" : "text"} placeholder="Confirm Password" icon={
            (hiddenConf) ?
              <EyeOffIcon className="size-6 opacity-80" onClick={() => setHiddenConf(false)} /> :
              <EyeIcon className="size-6 opacity-80" onClick={() => setHiddenConf(true)} />
          } />
          <span className="text-red-400 text-sm">
            {(validations && validations.confirm_password) ? validations.confirm_password : ""}
          </span>
        </Label>
      </div>

      {/* <div className="flex justify-center h-[1rem]">
        <div className="text-red-500">{errors}</div>
      </div> */}

      <div className="flex flex-col gap-2">
        <RegisterButton text="Submit" isLink={false} />
        <CancelButton text="I have an Account" to="/login" isLink={true} />
      </div>
    </form>
  )
}

export default RegisterForm