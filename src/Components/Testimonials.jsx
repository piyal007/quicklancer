import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Marketing Manager',
            image: 'https://i.pravatar.cc/150?img=1',
            rating: 5,
            text: 'Found exceptional talent for our digital marketing campaigns. The platform made it easy to connect with skilled professionals.'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Tech Startup Founder',
            image: 'https://i.pravatar.cc/150?img=2',
            rating: 5,
            text: 'As a startup founder, finding reliable freelancers was crucial. This platform delivered beyond expectations.'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Creative Director',
            image: 'https://i.pravatar.cc/150?img=3',
            rating: 4,
            text: 'The quality of creative talent here is outstanding. Made my project completion seamless and efficient.'
        }
    ];

    return (
        <div className="py-16 bg-base-200">
            <div className="w-11/12 mx-auto">
            <div className='text-center mb-12'>
            <h2 className="text-4xl font-bold text-center pb-2">What Our Clients Say</h2>
            <hr className='w-2/12 mx-auto border-2 border-blue-500' />
            </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-base-100 p-6 rounded-lg shadow-lg">
                            <div className="flex items-center mb-4">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name} 
                                    className="w-16 h-16 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                    <p className="text-sm opacity-75">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, index) => (
                                    <FaStar key={index} className="text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-base-content opacity-90">{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;