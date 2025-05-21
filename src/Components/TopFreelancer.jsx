import React, { useState, useEffect } from 'react';

const TopFreelancer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const freelancers = [
    {
      id: 1,
      name: "Michael Anderson",
      rating: 4.8,
      profession: "Full Stack Developer",
      rate: "$85/hr",
      skills: ["React", "Node.js", "MongoDB"],
      featured: true,
      image: "https://i.postimg.cc/4xTbqNxD/freelnce-2.jpg",
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      rating: 4.9,
      profession: "UI/UX Designer",
      rate: "$75/hr",
      skills: ["Figma", "Adobe XD", "Web Design"],
      featured: true,
      image: "https://i.postimg.cc/X75ksy4K/freelnce-4.jpg",
    },
    {
      id: 3,
      name: "David Wilson",
      rating: 4.7,
      profession: "DevOps Engineer",
      rate: "$95/hr",
      skills: ["AWS", "Docker", "CI/CD"],
      image: "https://i.postimg.cc/Z5FFSt9C/freelnce-1.jpg",
    },
    {
      id: 4,
      name: "Emily Parker",
      rating: 4.8,
      profession: "Digital Marketing",
      rate: "$65/hr",
      skills: ["SEO", "Content Strategy", "Analytics"],
      image: "https://i.postimg.cc/DZtbGBW9/freelnce-6.jpg",
    },
    {
      id: 5,
      name: "Alex Thompson",
      rating: 4.9,
      profession: "Mobile App Developer",
      rate: "$90/hr",
      skills: ["React Native", "iOS", "Android"],
      featured: true,
      image: "https://i.postimg.cc/cJLYGKyb/freelnce-5.jpg",
    },
    {
      id: 6,
      name: "Logan Carter",
      rating: 4.5,
      profession: "Frontend Developer",
      rate: "$60/hr",
      skills: ["Vue.js", "Tailwind", "JavaScript"],
      featured: true,
      image: "https://i.postimg.cc/dQp9R9Pt/freelnce-3.jpg",
    },
    {
      id: 7,
      name: "Jake Thompson",
      rating: 4.6,
      profession: "Content Writer",
      rate: "$50/hr",
      skills: ["Blogging", "Copywriting", "SEO"],
      featured: false,
      image: "https://i.postimg.cc/cJLYGKyb/freelnce-5.jpg",
    },
    {
      id: 8,
      name: "Mason Walker",
      rating: 4.9,
      profession: "Data Analyst",
      rate: "$100/hr",
      skills: ["Python", "SQL", "Tableau"],
      featured: true,
      image: "https://i.postimg.cc/4xTbqNxD/freelnce-2.jpg",
    },
  ];
  

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(freelancers.length / 4));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, freelancers.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.ceil(freelancers.length / 4) - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(freelancers.length / 4));
    setIsAutoPlaying(false);
  };

  const visibleFreelancers = freelancers.slice(currentSlide * 4, (currentSlide + 1) * 4);

  return (
    <div className='bg-gray-50 py-16'>
      <div className='w-11/12 mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold'>Top Rated Freelancers</h2>
          <button className="btn px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 font-semibold text-sm md:text-base">Explore All Freelancers</button>
        </div>
        
        <div className='relative'>
          <button 
            onClick={handlePrevSlide}
            className='cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10'
            aria-label='Previous slide'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={handleNextSlide}
            className='cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10'
            aria-label='Next slide'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden'>
            {visibleFreelancers.map(freelancer => (
              <div key={freelancer.id} className='bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300'>
                <div className='relative p-4 pb-0'>
                  <img 
                    src={freelancer.image}
                    alt={freelancer.name}
                    className='w-24 h-24 rounded-full mx-auto object-cover shadow-sm'
                  />
                  {freelancer.featured && (
                    <span className='absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm'>Featured</span>
                  )}
                </div>
                
                <div className='p-4 text-center'>
                  <div className='mb-2'>
                    <h3 className='text-xl font-semibold text-gray-800'>{freelancer.name}</h3>
                  </div>
                  
                  <div className='flex items-center justify-center gap-2 mb-2'>
                    <div className='flex items-center'>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < Math.floor(freelancer.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                      ))}
                      <span className='ml-2 text-gray-600 font-medium'>{freelancer.rating}</span>
                    </div>
                  </div>
                  
                  <div className='mb-2'>
                    <span className='text-gray-600'>{freelancer.profession}</span>
                  </div>
                  
                  <div>
                    <span className='text-gray-800 font-medium'>From {freelancer.rate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className='flex justify-center mt-8'>
            <div className='flex gap-2'>
              {[...Array(Math.ceil(freelancers.length / 4))].map((_, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFreelancer;