import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import type { RootState } from '../src/store/store'; // Adjust import path as needed
import { router } from 'expo-router';

interface Transaction {
  _id: string;
  amount: number;
  mode: string;
  period: string;
  paymentForMonth: string;
  weekOrMonth: string;
  createdAt: string;
}

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { theme: appTheme } = useSelector((state: RootState) => state.theme);

  // Fetch data from the API
  const getTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/tithe/getTithe`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        Toast.show({
          type: 'error',
          text1: data.message || 'Failed to fetch transactions',
          position: 'bottom',
        });
        return;
      }

      setTransactions(data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network error',
        position: 'bottom',
      });
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getTransactions();
  };

  if (loading) {
    return (
      <View className={`flex-1 justify-center items-center ${appTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <ActivityIndicator size="large" color={appTheme === 'dark' ? '#6366f1' : '#4f46e5'} />
        <Text className={`mt-4 text-lg ${appTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Loading transactions...
        </Text>
      </View>
    );
  }

  // Theme-based colors
  const textColor = appTheme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const bgColor = appTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgColor = appTheme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const accentColor = appTheme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-600';
  const iconColor = appTheme === 'dark' ? '#9ca3af' : '#6b7280';

  return (
    <View className={`flex-1 ${bgColor} p-4`}>
      {/* Page header */}
      <View className="mb-6">
        <Text className={`text-3xl font-bold text-center ${textColor}`}>
          All Tithe Records
        </Text>
        <Text className={`text-center mt-2 ${secondaryTextColor}`}>
          {transactions.length} records found
        </Text>
      </View>

      {/* Transaction list */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[appTheme === 'dark' ? '#6366f1' : '#4f46e5']}
            tintColor={appTheme === 'dark' ? '#6366f1' : '#4f46e5'}
          />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <View
              key={transaction._id}
              className={`rounded-xl p-4 mb-4 ${cardBgColor} shadow-sm`}
            >
              <View className="flex-row justify-between items-start">
                {/* Transaction details */}
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <Text className={`text-lg font-semibold ${textColor}`}>
                      GHS {transaction.amount.toFixed(2)}
                    </Text>
                    <View className={`ml-3 px-2 py-1 rounded-full ${appTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Text className={`text-xs ${secondaryTextColor}`}>
                        {transaction.mode}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center mb-1">
                    <Feather name="calendar" size={14} color={iconColor} />
                    <Text className={`ml-2 text-sm ${secondaryTextColor}`}>
                      {transaction.paymentForMonth} • {transaction.weekOrMonth}
                    </Text>
                  </View>

                  <Text className={`text-sm ${secondaryTextColor}`}>
                    Period: {transaction.period}
                  </Text>
                </View>

                {/* View Receipt button */}
                <TouchableOpacity
                  onPress={() => router.push(`./reciept/${transaction._id}`)}
                  className={`flex-row items-center px-3 py-2 rounded-lg ${accentColor}`}
                >
                  <Feather name="file-text" size={16} color="white" />
                  <Text className="text-white ml-2">Receipt</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View className={`rounded-xl p-8 items-center ${cardBgColor} mt-4`}>
            <Feather 
              name="file-text" 
              size={48} 
              color={iconColor}
              className="mb-4"
            />
            <Text className={`text-lg font-semibold text-center ${textColor} mb-2`}>
              No transactions found
            </Text>
            <Text className={`text-sm text-center ${secondaryTextColor}`}>
              Your tithe records will appear here
            </Text>
          </View>
        )}
      </ScrollView>

      <Toast />
    </View>
  );
};

export default TransactionsScreen;