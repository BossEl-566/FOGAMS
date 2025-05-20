import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function DashBooking() {
    const { currentUser } = useSelector((state) => state.user);
    const [date, setDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([{ start: '', end: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDateFilter, setSelectedDateFilter] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [viewingBookedMembers, setViewingBookedMembers] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

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
        } finally {
            setIsLoading(false);
            setShowConfirmationModal(false);
            setSelectedSlot(null);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
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
        } finally {
            setIsLoading(false);
        }
    };

    if (currentUser.isPastor) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 w-full">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                            Create Available Time Slots
                        </h1>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Available Time Slots
                                </label>
                                
                                {timeSlots.map((slot, index) => (
                                    <div key={index} className="flex items-center gap-3 mb-3">
                                        <div className="flex-1 grid grid-cols-2 gap-3">
                                            <div>
                                                <input
                                                    type="time"
                                                    value={slot.start}
                                                    onChange={(e) => handleTimeChange(index, 'start', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="time"
                                                    value={slot.end}
                                                    onChange={(e) => handleTimeChange(index, 'end', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTimeSlot(index)}
                                            className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                            disabled={timeSlots.length <= 1}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={handleAddTimeSlot}
                                    className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add another time slot
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Availability'}
                            </button>
                        </form>
                    </div>

                    
                    {/* Pastor's view of all availability */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your Availability</h2>
                        {availableSlots.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-400">No availability created yet</p>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    booking.availableSlots.map((slot) => (
                                        <div key={slot._id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium text-lg text-gray-800 dark:text-white">
                                                    {formatDate(slot.date)}
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                                {slot.timeSlots.map((timeSlot) => (
                                                    <div key={timeSlot._id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-gray-800 dark:text-white">
                                                                {timeSlot.startTime} - {timeSlot.endTime}
                                                            </span>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                                                    {timeSlot.bookedBy.length} booked
                                                                </span>
                                                                {timeSlot.bookedBy.length > 0 && (
                                                                    <button
                                                                        onClick={() => fetchBookedMembers(timeSlot._id)}
                                                                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                                                    >
                                                                        View names
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => handleDeleteSlot(timeSlot._id, booking._id)}
                                                                    disabled={isLoading}
                                                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm flex items-center gap-1"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Booked Members Modal */}
                    {viewingBookedMembers && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                        Booked Members
                                    </h3>
                                    <button
                                        onClick={() => setViewingBookedMembers(null)}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="space-y-2">
                                    {viewingBookedMembers.length > 0 ? (
                                        viewingBookedMembers.map((member, index) => (
                                            <div key={index} className="flex items-center gap-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                                <span className="font-medium text-gray-800 dark:text-white">
                                                    {member.username}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-600 dark:text-gray-400">No members booked yet</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Member view
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 w-full">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Pastor's Availability</h1>
                    
                    {/* Date filter */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Filter by Date
                        </label>
                        <input
                            type="date"
                            value={selectedDateFilter}
                            onChange={(e) => setSelectedDateFilter(e.target.value)}
                            className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredSlots.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                            No available time slots found
                        </p>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map((booking) => (
                                booking.availableSlots
                                    .filter(slot => 
                                        selectedDateFilter ? slot.date === selectedDateFilter : true
                                    )
                                    .map((slot) => (
                                        <div key={slot._id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                            <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                                <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                                                    {formatDate(slot.date)}
                                                </h2>
                                            </div>
                                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {slot.timeSlots.map((timeSlot) => (
                                                    <div key={timeSlot._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="font-medium text-gray-800 dark:text-white">
                                                                {timeSlot.startTime} - {timeSlot.endTime}
                                                            </span>
                                                            {timeSlot.bookedBy.length > 0 ? (
                                                                timeSlot.bookedBy.some(booking => booking.userId === currentUser._id) ? (
                                                                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                                                                        You're booked
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">
                                                                        Booked
                                                                    </span>
                                                                )
                                                            ) : null}
                                                        </div>
                                                        <button
                                                            onClick={() => handleBookingConfirmation(timeSlot._id, booking)}
                                                            disabled={timeSlot.bookedBy.length > 0 || isLoading}
                                                            className={`mt-auto w-full py-2 px-4 text-white text-sm font-medium rounded-md transition-colors duration-200 ${
                                                                timeSlot.bookedBy.length > 0 
                                                                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                                                                    : 'bg-blue-600 hover:bg-blue-700'
                                                            }`}
                                                        >
                                                            {timeSlot.bookedBy.length > 0 
                                                                ? (timeSlot.bookedBy.some(b => b.userId === currentUser._id) 
                                                                        ? 'You booked this' 
                                                                        : 'Already booked')
                                                                : 'Book Appointment'}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Confirmation Modal */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                Confirm Booking
                            </h3>
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Are you sure you want to book this appointment? This action cannot be undone.
                        </p>
                        
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBookSlot}
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}