import { Link } from 'react-router-dom'
import './Landing.css'

function Landing() {
  return (
    <main id="landing-main">

      <section id="home">
        <div className='content-container'>
          <h1>Harmony Heights</h1>
          <Link to="/login" className='bg-slate-700 text-white rounded-lg py-2 px-10'>
            Book Now
          </Link>
        </div>
      </section>

      <section id="gallery">
        <div className='content-container'>
          <div className=''>
            <h2>Gallery</h2>
            <h3>Her are some locations that can be booked in this website</h3>
            <div className='image-div'>
              <div className='images'></div>
              <div className='images'></div>
              <div className='images'></div>
              <div className='images'></div>
              <div className='images'></div>
              <div className='images'></div>
              <div className='images'></div>
              <div className='images'></div>
              <div className='images'></div>
            </div>
          </div>
          <div className='bg-slate-100'>
            <h4>Location Title</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper vulputate urna, vitae tincidunt turpis maximus id. Pellentesque fringilla neque sit amet rhoncus vestibulum. Etiam non pulvinar turpis. Vivamus pulvinar erat a lectus maximus sodales. Cras in elit porttitor, auctor erat et, lobortis erat.</p>
          </div>
        </div>
      </section>

      <section id="reviews">
        <h2>Reviews</h2>
      </section>

      <section id="about">
        <h2>About</h2>
      </section>
    </main>
  )
}

export default Landing