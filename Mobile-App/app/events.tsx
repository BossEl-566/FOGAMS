import { View, Text, ScrollView, ActivityIndicator, Pressable, FlatList, Image } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import React from 'react';

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useSelector((state: any) => state.theme.theme);
  const isDark = theme === 'dark';

  const fetchEvents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/event/get`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEvents(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch events');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy • h:mm a');
  };

  if (loading && !refreshing) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <ActivityIndicator size="large" color={isDark ? "#3b82f6" : "#2563eb"} />
        <Text className={`text-lg mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading events...
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
            setLoading(true);
            fetchEvents();
          }}
          className={`px-6 py-3 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
        >
          <Text className="text-white font-medium">Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>

      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerClassName="p-4"
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-6">
            <Text className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No upcoming events
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Link href={`/event/${item._id}`} asChild>
            <Pressable className={`mb-4 rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              {/* Event Image */}
              {item.imageUrl && (
                <Image 
                  source={{ uri: item.imageUrl }}
                  className="w-full h-40"
                  resizeMode="cover"
                />
              )}
              
              <View className="p-5">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className={`text-lg font-bold flex-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </Text>
                  <View className={`px-2 py-1 rounded-full ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
                    <Text className="text-white text-xs font-medium">
                      {new Date(item.date) > new Date() ? 'Upcoming' : 'Past'}
                    </Text>
                  </View>
                </View>
                
                <Text className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {formatDate(item.date)}
                </Text>
                
                <Text 
                  className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.description}
                </Text>
                
                <View className="mt-3 flex-row items-center">
                  <MaterialIcons 
                    name="location-on" 
                    size={14} 
                    color={isDark ? '#9ca3af' : '#6b7280'} 
                  />
                  <Text className={`ml-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.location || 'Location not specified'}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
};

export default Events;