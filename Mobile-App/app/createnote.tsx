import { View, Text, ScrollView, Pressable, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import React from 'react';

const CreateNote = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useSelector((state: any) => state.theme.theme);
  const { currentUser } = useSelector((state: any) => state.user);
  const isDark = theme === 'dark';

  const handleCreateNote = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/notepad/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: currentUser._id,
          title,
          content,
          isFavorite
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.back();
        Alert.alert('Success', 'Note created successfully');
      } else {
        throw new Error(data.message || 'Failed to create note');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Minimal header with just the favorite star */}
      <View className={`flex-row justify-end p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <Pressable onPress={toggleFavorite}>
          <MaterialIcons 
            name={isFavorite ? "star" : "star-outline"} 
            size={28} 
            color={isFavorite ? '#f59e0b' : (isDark ? '#9ca3af' : '#6b7280')} 
          />
        </Pressable>
      </View>

      <ScrollView className="flex-1 p-4" keyboardShouldPersistTaps="handled">
        {/* Title Input */}
        <TextInput
          className={`text-xl font-bold p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          placeholder="Title"
          placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          value={title}
          onChangeText={setTitle}
          autoFocus
        />

        {/* Content Input */}
        <TextInput
          className={`flex-1 p-4 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          placeholder="Start writing your note..."
          placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          style={{ minHeight: 300 }}
        />
      </ScrollView>

      {/* Save Button */}
      <View className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <Pressable
          className={`py-3 rounded-lg items-center ${isDark ? 'bg-blue-600' : 'bg-blue-500'} ${loading ? 'opacity-70' : ''}`}
          onPress={handleCreateNote}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white font-medium">Save Note</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default CreateNote;