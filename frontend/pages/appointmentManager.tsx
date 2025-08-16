import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, MapPin, Video, Phone, Check, X, AlertCircle, 
  CreditCard, RefreshCw, Edit3, Trash2, Eye, DollarSign, Timer
} from 'lucide-react';
import { authSuccess } from '../store/slices/authReducer';
import { useDispatch } from 'react-redux';

// Types
type Doctor = {
  _id: string;
  name: string;
  specialization: string;
  mode: 'online' | 'in-person' | string;
};

type Slot = {
  start: string | Date;
  end: string | Date;
};

type RescheduleHistory = {
  oldDate: string | Date;
  newDate: string | Date;
  reason?: string;
  timestamp: string | Date;
};

type Appointment = {
  _id: string;
  doctorId: Doctor;
  appointmentDate: string | Date;
  timeSlot: Slot;
  status: string;
  mode: string;
  consultationFee: number;
  paymentStatus: string;
  confirmedAt?: string | Date;
  reservationExpiresAt?: string | Date;
  consultationNotes?: string;
  prescription?: string;
  reschedulingHistory: RescheduleHistory[];
};

type Notification = {
  type: string;
  message: string;
};

const UserAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('all'); // all, upcoming, past
  const [statusFilter, setStatusFilter] = useState<string>(''); // reserved, confirmed, completed, cancelled
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState<boolean>(false);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [selectedRescheduleSlot, setSelectedRescheduleSlot] = useState<Slot | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState<string>('');
  const [notification, setNotification] = useState<Notification>({ type: '', message: '' });
  const dispatch = useDispatch();
  // Mock API base URL - replace with your actual API
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  // Mock token - in real app, get from localStorage or auth context
  const token = (typeof window !== 'undefined' && localStorage.getItem('authToken')) || 'mock-token';

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, statusFilter]);

      useEffect(() => {
        // Check for authToken in localStorage
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
    
        if (token && userData) {
           dispatch(authSuccess({ token, user: JSON.parse(userData) }));
        }
      }, [dispatch]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('type', filter);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`${API_BASE}appointments/my-appointments?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data: Appointment[] = await response.json();
      
      if (response.ok) {
        setAppointments(data);
      } else {
        showNotification('error', 'Failed to fetch appointments');
        setMockAppointments();
      }
    } catch (error) {
      showNotification('error', 'Network error while fetching appointments');
      setMockAppointments();
    }
    setLoading(false);
  };

  const setMockAppointments = () => {
    const mockData: Appointment[] = [
      {
        _id: '1',
        doctorId: {
          _id: 'doc1',
          name: 'Dr. Sarah Johnson',
          specialization: 'Cardiology',
          mode: 'online'
        },
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        timeSlot: {
          start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
          end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 9.5 * 60 * 60 * 1000)
        },
        status: 'confirmed',
        mode: 'online',
        consultationFee: 500,
        paymentStatus: 'paid',
        confirmedAt: new Date(Date.now() - 60 * 60 * 1000),
        reschedulingHistory: []
      },
      {
        _id: '2',
        doctorId: {
          _id: 'doc2',
          name: 'Dr. Michael Chen',
          specialization: 'Dermatology',
          mode: 'in-person'
        },
        appointmentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        timeSlot: {
          start: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
          end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 14.5 * 60 * 60 * 1000)
        },
        status: 'reserved',
        mode: 'in-person',
        consultationFee: 750,
        paymentStatus: 'pending',
        reservationExpiresAt: new Date(Date.now() + 4 * 60 * 1000),
        reschedulingHistory: [{
          oldDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          newDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          reason: 'Doctor unavailable',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }]
      },
      {
        _id: '3',
        doctorId: {
          _id: 'doc1',
          name: 'Dr. Sarah Johnson',
          specialization: 'Cardiology',
          mode: 'online'
        },
        appointmentDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        timeSlot: {
          start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000),
          end: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 11.5 * 60 * 60 * 1000)
        },
        status: 'completed',
        mode: 'online',
        consultationFee: 500,
        paymentStatus: 'paid',
        consultationNotes: 'Patient showing good progress. Continue current medication.',
        prescription: 'Atenolol 50mg - Once daily, Aspirin 75mg - Once daily',
        reschedulingHistory: []
      }
    ];
    setAppointments(mockData);
  };

  const fetchAvailableSlotsForReschedule = async (doctorId: string, date: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}appointments/doctor/${doctorId}/available-slots?date=${date}`);
      const data: { availableSlots: Slot[] } = await response.json();
      
      if (response.ok) {
        setAvailableSlots(data.availableSlots || []);
      } else {
        // Mock slots for demo
        const mockSlots: Slot[] = [
          { start: new Date(`${date}T09:00:00`), end: new Date(`${date}T09:30:00`) },
          { start: new Date(`${date}T10:00:00`), end: new Date(`${date}T10:30:00`) },
          { start: new Date(`${date}T15:00:00`), end: new Date(`${date}T15:30:00`) }
        ];
        setAvailableSlots(mockSlots);
      }
    } catch (error) {
      showNotification('error', 'Error fetching available slots');
    }
    setLoading(false);
  };

  const rescheduleAppointment = async () => {
    if (!selectedAppointment || !selectedRescheduleSlot || !rescheduleReason) {
      showNotification('error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}appointments/reschedule/${selectedAppointment._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          newDate: rescheduleDate,
          newTimeSlot: selectedRescheduleSlot,
          reason: rescheduleReason
        })
      });

      const data: { msg?: string } = await response.json();
      
      if (response.ok) {
        showNotification('success', 'Appointment rescheduled successfully!');
        setShowRescheduleModal(false);
        resetRescheduleForm();
        fetchAppointments();
      } else {
        showNotification('error', data.msg || 'Failed to reschedule appointment');
      }
    } catch (error) {
      showNotification('error', 'Network error while rescheduling');
    }
    setLoading(false);
  };

  const cancelAppointment = async (appointmentId: string, reason: string) => {
    if (!reason) {
      showNotification('error', 'Please provide a cancellation reason');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}appointments/cancel/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason })
      });

      const data: { msg?: string } = await response.json();
      
      if (response.ok) {
        showNotification('success', 'Appointment cancelled successfully');
        fetchAppointments();
      } else {
        showNotification('error', data.msg || 'Failed to cancel appointment');
      }
    } catch (error) {
      showNotification('error', 'Network error while cancelling');
    }
    setLoading(false);
  };

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: '', message: '' }), 5000);
  };

  const resetRescheduleForm = () => {
    setSelectedAppointment(null);
    setRescheduleDate('');
    setSelectedRescheduleSlot(null);
    setRescheduleReason('');
    setAvailableSlots([]);
  };

  const formatDate = (date: string | Date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: string | Date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'reserved': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'rescheduled': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'refunded': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const canReschedule = (appointment: Appointment) => {
    const now = new Date();
    const appointmentTime = new Date(appointment.timeSlot.start);
    const hoursDiff = (appointmentTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 24 && ['confirmed', 'reserved'].includes(appointment.status);
  };

  const canCancel = (appointment: Appointment) => {
    const now = new Date();
    const appointmentTime = new Date(appointment.timeSlot.start);
    const hoursDiff = (appointmentTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 24 && ['confirmed', 'reserved'].includes(appointment.status);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-6 px-2 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-700 mb-6 md:mb-8 text-center tracking-tight">
          My Appointments
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

        {/* Filters */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-5 md:mb-7 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Time</label>
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="all">All Appointments</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Status</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">All Statuses</option>
                <option value="reserved">Reserved</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4 md:space-y-5">
          {loading ? (
            <div className="text-center py-12 text-blue-600 font-semibold">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No appointments found</div>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment._id} className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {appointment.doctorId.name}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1 ${getPaymentStatusColor(appointment.paymentStatus)}`}>
                        <CreditCard size={12} className="inline" />
                        {appointment.paymentStatus}
                      </div>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{appointment.doctorId.specialization}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(appointment.appointmentDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{formatTime(appointment.timeSlot.start)} - {formatTime(appointment.timeSlot.end)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {appointment.mode === 'online' ? <Video size={16} /> : <MapPin size={16} />}
                        <span className="capitalize">{appointment.mode}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-700">₹{appointment.consultationFee}</div>
                      {appointment.reservationExpiresAt && new Date(appointment.reservationExpiresAt) > new Date() && (
                        <div className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <Timer size={12} />
                          Expires: {formatTime(appointment.reservationExpiresAt)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rescheduling History */}
                {appointment.reschedulingHistory && appointment.reschedulingHistory.length > 0 && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Rescheduling History</h4>
                    {appointment.reschedulingHistory.map((history, index) => (
                      <div key={index} className="text-xs text-blue-700">
                        <strong>{formatDate(history.timestamp)}:</strong> Moved from {formatDate(history.oldDate)} to {formatDate(history.newDate)}
                        {history.reason && <span> - {history.reason}</span>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Consultation Details */}
                {appointment.status === 'completed' && (appointment.consultationNotes || appointment.prescription) && (
                  <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-100">
                    <h4 className="text-sm font-semibold text-green-900 mb-2">Consultation Summary</h4>
                    {appointment.consultationNotes && (
                      <div className="text-sm text-green-700 mb-2">
                        <strong>Notes:</strong> {appointment.consultationNotes}
                      </div>
                    )}
                    {appointment.prescription && (
                      <div className="text-sm text-green-700">
                        <strong>Prescription:</strong> {appointment.prescription}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-2">
                  {canReschedule(appointment) && (
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowRescheduleModal(true);
                        setRescheduleDate(getTomorrowDate());
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold shadow"
                    >
                      <RefreshCw size={16} />
                      Reschedule
                    </button>
                  )}
                  
                  {canCancel(appointment) && (
                    <button
                      onClick={() => {
                        const reason = prompt('Please provide a reason for cancellation:');
                        if (reason) {
                          cancelAppointment(appointment._id, reason);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow"
                    >
                      <Trash2 size={16} />
                      Cancel
                    </button>
                  )}

                  {appointment.paymentStatus === 'pending' && (
                    <button
                      onClick={() => showNotification('info', 'Payment gateway integration needed')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold shadow"
                    >
                      <DollarSign size={16} />
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Reschedule Modal */}
        {showRescheduleModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-2 md:p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-blue-700">Reschedule Appointment</h2>
                  <button
                    onClick={() => {
                      setShowRescheduleModal(false);
                      resetRescheduleForm();
                    }}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <X size={28} />
                  </button>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-gray-700">Current Appointment</h3>
                  <div className="bg-blue-50 p-4 rounded-xl text-sm border border-blue-100">
                    <p><strong>Doctor:</strong> {selectedAppointment.doctorId.name}</p>
                    <p><strong>Current Date:</strong> {formatDate(selectedAppointment.appointmentDate)}</p>
                    <p><strong>Current Time:</strong> {formatTime(selectedAppointment.timeSlot.start)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Date</label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    min={getTomorrowDate()}
                    onChange={(e) => {
                      setRescheduleDate(e.target.value);
                      if (e.target.value) {
                        fetchAvailableSlotsForReschedule(selectedAppointment.doctorId._id, e.target.value);
                      }
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {rescheduleDate && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Available Time Slots</label>
                    {loading ? (
                      <div className="text-center py-4 text-blue-600">Loading slots...</div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-center py-4 text-gray-400">No available slots for this date</div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availableSlots.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedRescheduleSlot(slot)}
                            className={`p-3 text-center rounded-lg border font-semibold transition ${
                              selectedRescheduleSlot === slot
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-gray-50 hover:bg-blue-50 border-gray-300 text-blue-700'
                            }`}
                          >
                            <div className="text-sm">{formatTime(slot.start)}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Rescheduling *</label>
                  <textarea
                    value={rescheduleReason}
                    onChange={(e) => setRescheduleReason(e.target.value)}
                    placeholder="Please provide a reason for rescheduling..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowRescheduleModal(false);
                      resetRescheduleForm();
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={rescheduleAppointment}
                    disabled={!selectedRescheduleSlot || !rescheduleReason || loading}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                  >
                    {loading ? 'Rescheduling...' : 'Reschedule Appointment'}
                  </button>
                </div>
              </div>
            </div>
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

export default UserAppointments;