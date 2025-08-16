import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Video, Users, Clock, ArrowRight, Star, Menu, X, User, LogOut, Heart, Shield, Award, Zap } from 'lucide-react';
import { authSuccess, logout, setIsAuthenticated } from '../store/slices/authReducer';
import Navbar from '../components/Navbar';

const HomePage = () => {

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
console.log("User:", user);
  useEffect(() => {
    // Check for authToken in localStorage
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
       dispatch(authSuccess({ token, user: JSON.parse(userData) }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    // Redirect to home or login page
    window.location.href = '/';
  };

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: 'Easy Scheduling',
      desc: 'Book appointments at your convenience, 24/7 with instant confirmation'
    },
    {
      icon: <Video className="w-8 h-8 text-blue-600" />,
      title: 'Online Consultations',
      desc: 'Connect with doctors from the comfort of your home via secure video calls'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Expert Doctors',
      desc: 'Access to a network of verified healthcare professionals across specialties'
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Secure & Private',
      desc: 'Your medical data is protected with end-to-end encryption'
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: 'Quick Response',
      desc: 'Get medical advice within minutes, not hours or days'
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: 'Quality Care',
      desc: 'Top-rated doctors with verified credentials and patient reviews'
    }
  ];

  const stats = [
    { number: '15K+', label: 'Happy Patients', icon: <Heart className="w-5 h-5 inline" /> },
    { number: '800+', label: 'Expert Doctors', icon: <Users className="w-5 h-5 inline" /> },
    { number: '60+', label: 'Specializations', icon: <Award className="w-5 h-5 inline" /> },
    { number: '4.9', label: 'Average Rating', icon: <Star className="w-5 h-5 inline fill-current" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 font-sans">
     {/* Navbar Component */}
     <Navbar/>
      {/* Enhanced Hero Section */}
      <section className="pt-20 md:pt-24 pb-10 md:pb-14 px-2 sm:px-4 lg:px-8 relative overflow-hidden bg-white">
        {/* Remove animated gradient background */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div> */}
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Your Health, Our{' '}
                <span className="text-blue-600">
                  Priority
                </span>
              </h1>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <p className="text-base md:text-lg text-gray-600 mb-7 max-w-2xl mx-auto leading-relaxed">
                Connect with top healthcare professionals and book appointments instantly. 
                Quality healthcare made simple, accessible, and affordable for everyone.
              </p>
            </div>
            <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a href="/doctorAppointment" className="group inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium text-lg">
                Book Appointment
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a href="/login" className="inline-flex items-center bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium text-lg">
                Join as Doctor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 md:py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Why Choose Amrutam?
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Experience healthcare like never before with our innovative platform
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="inline-block p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">
              Trusted by Thousands
            </h2>
            <p className="text-blue-100 text-base max-w-2xl mx-auto">
              Join our growing community of satisfied patients and healthcare professionals
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 text-center">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white flex items-center justify-center gap-2">
                  {stat.number} {stat.icon}
                </div>
                <div className="text-blue-100 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              What Our Patients Say
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Real stories from real patients who trust Amrutam with their healthcare
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Software Engineer",
                content: "Amrutam made it so easy to find and book appointments with specialists. The online consultation saved me so much time!",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                role: "Business Owner",
                content: "The doctors are highly professional and the platform is very user-friendly. I've recommended it to my entire family.",
                rating: 5
              },
              {
                name: "Dr. Anita Desai",
                role: "General Physician",
                content: "As a doctor on this platform, I can efficiently manage my appointments and provide better care to my patients.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div 
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Remove gradient overlays */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div> */}
        <div className="max-w-4xl mx-auto text-center px-2 sm:px-4 lg:px-8 relative">
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ready to take control of your health?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8 leading-relaxed">
              Join thousands of satisfied patients who trust Amrutam for their healthcare needs. 
              Your journey to better health starts here.
            </p>
            <a href="/doctorAppointment" className="group inline-flex items-center bg-white text-blue-600 px-10 py-5 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold text-lg">
              Book Your First Appointment
              <ArrowRight size={24} className="ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12 relative overflow-hidden font-sans">
        {/* Remove gradient overlays */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div> */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Amrutam</span>
              </div>
              <p className="text-gray-300 text-base leading-relaxed max-w-md">
                Making healthcare accessible, affordable, and convenient for everyone. 
                Your health journey starts with us.
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/doctorAppointment" className="hover:text-white transition-colors duration-200">Find Doctors</a></li>
                <li><a href="/appointmentManager" className="hover:text-white transition-colors duration-200">My Appointments</a></li>
                <li><a href="/specializations" className="hover:text-white transition-colors duration-200">Specializations</a></li>
                <li><a href="/about" className="hover:text-white transition-colors duration-200">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Contact Info</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>support@amrutam.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+91 1234567890</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>Mumbai, India</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4 md:pt-6 text-center">
            <p className="text-gray-400 text-xs md:text-sm">
              © 2024 Amrutam. All rights reserved. Made with ❤️ for better healthcare.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(4px);
        }

        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        :global(body) {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default HomePage;