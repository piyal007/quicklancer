import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    uppercase: false,
    lowercase: false,
    length: false
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    setPasswordErrors({
      uppercase: !hasUpperCase,
      lowercase: !hasLowerCase,
      length: !isLongEnough
    });

    return hasUpperCase && hasLowerCase && isLongEnough;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) return;

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL
      });

      if (result.user) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Successfully registered!',
        });
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='w-11/12 max-w-md mx-auto bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>Sign Up</h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
              Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='photoURL' className='block text-sm font-medium text-gray-700 mb-2'>
              Photo URL
            </label>
            <input
              type='url'
              id='photoURL'
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <div className="mt-2">
              {isPasswordFocused && (passwordErrors.uppercase || passwordErrors.lowercase || passwordErrors.length) && (
                <p className="text-xs text-red-500"><span>Password must be </span>
                  {[passwordErrors.uppercase && 'a uppercase letter', passwordErrors.lowercase && 'a lowercase letter', passwordErrors.length && '6+ characters long']
                    .filter(Boolean)
                    .join(', ')}
                </p>
              )}
            </div>
          </div>

          <button
            type='submit'
            className='btn w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
          >
            Sign Up
          </button>
        </form>



        <p className='mt-8 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link to='/signin' className='font-medium text-blue-600 hover:text-blue-500'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
