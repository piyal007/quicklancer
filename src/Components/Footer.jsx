import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className='bg-base-100 text-base-content py-8'>
        <div className='w-11/12 mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Contact Information */}
            <div>
              <h3 className='text-xl font-bold mb-4'>Contact Us</h3>
              <div className='space-y-2'>
                <p className='text-gray-600'>Email: info@quicklancer.com</p>
                <p className='text-gray-600'>Phone: +1 (555) 123-4567</p>
                <p className='text-gray-600'>Address: 123 Freelance Street</p>
                <p className='text-gray-600'>New York, NY 10001</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
              <div className='space-y-2'>
                <Link to='/terms' className='block text-gray-600 hover:text-gray-900'>Terms & Conditions</Link>
                <Link to='/privacy' className='block text-gray-600 hover:text-gray-900'>Privacy Policy</Link>
                <Link to='/faq' className='block text-gray-600 hover:text-gray-900'>FAQ</Link>
                <Link to='/about' className='block text-gray-600 hover:text-gray-900'>About Us</Link>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className='text-xl font-bold mb-4'>Connect With Us</h3>
              <div className='flex space-x-4'>
                <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-blue-600'>
                  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'><path d='M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5L14.5.5C10.45.5,9.5,3.86,9.5,6.21V7.46H6.5v4h3v12h5V11.46h3.85l.42-4z'/></svg>
                </a>
                <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-blue-400'>
                  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'><path d='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z'/></svg>
                </a>
                <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-blue-700'>
                  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'><path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/></svg>
                </a>
                <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-pink-600'>
                  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className='text-center mt-8 pt-8 border-t border-gray-200'>
            <p className='text-gray-600'>&copy; {new Date().getFullYear()} QuickLancer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;