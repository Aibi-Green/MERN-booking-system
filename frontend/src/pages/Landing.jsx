import { Link } from 'react-router-dom'
import '../styles/Landing.css'
import { Star } from 'lucide-react'

function Landing() {
  const reviews = [{
    name: "Ivy Lariosa",
    rating: 3,
    comment: "The website is decent, though there's room for improvement in the UI/UX. Overall, it works well for its purpose."
  },
  {
    name: "Jake Ramirez",
    rating: 5,
    comment: "I love the design! The site is intuitive and easy to navigate. Great job on the user experience."
  },
  {
    name: "Maria Santos",
    rating: 4,
    comment: "Pretty good website! The layout is clean, but a few tweaks could make it even better. Keep up the good work!"
  }]

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

          <div id='gallery-first-div'>
            <div id='gallery-desc' className='basis-[20%]'>
              <h2>Gallery</h2>
              <p className='subtitle'>Here are some locations that can be booked in this website.</p>
            </div>
            <div className='basis-[80%]'>
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
          </div>

          <div id='gallery-second-div'>
            <div id='location-div'>
              <h3>Location Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper vulputate urna, vitae tincidunt turpis maximus id.</p>
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
                    <div className='review-picture'></div>
                    <div className='review-desc'>
                      <span className='review-name'>{rev.name}</span>
                      <div className='review-rating'>
                        {
                          [...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className='star' />
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div className='review-comment'>{rev.comment}</div>
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
            <p className='subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
          </div>

          <div id='about-second-div'>
            
            <div id='about-paragraphs'>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.</p>
              <p>Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem. Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>

            <div id="about-pic">
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing