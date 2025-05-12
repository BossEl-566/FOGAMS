import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react';

type AnonymousMessage = {
  _id: string;
  message: string;
  createdAt: string;
};

const AnonymousPastorScreen = () => {
  const { theme } = useSelector((state: any) => state.theme);
  const [messages, setMessages] = useState<AnonymousMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<AnonymousMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/anonymous/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages || data);
      } else {
        throw new Error(data.message || 'Failed to fetch messages');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to fetch messages'
      );
      console.error(error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteMessage = async (messageId: string) => {
    setIsDeleting(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.148.105:3000/api/anonymous/delete/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete message');
      }

      Alert.alert('Success', 'Message deleted successfully');
      setMessages(messages.filter(msg => msg._id !== messageId));
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to delete message'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMessages();
  };

  if (isLoading) {
    return (
      <View className={`flex-1 justify-center items-center ${colors.background}`}>
        <ActivityIndicator size="large" color={theme === 'dark' ? '#3b82f6' : '#2563eb'} />
      </View>
    );
  }

  return (
    <View className={`flex-1 ${colors.background} p-4`}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme === 'dark' ? '#3b82f6' : '#2563eb']}
            tintColor={theme === 'dark' ? '#3b82f6' : '#2563eb'}
          />
        }
      >
        <Text className={`text-2xl font-bold ${colors.text} mb-2`}>Anonymous Messages</Text>
        <Text className={`text-base ${colors.secondaryText} mb-6`}>Confidential messages from church members</Text>

        {messages.length === 0 ? (
          <View className={`${colors.card} rounded-xl p-8 items-center justify-center`}>
            <Text className={`${colors.secondaryText} text-lg`}>No anonymous messages yet</Text>
          </View>
        ) : (
          <>
            {/* Message List */}
            <View className="mb-6">
              {messages.map((msg) => (
                <TouchableOpacity
                  key={msg._id}
                  onPress={() => setSelectedMessage(msg)}
                  className={`${colors.card} rounded-xl p-4 mb-3 border-l-4 ${
                    selectedMessage?._id === msg._id ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <View className="flex-row justify-between mb-1">
                    <Text className={`text-xs ${colors.accent}`}>
                      {formatDate(msg.createdAt).split(',')[0]}
                    </Text>
                    <Text className={`text-xs ${colors.secondaryText}`}>
                      {formatDate(msg.createdAt).split(',')[1]}
                    </Text>
                  </View>
                  <Text 
                    className={`${colors.text}`}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {msg.message}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Message Detail Modal */}
            {selectedMessage && (
              <View className={`${colors.card} rounded-xl p-6 mt-4`}>
                <View className="flex-row justify-between items-center mb-4">
                  <Text className={`text-xl font-semibold ${colors.text}`}>
                    Message Details
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedMessage(null)}>
                    <Feather
                      name="x"
                      size={24}
                      color={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                    />
                  </TouchableOpacity>
                </View>

                <Text className={`text-sm ${colors.secondaryText} mb-4`}>
                  Received: {formatDate(selectedMessage.createdAt)}
                </Text>

                <View className={`${colors.input} rounded-lg p-4 mb-6`}>
                  <Text className={`${colors.text}`}>
                    {selectedMessage.message}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleDeleteMessage(selectedMessage._id)}
                  disabled={isDeleting}
                  className={`${colors.danger} rounded-lg p-3 items-center flex-row justify-center ${
                    isDeleting ? 'opacity-50' : ''
                  }`}
                >
                  {isDeleting ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <>
                      <AntDesign
                        name="delete"
                        size={20}
                        color="white"
                        style={{ marginRight: 8 }}
                      />
                      <Text className="text-white font-medium">Delete Message</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AnonymousPastorScreen;