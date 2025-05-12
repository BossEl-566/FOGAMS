import { View, ScrollView, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

type Member = {
  _id: string;
  fullname: string;
  contact: string;
  email: string;
  birthday: string;
};

const BirthdayScreen = () => {
  const { theme } = useSelector((state: any) => state.theme);
  const [celebrants, setCelebrants] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getThemeColors = () => {
    return {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      accent: theme === 'dark' ? 'text-blue-400' : 'text-blue-700',
      border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    };
  };

  const colors = getThemeColors();

  const fetchCelebrants = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/membership/birthdays-today`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCelebrants(data);
    } catch (error) {
      console.error('Error fetching birthdays:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCelebrants();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCelebrants();
  };

  if (loading) {
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
        <Text className={`text-2xl font-bold text-center ${colors.accent} mb-4`}>
          🎉 Today's Birthday Celebrants 🎉
        </Text>

        {celebrants.length === 0 ? (
          <Text className={`text-center ${colors.secondaryText} py-4`}>
            No birthdays today.
          </Text>
        ) : (
          <View className="gap-4">
            {celebrants.map((member) => (
              <View
                key={member._id}
                className={`${colors.card} rounded-xl p-4 border ${colors.border} shadow-sm`}
              >
                <Text className={`text-xl font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-800'}`}>
                  {member.fullname}
                </Text>
                <Text className={`${colors.secondaryText} mt-1`}>
                  📱 {member.contact}
                </Text>
                <Text className={`${colors.secondaryText}`}>
                  📧 {member.email}
                </Text>
                <Text className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} mt-2`}>
                  🎂 Happy Birthday!
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BirthdayScreen;