import { View, Text, ScrollView, ActivityIndicator, Pressable, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import React from 'react';

const Event = () => {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useSelector((state: any) => state.theme.theme);
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/event/get/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setEvent(data);
        } else {
          throw new Error(data.message || 'Failed to fetch event');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
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
          Loading event...
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
              const fetchEvent = async () => {
                try {
                  setLoading(true);
                  const token = await AsyncStorage.getItem('token');
                  const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/event/get/${id}`, {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  const data = await response.json();
                  if (response.ok) {
                    setEvent(data);
                  } else {
                    throw new Error(data.message || 'Failed to fetch event');
                  }
                } catch (error) {
                  setError(error instanceof Error ? error.message : 'Failed to fetch event');
                } finally {
                  setLoading(false);
                }
              };
              fetchEvent();
            }
          }}
          className={`px-6 py-3 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
        >
          <Text className="text-white font-medium">Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!event) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Event not found
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
        {/* Event Image */}
        {event.imageUrl && (
          <Image 
            source={{ uri: event.imageUrl }}
            className="w-full h-64"
            resizeMode="cover"
          />
        )}

        <View className={`p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} mt-6 mx-6 rounded-xl shadow-sm`}>
          <Text className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {event.title}
          </Text>
          
          {/* Event Details */}
          <View className="space-y-4">
            <View className="flex-row items-start">
              <MaterialIcons 
                name="description" 
                size={20} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
                style={{ marginTop: 2 }}
              />
              <Text className={`ml-3 flex-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {event.description}
              </Text>
            </View>

            <View className="flex-row items-center">
              <MaterialIcons 
                name="event" 
                size={20} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
              />
              <Text className={`ml-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {formatDate(event.date)}
              </Text>
            </View>

            <View className="flex-row items-center">
              <MaterialIcons 
                name="location-on" 
                size={20} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
              />
              <Text className={`ml-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {event.location}
              </Text>
            </View>
          </View>

          {/* RSVP Button */}
          <Pressable
            className={`mt-6 py-3 rounded-lg items-center ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
            onPress={() => {
              // Handle RSVP logic here
            }}
          >
            <Text className="text-white font-medium">RSVP to Event</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Event;