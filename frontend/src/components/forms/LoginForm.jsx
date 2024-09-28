import { Link, useNavigate } from "react-router-dom"
import LoginButton from "../buttons/LoginButton"
import RegisterButton from "../buttons/RegisterButton"
import { login } from "../../api/UsersApi"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect, useState } from "react"
import Label from "../ui/Label"
import Input from "../ui/Input"
import { EyeIcon, EyeOffIcon, Mail } from "lucide-react"

function LoginForm() {
  const { token, loginNewToken } = useAuthContext()
  // const [errors, setErrors] = useState()
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (token) {
      navigate('/userbookings')
    }

  }, [token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    const formElems = e.target.elements

    const email = formElems.email.value
    const password = formElems.password.value

    login({
      email: email,
      password: password
    }, loginNewToken);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold">SIGN IN</span>
        <hr />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="email" text="Email Address" className="opacity-80">
          <Input id="email" name="email" placeholder="Enter your Email" type="email" icon={<Mail className="size-6 opacity-80" />} />
        </Label>
        <Label htmlFor="password" text="Password" className="opacity-80">
          <Input id="password" name="password" placeholder="Enter your password" type={(hidden) ? "password" : "text"} icon={
            (hidden) ?
              <EyeOffIcon className="size-6 opacity-80" onClick={() => setHidden(false)} /> :
              <EyeIcon className="size-6 opacity-80" onClick={() => setHidden(true)} />} />
        </Label>
      </div>
      {/* <div className="flex justify-center h-[1rem]">
        <div className="text-red-500">{errors}</div>
      </div> */}
      <div className="flex flex-col gap-2">
        <LoginButton isLink={false} />
        <RegisterButton />
        <div className="mx-auto">
          <span className="text-sm cursor-pointer text-slate-500">
            <Link>Forgot Password?</Link>
          </span>
        </div>
      </div>
    </form>
  )
}

export default LoginForm