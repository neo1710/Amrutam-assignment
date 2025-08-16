'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { authStart, authSuccess, authFailure } from '../store/slices/authReducer';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

type FormData = {
  name: string;
  email: string;
  password: string;
};

type Errors = {
  name?: string;
  email?: string;
  password?: string;
};

export default function AuthComponent() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  const router=useRouter()
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string>('');

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!isLogin && (!formData.name || formData.name.trim().length < 2)) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!isLogin) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
      if (!formData.password || !passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must be at least 6 characters long and contain both letters and numbers';
      }
    } else {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    dispatch(authStart());
    setMessage('');

    try {
      const endpoint = isLogin ? 'login' : 'register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      // Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: any = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        setMessage(data.msg);

        if (isLogin && data.token) {
          // Store token in localStorage
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userData', JSON.stringify(data.user));
          dispatch(authSuccess({ user: data.user, token: data.token }));
          // Redirect or update app state here
          // Example: 
          router.push('/');
        } else if (!isLogin) {
          // After successful registration, switch to login
          setIsLogin(true);
          setFormData({ name: '', email: '', password: '' });
        }
      } else {
        setMessage(data.msg || 'An error occurred');
        dispatch(authFailure(data.msg || 'An error occurred'));
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      dispatch(authFailure('Network error. Please try again.'));
      console.error('Auth error:', error);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center p-2 font-sans">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-5 md:mb-7">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-full mb-2 md:mb-3">
            <User className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600 mt-1 md:mt-2 text-sm">
            {isLogin ? 'Sign in to your account' : 'Join us today'}
          </p>
        </div>

        {/* Form */}
        <form className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Name field for registration */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              {!isLogin && (
                <p className="mt-2 text-xs text-gray-500">
                  Password must be at least 6 characters with letters and numbers
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : isLogin ? (
                <LogIn className="w-5 h-5 mr-2" />
              ) : (
                <UserPlus className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>

            {/* Message */}
            {(message || error) && (
              <div className={`p-4 rounded-lg text-sm ${
                (message && (message.includes('successfully') || message.includes('Success'))) || (!message && !error)
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message || error}
              </div>
            )}
          </div>

          {/* Switch between login/register */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={switchMode}
                className="ml-2 font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-5 md:mt-7 text-xs md:text-sm text-gray-500">
          <p>© 2025 Amrutam. All rights reserved.</p>
        </div>
      </div>
      <style jsx>{`
        :global(body) {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        }
      `}</style>
    </div>
  );
}