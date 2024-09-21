import CenterContainer from "../components/CenterContainer"
import RegisterForm from "../components/forms/RegisterForm"

function RegisterAccount() {

  return (
    <section className='register-section'>
      <CenterContainer className="max-w-[600px] my-20">
        <RegisterForm />
      </CenterContainer>
    </section>
  )
}

export default RegisterAccount