import { View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Text, Alert, Switch } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

const AnonymousMessageScreen = () => {
  const { theme, currentUser } = useSelector((state: any) => ({
    theme: state.theme.theme,
    currentUser: state.user.currentUser
  }));
  const [message, setMessage] = useState('');
  const [showUsername, setShowUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getThemeColors = () => {
    return {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      input: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
      placeholder: theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500',
      button: theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600',
      buttonText: 'text-white',
      border: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',
      switchTrack: theme === 'dark' ? '#4b5563' : '#d1d5db',
      switchThumb: theme === 'dark' ? '#1e40af' : '#2563eb',
    };
  };

  const colors = getThemeColors();

  const handleSubmit = async () => {
    if (!message.trim()) {
      Alert.alert('Validation Error', 'Please enter your message');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/anonymous/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          message,
          username: currentUser.username,
          isShowUsername: showUsername
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      Alert.alert(
        'Success', 
        showUsername 
          ? 'Your message has been sent with your username' 
          : 'Your anonymous message has been sent'
      );
      setMessage('');
      setShowUsername(false);
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to send message'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className={`flex-1 ${colors.background} p-4`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="max-w-md mx-auto w-full">
          <View className={`${colors.card} rounded-2xl shadow-md overflow-hidden p-6`}>
            <View className="items-center mb-6">
              <Text className={`text-2xl font-bold ${colors.text} mb-1`}>
                {showUsername ? 'Confidential Message' : 'Anonymous Message'}
              </Text>
              <Text className={`text-sm ${colors.secondaryText} text-center`}>
                {showUsername 
                  ? 'Your message will include your username' 
                  : 'Your identity will not be shared'}
              </Text>
            </View>

            <TextInput
              placeholder="Type your message here..."
              placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={5}
              className={`${colors.input} ${colors.text} rounded-lg p-4 border ${colors.border} mb-4 min-h-[120px]`}
              textAlignVertical="top"
            />

            <View className={`flex-row items-center justify-between p-3 rounded-lg ${colors.input} mb-6`}>
              <Text className={`${colors.text}`}>
                Show my username to pastor
              </Text>
              <Switch
                value={showUsername}
                onValueChange={setShowUsername}
                trackColor={{ false: colors.switchTrack, true: colors.switchTrack }}
                thumbColor={showUsername ? colors.switchThumb : '#f3f4f6'}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting || !message.trim()}
              className={`${colors.button} rounded-lg p-4 items-center justify-center ${
                (isSubmitting || !message.trim()) ? 'opacity-50' : ''
              }`}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className={`${colors.buttonText} font-medium`}>
                  {showUsername ? 'Send with My Name' : 'Send Anonymously'}
                </Text>
              )}
            </TouchableOpacity>

            <View className="mt-4 items-center">
              <Text className={`text-xs ${colors.secondaryText} text-center`}>
                {showUsername 
                  ? 'Pastor will see your username with this message' 
                  : 'Your identity will remain confidential'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AnonymousMessageScreen;