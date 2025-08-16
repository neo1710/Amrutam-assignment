import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, User, LogOut, Heart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authReducer';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    dispatch(logout());
    router.push('/');
  };

  useEffect(() => {
    // Handle scroll effect for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 font-sans ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-2 md:py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-blue-700">
              Amrutam
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a href="/doctorAppointment" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">
              Find Doctors
            </a>
            <a href="/appointmentManager" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">
              My Appointments
            </a>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                {user && user.name && (
                  <span className="text-gray-700 font-medium text-sm truncate max-w-[120px]">{user.name}</span>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 font-medium text-sm transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <a href="/login" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">
                  Login
                </a>
                <a href="/signup" className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold text-sm">
                  Sign Up
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="pl-5 py-3 space-y-3 border-t border-gray-200 bg-white rounded-b-xl shadow-lg">
            <a href="/doctorAppointment" className="block text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">
              Find Doctors
            </a>
            <a href="/appointmentManager" className="block text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">
              My Appointments
            </a>
            <a href="/about" className="block text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">
              About
            </a>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium text-sm transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <a href="/login" className="block text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">
                  Login
                </a>
                <a href="/signup" className="block bg-blue-600 text-white px-6 py-2 rounded-full text-center font-semibold text-sm">
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        nav {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
