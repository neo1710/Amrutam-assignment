import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Calendar, Clock, User, Video, MapPin, Check, X } from 'lucide-react';

const DoctorDashboard = () => {
  const router = useRouter();
  const { user, token } = useSelector((state: any) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    if (!token || localStorage.getItem('userType') !== 'doctor') {
      router.replace('/doctor/login');
    } else {
      fetchAppointments();
    }
  }, [token, router, activeTab]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}appointments/my-appointments?type=${activeTab}&doctorId=${user?._id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
      );
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-blue-600 font-medium">{user?.specialization}</p>
              <p className="text-gray-500 mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user?.mode === 'online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {user?.mode === 'online' ? <Video className="w-4 h-4 mr-1" /> : <MapPin className="w-4 h-4 mr-1" />}
                  {user?.mode}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Consultation Fee</p>
              <p className="text-2xl font-bold text-blue-600">₹{user?.consultationFee}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {['upcoming', 'past', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Appointments
                </button>
              ))}
            </nav>
          </div>

          {/* Appointments List */}
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No appointments found</div>
            ) : (
              appointments.map((apt: any) => (
                <div key={apt._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <User className="w-6 h-6 text-gray-400 mr-3" />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{apt.userId.name}</h3>
                          <p className="text-gray-500">{apt.userId.email}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(apt.appointmentDate)}
                        <Clock className="w-4 h-4 ml-4 mr-1" />
                        {formatTime(apt.timeSlot.start)} - {formatTime(apt.timeSlot.end)}
                      </div>
                    </div>
                    <div className="ml-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {apt.status === 'confirmed' ? <Check className="w-4 h-4 mr-1" /> :
                         apt.status === 'cancelled' ? <X className="w-4 h-4 mr-1" /> :
                         <Clock className="w-4 h-4 mr-1" />}
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
