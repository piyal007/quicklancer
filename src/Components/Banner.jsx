import React from "react";

const Banner = () => {
    return (
        <>
            <div className="w-11/12 mx-auto relative min-h-[400px] lg:min-h-[700px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://i.postimg.cc/RVSTZyv8/banner.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/60 sm:bg-black/50"></div>
                <div className="relative w-11/12 mx-auto flex flex-col items-center justify-center min-h-[400px] lg:min-h-[600px] text-white text-center px-3 sm:px-6 lg:px-8">
                    <h1 className="text-2xl text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Hire a Freelancer for any task</h1>
                    <p className="text-base text-xs md:text-xl mb-6 sm:mb-8">Over 1200+ expert freelancers are waiting for you</p>

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
        </>
    );
};

export default Banner;
