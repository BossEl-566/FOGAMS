import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { router } from 'expo-router';

const NotepadScreen = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

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

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/notepad/get`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch notes',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotes();
  };

  const toggleFavorite = async (noteId: string, currentStatus: boolean) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/notepad/patch/${noteId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFavorite: !currentStatus })
      });
      
      if (response.ok) {
        setNotes(notes.map(note => 
          note._id === noteId ? { ...note, isFavorite: !currentStatus } : note
        ));
        Toast.show({
          type: 'success',
          text1: currentStatus ? 'Removed from favorites' : 'Added to favorites',
        });
      }
    } catch (error) {
      console.error('Error updating note:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to update note',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteNotes = filteredNotes.filter(note => note.isFavorite);
  const regularNotes = filteredNotes.filter(note => !note.isFavorite);

  const NoteCard = ({ note }: { note: any }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
      <TouchableOpacity
        className={`p-4 rounded-lg mb-4 ${colors.card} border ${colors.border}`}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={0.8}
      >
        <View className="flex-row justify-between items-start">
          <Text className={`text-lg font-bold mb-2 ${colors.text}`} numberOfLines={2}>
            {note.title}
          </Text>
          <TouchableOpacity
            onPress={() => toggleFavorite(note._id, note.isFavorite)}
            className="p-2"
          >
            {note.isFavorite ? (
              <AntDesign name="star" size={20} color="#f59e0b" />
            ) : (
              <AntDesign 
                name="staro" 
                size={20} 
                color={isPressed ? '#9ca3af' : '#d1d5db'} 
              />
            )}
          </TouchableOpacity>
        </View>
        
        <Text className={`${colors.secondaryText} mb-4`} numberOfLines={4}>
          {note.content}
        </Text>
        
        <View className="flex-row justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
          <Text className={`text-sm ${colors.secondaryText}`}>
            {new Date(note.updatedAt).toLocaleDateString()}
          </Text>
          <TouchableOpacity
            className={`px-3 py-1 rounded ${colors.button}`}
            onPress={() => console.log('View note', note._id)}
          >
            <Text className="text-white">View</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && notes.length === 0) {
    return (
      <View className={`flex-1 justify-center items-center ${colors.background}`}>
        <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'gray'} />
        <Text className={`mt-4 ${colors.text}`}>Loading notes...</Text>
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
            colors={[theme === 'dark' ? 'white' : 'black']}
          />
        }
      >
        {/* Header and Search */}
        <View className="mb-6">
          <Text className={`text-2xl font-bold mb-4 ${colors.text}`}>My Notepads</Text>
          
          <View className="flex-row items-center mb-4">
            <View className={`flex-1 flex-row items-center p-2 rounded-lg ${colors.input}`}>
              <Feather name="search" size={20} color={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <TextInput
                placeholder="Search notes..."
                placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                className={`flex-1 ml-2 ${colors.text}`}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            
            <TouchableOpacity
              className={`ml-2 p-2 rounded-lg ${colors.button}`}
              onPress={() => router.push('/createnote')}
            >
              <Feather name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Favorite Notes */}
        {favoriteNotes.length > 0 && (
          <View className="mb-6">
            <View className="flex-row items-center mb-4">
              <AntDesign name="star" size={20} color="#f59e0b" />
              <Text className={`ml-2 text-lg font-semibold ${colors.text}`}>Favorite Notes</Text>
            </View>
            {favoriteNotes.map(note => (
              <NoteCard key={note._id} note={note} />
            ))}
          </View>
        )}

        {/* All Notes */}
        <View>
          <Text className={`text-lg font-semibold mb-4 ${colors.text}`}>All Notes</Text>
          {regularNotes.length > 0 ? (
            regularNotes.map(note => (
              <NoteCard key={note._id} note={note} />
            ))
          ) : (
            <View className="py-8 items-center">
              <Text className={`${colors.text}`}>
                {searchQuery ? 'No matching notes found' : 'No notes yet. Create your first note!'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Toast Notification */}
      <Toast />
    </View>
  );
};

export default NotepadScreen;