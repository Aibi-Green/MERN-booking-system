import { Info } from "lucide-react";
import Input from "../ui/Input";
import Label from "../ui/Label";

function RegisterForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const fields = e.target.elements
    console.log({
      username: fields.username.value,
      email: fields.email.value,
      name: fields.name.value,
      contact_person: fields.contact_person.value,
      contact_number: fields.contact_number.value,
      password: fields.password.value
    });
    
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
     <Label htmlFor="email" text="Email">
      <Input id="email" name="email" type="email" placeholder="Enter your email" />
     </Label>

     <Label htmlFor="name" text="Organization/Company Name">
      <Input id="name" name="name" type="text" placeholder="Enter your organization name" icon={<Info />} />
     </Label>

     <Label htmlFor="contact-person" text="Contact Person">
      <Input id="contact-person" name="contact-person" type="text" />
     </Label>

      <label htmlFor="contact-number">
        Contact Number
        <input id="contact-number" name="contact-number" type="number" />
      </label>
      
      <label htmlFor="password">
        Password
        <input id="password" name="password" type="text" />
      </label>
      
      <label htmlFor="confirm-password">
        Confirm Password
        <input id="confirm-password" name="confirm-password" type="text" />
      </label>
      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default RegisterForm