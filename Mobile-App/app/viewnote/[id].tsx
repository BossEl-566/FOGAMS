import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { router, useLocalSearchParams } from 'expo-router';

const ViewNoteScreen = () => {
  const { theme } = useSelector((state: any) => state.theme);
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();

  const getThemeColors = () => {
    return {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      border: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',
    };
  };

  const colors = getThemeColors();

  const fetchNote = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/notepad/get/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch note');
      }
      
      const data = await response.json();
      setNote(data);
    } catch (error) {
      console.error('Error fetching note:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch note',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/notepad/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Note deleted successfully',
        });
        router.back();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to delete note',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteNote,
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  if (loading || !note) {
    return (
      <View className={`flex-1 justify-center items-center ${colors.background}`}>
        <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'gray'} />
        <Text className={`mt-4 ${colors.text}`}>Loading note...</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${colors.background} p-4`}>
      <ScrollView>
        <View className={`p-4 rounded-lg mb-4 ${colors.card} border ${colors.border}`}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-2xl font-bold ${colors.text}`}>{note.title}</Text>
            <TouchableOpacity onPress={() => router.push(`/editnote/${id}`)}>
              <Feather name="edit" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <Text className={`text-base ${colors.text} mb-6`}>
            {note.content}
          </Text>
          
          <View className="flex-row justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <Text className={`text-sm ${colors.secondaryText}`}>
              Last updated: {new Date(note.updatedAt).toLocaleString()}
            </Text>
            <Text className={`text-sm ${colors.secondaryText}`}>
              Created: {new Date(note.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-4 right-4">
        <TouchableOpacity
          className={`p-4 rounded-full bg-red-500`}
          onPress={confirmDelete}
        >
          <MaterialIcons name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Toast />
    </View>
  );
};

export default ViewNoteScreen;