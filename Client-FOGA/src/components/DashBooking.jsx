import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiPlus, FiTrash2, FiUsers, FiX, FiCheck, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function DashBooking() {
    const { currentUser } = useSelector((state) => state.user);
    const [date, setDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([{ start: '', end: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDateFilter, setSelectedDateFilter] = useState('');
    const [viewingBookedMembers, setViewingBookedMembers] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [expandedDates, setExpandedDates] = useState(new Set());

    // Fetch available slots on component mount
    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await fetch('/api/book/get');
                if (!response.ok) throw new Error('Failed to fetch availability');
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                toast.error(error.message);
                setBookings([]);
                console.error(error);
                window.location.href = '/re-authenticate';
            } finally {
                setIsLoading(false);
            }
        };
        fetchAvailability();
    }, []);

    // Get all available slots from all bookings
    const availableSlots = bookings.flatMap(booking => booking.availableSlots || []);

    // Filter available slots by date with null checks
    const filteredSlots = availableSlots.filter(slot => 
        selectedDateFilter ? slot?.date === selectedDateFilter : true
    );

    const handleAddTimeSlot = () => {
        setTimeSlots([...timeSlots, { start: '', end: '' }]);
    };

    const handleTimeChange = (index, field, value) => {
        const newSlots = [...timeSlots];
        newSlots[index][field] = value;
        setTimeSlots(newSlots);
    };

    const handleRemoveTimeSlot = (index) => {
        if (timeSlots.length > 1) {
            setTimeSlots(timeSlots.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!date) {
            toast.error('Please select a date');
            setIsSubmitting(false);
            return;
        }

        for (const slot of timeSlots) {
            if (!slot.start || !slot.end) {
                toast.error('Please fill all time slots');
                setIsSubmitting(false);
                return;
            }
        }

        try {
            const response = await fetch('/api/book/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date,
                    timeSlots: timeSlots.map(slot => ({
                        startTime: slot.start,
                        endTime: slot.end
                    }))
                }),
            });

            if (!response.ok) throw new Error('Failed to create booking slots');

            toast.success('Availability saved successfully!');
            setDate('');
            setTimeSlots([{ start: '', end: '' }]);
            // Refresh the availability list
            const refreshResponse = await fetch('/api/book/get');
            if (refreshResponse.ok) {
                setBookings(await refreshResponse.json());
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            window.location.href = '/re-authenticate';
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBookingConfirmation = (slotId, booking) => {
        setSelectedSlot({ slotId, booking });
        setShowConfirmationModal(true);
    };

    const handleBookSlot = async () => {
        if (!selectedSlot) return;
        
        try {
            setIsLoading(true);
            const response = await fetch(`/api/book/book-appointment/${selectedSlot.booking._id}/${selectedSlot.slotId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    username: currentUser.username
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to book appointment');
            }

            toast.success('Appointment booked successfully!');
            // Refresh availability
            const refreshResponse = await fetch('/api/book/get');
            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                setBookings(data);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
            window.location.href = '/re-authenticate';
        } finally {
            setIsLoading(false);
            setShowConfirmationModal(false);
            setSelectedSlot(null);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatDateFull = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const fetchBookedMembers = async (slotId) => {
        try {
            const response = await fetch(`/api/book/get-names/${slotId}`);
            if (!response.ok) throw new Error('Failed to fetch booked members');
            const data = await response.json();
            setViewingBookedMembers(data);
        } catch (error) {
            toast.error(error.message);
            setViewingBookedMembers(null);
        }
    };

    const handleDeleteSlot = async (slotId, bookingId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/book/delete/${bookingId}/${slotId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete time slot');
            }

            toast.success('Time slot deleted successfully!');
            // Refresh the availability list
            const refreshResponse = await fetch('/api/book/get');
            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                setBookings(data);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
            window.location.href = '/re-authenticate';
        } finally {
            setIsLoading(false);
        }
    };

    const toggleDateExpansion = (dateId) => {
        const newExpanded = new Set(expandedDates);
        if (newExpanded.has(dateId)) {
            newExpanded.delete(dateId);
        } else {
            newExpanded.add(dateId);
        }
        setExpandedDates(newExpanded);
    };

    // Pastor View
    if (currentUser.isPastor) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <FiCalendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Booking Management
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Manage your availability
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-6 space-y-6">
                    {/* Create Availability Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center space-x-2 mb-6">
                            <FiPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Create Availability
                            </h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>

                            {/* Time Slots */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Time Slots
                                </label>
                                
                                <div className="space-y-3">
                                    {timeSlots.map((slot, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <div className="flex-1 grid grid-cols-2 gap-3">
                                                <div>
                                                    <input
                                                        type="time"
                                                        value={slot.start}
                                                        onChange={(e) => handleTimeChange(index, 'start', e.target.value)}
                                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="time"
                                                        value={slot.end}
                                                        onChange={(e) => handleTimeChange(index, 'end', e.target.value)}
                                                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTimeSlot(index)}
                                                className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-30"
                                                disabled={timeSlots.length <= 1}
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleAddTimeSlot}
                                    className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    <FiPlus className="w-4 h-4 mr-1" />
                                    Add another time slot
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiCheck className="w-4 h-4" />
                                        <span>Save Availability</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Availability List */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                                <FiClock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Your Availability
                                </h2>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {availableSlots.length} total slots
                            </span>
                        </div>

                        {isLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((n) => (
                                    <div key={n} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : availableSlots.length === 0 ? (
                            <div className="text-center py-8">
                                <FiCalendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">
                                    No availability created
                                </h3>
                                <p className="text-gray-400 dark:text-gray-500 text-sm">
                                    Create your first availability above
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    booking.availableSlots.map((slot) => (
                                        <div key={slot._id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => toggleDateExpansion(slot._id)}
                                                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 flex items-center justify-between text-left"
                                            >
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 dark:text-white">
                                                        {formatDateFull(slot.date)}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        {slot.timeSlots.length} time slot{slot.timeSlots.length !== 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                                {expandedDates.has(slot._id) ? (
                                                    <FiChevronUp className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                                                )}
                                            </button>
                                            
                                            {expandedDates.has(slot._id) && (
                                                <div className="p-4 bg-white dark:bg-gray-800 space-y-3">
                                                    {slot.timeSlots.map((timeSlot) => (
                                                        <div key={timeSlot._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                            <div className="flex-1">
                                                                <div className="flex items-center space-x-3">
                                                                    <span className="font-medium text-gray-800 dark:text-white">
                                                                        {timeSlot.startTime} - {timeSlot.endTime}
                                                                    </span>
                                                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                                                        timeSlot.bookedBy.length > 0 
                                                                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                                                            : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                                                                    }`}>
                                                                        {timeSlot.bookedBy.length} booked
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                {timeSlot.bookedBy.length > 0 && (
                                                                    <button
                                                                        onClick={() => fetchBookedMembers(timeSlot._id)}
                                                                        className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                                    >
                                                                        <FiUsers className="w-4 h-4" />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => handleDeleteSlot(timeSlot._id, booking._id)}
                                                                    disabled={isLoading}
                                                                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                                                >
                                                                    <FiTrash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Booked Members Modal */}
                {viewingBookedMembers && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Booked Members
                                </h3>
                                <button
                                    onClick={() => setViewingBookedMembers(null)}
                                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {viewingBookedMembers.length > 0 ? (
                                    viewingBookedMembers.map((member, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <FiUser className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <span className="font-medium text-gray-800 dark:text-white text-sm">
                                                {member.username}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400 text-center py-4">No members booked yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Member View
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <FiCalendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                                Book Appointment
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Schedule time with pastor
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Date Filter */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Filter by Date
                    </label>
                    <input
                        type="date"
                        value={selectedDateFilter}
                        onChange={(e) => setSelectedDateFilter(e.target.value)}
                        className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    {selectedDateFilter && (
                        <button
                            onClick={() => setSelectedDateFilter('')}
                            className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Clear filter
                        </button>
                    )}
                </div>

                {/* Available Slots */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl p-6">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : filteredSlots.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center">
                            <FiCalendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">
                                No available slots
                            </h3>
                            <p className="text-gray-400 dark:text-gray-500 text-sm">
                                {selectedDateFilter ? 'No slots available for selected date' : 'No available time slots'}
                            </p>
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            booking.availableSlots
                                .filter(slot => selectedDateFilter ? slot.date === selectedDateFilter : true)
                                .map((slot) => (
                                    <div key={slot._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                                            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                                                {formatDateFull(slot.date)}
                                            </h2>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            {slot.timeSlots.map((timeSlot) => {
                                                const isBookedByUser = timeSlot.bookedBy.some(b => b.userId === currentUser._id);
                                                const isFullyBooked = timeSlot.bookedBy.length > 0 && !isBookedByUser;
                                                
                                                return (
                                                    <div key={timeSlot._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-2">
                                                                <FiClock className="w-4 h-4 text-gray-400" />
                                                                <span className="font-medium text-gray-800 dark:text-white">
                                                                    {timeSlot.startTime} - {timeSlot.endTime}
                                                                </span>
                                                            </div>
                                                            {isBookedByUser && (
                                                                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                                                                    You're booked
                                                                </span>
                                                            )}
                                                            {isFullyBooked && (
                                                                <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">
                                                                    Already booked
                                                                </span>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => handleBookingConfirmation(timeSlot._id, booking)}
                                                            disabled={isFullyBooked || isBookedByUser || isLoading}
                                                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                                                isFullyBooked || isBookedByUser
                                                                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                            }`}
                                                        >
                                                            {isBookedByUser ? 'Booked' : isFullyBooked ? 'Full' : 'Book'}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))
                        ))
                    )}
                </div>
            </div>

            {/* Booking Confirmation Modal */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Confirm Booking
                            </h3>
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                            Are you sure you want to book this appointment? This action cannot be undone.
                        </p>
                        
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBookSlot}
                                disabled={isLoading}
                                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Booking...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiCheck className="w-4 h-4" />
                                        <span>Confirm</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}