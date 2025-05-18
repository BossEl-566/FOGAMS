import { View, Text, ScrollView, ActivityIndicator, Pressable, FlatList, Image } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import React from 'react';

const DailyMessage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useSelector((state: any) => state.theme.theme);
  const isDark = theme === 'dark';

  const fetchDailyMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/get-daily-bible-message`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(data.dailyBibleMessage);
      } else {
        throw new Error(data.message || 'Failed to fetch daily messages');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch daily messages');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDailyMessages();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDailyMessages();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  if (loading && !refreshing) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <ActivityIndicator size="large" color={isDark ? "#3b82f6" : "#2563eb"} />
        <Text className={`text-lg mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading daily messages...
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
            fetchDailyMessages();
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
        data={messages}
        keyExtractor={(item) => item._id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerClassName="p-4"
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-6">
            <Text className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No daily messages found
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Link href={`/daily-message/${item._id}`} asChild>
            <Pressable className={`mb-4 rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              {/* Message Image */}
              {item.imageUrl && (
                <Image 
                  source={{ uri: item.imageUrl }}
                  className="w-full h-40"
                  resizeMode="cover"
                />
              )}
              
              <View className="p-5">
                <Text className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </Text>
                
                <Text className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatDate(item.date || item.createdAt)}
                </Text>
                
                {item.scripture && (
                  <View className={`p-2 mb-3 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Text className={`text-sm italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.scripture}
                    </Text>
                  </View>
                )}
                
                <Text 
                  className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item.content}
                </Text>
                
                {item.category && (
                  <View className="mt-3 flex-row items-center">
                    <Feather 
                      name="tag" 
                      size={14} 
                      color={isDark ? '#9ca3af' : '#6b7280'} 
                    />
                    <Text className={`ml-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.category}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
};

export default DailyMessage;