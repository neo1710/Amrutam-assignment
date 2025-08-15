'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

    setIsLoading(true);
    setMessage('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(`/api/users${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: any = await response.json();

      if (response.ok) {
        setMessage(data.msg);

        if (isLogin && data.token) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userData', JSON.stringify(data.user));
          // Redirect or update app state here
          console.log('Login successful:', data);
          // Example: router.push('/dashboard');
        } else if (!isLogin) {
          setIsLogin(true);
          setFormData({ name: '', email: '', password: '' });
        }
      } else {
        setMessage(data.msg || 'An error occurred');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setMessage('');
  };

  return (
    <>
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #f3e8ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .main-content {
          width: 100%;
          max-width: 400px;
        }

        .header {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: linear-gradient(45deg, #2563eb, #7c3aed);
          border-radius: 50%;
          margin-bottom: 16px;
        }

        .title {
          font-size: 32px;
          font-weight: bold;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .subtitle {
          color: #6b7280;
          margin: 0;
        }

        .form-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid #f3f4f6;
          padding: 32px;
        }

        .form-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .input {
          display: block;
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .input:hover {
          border-color: #9ca3af;
        }

        .input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .input.error {
          border-color: #ef4444;
          background-color: #fef2f2;
        }

        .password-input {
          padding-right: 48px;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          transition: color 0.2s;
        }

        .password-toggle:hover {
          color: #6b7280;
        }

        .error-text {
          margin-top: 8px;
          font-size: 14px;
          color: #ef4444;
        }

        .help-text {
          margin-top: 8px;
          font-size: 12px;
          color: #6b7280;
        }

        .submit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          color: white;
          background: linear-gradient(45deg, #2563eb, #7c3aed);
          cursor: pointer;
          transition: all 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(45deg, #1d4ed8, #6d28d9);
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-icon {
          margin-right: 8px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid white;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .message {
          padding: 16px;
          border-radius: 8px;
          font-size: 14px;
          margin-top: 16px;
        }

        .message.success {
          background-color: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .message.error {
          background-color: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .switch-mode {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #f3f4f6;
          text-align: center;
        }

        .switch-text {
          font-size: 14px;
          color: #6b7280;
        }

        .switch-link {
          margin-left: 8px;
          font-weight: 500;
          color: #2563eb;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .switch-link:hover {
          color: #1d4ed8;
        }

        .footer {
          text-align: center;
          margin-top: 32px;
          font-size: 14px;
          color: #9ca3af;
        }

        @media (max-width: 480px) {
          .form-card {
            padding: 24px;
          }
          
          .title {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="container">
        <div className="main-content">
          {/* Logo/Header */}
          <div className="header">
            <div className="logo">
              <User size={32} color="white" />
            </div>
            <h1 className="title">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="subtitle">
              {isLogin ? 'Sign in to your account' : 'Join us today'}
            </p>
          </div>

          {/* Form */}
          <div className="form-card">
            <form className="form-content" onSubmit={handleSubmit}>
              {/* Name field for registration */}
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name" className="label">
                    Full Name
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <User size={20} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`input ${errors.name ? 'error' : ''}`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
              )}

              {/* Email field */}
              <div className="form-group">
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              {/* Password field */}
              <div className="form-group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`input password-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}
                {!isLogin && (
                  <p className="help-text">
                    Password must be at least 6 characters with letters and numbers
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="submit-btn"
              >
                {isLoading ? (
                  <>
                    <div className="spinner" />
                    Processing...
                  </>
                ) : (
                  <>
                    {isLogin ? (
                      <LogIn size={20} className="btn-icon" />
                    ) : (
                      <UserPlus size={20} className="btn-icon" />
                    )}
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </button>

              {/* Message */}
              {message && (
                <div className={`message ${
                  message.includes('successfully') || message.includes('Success')
                    ? 'success'
                    : 'error'
                }`}>
                  {message}
                </div>
              )}
            </form>

            {/* Switch between login/register */}
            <div className="switch-mode">
              <span className="switch-text">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </span>
              <button
                type="button"
                onClick={switchMode}
                className="switch-link"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>© 2025 Your App Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}