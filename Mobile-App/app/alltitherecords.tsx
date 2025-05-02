import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Modal, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootState } from '../src/store/store'; // Adjust import path as needed

interface TitheRecord {
  _id: string;
  username: string;
  amount: number;
  createdAt: string;
  // Add other fields as needed
}

const AllTitheRecordsScreen = () => {
  const { theme: appTheme } = useSelector((state: RootState) => state.theme);
  const [titheRecords, setTitheRecords] = useState<TitheRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<TitheRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editableRecord, setEditableRecord] = useState<TitheRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Theme-based colors
  const bgColor = appTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgColor = appTheme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = appTheme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = appTheme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBgColor = appTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';

  // Fetch tithe records
  const fetchTitheRecords = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/church-account/get-alltithe`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error('Failed to fetch tithe records');
      
      const data = await res.json();
      setTitheRecords(data);
      setFilteredRecords(data);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message || 'Failed to fetch tithe records',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTitheRecords();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = titheRecords.filter(record =>
      record.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecords(filtered);
  }, [searchTerm, titheRecords]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTitheRecords();
  };

  // Open edit modal
  const openEditModal = (record: TitheRecord) => {
    setEditableRecord(record);
    setEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditableRecord(null);
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!editableRecord) return;
    
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/church-account/tithe/${editableRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editableRecord),
      });

      if (!res.ok) throw new Error('Failed to update tithe record');

      const updatedRecord = await res.json();
      setTitheRecords(prev =>
        prev.map(record => record._id === updatedRecord._id ? updatedRecord : record)
      );
      setFilteredRecords(prev =>
        prev.map(record => record._id === updatedRecord._id ? updatedRecord : record)
      );
      
      Toast.show({
        type: 'success',
        text1: 'Tithe record updated successfully!',
        position: 'bottom',
      });
      closeEditModal();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message || 'Failed to update tithe record',
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

  return (
    <View className={`flex-1 ${bgColor} p-4`}>
      {/* Search Bar */}
      <View className={`p-2 ${inputBgColor} rounded-lg mb-4 flex-row items-center`}>
        <Feather name="search" size={20} color={appTheme === 'dark' ? '#9ca3af' : '#6b7280'} />
        <TextInput
          placeholder="Search by username..."
          placeholderTextColor={appTheme === 'dark' ? '#9ca3af' : '#6b7280'}
          value={searchTerm}
          onChangeText={setSearchTerm}
          className={`flex-1 ml-2 ${textColor}`}
          style={{ height: 40 }}
        />
      </View>

      {/* Tithe Records List */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[appTheme === 'dark' ? '#6366f1' : '#4f46e5']}
            tintColor={appTheme === 'dark' ? '#6366f1' : '#4f46e5'}
          />
        }
      >
        <View className={`rounded-lg ${cardBgColor} shadow-sm p-4`}>
          <Text className={`text-xl font-semibold ${textColor} mb-4`}>All Tithe Records</Text>
          
          {filteredRecords.length === 0 ? (
            <View className="items-center py-8">
              <Feather name="file-text" size={48} color={appTheme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Text className={`text-lg ${textColor} mt-4`}>
                {searchTerm ? 'No matching records found' : 'No tithe records yet'}
              </Text>
            </View>
          ) : (
            <View className="space-y-4">
              {filteredRecords.map(record => (
                <View 
                  key={record._id} 
                  className={`pb-4 border-b ${borderColor} last:border-b-0`}
                >
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className={`font-medium ${textColor}`}>{record.username}</Text>
                      <Text className={`text-sm ${secondaryTextColor}`}>
                        {new Date(record.createdAt).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </Text>
                    </View>
                    
                    <View className="flex-row items-center">
                      <Text className={`font-medium ${textColor} mr-3`}>
                        GHS {record.amount.toFixed(2)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => openEditModal(record)}
                        className={`p-2 rounded-lg ${appTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
                      >
                        <Feather name="edit" size={16} color={appTheme === 'dark' ? '#6366f1' : '#4f46e5'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalOpen}
        onRequestClose={closeEditModal}
      >
        <View className="flex-1 justify-center items-center bg-black/70">
          <View className={`w-[90%] max-w-md rounded-lg ${cardBgColor} p-6`}>
            <Text className={`text-xl font-bold ${textColor} mb-4`}>Edit Tithe Record</Text>
            
            <View className="space-y-4 mb-6">
              <View>
                <Text className={`text-sm ${secondaryTextColor} mb-1`}>Username</Text>
                <TextInput
                  value={editableRecord?.username || ''}
                  onChangeText={text => setEditableRecord(prev => prev ? {...prev, username: text} : null)}
                  className={`p-3 rounded-lg ${inputBgColor} ${textColor}`}
                />
              </View>
              
              <View>
                <Text className={`text-sm ${secondaryTextColor} mb-1`}>Amount (GHS)</Text>
                <TextInput
                  value={editableRecord?.amount?.toString() || '0'}
                  onChangeText={text => {
                    const num = parseFloat(text) || 0;
                    setEditableRecord(prev => prev ? {...prev, amount: num} : null);
                  }}
                  keyboardType="numeric"
                  className={`p-3 rounded-lg ${inputBgColor} ${textColor}`}
                />
              </View>
            </View>
            
            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity
                onPress={closeEditModal}
                className={`px-4 py-2 rounded-lg ${appTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
              >
                <Text className={textColor}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleSaveChanges}
                className={`px-4 py-2 rounded-lg ${appTheme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-600'}`}
              >
                <Text className="text-white">Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

export default AllTitheRecordsScreen;