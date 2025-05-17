import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../src/features/theme/themeSlice';
import React from 'react';

const Announcement = () => {
  const { id } = useLocalSearchParams();
  const [announcement, setAnnouncement] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/announcement/get/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setAnnouncement(data);
        } else {
          throw new Error(data.message || 'Failed to fetch announcement');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch announcement');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnnouncement();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy \'at\' h:mm a');
  };

  if (loading) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <ActivityIndicator size="large" color={isDark ? "#3b82f6" : "#2563eb"} />
        <Text className={`text-lg mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading announcement...
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
            if (id) {
              const fetchAnnouncement = async () => {
                try {
                  setLoading(true);
                  const token = await AsyncStorage.getItem('token');
                  const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/announcement/get/${id}`, {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  const data = await response.json();
                  if (response.ok) {
                    setAnnouncement(data);
                  } else {
                    throw new Error(data.message || 'Failed to fetch announcement');
                  }
                } catch (error) {
                  setError(error instanceof Error ? error.message : 'Failed to fetch announcement');
                } finally {
                  setLoading(false);
                }
              };
              fetchAnnouncement();
            }
          }}
          className={`px-6 py-3 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
        >
          <Text className="text-white font-medium">Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!announcement) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Announcement not found
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>

      <ScrollView 
        className="flex-1"
        contentContainerClassName="p-6"
      >
        <View className={`rounded-xl p-6 shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <Text className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {announcement.title}
          </Text>
          
          <View className="flex-row items-center space-x-6 mb-6">
            <View className="flex-row items-center">
              <MaterialIcons 
                name="person" 
                size={16} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
              />
              <Text className={`ml-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {announcement.username || 'Admin'}
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <MaterialIcons 
                name="access-time" 
                size={16} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
              />
              <Text className={`ml-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {formatDate(announcement.date || announcement.createdAt)}
              </Text>
            </View>
          </View>

          <Text className={`text-base leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {announcement.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Announcement;