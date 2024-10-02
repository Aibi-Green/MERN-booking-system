import LoginForm from "../components/forms/LoginForm"
import homeImage from '../assets/venue-imgs/keenan-barber-unsplash.jpg'

function Login() {
  return (
    <section className="h-[100lvh] flex justify-center lg:justify-end bg-cover bg-bottom" 
    style={{backgroundImage: `url(${homeImage})`}}>
      <div className="bg-white h-full pt-[140px] lg:pt-[140px] p-14 lg:p-20 w-[100%] sm:w-[80lvw] md:w-[70lvw] lg:w-[50lvw] xl:lg:w-[40lvw] 2xl:lg:w-[35lvw]">
        <LoginForm />
      </div>
    </section>
  )
}

export default Login