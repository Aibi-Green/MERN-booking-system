import { useEffect, useRef, useState } from "react"
import { handleEditAccFormValidations } from "../validations/FormValidations.jsx"
import Label from "../ui/Label"
import Input from "../ui/Input"
import RegisterButton from "../buttons/RegisterButton"
import { useAuthContext } from '../../hooks/useAuthContext.jsx';
import { editAccountDetails, getOneUser } from "../../api/UsersApi.jsx"
import InlineError from '../InlineError.jsx'

function EditProfileForm() {
  const [data, setData] = useState(undefined)
  const [payload, setPayload] = useState(undefined)
  const [validations, setValidations] = useState(undefined)
  const { token } = useAuthContext()
  const [errors, setErrors] = useState({})

  const usernameRef = useRef()
  const emailRef = useRef()
  const nameRef = useRef()
  const contactPersonRef = useRef()
  const contactNumberRef = useRef()

  useEffect(() => {
    if (token)
      getOneUser(token, setData, setErrors)
  }, [token])

  // useEffect(() => {
  //   if (data && Object.keys(data[0]).length > 0) {
  //     usernameRef.current.value = (data[0].username) ? data[0].username : null
  //     emailRef.current.value = (data[0].email) ? data[0].email : null
  //     nameRef.current.value = (data[0].name) ? data[0].name : null
  //     contactPersonRef.current.value = (data[0].contact_person) ? data[0].contact_person : null
  //     contactNumberRef.current.value = (data[0].contact_number) ? data[0].contact_number : null
  //   }
  // }, [data])

  // useEffect(() => {
  //   if (payload) {
  //     handleEditAccFormValidations(setValidations, payload)
  //   }
  // }, [payload])

  // useEffect(() => {
  //   if (payload && validations && Object.keys(validations).length == 0) {
  //     console.log("SENDING REQUEST TO EDIT PROFILE");

  //     editAccountDetails(jwtDecode(token)._id, payload, setErrors)
  //     setPayload(undefined)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [validations])

  const handleSubmit = (e) => {
    e.preventDefault()

    setPayload({
      username: usernameRef.current.value,
      email: emailRef.current.value,
      name: nameRef.current.value,
      contact_person: contactPersonRef.current.value,
      contact_number: contactNumberRef.current.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10" noValidate>
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-lg font-bold">Change Personal Details</span>
          <hr />
        </div>
        <Label htmlFor="username" text="Username">
          {/* <Input id="username" name="username" type="text" placeholder="Enter your username" withCheck={true} loading={loadingUsername} /> */}
          <Input id="username" name="username" type="text" placeholder="Enter your username" ref={usernameRef} />
          <InlineError validations={validations} property="username" />
        </Label>

        <Label htmlFor="email" text="Email">
          <Input id="email" name="email" type="email" placeholder="Enter your email" ref={emailRef} />
          <InlineError validations={validations} property="email" />
        </Label>

        <Label htmlFor="name" text="Organization/Company Name" className="relative">
          <Input id="name" name="name" type="text" placeholder="Enter your organization's name" ref={nameRef} />
          <InlineError validations={validations} property="name" />
        </Label>

        <Label htmlFor="contact_person" text="Contact Person">
          <Input id="contact_person" name="contact_person" type="text" placeholder="Enter person's name to contact" ref={contactPersonRef} />
          <InlineError validations={validations} property="contact_person" />
        </Label>

        <Label htmlFor="contact_number" text="Contact Number">
          <Input id="contact_number" name="contact-number" type="text" placeholder="Enter your contact number" ref={contactNumberRef} />
          <InlineError validations={validations} property="contact_number" />
        </Label>
      </div>

      <div className="flex justify-center">
        <span className={(errors && errors.status == "success") ? ("text-green-500") : ("text-red-500")}>{(errors) ? errors.message : ""}</span>
      </div>

      <div className="flex flex-col gap-2">
        <RegisterButton text="Submit" isLink={false} />
      </div>
    </form>
  )
}

export default EditProfileForm