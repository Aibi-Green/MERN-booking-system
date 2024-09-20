import LoginContainer from "../components/LoginContainer"
import LoginForm from "../components/forms/LoginForm"

function Login() {
  return (
    <section className='login-section'>
      <LoginContainer>
        <LoginForm />
      </LoginContainer>
    </section>
  )
}

export default Login