import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Signup = () => {
  const googleProvider = new GoogleAuthProvider();
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



        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={async () => {
                try {
                  const result = await signInWithPopup(auth, googleProvider);
                  if (result.user) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Success!',
                      text: 'Successfully signed in with Google!',
                    });
                    navigate('/');
                  }
                } catch (error) {
                  toast.error(error.message);
                }
              }}
              className="btn w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign up with Google
            </button>
          </div>
        </div>

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
