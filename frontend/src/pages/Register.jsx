import RegisterForm from "../components/forms/RegisterForm"
import homeImage from '../assets/venue-imgs/keenan-barber-unsplash.jpg'

function Register() {

  return (
    <section style={{backgroundImage: `url(${homeImage})`}}
    className="bg-cover bg-bottom flex justify-center lg:justify-end min-h-[100lvh]">
      <div className="bg-white pt-[140px] lg:pt-[140px] p-14 lg:p-20 h-[100lvh] max-h-[100lvh] w-[100%] sm:w-[80lvw] md:w-[70lvw] lg:w-[50lvw] xl:lg:w-[40lvw] 2xl:lg:w-[35lvw] overflow-scroll">
        <RegisterForm />
      </div>
    </section>
  )
}

export default Register