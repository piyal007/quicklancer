import React from "react";
import { FaCode } from "react-icons/fa";
import { BsPalette, BsCamera, BsPen } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";

const Category = () => {
  const categories = [
    {
      icon: <FaCode className="text-4xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "Programming & Tech",
      services: 4,
    },
    {
      icon: <BsPalette className="text-4xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "Graphic & Design",
      services: 3,
    },
    {
      icon: <BsCamera className="text-4xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "Photography & Editor",
      services: 3,
    },
    {
      icon: <BsPen className="text-4xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "Writing & Translation",
      services: 4,
    },
    {
      icon: <BiMoviePlay className="text-4xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "Video & Animation",
      services: 4,
    },
  ];

  return (
    <>
      <div className="bg-base-100 text-base-content py-8 pt-16 md:pt-20">
        <div className="w-11/12 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold pb-2 text-base-content">Browse Category</h2>
            <hr className="w-2/12 mx-auto border-2 border-blue-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center transform hover:-translate-y-1"
              >
                <div className="mb-6 bg-blue-50 p-4 rounded-full">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {category.services} services
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
