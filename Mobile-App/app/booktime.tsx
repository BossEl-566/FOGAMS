import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

type TimeSlot = {
  _id: string;
  startTime: string;
  endTime: string;
  bookedBy: Array<{ userId: string; username: string }>;
};

type AvailableSlot = {
  _id: string;
  date: string;
  timeSlots: TimeSlot[];
};

type Booking = {
  _id: string;
  availableSlots: AvailableSlot[];
};

const BookTimeScreen = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([{ start: '', end: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [viewingBookedMembers, setViewingBookedMembers] = useState<{username: string}[] | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{slotId: string, bookingId: string} | null>(null);

  const getThemeColors = () => {
    return {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      input: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
      button: theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600',
      danger: theme === 'dark' ? 'bg-red-700' : 'bg-red-600',
      border: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',
      accent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    };
  };

  const colors = getThemeColors();

  const fetchBookings = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/book/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setBookings(data);
      } else {
        throw new Error(data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: '', end: '' }]);
  };

  const handleTimeChange = (index: number, field: string, value: string) => {
    const newSlots = [...timeSlots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setTimeSlots(newSlots);
  };

  const handleRemoveTimeSlot = (index: number) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (!date) {
      Alert.alert('Validation Error', 'Please select a date');
      return;
    }

    for (const slot of timeSlots) {
      if (!slot.start || !slot.end) {
        Alert.alert('Validation Error', 'Please fill all time slots');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/book/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

      Alert.alert('Success', 'Availability saved successfully!');
      setDate('');
      setTimeSlots([{ start: '', end: '' }]);
      fetchBookings();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to save availability');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookingConfirmation = (slotId: string, bookingId: string) => {
    setSelectedSlot({ slotId, bookingId });
    setShowConfirmationModal(true);
  };

  const handleBookSlot = async () => {
    if (!selectedSlot) return;
    
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `http://${process.env.EXPO_PUBLIC_IP}/api/book/book-appointment/${selectedSlot.bookingId}/${selectedSlot.slotId}`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: currentUser._id,
            username: currentUser.username
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book appointment');
      }

      Alert.alert('Success', 'Appointment booked successfully!');
      fetchBookings();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to book appointment');
    } finally {
      setIsLoading(false);
      setShowConfirmationModal(false);
      setSelectedSlot(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const fetchBookedMembers = async (slotId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/book/get-names/${slotId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch booked members');
      const data = await response.json();
      setViewingBookedMembers(data);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to fetch booked members');
      setViewingBookedMembers(null);
    }
  };

  const handleDeleteSlot = async (slotId: string, bookingId: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this time slot?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              setIsLoading(true);
              const token = await AsyncStorage.getItem('token');
              const response = await fetch(
                `http://${process.env.EXPO_PUBLIC_IP}/api/book/delete/${bookingId}/${slotId}`, 
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete time slot');
              }

              Alert.alert('Success', 'Time slot deleted successfully!');
              fetchBookings();
            } catch (error) {
              Alert.alert('Error', error instanceof Error ? error.message : 'Failed to delete time slot');
            } finally {
              setIsLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const availableSlots = bookings.flatMap(booking => 
    booking.availableSlots.flatMap(slot => 
      slot.timeSlots.map(timeSlot => ({
        ...timeSlot,
        date: slot.date,
        bookingId: booking._id
      }))
    )
  );

  const filteredSlots = selectedDateFilter 
    ? availableSlots.filter(slot => slot.date === selectedDateFilter)
    : availableSlots;

  if (currentUser.isPastor) {
    return (
      <View className={`flex-1 ${colors.background} p-4`}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text className={`text-2xl font-bold ${colors.text} mb-6`}>Create Available Time Slots</Text>
          
          <View className={`${colors.card} rounded-xl p-4 mb-6`}>
            <Text className={`text-sm font-medium ${colors.text} mb-2`}>Select Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className={`${colors.input} p-3 rounded-lg mb-4`}
            >
              <Text className={colors.text}>{date || 'Select a date'}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date ? new Date(date) : new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDate(selectedDate.toISOString().split('T')[0]);
                  }
                }}
                minimumDate={new Date()}
              />
            )}

            <Text className={`text-sm font-medium ${colors.text} mb-2`}>Available Time Slots</Text>
            
            {timeSlots.map((slot, index) => (
              <View key={index} className="flex-row items-center mb-3">
                <View className="flex-1 flex-row gap-2">
                  <TextInput
                    placeholder="HH:MM"
                    placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                    value={slot.start}
                    onChangeText={(text) => handleTimeChange(index, 'start', text)}
                    className={`${colors.input} flex-1 p-2 rounded-md ${colors.text}`}
                    keyboardType="numbers-and-punctuation"
                  />
                  <TextInput
                    placeholder="HH:MM"
                    placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                    value={slot.end}
                    onChangeText={(text) => handleTimeChange(index, 'end', text)}
                    className={`${colors.input} flex-1 p-2 rounded-md ${colors.text}`}
                    keyboardType="numbers-and-punctuation"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveTimeSlot(index)}
                  className="p-2 ml-2"
                  disabled={timeSlots.length <= 1}
                >
                  <AntDesign
                    name="delete"
                    size={20}
                    color={timeSlots.length <= 1 ? (theme === 'dark' ? '#4b5563' : '#d1d5db') : (theme === 'dark' ? '#ef4444' : '#dc2626')}
                  />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              onPress={handleAddTimeSlot}
              className="flex-row items-center mt-2 mb-4"
            >
              <AntDesign
                name="pluscircleo"
                size={16}
                color={theme === 'dark' ? '#3b82f6' : '#2563eb'}
                style={{ marginRight: 8 }}
              />
              <Text className={`${colors.accent} text-sm`}>Add another time slot</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`${colors.button} p-3 rounded-lg items-center`}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-medium">Save Availability</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text className={`text-xl font-bold ${colors.text} mb-4`}>Your Availability</Text>
          
          {isLoading ? (
            <ActivityIndicator size="large" color={theme === 'dark' ? '#3b82f6' : '#2563eb'} />
          ) : availableSlots.length === 0 ? (
            <Text className={`${colors.secondaryText} text-center py-4`}>No availability created yet</Text>
          ) : (
            <View className="mb-6">
              {bookings.map((booking) => (
                booking.availableSlots.map((slot) => (
                  <View key={slot._id} className={`${colors.card} rounded-xl p-4 mb-4`}>
                    <Text className={`font-medium text-lg ${colors.text} mb-2`}>
                      {formatDate(slot.date)}
                    </Text>
                    <View className="gap-2">
                      {slot.timeSlots.map((timeSlot) => {
                        const userBooked = timeSlot.bookedBy.some(b => b.userId === currentUser._id);
                        const isBooked = timeSlot.bookedBy.length > 0;
                        
                        return (
                          <View key={timeSlot._id} className={`${colors.input} rounded-lg p-3`}>
                            <View className="flex-row justify-between items-center">
                              <Text className={`font-medium ${colors.text}`}>
                                {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
                              </Text>
                              <View className="flex-row items-center gap-2">
                                <Text className={`text-xs ${colors.secondaryText}`}>
                                  {timeSlot.bookedBy.length} booked
                                </Text>
                                {timeSlot.bookedBy.length > 0 && (
                                  <TouchableOpacity
                                    onPress={() => fetchBookedMembers(timeSlot._id)}
                                  >
                                    <Text className={`text-xs ${colors.accent}`}>View</Text>
                                  </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                  onPress={() => handleDeleteSlot(timeSlot._id, booking._id)}
                                  disabled={isLoading}
                                >
                                  <AntDesign
                                    name="delete"
                                    size={16}
                                    color={theme === 'dark' ? '#ef4444' : '#dc2626'}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ))
              ))}
            </View>
          )}
        </ScrollView>

        <Modal
          visible={viewingBookedMembers !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setViewingBookedMembers(null)}
        >
          <View className="flex-1 justify-center items-center bg-black/50 p-4">
            <View className={`${colors.card} rounded-xl p-4 w-full max-w-sm`}>
              <View className="flex-row justify-between items-center mb-3">
                <Text className={`text-lg font-bold ${colors.text}`}>Booked Members</Text>
                <TouchableOpacity onPress={() => setViewingBookedMembers(null)}>
                  <Feather
                    name="x"
                    size={24}
                    color={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                  />
                </TouchableOpacity>
              </View>
              
              <ScrollView className="max-h-64">
                {viewingBookedMembers && viewingBookedMembers.length > 0 ? (
                  <View className="gap-2">
                    {viewingBookedMembers.map((member, index) => (
                      <View key={index} className={`${colors.input} p-3 rounded-lg`}>
                        <Text className={colors.text}>{member.username}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className={`${colors.secondaryText} text-center py-4`}>No members booked yet</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Member view
  return (
    <View className={`flex-1 ${colors.background} p-4`}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text className={`text-2xl font-bold ${colors.text} mb-4`}>Pastor's Availability</Text>
        
        <View className="mb-4">
          <Text className={`text-sm font-medium ${colors.text} mb-2`}>Filter by Date</Text>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className={`${colors.input} flex-1 p-3 rounded-lg`}
            >
              <Text className={colors.text}>{selectedDateFilter || 'Select a date to filter'}</Text>
            </TouchableOpacity>
            {selectedDateFilter && (
              <TouchableOpacity
                onPress={() => setSelectedDateFilter('')}
                className={`p-3 ${colors.input} rounded-lg`}
              >
                <Feather name="x" size={16} color={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateFilter ? new Date(selectedDateFilter) : new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setSelectedDateFilter(selectedDate.toISOString().split('T')[0]);
              }
            }}
          />
        )}

        {isLoading ? (
          <ActivityIndicator size="large" color={theme === 'dark' ? '#3b82f6' : '#2563eb'} />
        ) : filteredSlots.length === 0 ? (
          <View className={`${colors.card} p-6 rounded-xl items-center justify-center`}>
            <MaterialIcons 
              name="schedule" 
              size={40} 
              color={theme === 'dark' ? '#6b7280' : '#9ca3af'} 
              style={{ marginBottom: 16 }}
            />
            <Text className={`${colors.text} text-center mb-1`}>
              {selectedDateFilter ? 'No available slots' : 'No available slots found'}
            </Text>
            <Text className={`${colors.secondaryText} text-center`}>
              {selectedDateFilter ? 'for selected date' : 'Check back later'}
            </Text>
          </View>
        ) : (
          <View className="gap-4">
            {bookings.map((booking) => (
              booking.availableSlots
                .filter(slot => 
                  selectedDateFilter ? slot.date === selectedDateFilter : true
                )
                .map((slot) => (
                  <View key={slot._id} className={`${colors.card} rounded-xl overflow-hidden`}>
                    <View className={`${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'} p-3`}>
                      <Text className={`font-semibold ${colors.text}`}>
                        {formatDate(slot.date)}
                      </Text>
                    </View>
                    <View className="p-3 gap-2">
                      {slot.timeSlots.map((timeSlot) => {
                        const userBooked = timeSlot.bookedBy.some(b => b.userId === currentUser._id);
                        const isBooked = timeSlot.bookedBy.length > 0;
                        
                        return (
                          <View key={timeSlot._id} className={`${colors.input} rounded-lg p-3`}>
                            <View className="flex-row justify-between items-start mb-2">
                              <Text className={`font-medium ${colors.text}`}>
                                {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
                              </Text>
                              {userBooked && (
                                <View className={`${theme === 'dark' ? 'bg-green-900' : 'bg-green-100'} px-2 py-1 rounded-full`}>
                                  <Text className={`text-xs ${theme === 'dark' ? 'text-green-200' : 'text-green-800'}`}>
                                    You're booked
                                  </Text>
                                </View>
                              )}
                              {isBooked && !userBooked && (
                                <View className={`${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'} px-2 py-1 rounded-full`}>
                                  <Text className={`text-xs ${theme === 'dark' ? 'text-red-200' : 'text-red-800'}`}>
                                    Booked
                                  </Text>
                                </View>
                              )}
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                if (!isBooked) {
                                  handleBookingConfirmation(timeSlot._id, booking._id);
                                }
                              }}
                              disabled={isBooked || isLoading}
                              className={`${
                                userBooked 
                                  ? 'bg-gray-400' 
                                  : isBooked 
                                    ? 'bg-gray-400' 
                                    : colors.button
                              } p-2 rounded-md`}
                            >
                              <Text className="text-white text-center font-medium">
                                {userBooked 
                                  ? 'You booked this' 
                                  : isBooked 
                                    ? 'Already booked' 
                                    : 'Book Appointment'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ))
            ))}
          </View>
        )}
      </ScrollView>

      {/* Booking Confirmation Modal */}
      <Modal
        visible={showConfirmationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmationModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className={`${colors.card} rounded-xl p-4 w-full max-w-sm`}>
            <Text className={`text-lg font-bold ${colors.text} mb-2`}>Confirm Booking</Text>
            <Text className={`${colors.secondaryText} mb-4`}>
              Are you sure you want to book this appointment? This cannot be undone.
            </Text>
            
            <View className="flex-row justify-end gap-2">
              <TouchableOpacity
                onPress={() => setShowConfirmationModal(false)}
                className={`px-4 py-2 ${colors.input} rounded-lg`}
              >
                <Text className={colors.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBookSlot}
                disabled={isLoading}
                className={`px-4 py-2 ${colors.button} rounded-lg`}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-medium">Confirm</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookTimeScreen;