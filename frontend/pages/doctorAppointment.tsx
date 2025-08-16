import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Video, Phone, Check, X, AlertCircle } from 'lucide-react';

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

  // Mock API base URL - replace with your actual API
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  // Mock token - in real app, get from localStorage or auth context
  const token = (typeof window !== 'undefined' && localStorage.getItem('authToken')) || 'mock-token';

  useEffect(() => {
    fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Doctor Appointment System</h1>
        
        {/* Notification */}
        {notification.message && (
          <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
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
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Find Doctors</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                  <select 
                    value={filters.specialization}
                    onChange={(e) => setFilters({...filters, specialization: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Specializations</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedic">Orthopedic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                  <select 
                    value={filters.mode}
                    onChange={(e) => setFilters({...filters, mode: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-8">Loading doctors...</div>
              ) : doctors.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">No doctors found</div>
              ) : (
                doctors.map((doctor) => (
                  <div key={doctor._id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doctor.mode === 'online' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {doctor.mode === 'online' ? <Video size={12} className="inline mr-1" /> : <MapPin size={12} className="inline mr-1" />}
                        {doctor.mode}
                      </div>
                    </div>
                    
                    {doctor.address && (
                      <p className="text-gray-600 text-sm mb-2">
                        <MapPin size={14} className="inline mr-1" />
                        {doctor.address.city}, {doctor.address.state}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-900">₹{doctor.consultationFee}</span>
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
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
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
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">{selectedDoctor.name}</h2>
                <p className="text-gray-600">{selectedDoctor.specialization}</p>
              </div>
              <button
                onClick={() => setBookingStep('doctors')}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
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
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {selectedDate && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
                {loading ? (
                  <div className="text-center py-4">Loading slots...</div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">No available slots for this date</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 text-center rounded-md border transition-colors ${
                          selectedSlot === slot
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-50 hover:bg-gray-100 border-gray-300'
                        }`}
                      >
                        <Clock size={16} className="mx-auto mb-1" />
                        <div className="text-sm font-medium">{formatTime(slot.start)}</div>
                        <div className="text-xs text-gray-500">30 min</div>
                      </button>
                    ))}
                  </div>
                )}

                {selectedSlot && (
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Appointment Summary</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                      <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}</p>
                      <p><strong>Mode:</strong> {selectedDoctor.mode}</p>
                      <p><strong>Fee:</strong> ₹{selectedDoctor.consultationFee}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setBookingStep('doctors')}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={reserveSlot}
                    disabled={!selectedSlot || loading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto">
            <div className="text-center mb-6">
              <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Slot Reserved!</h2>
              <p className="text-gray-600 text-sm mt-2">
                Your slot has been reserved for 5 minutes. Please enter the OTP to confirm.
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP Code</label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter 6-digit OTP (use 123456 for demo)"
                className="w-full p-3 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={6}
              />
              <p className="text-xs text-gray-500 mt-1 text-center">For demo: use 123456</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={confirmAppointment}
                disabled={!otpCode || loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Confirming...' : 'Confirm Appointment'}
              </button>
              <button
                onClick={resetBookingFlow}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
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
    </div>
  );
};

export default DoctorAppointmentSystem;