import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Modal, FlatList, RefreshControl, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Member {
  _id: string;
  fullname?: string;
  contact?: string;
  member: boolean;
  birthDay?: number;
  birthMonth?: number;
}

const BroadcastScreen = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [segments, setSegments] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Theme styles
  const themeStyles = {
    container: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    card: theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    input: theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900',
    buttonPrimary: theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500',
    buttonSecondary: theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500',
    checkbox: theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300',
    checkboxSelected: 'bg-blue-500 border-blue-500',
  };

  const fetchMembers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://192.168.154.105:3000/api/membership/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        const filtered = data.filter((user: Member) => user.member === true);
        setMembers(filtered);
        setFilteredMembers(filtered);
      } else {
        Toast.show({
          type: 'error',
          text1: data.message || 'Failed to fetch members',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Network error. Please try again.',
      });
      console.error('Error fetching members:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    const count = message.length;
    setCharacterCount(count);
    setSegments(Math.ceil(count / 160));
  }, [message]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMembers(members);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = members.filter(member => 
        member.fullname?.toLowerCase().includes(term) || 
        member.contact?.includes(term)
      );
      setFilteredMembers(filtered);
      
      // Remove selected IDs that are no longer visible
      setSelectedIds(prev => prev.filter(id => 
        filtered.some(member => member._id === id)
      ));
    }
  }, [searchTerm, members]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredMembers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMembers.map(member => member._id));
    }
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setScheduleTime(selectedDate);
    }
  };

  console.log(process.env.EXPO_PUBLIC_ARKESEL_API_KEY)

  const sendInstantMessage = async () => {
    if (!message.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a message',
      });
      return;
    }
    if (selectedIds.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please select at least one recipient',
      });
      return;
    }

    const selectedMembers = members.filter(user => selectedIds.includes(user._id));
    const validRecipients = selectedMembers
      .filter(user => user.contact)
      .map(user => user.contact) as string[];

    if (validRecipients.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'No valid phone numbers found for selected members!',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://sms.arkesel.com/api/v2/sms/send', {
        method: 'POST',
        headers: {
          'api-key': "S1JQWnlSQkR2YlN4WW5iaEdQUU0",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'FOGA_PEDU',
          message,
          recipients: validRecipients
        }),
      });

      const result = await response.json();
      console.log('Broadcast result:', result);
      if (result.status === 'success') {
        Toast.show({
          type: 'success',
          text1: `Message sent to ${validRecipients.length} recipients!`,
        });
        setMessage('');
        setSelectedIds([]);
      } else {
        throw new Error(result.message || 'Broadcast failed');
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to send message',
        text2: err instanceof Error ? err.message : 'Unknown error',
      });
      console.error('Error sending broadcast:', err);
    } finally {
      setLoading(false);
    }
  };

  const scheduleMessage = async () => {
    if (!message.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a message',
      });
      return;
    }
    if (selectedIds.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please select at least one recipient',
      });
      return;
    }

    const selectedMembers = members.filter(user => selectedIds.includes(user._id));
    
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/broadcast/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          recipients: selectedMembers.map(m => ({ id: m._id, contact: m.contact })),
          scheduledTime: scheduleTime.toISOString()
        }),
      });

      const result = await res.json();

      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: `Scheduled ${selectedMembers.length} messages!`,
        });
        setMessage('');
        setSelectedIds([]);
      } else {
        throw new Error(result.message || 'Failed to schedule messages');
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to schedule messages',
        text2: err instanceof Error ? err.message : 'Unknown error',
      });
      console.error('Error scheduling messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMembers();
  };

  const renderItem = ({ item }: { item: Member }) => {
    const isSelected = selectedIds.includes(item._id);
    return (
      <TouchableOpacity 
        className={`p-4 border-b ${themeStyles.border} flex-row items-center`}
        onPress={() => toggleSelect(item._id)}
        activeOpacity={0.7}
      >
        <View className={`w-6 h-6 rounded-md border-2 ${
          isSelected ? themeStyles.checkboxSelected : themeStyles.checkbox
        } mr-3 items-center justify-center`}>
          {isSelected && (
            <MaterialIcons name="check" size={16} color="white" />
          )}
        </View>
        <View className="flex-1">
          <Text className={`font-medium ${themeStyles.textPrimary}`}>
            {item.fullname}
            {item.birthDay && item.birthMonth && (
              <Text className={`ml-2 text-xs px-2 py-1 ${themeStyles.textSecondary} rounded-full`}>
                🎂 {item.birthDay}/{item.birthMonth}
              </Text>
            )}
          </Text>
          <Text className={`text-sm ${themeStyles.textSecondary} mt-1`}>{item.contact}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderIOSPickerModal = () => {
    if (Platform.OS !== 'ios' || !showDatePicker) return null;
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className={`p-4 rounded-t-lg ${themeStyles.card}`}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className={`text-lg font-semibold ${themeStyles.textPrimary}`}>
                Select Date and Time
              </Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text className="text-blue-500">Done</Text>
              </TouchableOpacity>
            </View>
            
            <DateTimePicker
              value={scheduleTime}
              mode="datetime"
              display="spinner"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View className={`flex-1 ${themeStyles.container} p-4`}>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme === 'dark' ? '#ffffff' : '#000000']}
            tintColor={theme === 'dark' ? '#ffffff' : '#000000'}
          />
        }
      >
        <Text className={`text-2xl font-bold mb-6 ${themeStyles.textPrimary}`}>Broadcast Messages</Text>
        
        {/* Message Input */}
        <View className={`rounded-lg p-4 mb-4 ${themeStyles.card}`}>
          <Text className={`text-sm font-medium mb-2 ${themeStyles.textPrimary}`}>Message Content</Text>
          <TextInput
            className={`w-full p-4 ${themeStyles.input} rounded-lg border ${themeStyles.border} h-32`}
            multiline
            placeholder="Type your message here (160 characters per SMS segment)..."
            placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
            value={message}
            onChangeText={setMessage}
            maxLength={320}
          />
          <Text className={`text-xs mt-2 ${themeStyles.textSecondary}`}>
            {characterCount}/160 characters • {segments} SMS segment{segments !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Schedule Time */}
        <View className={`rounded-lg p-4 mb-4 ${themeStyles.card}`}>
          <Text className={`text-sm font-medium mb-2 ${themeStyles.textPrimary}`}>Schedule Time</Text>
          <TouchableOpacity 
            className={`p-3 ${themeStyles.input} rounded-lg border ${themeStyles.border} flex-row justify-between items-center`}
            onPress={showPicker}
            activeOpacity={0.7}
          >
            <Text className={themeStyles.textPrimary}>
              {scheduleTime.toLocaleString()}
            </Text>
            <MaterialIcons 
              name="date-range" 
              size={20} 
              color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
            />
          </TouchableOpacity>
          {renderIOSPickerModal()}
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            className={`flex-1 mr-2 p-3 ${themeStyles.buttonSecondary} rounded-lg items-center justify-center`}
            onPress={scheduleMessage}
            disabled={loading || selectedIds.length === 0}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-medium">Schedule</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 ml-2 p-3 ${themeStyles.buttonPrimary} rounded-lg items-center justify-center`}
            onPress={sendInstantMessage}
            disabled={loading || selectedIds.length === 0}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-medium">Send Now</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Recipient Selection */}
        <View className={`rounded-lg p-4 ${themeStyles.card}`}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-lg font-semibold ${themeStyles.textPrimary}`}>Select Recipients</Text>
            <TouchableOpacity onPress={selectAll} activeOpacity={0.7}>
              <Text className={`text-sm ${themeStyles.textSecondary}`}>
                {selectedIds.length === filteredMembers.length ? 'Deselect All' : 'Select All'}
              </Text>
            </TouchableOpacity>
          </View>

          <View className={`mb-4 ${themeStyles.input} rounded-lg border ${themeStyles.border} flex-row items-center px-3`}>
            <AntDesign 
              name="search1" 
              size={16} 
              color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
            />
            <TextInput
              className={`flex-1 p-3 ${themeStyles.textPrimary}`}
              placeholder="Search by name or phone..."
              placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {filteredMembers.length === 0 ? (
            <View className="p-4 items-center justify-center">
              <Text className={themeStyles.textSecondary}>
                {members.length === 0 ? 'No members found' : 'No matching members found'}
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredMembers}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
              nestedScrollEnabled
              extraData={selectedIds}
            />
          )}

          <Text className={`text-xs mt-2 ${themeStyles.textSecondary}`}>
            Showing: {filteredMembers.length} of {members.length} members • Selected: {selectedIds.length}
          </Text>
        </View>
      </ScrollView>

      <Toast />
    </View>
  );
};

export default BroadcastScreen;