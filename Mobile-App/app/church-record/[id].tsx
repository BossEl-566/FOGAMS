import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import type { RootState } from '../../src/store/store'; // Adjust import path
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

interface ChurchRecord {
  _id: string;
  createdAt: string;
  updatedAt: string;
  thanksgiving: number;
  welfare: number;
  communityImpact: number;
  sundayOfferingFirstService: number;
  sundayOfferingSecondService: number;
  sundayOfferingThirdService: number;
  sundayOfferingFirstServiceProject: number;
  sundayOfferingSecondServiceProject: number;
  sundayOfferingThirdServiceProject: number;
  childrenServiceOffering: number;
  sundaySchool: number;
  midWeekOffering: number;
  fridayPrayerOffering: number;
  nameOfThoseWhoPaid: { name: string; amount: number }[];
  ifAnySpecialOfferingSpecify: { event: string; amount: number }[];
}

const ViewChurchRecordScreen = () => {
  const { id } = useLocalSearchParams();
  const { theme: appTheme } = useSelector((state: RootState) => state.theme);
  const [record, setRecord] = useState<ChurchRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Theme-based colors
  const bgColor = appTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgColor = appTheme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = appTheme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = appTheme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const accentColor = appTheme === 'dark' ? 'text-blue-400' : 'text-blue-600';

  // Calculate totals
  const calculateTotalOffering = () => {
    return (record?.sundayOfferingFirstService || 0) +
      (record?.sundayOfferingSecondService || 0) +
      (record?.sundayOfferingThirdService || 0) +
      (record?.sundayOfferingFirstServiceProject || 0) +
      (record?.sundayOfferingSecondServiceProject || 0) +
      (record?.sundayOfferingThirdServiceProject || 0);
  };

  const calculateTotalTithe = () => {
    return record?.nameOfThoseWhoPaid?.reduce((sum, person) => sum + (person.amount || 0), 0) || 0;
  };

  const calculateOverallTotal = () => {
    return (record?.thanksgiving || 0) +
      (record?.welfare || 0) +
      (record?.communityImpact || 0) +
      calculateTotalOffering() +
      (record?.childrenServiceOffering || 0) +
      (record?.sundaySchool || 0) +
      (record?.midWeekOffering || 0) +
      (record?.fridayPrayerOffering || 0) +
      calculateTotalTithe() +
      (record?.ifAnySpecialOfferingSpecify?.reduce((sum, event) => sum + (event.amount || 0), 0) || 0);
  };

  // Fetch record details
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/church-account/get-church-record/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) throw new Error('Failed to fetch record');
        
        const data = await res.json();
        setRecord(data);
      } catch (err: any) {
        setError(err.message);
        Toast.show({
          type: 'error',
          text1: err.message || 'Failed to fetch record',
          position: 'bottom',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecord();
    }
  }, [id]);

  // Print functionality
  const handlePrint = async () => {
    try {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 20px; }
              h1 { color: #1e40af; font-size: 24px; }
              h2 { color: #1e40af; font-size: 20px; margin-top: 20px; }
              .section { margin-bottom: 20px; }
              .item { display: flex; justify-content: space-between; margin-bottom: 8px; }
              .total { font-weight: bold; margin-top: 10px; }
            </style>
          </head>
          <body>
            <h1>Church Record Details</h1>
            
            <div class="section">
              <h2>General Information</h2>
              <div class="item">
                <span>Created At:</span>
                <span>${new Date(record?.createdAt || '').toLocaleDateString()}</span>
              </div>
            </div>
            
            <div class="section">
              <h2>Tithe and Offerings</h2>
              ${record ? [
                { label: 'Sunday Offering (1st Service)', value: record.sundayOfferingFirstService },
                { label: 'Sunday Offering (2nd Service)', value: record.sundayOfferingSecondService },
                { label: 'Sunday Offering (3rd Service)', value: record.sundayOfferingThirdService },
                { label: 'Sunday Offering Project (1st Service)', value: record.sundayOfferingFirstServiceProject },
                { label: 'Sunday Offering Project (2nd Service)', value: record.sundayOfferingSecondServiceProject },
                { label: 'Sunday Offering Project (3rd Service)', value: record.sundayOfferingThirdServiceProject },
                { label: 'Children Service Offering', value: record.childrenServiceOffering },
                { label: 'Sunday School', value: record.sundaySchool },
                { label: 'Mid-Week Offering', value: record.midWeekOffering },
                { label: 'Friday Prayer Offering', value: record.fridayPrayerOffering },
              ].map(item => `
                <div class="item">
                  <span>${item.label}:</span>
                  <span>GHS ${item.value || 0}</span>
                </div>
              `).join('') : ''}
            </div>
            
            <div class="total">
              <span>Overall Total:</span>
              <span>GHS ${calculateOverallTotal().toFixed(2)}</span>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to generate PDF',
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

  if (!record) {
    return (
      <View className={`flex-1 justify-center items-center ${bgColor}`}>
        <Text className={`text-lg ${textColor}`}>No record found</Text>
      </View>
    );
  }

  return (
    <ScrollView className={`flex-1 ${bgColor} p-4`}>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className={`text-2xl font-bold ${textColor}`}>Church Record Details</Text>
        <TouchableOpacity
          onPress={handlePrint}
          className={`flex-row items-center px-4 py-2 rounded-lg ${appTheme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-600'}`}
        >
          <Feather name="printer" size={16} color="white" />
          <Text className="text-white ml-2">Print</Text>
        </TouchableOpacity>
      </View>

      {/* Record Details */}
      <View className="space-y-6">
        {/* General Information */}
        <View className={`rounded-xl p-4 ${cardBgColor}`}>
          <Text className={`text-xl font-semibold ${textColor} mb-4`}>General Information</Text>
          <View className="flex-row justify-between flex-wrap">
            <View className="w-full md:w-1/2 mb-4">
              <Text className={`text-sm ${secondaryTextColor}`}>Created At</Text>
              <Text className={`text-lg font-bold ${textColor}`}>
                {new Date(record.createdAt).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
            <View className="w-full md:w-1/2">
              <Text className={`text-sm ${secondaryTextColor}`}>Last Updated</Text>
              <Text className={`text-lg font-bold ${textColor}`}>
                {new Date(record.updatedAt).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Tithe and Offerings */}
        <View className={`rounded-xl p-4 ${cardBgColor}`}>
          <Text className={`text-xl font-semibold ${textColor} mb-4`}>Tithe and Offerings</Text>
          <View className="space-y-3">
            {[
              { label: 'Sunday Offering (1st Service)', value: record.sundayOfferingFirstService },
              { label: 'Sunday Offering (2nd Service)', value: record.sundayOfferingSecondService },
              { label: 'Sunday Offering (3rd Service)', value: record.sundayOfferingThirdService },
              { label: 'Sunday Offering Project (1st Service)', value: record.sundayOfferingFirstServiceProject },
              { label: 'Sunday Offering Project (2nd Service)', value: record.sundayOfferingSecondServiceProject },
              { label: 'Sunday Offering Project (3rd Service)', value: record.sundayOfferingThirdServiceProject },
              { label: 'Children Service Offering', value: record.childrenServiceOffering },
              { label: 'Sunday School', value: record.sundaySchool },
              { label: 'Mid-Week Offering', value: record.midWeekOffering },
              { label: 'Friday Prayer Offering', value: record.fridayPrayerOffering },
            ].map((item, index) => (
              <View key={index} className="flex-row justify-between">
                <Text className={textColor}>{item.label}</Text>
                <Text className={secondaryTextColor}>GHS {item.value || 0}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Special Appeals */}
        <View className={`rounded-xl p-4 ${cardBgColor}`}>
          <Text className={`text-xl font-semibold ${textColor} mb-4`}>Special Appeals</Text>
          <View className="space-y-3">
            {[
              { label: 'Thanksgiving', value: record.thanksgiving },
              { label: 'Welfare', value: record.welfare },
              { label: 'Community Impact', value: record.communityImpact },
            ].map((item, index) => (
              <View key={index} className="flex-row justify-between">
                <Text className={textColor}>{item.label}</Text>
                <Text className={secondaryTextColor}>GHS {item.value || 0}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Name of Those Who Paid */}
        {record.nameOfThoseWhoPaid.length > 0 && (
          <View className={`rounded-xl p-4 ${cardBgColor}`}>
            <Text className={`text-xl font-semibold ${textColor} mb-4`}>Name of Those Who Paid</Text>
            <View className="space-y-3">
              {record.nameOfThoseWhoPaid.map((person, index) => (
                <View key={index} className="flex-row justify-between">
                  <Text className={textColor}>{person.name}</Text>
                  <Text className={secondaryTextColor}>GHS {person.amount || 0}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Special Offerings */}
        {record.ifAnySpecialOfferingSpecify.length > 0 && (
          <View className={`rounded-xl p-4 ${cardBgColor}`}>
            <Text className={`text-xl font-semibold ${textColor} mb-4`}>Special Offerings</Text>
            <View className="space-y-3">
              {record.ifAnySpecialOfferingSpecify.map((event, index) => (
                <View key={index} className="flex-row justify-between">
                  <Text className={textColor}>{event.event}</Text>
                  <Text className={secondaryTextColor}>GHS {event.amount || 0}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Totals Section */}
        <View className={`rounded-xl p-4 ${cardBgColor}`}>
          <Text className={`text-xl font-semibold ${textColor} mb-4`}>Totals</Text>
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className={textColor}>Total Offering (All Services)</Text>
              <Text className={secondaryTextColor}>GHS {calculateTotalOffering()}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className={textColor}>Total Tithe</Text>
              <Text className={secondaryTextColor}>GHS {calculateTotalTithe()}</Text>
            </View>
            <View className="flex-row justify-between border-t pt-3 border-gray-300">
              <Text className={`text-lg font-bold ${textColor}`}>Overall Total</Text>
              <Text className={`text-lg font-bold ${accentColor}`}>GHS {calculateOverallTotal()}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewChurchRecordScreen;