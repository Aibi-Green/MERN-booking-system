import CenterContainer from "../components/CenterContainer"
import RegisterForm from "../components/forms/RegisterForm"

function RegisterAccount() {

  return (
    <section className='register-section'>
      <CenterContainer>
        <RegisterForm />
      </CenterContainer>
    </section>
  )
}

export default RegisterAccount