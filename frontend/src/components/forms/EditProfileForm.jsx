import { useEffect, useState } from "react"
import { handleEditAccFormValidations } from "../validations/FormValidations.jsx"
import Label from "../ui/Label"
import Input from "../ui/Input"
import RegisterButton from "../buttons/RegisterButton"
import { useAuthContext } from '../../hooks/useAuthContext.jsx';
import { editAccountDetails, getOneUser } from "../../api/UsersApi.jsx"
import InlineError from '../InlineError.jsx'
import LoaderIcon from "../ui/LoaderIcon.jsx"
import Dialog from "../ui/Dialog.jsx"
import CancelButton from "../buttons/CancelButton.jsx"

function EditProfileForm() {
  const [data, setData] = useState(null)
  const [form, setForm] = useState({
    username: '',
    email: '',
    name: '',
    contact_person: '',
    contact_number: ''
  })
  const [validations, setValidations] = useState(null)
  const { token } = useAuthContext()
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOneUser(token, setData)
  }, [token])

  useEffect(() => {
    if (validations && Object.keys(validations).length == 0) {

      const formatPayload = {...form}
      Object.keys(form).forEach(i => {
        if (form[i] == data[i]) {
          delete formatPayload[i]
        }
      })
      

      if (Object.keys(formatPayload).length > 0) {
        setOpenDialog(true)
        editAccountDetails(token, formatPayload, setIsLoading)
      }
      setValidations(null)
      
    }
  }, [validations, form, token, data])

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const element = e.target.elements
    let payload = {}
    
    Object.keys(form).forEach(i => {
      payload[i] = element[i].value
    })
    
    handleEditAccFormValidations(setValidations, payload)
    setForm(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10" noValidate>
      {
        (!data)
          ?
          <LoaderIcon className="grow h-[755px]" iconClassName="size-14" />
          :
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-lg font-bold">Change Personal Details</span>
              <hr />
            </div>

            {/* <button type="button" onClick={() => {
              console.log(data)
            }} className="bg-slate-300">
              Show data
            </button>

            <button type="button" onClick={() => {
              console.log(form)
            }} className="bg-slate-300">
              Show form
            </button> */}

            <Label htmlFor="username" text="Username">
              {/* <Input id="username" name="username" type="text" placeholder="Enter your username" withCheck={true} loading={loadingUsername} /> */}
              <Input
                id="username" name="username" type="text"
                placeholder="Enter your username" 
                defaultValue={(!form.username) ? data.username : form.username} onChange={handleForm} />
              <InlineError validations={validations} property="username" />
            </Label>

            <Label htmlFor="email" text="Email">
              <Input
                id="email" name="email" type="email"
                placeholder="Enter your email"
                defaultValue={(!form.email) ? data.email : form.email} onChange={handleForm} />
              <InlineError validations={validations} property="email" />
            </Label>

            <Label htmlFor="name" text="Organization/Company Name" className="relative">
              <Input id="name" name="name" type="text"
                placeholder="Enter your organization's name"
                defaultValue={(!form.name) ? data.name : form.name} onChange={handleForm} />
              <InlineError validations={validations} property="name" />
            </Label>

            <Label htmlFor="contact_person" text="Contact Person">
              <Input
                id="contact_person" name="contact_person" type="text"
                placeholder="Enter person's name to contact"
                defaultValue={(!form.contact_person) ? data.contact_person : form.contact_person} onChange={handleForm} />
              <InlineError validations={validations} property="contact_person" />
            </Label>

            <Label htmlFor="contact_number" text="Contact Number">
              <Input
                id="contact_number" name="contact_number" type="text"
                placeholder="Enter your contact number"
                defaultValue={(!form.contact_number) ? data.contact_number : form.contact_number} onChange={handleForm} />
              <InlineError validations={validations} property="contact_number" />
            </Label>
          </div>
      }

      <div className="flex flex-col gap-2">
        <RegisterButton text="Submit" isLink={false} />
        <CancelButton isLink={true} to="/profile" />
      </div>

      {
        (openDialog) &&
        <Dialog>
          {
            (!isLoading) ?
              <div className='flex flex-col gap-2'>
                <span>Account details has been successfully updated!</span>
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

export default EditProfileForm