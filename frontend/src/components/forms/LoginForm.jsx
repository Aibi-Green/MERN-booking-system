import { Link } from "react-router-dom"
import LoginButton from "../buttons/LoginButton"
import RegisterButton from "../buttons/RegisterButton"
import EmailInput from "../ui/EmailInput"
import PasswordInput from "../ui/PasswordInput"
import { login } from "../../api/UsersApi"
import { useTokenContext } from "../../hooks/useTokenContext"

function LoginForm() {
  // const [token, setToken] = useState()
  const {dispatch} = useTokenContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formElems = e.target.elements

    const email = formElems.email.value
    const password = formElems.password.value

    login({
      email: email,
      password: password
    }, dispatch);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold">SIGN IN</span>
        <hr />
      </div>
      <div className="flex flex-col gap-3">
        <EmailInput />
        <PasswordInput />
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