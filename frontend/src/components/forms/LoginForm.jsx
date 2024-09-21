import { Link, useNavigate } from "react-router-dom"
import LoginButton from "../buttons/LoginButton"
import RegisterButton from "../buttons/RegisterButton"
import EmailInput from "../ui/EmailInput"
import PasswordInput from "../ui/PasswordInput"
import { login } from "../../api/UsersApi"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect, useState } from "react"

function LoginForm() {
  const { token, loginNewToken } = useAuthContext()
  const [errors, setErrors] = useState()
  const navigate = useNavigate()

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
    }, loginNewToken, setErrors);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold">SIGN IN</span>
        <hr />
      </div>
      <div className="flex flex-col gap-3">
        <EmailInput />
        <PasswordInput />
      </div>
      <div className="flex justify-center h-[1rem]">
        <div className="text-red-500">{errors}</div>
      </div>
      <div className="flex flex-col gap-2">
        <LoginButton />
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