import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    uppercase: false,
    lowercase: false,
    length: false
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Successfully signed in!',
        });
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
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
  };

  return (
    <div className='min-h-screen bg-gray-100 py-12'>
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