import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { User, Lock, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { authSuccess } from '../../store/slices/authReducer';

const DoctorLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    mode: 'online',
    consultationFee: ''
  });

  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        setIsLogin(true);
        setRegistrationSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotification(null);
    
    try {
      const endpoint = isLogin ? 'doctors/login' : 'doctors/register';
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: isLogin? JSON.stringify({email:formData.email,password:formData.password}):JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Authentication failed');
      }

      if (isLogin) {
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userType', 'doctor');
          localStorage.setItem('userData', JSON.stringify(data.docSafe));
          dispatch(authSuccess({ token: data.token, user: data.docSafe }));
          showNotification('success', 'Login successful!');
          router.push('/doctor/dashboard');
        }
      } else {
        showNotification('success', 'Registration successful! Please login.');
        setRegistrationSuccess(true);
        setFormData({
          name: '',
          email: '',
          password: '',
          specialization: '',
          mode: 'online',
          consultationFee: ''
        });
      }
    } catch (err: any) {
      showNotification('error', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          } transition-all duration-300 ease-in-out transform translate-y-0`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2" />
          )}
          <p>{notification.message}</p>
        </div>
      )}

      <div className="max-w-md w-full mx-auto space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Doctor Login' : 'Doctor Registration'}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <User className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <select
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                >
                  <option value="">Select Specialization</option>
                  <option value="Kaya Chikitsa">Kaya Chikitsa (General Medicine)</option>
                  <option value="Shalya Tantra">Shalya Tantra (Surgery)</option>
                  <option value="Shalakya Tantra">Shalakya Tantra (ENT & Ophthalmology)</option>
                  <option value="Kaumarbhritya">Kaumarbhritya (Pediatrics)</option>
                  <option value="Agad Tantra">Agad Tantra (Toxicology)</option>
                  <option value="Bhut Vidya">Bhut Vidya (Psychiatry)</option>
                  <option value="Rasayan">Rasayan (Rejuvenation)</option>
                  <option value="Vajikaran">Vajikaran (Fertility)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mode</label>
                  <select
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    value={formData.mode}
                    onChange={(e) => setFormData({...formData, mode: e.target.value})}
                  >
                    <option value="online">Online</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
                  <input
                    type="number"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <input
                type="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <Mail className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <input
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <Lock className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? 'Need to register?' : 'Already registered?'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
