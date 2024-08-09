import { NavLink } from 'react-router-dom'
import { Button } from '../components/ui/button'

const Hero = () => {
  return (<>
    <div className='h-lvh overflow-hidden bg-heroImg bg-center 
        items-center text-white flex flex-col p-20'>
      <div className='flex-1 flex justify-center text-center items-end'>
        <h1 className='text-5xl md:text-7xl font-extrabold font-serif'>
          Harmony<br />Heights
        </h1>
      </div>
      <div className='flex-1 flex flex-col justify-center text-center p-8'>
        <Button variant={"ghost"}
          className='text-lg md:text-xl font-serif font-bold hover:text-white p-6 md:p-7 
                bg-primary/50 backdrop-blur-sm border border-y-2 rounded-full
                hover:border-white hover:bg-orange-700'>
          <NavLink to="/login">
            Book a schedule now!
          </NavLink>
        </Button>
      </div>
    </div>
  </>)
}

export default Hero