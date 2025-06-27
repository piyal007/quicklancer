import React, { useState, useEffect } from "react";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Carousel slide data
     const slides = [
         {
             id: 1,
             title: "Hire a Freelancer for any task",
             subtitle: "Over 1200+ expert freelancers are waiting for you",
             image: "https://i.postimg.cc/RVSTZyv8/banner.jpg"
         },
         {
             id: 2,
             title: "Find the perfect match for your project",
             subtitle: "Connect with skilled professionals in minutes",
             image: "https://i.postimg.cc/jdfDpm6c/qslider2.png"
         },
         {
             id: 3,
             title: "Quality work at competitive prices",
             subtitle: "Get your tasks done efficiently and affordably",
             image: "https://i.postimg.cc/T2C0yyBF/qslider.png"
         }
     ];

    // Auto-play functionality
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        setIsAutoPlaying(false);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
    };

    return (
        <>
            <div className="w-full relative h-[80vh] md:h-[85vh] lg:h-[90vh] overflow-hidden mt-0">
                {/* Slides */}
                {slides.map((slide, index) => (
                    <div 
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        style={{ 
                            backgroundImage: `url("${slide.image}")`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="absolute inset-0 bg-black/60 sm:bg-black/50"></div>
                        <div className="relative w-full mx-auto flex flex-col items-center justify-center h-full text-white text-center px-3 sm:px-6 lg:px-8 max-w-7xl">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{slide.title}</h1>
                            <p className="text-xs sm:text-sm md:text-xl mb-6 sm:mb-8">{slide.subtitle}</p>

                            <div className="w-full max-w-xl sm:max-w-2xl">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        placeholder="Search for any service..."
                                        className="flex-1 px-4 py-2 sm:py-3 rounded-lg text-gray-800 focus:outline-none bg-white text-sm sm:text-base"
                                    />
                                    <button className="cursor-pointer px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors sm:w-auto w-full text-sm sm:text-base">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation buttons */}
                <button 
                    onClick={handlePrevSlide}
                    className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full z-20 text-white"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button 
                    onClick={handleNextSlide}
                    className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full z-20 text-white"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                
                
                {/* Scroll indicator to hint at next section */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </>
    );
};

export default Banner;
