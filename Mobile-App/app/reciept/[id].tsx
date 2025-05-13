import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, Image, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import type { RootState } from '../../src/store/store'; // Adjust import path
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { shareAsync } from 'expo-sharing';
import Toast from 'react-native-toast-message';

interface Transaction {
  _id: string;
  amount: number;
  mode: string;
  period: string;
  paymentForMonth: string;
  weekOrMonth: string;
  createdAt: string;
  transactionID: string;
  isApproved: boolean;
}

const ReceiptScreen = () => {
  const { id } = useLocalSearchParams();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { theme: appTheme } = useSelector((state: RootState) => state.theme);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Theme-based colors
  const bgColor = appTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgColor = appTheme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = appTheme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = appTheme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const accentColor = appTheme === 'dark' ? 'text-blue-400' : 'text-blue-600';

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!id) return;
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/tithe/getTithe/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!response.ok) throw new Error("Failed to fetch transaction details");
        const data = await response.json();
        setTransaction(data);
      } catch (err: any) {
        setError(err.message);
        Toast.show({
          type: 'error',
          text1: err.message,
          position: 'bottom',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleShare = async () => {
    try {
      const html = `
        <html>
          <body>
            <div style="padding: 20px; font-family: Arial; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0; position: relative; overflow: hidden;">
                <div style="position: absolute; inset: 0; opacity: 0.1; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 48px; font-weight: bold; letter-spacing: 5px;">PAID</span>
                </div>
                <div style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center;">
                  <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">Fellowship of Grace</h1>
                  <h2 style="font-size: 18px; margin-bottom: 20px;">Assemblies of God - Pedu</h2>
                  <h3 style="font-size: 28px; font-weight: bold;">OFFICIAL RECEIPT</h3>
                  <p style="font-size: 14px; margin-top: 5px;">
                    ${new Date(transaction?.createdAt || Date.now()).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div style="padding: 20px; background-color: white;">
                <!-- Receipt content would go here -->
              </div>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to share receipt',
        position: 'bottom',
      });
    }
  };

  if (loading) {
    return (
      <View className={`flex-1 justify-center items-center ${bgColor}`}>
        <ActivityIndicator size="large" color={appTheme === 'dark' ? '#6366f1' : '#4f46e5'} />
      </View>
    );
  }

  if (error) {
    return (
      <View className={`flex-1 justify-center items-center ${bgColor}`}>
        <Text className={`text-red-500 text-lg ${textColor}`}>{error}</Text>
      </View>
    );
  }

  if (!transaction) {
    return (
      <View className={`flex-1 justify-center items-center ${bgColor}`}>
        <Text className={`text-lg ${textColor}`}>Transaction not found</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${bgColor} p-4`}>

      {/* Receipt Card */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className={`rounded-xl overflow-hidden ${cardBgColor} shadow-md border ${borderColor} mt-10`}>
          {/* Header with Watermark */}
          <View className={`bg-blue-800 p-6 relative`}>
            <View className="absolute inset-0 opacity-10 items-center justify-center">
              <Text className="text-4xl font-bold tracking-widest opacity-50 text-white">PAID</Text>
            </View>
            
            <View className="relative z-10">
              <View className="items-center mb-4">
                {/* Replace with your actual logo */}
                <Image 
                  source={require('../../assets/images/assembliesOfGodLogo.png')} 
                  className="h-16 w-16 mb-3"
                />
                <Text className={`text-2xl font-bold text-white`}>Fellowship of Grace</Text>
                <Text className={`text-xl text-white`}>Assemblies of God - Pedu</Text>
              </View>
              
              <View className="items-center mt-4">
                <Text className={`text-3xl font-bold text-white`}>OFFICIAL RECEIPT</Text>
                <Text className={`text-sm text-white mt-1`}>
                  {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </View>
            </View>
          </View>

          {/* Receipt Body */}
          <View className="p-6">
            {/* Member and Transaction Info */}
            <View className="flex-row justify-between mb-8 flex-wrap">
              <View className="mb-6 min-w-[48%]">
                <Text className={`text-sm font-semibold uppercase tracking-wider ${secondaryTextColor}`}>
                  Member Information
                </Text>
                <View className="mt-2">
                  <Text className={`text-lg font-medium ${textColor}`}>{currentUser?.username || "N/A"}</Text>
                  <Text className={secondaryTextColor}>{currentUser?.email || "N/A"}</Text>
                </View>
              </View>
              
              <View className="mb-6 min-w-[48%]">
                <Text className={`text-sm font-semibold uppercase tracking-wider ${secondaryTextColor}`}>
                  Transaction Details
                </Text>
                <View className="mt-2">
                  <Text className={textColor}>
                    <Text className="font-medium">Transaction ID:</Text> {transaction.transactionID || "N/A"}
                  </Text>
                  <Text className={textColor}>
                    <Text className="font-medium">Payment Method:</Text> {transaction.mode || "N/A"}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className={`font-medium ${textColor}`}>Status:</Text>
                    <View className={`ml-2 px-2 py-1 rounded-full ${transaction.isApproved ? "bg-green-100" : "bg-yellow-100"}`}>
                      <Text className={`text-xs ${transaction.isApproved ? "text-green-800" : "text-yellow-800"}`}>
                        {transaction.isApproved ? "Approved" : "Pending"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Payment Details */}
            <View className={`border-t ${borderColor} border-b py-4 my-4`}>
              <View className="flex-row justify-between">
                <View className="items-center flex-1">
                  <Text className={`text-sm ${secondaryTextColor}`}>Payment For</Text>
                  <Text className={`font-medium ${textColor}`}>{transaction.paymentForMonth || "N/A"}</Text>
                </View>
                <View className="items-center flex-1">
                  <Text className={`text-sm ${secondaryTextColor}`}>Period</Text>
                  <Text className={`font-medium ${textColor}`}>{transaction.period || "N/A"}</Text>
                </View>
                <View className="items-center flex-1">
                  <Text className={`text-sm ${secondaryTextColor}`}>Type</Text>
                  <Text className={`font-medium ${textColor}`}>{transaction.weekOrMonth || "N/A"}</Text>
                </View>
              </View>
            </View>

            {/* Amount Section */}
            <View className="items-end mt-8">
              <Text className={`text-sm ${secondaryTextColor}`}>Amount Paid</Text>
              <Text className={`text-3xl font-bold ${accentColor}`}>
                GHS {transaction.amount?.toFixed(2) || "0.00"}
              </Text>
            </View>

            {/* Footer */}
            <View className={`mt-12 pt-6 border-t ${borderColor} items-center`}>
              <View className="mb-6 items-center">
                <Text className={`text-sm ${secondaryTextColor}`}>Thank you for your contribution</Text>
                <Text className={`font-medium ${textColor}`}>Fellowship of Grace Assemblies</Text>
              </View>
              <View className="items-center">
                <View className={`h-16 w-32 border-t border-b ${borderColor} items-center justify-center`}>
                  <Text className={`text-xs ${secondaryTextColor}`}>Authorized Signature</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Toast />
    </View>
  );
};

export default ReceiptScreen;