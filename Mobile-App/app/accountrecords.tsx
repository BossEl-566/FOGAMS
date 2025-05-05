import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootState } from '../src/store/store'; // Adjust import path as needed
import { router } from 'expo-router';

interface ChurchRecord {
  _id: string;
  createdAt: string;
  thanksgiving: number;
  welfare: number;
  communityImpact: number;
  sundayOfferingFirstService: number;
  sundayOfferingSecondService: number;
  sundayOfferingThirdService: number;
  childrenServiceOffering: number;
  sundaySchool: number;
  midWeekOffering: number;
  fridayPrayerOffering: number;
  nameOfThoseWhoPaid: { amount: number }[];
  ifAnySpecialOfferingSpecify: { amount: number }[];
}

const AccountRecordsScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { theme: appTheme } = useSelector((state: RootState) => state.theme);
  const [records, setRecords] = useState<ChurchRecord[]>([]);
  const [firstRecord, setFirstRecord] = useState<ChurchRecord | null>(null);
  const [secondRecord, setSecondRecord] = useState<ChurchRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Theme-based colors
  const bgColor = appTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgColor = appTheme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = appTheme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = appTheme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const accentColor = appTheme === 'dark' ? 'text-blue-400' : 'text-blue-600';

  const fetchRecords = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/church-account/get-church-record`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch records');
      
      setRecords(data);
      setFirstRecord(data[0] || null);
      setSecondRecord(data[1] || null);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message || 'Failed to fetch records',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRecords();
  };

  const calculateTotal = (record: ChurchRecord | null) => {
    if (!record) return 0;
    return (
      (record.thanksgiving || 0) +
      (record.welfare || 0) +
      (record.communityImpact || 0) +
      (record.sundayOfferingFirstService || 0) +
      (record.sundayOfferingSecondService || 0) +
      (record.sundayOfferingThirdService || 0) +
      (record.childrenServiceOffering || 0) +
      (record.sundaySchool || 0) +
      (record.midWeekOffering || 0) +
      (record.fridayPrayerOffering || 0) +
      (record.nameOfThoseWhoPaid?.reduce((sum, person) => sum + (person.amount || 0), 0) || 0) +
      (record.ifAnySpecialOfferingSpecify?.reduce((sum, event) => sum + (event.amount || 0), 0) || 0)
    );
  };

  const calculateTitheTotal = (record: ChurchRecord | null) => {
    if (!record) return 0;
    return (record.nameOfThoseWhoPaid?.reduce((sum, person) => sum + (person.amount || 0), 0) || 0);
  };

  if (loading) {
    return (
      <View className={`flex-1 justify-center items-center ${bgColor}`}>
        <ActivityIndicator size="large" color={appTheme === 'dark' ? '#6366f1' : '#4f46e5'} />
      </View>
    );
  }

  return (
    <ScrollView
      className={`flex-1 ${bgColor} p-4`}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[appTheme === 'dark' ? '#6366f1' : '#4f46e5']}
          tintColor={appTheme === 'dark' ? '#6366f1' : '#4f46e5'}
        />
      }
    >
      {/* Header */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className={`text-2xl font-bold ${textColor}`}>Church Account Dashboard</Text>
            {firstRecord && (
              <Text className={`text-sm ${secondaryTextColor}`}>
                Last modified: {new Date(firstRecord.createdAt).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          className={`flex-row items-center self-end px-3 py-1 rounded-full ${appTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
          onPress={() => router.push('/alltitherecords')}
        >
          <Text className={`text-sm ${textColor}`}>View all tithes</Text>
          <Feather name="chevron-right" size={14} color={appTheme === 'dark' ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-col space-y-4">
        {/* Tithe Records Card */}
        <View className={`rounded-xl p-4 ${cardBgColor} shadow-sm`}>
          <Text className={`text-xl font-semibold ${textColor} mb-4`}>Tithe Records</Text>
          
          {firstRecord && (
            <View className="flex-row justify-between mb-2">
              <View>
                <Text className={`text-sm ${secondaryTextColor}`}>Last Week</Text>
                <Text className={`text-xl font-bold ${textColor}`}>
                  {firstRecord.nameOfThoseWhoPaid?.length || 0} People
                </Text>
              </View>
              <View className="items-end">
                <Text className={`text-sm ${secondaryTextColor}`}>Total Amount</Text>
                <Text className={`text-xl font-bold ${textColor}`}>
                  GHS {calculateTotal(firstRecord).toLocaleString()}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Special Appeals Card */}
        {firstRecord && (
          <View className={`rounded-xl p-4 ${cardBgColor} shadow-sm`}>
            <Text className={`text-xl font-semibold ${textColor} mb-4`}>Special Appeals</Text>
            
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className={textColor}>Thanksgiving</Text>
                <Text className={secondaryTextColor}>GHS {firstRecord.thanksgiving || 0}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className={textColor}>Welfare</Text>
                <Text className={secondaryTextColor}>GHS {firstRecord.welfare || 0}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className={textColor}>Community Impact</Text>
                <Text className={secondaryTextColor}>GHS {firstRecord.communityImpact || 0}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Offerings Card */}
        {firstRecord && (
          <View className={`rounded-xl p-4 ${cardBgColor} shadow-sm`}>
            <Text className={`text-xl font-semibold ${textColor} mb-4`}>Offerings</Text>
            
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className={textColor}>Sunday Offering (1st Service)</Text>
                <Text className={secondaryTextColor}>GHS {firstRecord.sundayOfferingFirstService || 0}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className={textColor}>Sunday Offering (2nd Service)</Text>
                <Text className={secondaryTextColor}>GHS {firstRecord.sundayOfferingSecondService || 0}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className={textColor}>Sunday Offering (3rd Service)</Text>
                <Text className={secondaryTextColor}>GHS {firstRecord.sundayOfferingThirdService || 0}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className={textColor}>Children Service Offering</Text>
                <Text className={secondaryTextColor}>GHS {firstRecord.childrenServiceOffering || 0}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className={textColor}>Sunday School</Text>
                <Text className={secondaryTextColor}>GHS {firstRecord.sundaySchool || 0}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className={textColor}>Mid-Week Offering</Text>
                <Text className={secondaryTextColor}>GHS {firstRecord.midWeekOffering || 0}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Previous Week Records */}
        <View className={`rounded-xl p-4 ${cardBgColor} shadow-sm`}>
          <Text className={`text-xl font-semibold ${textColor} mb-4`}>Previous Week Records</Text>
          
          <View className="space-y-4">
            {records.slice(0, 5).map((record) => (
              <View 
                key={record._id} 
                className={`pb-4 border-b ${borderColor} last:border-b-0`}
              >
                <View className="flex-row justify-between">
                  <View>
                    <Text className={textColor}>
                      {new Date(record.createdAt).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>
                    <Text className={`text-sm ${secondaryTextColor}`}>
                      Total: GHS {calculateTotal(record).toLocaleString()}
                    </Text>
                  </View>
                  
                  <View className="flex-row space-x-3">
                    <TouchableOpacity onPress={() => router.push(`./church-record/${record._id}`)}>
                      <Text className={accentColor}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Tithe Overview */}
        <View className={`rounded-xl p-4 ${cardBgColor} shadow-sm`}>
          <Text className={`text-xl font-semibold ${textColor} mb-4`}>Tithe Overview</Text>
          
          <View className="space-y-4">
            {firstRecord && (
              <View>
                <Text className={`text-sm ${secondaryTextColor}`}>Current Record</Text>
                <Text className={`text-xl font-bold ${textColor}`}>
                  GHS {calculateTitheTotal(firstRecord).toLocaleString()}
                </Text>
              </View>
            )}
            
            {secondRecord && (
              <View>
                <Text className={`text-sm ${secondaryTextColor}`}>Previous Record</Text>
                <Text className={`text-xl font-bold ${textColor}`}>
                  GHS {calculateTitheTotal(secondRecord).toLocaleString()}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* All Records Section */}
        <View className="mb-10">
          <Text className={`text-xl font-semibold ${textColor} mb-4`}>All Tithe Records</Text>
          
          <View className={`rounded-xl overflow-hidden ${cardBgColor}`}>
            {records.map((record) => (
              <TouchableOpacity 
                key={record._id}
                className={`p-4 border-b ${borderColor}`}
                onPress={() => router.push(`./church-record/${record._id}`)}
              >
                <View className="flex-row justify-between items-center">
                  <Text className={textColor}>
                    {new Date(record.createdAt).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className={`font-medium ${textColor}`}>
                      GHS {calculateTotal(record).toLocaleString()}
                    </Text>
                    <Feather 
                      name="chevron-right" 
                      size={18} 
                      color={appTheme === 'dark' ? '#9ca3af' : '#6b7280'} 
                      className="ml-2"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountRecordsScreen;