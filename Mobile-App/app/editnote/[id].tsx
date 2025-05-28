import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const EditNotepad = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useSelector((state: any) => state.theme);
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const getThemeColors = () => {
    return {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      input: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
      button: theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600',
      border: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',
    };
  };

  const colors = getThemeColors();

  useEffect(() => {
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
        setFormData({
          title: data.title,
          content: data.content
        });
      } catch (error) {
        console.error('Error fetching note:', error);
        Toast.show({
          type: 'error',
          text1: 'Failed to fetch note',
          text2: error instanceof Error ? error.message : 'An unknown error occurred',
        });
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdateNote = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Validation Error', 'Title cannot be empty');
      return;
    }

    try {
      setUpdating(true);
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/notepad/update/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      Toast.show({
        type: 'success',
        text1: 'Note updated successfully',
      });
      router.back();
    } catch (error) {
      console.error('Error updating note:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to update note',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
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

        {/* Title Input */}
        <View className="mb-4">
          <Text className={`mb-2 ${colors.text}`}>Title</Text>
          <TextInput
            className={`p-3 rounded-lg ${colors.input} ${colors.text} border ${colors.border}`}
            placeholder="Note title"
            placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={formData.title}
            onChangeText={(text) => setFormData({...formData, title: text})}
          />
        </View>

        {/* Content Input */}
        <View className="mb-6">
          <Text className={`mb-2 ${colors.text}`}>Content</Text>
          <TextInput
            className={`p-3 rounded-lg ${colors.input} ${colors.text} border ${colors.border} min-h-[200px]`}
            placeholder="Write your note here..."
            placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={formData.content}
            onChangeText={(text) => setFormData({...formData, content: text})}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Update Button */}
        <TouchableOpacity
          className={`p-4 rounded-lg ${colors.button} flex-row justify-center items-center`}
          onPress={handleUpdateNote}
          disabled={updating}
        >
          {updating ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Feather name="save" size={20} color="white" />
              <Text className="text-white ml-2">Save Changes</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Toast Notification */}
      <Toast />
    </View>
  );
};

export default EditNotepad;