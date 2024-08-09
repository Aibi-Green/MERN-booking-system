import Auditorium from '../assets/indoor facilities/auditorium.jpg'
import DunesCafe from '../assets/indoor facilities/dunes cafe, dubai.jpg'
import LibraryMeetingSpace from '../assets/indoor facilities/library meeting space.jpg'
import IndoorPool from '../assets/outdoor facilities/indoor pool.webp'
import OutdoorPool from '../assets/outdoor facilities/outdoor pool.jpg'
import NetballCourts from '../assets/outdoor facilities/netball courts.jpg'

const Gallery = () => {
    return (
        <div className='overflow-hidden bg-orange-800 bg-center 
        items-center text-white flex flex-col p-20 pt-24 pb-32 gap-14 
        md:gap-20 md:pt-32 md:pb-48'>
            <h1 className='text-4xl md:text-6xl font-extrabold font-serif italic'>
                What we offer
            </h1>
            <div className='flex-1 flex flex-wrap justify-center text-center gap-5 md:gap-8 lg:gap-10'>
                <img src={Auditorium} alt="Auditorium" className='h-[200px] w-[300px] object-cover object-center
        md:w-[350px] md:h-[250px] lg:w-[400px] lg:h-[300px]' />
                <img src={DunesCafe} alt="Dunes Cafe" className='h-[200px] w-[300px] object-cover object-center
        md:w-[350px] md:h-[250px] lg:w-[400px] lg:h-[300px]' />
                <img src={LibraryMeetingSpace} alt="Library Meeting Space" className='h-[200px] w-[300px] object-cover object-center
        md:w-[350px] md:h-[250px] lg:w-[400px] lg:h-[300px]' />
                <img src={IndoorPool} alt="Indoor Pool" className='h-[200px] w-[300px] object-cover object-center
        md:w-[350px] md:h-[250px] lg:w-[400px] lg:h-[300px]' />
                <img src={OutdoorPool} alt="Outdoor Pool" className='h-[200px] w-[300px] object-cover object-center
        md:w-[350px] md:h-[250px] lg:w-[400px] lg:h-[300px]' />
                <img src={NetballCourts} alt="Outdoor Pool" className='h-[200px] w-[300px] object-cover object-center
        md:w-[350px] md:h-[250px] lg:w-[400px] lg:h-[300px]' />
            </div>
        </div>
    )
}

export default Gallery