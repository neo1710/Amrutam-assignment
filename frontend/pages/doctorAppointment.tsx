import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Video, Phone, Check, X, AlertCircle } from 'lucide-react';
import { authSuccess } from '../store/slices/authReducer';
import { useDispatch } from 'react-redux';

// Types
type Doctor = {
  _id: string;
  name: string;
  specialization: string;
  mode: 'online' | 'in-person' | string;
  consultationFee: number;
  address?: {
    city: string;
    state: string;
  };
  nextFreeAt?: string | Date;
};

type Slot = {
  start: string | Date;
  end: string | Date;
};

type ReservationData = {
  appointmentId: string;
  expiresAt?: string | Date;
};

type Notification = {
  type: string;
  message: string;
};

type Filters = {
  specialization: string;
  mode: string;
  sortByAvailability: boolean;
};

const DoctorAppointmentSystem: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookingStep, setBookingStep] = useState<'doctors' | 'slots' | 'confirm' | 'otp'>('doctors');
  const [filters, setFilters] = useState<Filters>({
    specialization: '',
    mode: '',
    sortByAvailability: false
  });
  const [otpCode, setOtpCode] = useState<string>('');
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [notification, setNotification] = useState<Notification>({ type: '', message: '' });
  const dispatch = useDispatch();

  // Mock API base URL - replace with your actual API
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  // Mock token - in real app, get from localStorage or auth context
  const token = (typeof window !== 'undefined' && localStorage.getItem('authToken')) || 'mock-token';

  useEffect(() => {
    fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

    useEffect(() => {
      // Check for authToken in localStorage
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
  
      if (token && userData) {
         dispatch(authSuccess({ token, user: JSON.parse(userData) }));
      }
    }, [dispatch]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.specialization) params.append('specialization', filters.specialization);
      if (filters.mode) params.append('mode', filters.mode);
      if (filters.sortByAvailability) params.append('sortByAvailability', 'true');

      const response = await fetch(`${API_BASE}doctors?${params}`);
      const data: Doctor[] = await response.json();
      
      if (response.ok) {
        setDoctors(data);
      } else {
        showNotification('error', 'Failed to fetch doctors');
      }
    } catch (error) {
      showNotification('error', 'Network error while fetching doctors');
      // Mock data for demo
      setDoctors([
        {
          _id: '1',
          name: 'Dr. Sarah Johnson',
          specialization: 'Cardiology',
          mode: 'online',
          consultationFee: 500,
          address: { city: 'Mumbai', state: 'Maharashtra' },
          nextFreeAt: new Date()
        },
        {
          _id: '2',
          name: 'Dr. Michael Chen',
          specialization: 'Dermatology',
          mode: 'in-person',
          consultationFee: 750,
          address: { city: 'Delhi', state: 'Delhi' },
          nextFreeAt: new Date(Date.now() + 2 * 60 * 60 * 1000)
        }
      ]);
    }
    setLoading(false);
  };

  const fetchAvailableSlots = async (doctorId: string, date: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}appointments/doctor/${doctorId}/available-slots?date=${date}`);
      const data: { availableSlots: Slot[] } = await response.json();
      
      if (response.ok) {
        setAvailableSlots(data.availableSlots || []);
      } else {
        showNotification('error', 'Failed to fetch available slots');
        // Mock slots for demo
        const mockSlots: Slot[] = [
          { start: new Date(`${date}T09:00:00`), end: new Date(`${date}T09:30:00`) },
          { start: new Date(`${date}T10:00:00`), end: new Date(`${date}T10:30:00`) },
          { start: new Date(`${date}T11:30:00`), end: new Date(`${date}T12:00:00`) },
          { start: new Date(`${date}T14:00:00`), end: new Date(`${date}T14:30:00`) }
        ];
        setAvailableSlots(mockSlots);
      }
    } catch (error) {
      showNotification('error', 'Network error while fetching slots');
    }
    setLoading(false);
  };

  const reserveSlot = async () => {
    if (!selectedSlot || !selectedDoctor) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}appointments/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          doctorId: selectedDoctor._id,
          appointmentDate: selectedDate,
          timeSlot: selectedSlot,
          mode: selectedDoctor.mode
        })
      });

      const data: ReservationData & { msg?: string } = await response.json();
      
      if (response.ok) {
        setReservationData(data);
        setBookingStep('otp');
        showNotification('success', 'Slot reserved! Please confirm with OTP');
      } else {
        showNotification('error', data.msg || 'Failed to reserve slot');
      }
    } catch (error) {
      showNotification('error', 'Network error while reserving slot');
    }
    setLoading(false);
  };

  const confirmAppointment = async () => {
    if (!reservationData || !otpCode) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}appointments/confirm/${reservationData.appointmentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ otpCode })
      });

      const data: { msg?: string } = await response.json();
      
      if (response.ok) {
        showNotification('success', 'Appointment confirmed successfully!');
        resetBookingFlow();
      } else {
        showNotification('error', data.msg || 'Invalid OTP');
      }
    } catch (error) {
      showNotification('error', 'Network error while confirming appointment');
    }
    setLoading(false);
  };

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: '', message: '' }), 5000);
  };

  const resetBookingFlow = () => {
    setBookingStep('doctors');
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setSelectedDate('');
    setAvailableSlots([]);
    setOtpCode('');
    setReservationData(null);
  };

  const formatTime = (date: string | Date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-8 px-2 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-700 mb-8 md:mb-10 text-center tracking-tight">
          Book a Doctor Appointment
        </h1>
        
        {/* Notification */}
        {notification.message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-2 shadow ${
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
            {notification.message}
          </div>
        )}

        {/* Doctor List Step */}
        {bookingStep === 'doctors' && (
          <div>
            {/* Filters */}
            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg mb-6 md:mb-8 border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-700">Find Doctors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
                  <select 
                    value={filters.specialization}
                    onChange={(e) => setFilters({...filters, specialization: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">All Specializations</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedic">Orthopedic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mode</label>
                  <select 
                    value={filters.mode}
                    onChange={(e) => setFilters({...filters, mode: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">All Modes</option>
                    <option value="online">Online</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.sortByAvailability}
                      onChange={(e) => setFilters({...filters, sortByAvailability: e.target.checked})}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Sort by availability</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Doctor Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {loading ? (
                <div className="col-span-full text-center py-12 text-blue-600 font-semibold">Loading doctors...</div>
              ) : doctors.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-400">No doctors found</div>
              ) : (
                doctors.map((doctor) => (
                  <div key={doctor._id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        doctor.mode === 'online' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {doctor.mode === 'online' ? <Video size={14} className="inline mr-1" /> : <MapPin size={14} className="inline mr-1" />}
                        {doctor.mode}
                      </div>
                    </div>
                    
                    {doctor.address && (
                      <p className="text-gray-600 text-sm mb-2 flex items-center">
                        <MapPin size={16} className="inline mr-1" />
                        {doctor.address.city}, {doctor.address.state}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-700">₹{doctor.consultationFee}</span>
                      {doctor.nextFreeAt && (
                        <span className="text-xs text-gray-500">
                          Next available: {formatTime(doctor.nextFreeAt)}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setBookingStep('slots');
                        setSelectedDate(getTomorrowDate());
                      }}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
                    >
                      Book Appointment
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Slot Selection Step */}
        {bookingStep === 'slots' && selectedDoctor && (
          <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-700">{selectedDoctor.name}</h2>
                <p className="text-gray-600">{selectedDoctor.specialization}</p>
              </div>
              <button
                onClick={() => setBookingStep('doctors')}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={28} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                min={getTomorrowDate()}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  if (e.target.value) {
                    fetchAvailableSlots(selectedDoctor._id, e.target.value);
                  }
                }}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition w-full max-w-xs"
              />
            </div>

            {selectedDate && (
              <div>
                <h3 className="text-lg font-semibold mb-3 md:mb-4 text-blue-700">Available Time Slots</h3>
                {loading ? (
                  <div className="text-center py-4 text-blue-600">Loading slots...</div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-center py-4 text-gray-400">No available slots for this date</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 mb-5 md:mb-6">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 text-center rounded-lg border font-semibold transition ${
                          selectedSlot === slot
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-50 hover:bg-blue-50 border-gray-300 text-blue-700'
                        }`}
                      >
                        <Clock size={18} className="mx-auto mb-1" />
                        <div className="text-sm">{formatTime(slot.start)}</div>
                        <div className="text-xs text-gray-500">30 min</div>
                      </button>
                    ))}
                  </div>
                )}

                {selectedSlot && (
                  <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-100">
                    <h4 className="font-semibold mb-2 text-blue-900">Appointment Summary</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                      <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}</p>
                      <p><strong>Mode:</strong> {selectedDoctor.mode}</p>
                      <p><strong>Fee:</strong> ₹{selectedDoctor.consultationFee}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setBookingStep('doctors')}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={reserveSlot}
                    disabled={!selectedSlot || loading}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                  >
                    {loading ? 'Reserving...' : 'Reserve Slot'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* OTP Confirmation Step */}
        {bookingStep === 'otp' && reservationData && (
          <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md mx-auto">
            <div className="text-center mb-6">
              <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-blue-700">Slot Reserved!</h2>
              <p className="text-gray-600 text-sm mt-2">
                Your slot has been reserved for 5 minutes. Please enter the OTP to confirm.
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Enter OTP Code</label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter 6-digit OTP (use 123456 for demo)"
                className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                maxLength={6}
              />
              <p className="text-xs text-gray-500 mt-1 text-center">For demo: use 123456</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={confirmAppointment}
                disabled={!otpCode || loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
              >
                {loading ? 'Confirming...' : 'Confirm Appointment'}
              </button>
              <button
                onClick={resetBookingFlow}
                className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Cancel
              </button>
            </div>

            {reservationData.expiresAt && (
              <div className="mt-4 text-center">
                <p className="text-xs text-red-600">
                  Reservation expires at: {new Date(reservationData.expiresAt).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        /* Fade-in animation for cards (optional, for polish) */
        .fade-in {
          animation: fadeIn 0.7s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        :global(body) {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default DoctorAppointmentSystem;