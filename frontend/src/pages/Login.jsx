import CenterContainer from "../components/CenterContainer"
import LoginForm from "../components/forms/LoginForm"

function Login() {
  return (
    <section className='login-section'>
      <CenterContainer className="max-w-[400px]">
        <LoginForm />
      </CenterContainer>
    </section>
  )
}

export default Login