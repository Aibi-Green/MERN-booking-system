import { Link, useLocation } from 'react-router-dom'
import '../styles/Landing.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { gallery, reviews, schedule } from '../assets/Data'

function Landing() {
  const location = useLocation()
  const [locationKey, setLocationKey] = useState(0)

  useEffect(() => {
    console.log(location.hash.split("#")[1]);
    
    const section = document.getElementById(location.hash.split("#")[1])

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [location.hash])

  useEffect(() => {
    const countdown = 10000
    const timer = setTimeout(() => {
      if (locationKey != 8)
        setLocationKey(prev => prev + 1)
      else
        setLocationKey(0)
    }, countdown);

    return () => clearTimeout(timer)
  }, [locationKey])

  return (
    <main id="landing-main">

      <section id="home">
        <div className='content-container'>
          <h1>Harmony Heights</h1>
          <Link to="/login"
            className='bg-lime-500 hover:bg-lime-200 text-white hover:text-lime-900 font-semibold rounded-lg py-2 px-10 shadow-lg'>
            Book Now
          </Link>
        </div>
      </section>

      <section id="gallery">
        <div className='content-container'>

          <div id='gallery-first-div'>
            <div id='gallery-desc' className='basis-[20%]'>
              <h2>Gallery</h2>
              <p className='subtitle'>Here are some locations that are offered in this website.</p>
            </div>
            <div className='basis-[80%]'>
              <div className='image-div'>
                {
                  gallery.map((g, i) => (
                    <div
                      key={i}
                      style={{ backgroundImage: `url(${g.picture})` }}
                      onClick={() => setLocationKey(i)}
                      className={`images ${(locationKey != i) ?
                        "bg-top hover:bg-center saturate-50 hover:saturate-100 brightness-75 hover:brightness-100" :
                        "bg-center saturate-100 brightness-100"}`}></div>
                  ))
                }
              </div>
            </div>
          </div>

          <div key={locationKey} id='gallery-second-div' style={{ backgroundImage: `url(${gallery[locationKey].picture})` }}>
            <div id='location-div'>
              <h3>{gallery[locationKey].name}</h3>
              <p>{gallery[locationKey].desc}</p>
            </div>
            <div className='absolute h-full w-full flex flex-row'>
              <div className="basis-[50%]" onClick={() => setLocationKey(prev => (prev != 0) ? prev - 1 : 8)}>
                <ChevronLeft className='absolute left-[5px] text-white size-10 top-[45%]' />
              </div>
              <div className='basis-[50%]' onClick={() => setLocationKey(prev => (prev != 8) ? prev + 1 : 0)}>
                <ChevronRight className='absolute right-[5px] text-white size-10 top-[45%]' />
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="reviews">
        <div className="content-container">
          <h2>Reviews</h2>
          <div id='reviews-div'>

            {
              reviews.map((rev, i) => (
                <div key={i} className='review-container'>
                  <div className='review-top'>
                    <div className='review-picture' style={{ backgroundImage: `url(${rev.picture})` }}></div>
                    <div className='review-desc'>
                      <span className='review-name'>{rev.name}</span>
                      <div className='review-rating'>
                        {
                          [...Array(rev.rating)].map((_, i) => (
                            // <Star key={i} className='star' />
                            <div key={i}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-amber-400">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                              </svg>

                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <p className='review-comment'>{rev.comment}</p>
                </div>
              ))
            }

          </div>
        </div>
      </section>

      <section id="about">
        <div className="content-container">

          <div id='about-first-div'>
            <h2>About</h2>
            <p className='subtitle'>{'"'}Bringing your dream event to life with the perfect venue, effortlessly.{'"'}</p>
          </div>

          <div id='about-second-div'>

            <div id='about-paragraphs'>
              <p>Welcome to Harmony Heights, your premier destination for seamless venue booking. Whether you{"'"}re planning a wedding, corporate event, or any special occasion, our platform makes finding the perfect venue a breeze. With an extensive selection of venues ranging from elegant ballrooms to intimate garden spaces, Harmony Heights ensures that you can easily browse, compare, and book the venue that suits your vision and budget. We aim to simplify the event planning process so you can focus on making lasting memories.</p>
              <p>At Harmony Heights, we believe every event deserves a remarkable setting. That{"'"}s why we partner with top-tier venues to offer a wide variety of options for every type of gathering. Our user-friendly platform allows you to explore detailed venue profiles, check availability, and review past customer experiences—all in one place. We understand how stressful event planning can be, which is why our team is dedicated to providing you with exceptional customer service, helping you find the perfect venue and ensuring a smooth booking experience.</p>
            </div>

            <div id="about-sched">
              <div id="sched-div">
                <h3>Opening Hours</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Start Time</th>
                      <th>Closing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      schedule.map((s, i) => (
                        <tr key={i}>
                          <td>{s.day}</td>
                          <td>{s.startTime}</td>
                          <td>{s.endTime}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing