import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const navigate = useNavigate();

  const getJWTToken = async (user) => {
    try {
      const response = await fetch('https://assignment-10-server-ten-eosin.vercel.app/jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email })
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('access-token', data.token);
      }
    } catch (error) {
      console.error('Error getting JWT token:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) {
        await getJWTToken(result.user);
        Swal.fire({
          icon: 'success',
          title: 'Welcome back! 👋',
          text: 'You have successfully signed in to your account.',
          showConfirmButton: false,
          timer: 2000
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      let errorMessage = 'An error occurred during sign in';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        await getJWTToken(result.user);
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'You have successfully signed in with Google.',
          showConfirmButton: false,
          timer: 2000
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 pt-24 md:pt-28'>
      <div className='w-11/12 max-w-md mx-auto bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>Sign In</h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
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
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='btn w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
          >
            Sign In
          </button>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>Or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className='btn mt-4 w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
          >
            <FcGoogle className='text-2xl' />
            <span>Sign in with Google</span>
          </button>
        </div>

        <p className='mt-8 text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <Link to='/signup' className='font-medium text-blue-600 hover:text-blue-500'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;