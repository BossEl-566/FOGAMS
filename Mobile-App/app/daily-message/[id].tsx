import { View, Text, ScrollView, ActivityIndicator, Pressable, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import React from 'react';

const DailyMessage = () => {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useSelector((state: any) => state.theme.theme);
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchDailyMessage = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/get-daily-bible-message/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMessage(data);
        } else {
          throw new Error(data.message || 'Failed to fetch daily message');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch daily message');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDailyMessage();
    } else {
      // If no ID provided, fetch the latest message
      fetchDailyMessage();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  if (loading) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <ActivityIndicator size="large" color={isDark ? "#3b82f6" : "#2563eb"} />
        <Text className={`text-lg mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading daily message...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className={`flex-1 items-center justify-center p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Text className={`text-lg mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </Text>
        <Pressable
          onPress={() => {
            setError(null);
            const fetchDailyMessage = async () => {
              try {
                setLoading(true);
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/get-daily-bible-message/${id || ''}`, {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                const data = await response.json();
                if (response.ok) {
                  setMessage(data);
                } else {
                  throw new Error(data.message || 'Failed to fetch daily message');
                }
              } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch daily message');
              } finally {
                setLoading(false);
              }
            };
            fetchDailyMessage();
          }}
          className={`px-6 py-3 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
        >
          <Text className="text-white font-medium">Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!message) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Daily message not found
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
    

      <ScrollView 
        className="flex-1"
        contentContainerClassName="pb-6"
      >
        {/* Message Image */}
        {message.imageUrl && (
          <Image 
            source={{ uri: message.imageUrl }}
            className="w-full h-64"
            resizeMode="cover"
          />
        )}

        <View className={`p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} mt-6 mx-6 rounded-xl shadow-sm`}>
          <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {message.title}
          </Text>
          
          <Text className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {formatDate(message.date || message.createdAt)}
          </Text>

          {/* Scripture Reference */}
          {message.scripture && (
            <View className={`p-3 mb-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Text className={`text-sm italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                "{message.scripture}"
              </Text>
            </View>
          )}

          {/* Message Content */}
          <Text className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {message.content}
          </Text>

          {/* Category */}
          {message.category && (
            <View className="mt-6 flex-row items-center">
              <Feather 
                name="tag" 
                size={16} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
              />
              <Text className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {message.category}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DailyMessage;