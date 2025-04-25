import { View, Text, ScrollView, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { Client, Storage } from 'appwrite';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { APPWRITE_API_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_BUCKET_ID } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust path to your store

const DailyBibleMessage = () => {
  const [file, setFile] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: 'uncategorized',
    content: '',
    image: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const navigation = useNavigation();
  
  // Get current theme from Redux store
  const { theme } = useSelector((state: RootState) => state.theme);
  const isDarkMode = theme === 'dark';

  // Theme colors
  const themeStyles = {
    container: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    input: isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300',
    picker: isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
    button: isDarkMode ? 'bg-blue-600' : 'bg-blue-700',
    buttonOutline: isDarkMode ? 'border-gray-500' : 'border-gray-300',
    imageBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    placeholder: isDarkMode ? 'text-gray-400' : 'text-gray-500'
  };

  // Initialize Appwrite client
  const client = new Client();
  client
    .setEndpoint(APPWRITE_API_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to upload images');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setFile(result.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        Alert.alert('Error', 'Please select an image');
        return;
      }

      setIsUploading(true);
      const storage = new Storage(client);

      const response = await fetch(file);
      const blob = await response.blob();

      const fileResponse = await storage.createFile(
        APPWRITE_BUCKET_ID,
        'unique()',
        blob
      );

      const fileUrl = storage.getFileView(
        APPWRITE_BUCKET_ID,
        fileResponse.$id
      );
      
      setFileUrl(fileUrl.href);
      setFormData(prev => ({ ...prev, image: fileUrl.href }));
      
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Image uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.content) {
        Alert.alert('Error', 'Title and message content are required');
        return;
      }

      const response = await fetch(`http://192.168.48.105:3000/api/daily-bible-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to publish message');
      }

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Message published successfully!',
      });

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred while submitting the form');
    }
  };

  return (
    <ScrollView className={`flex-1 p-4 ${themeStyles.container}`}>
      <Text className={`text-2xl font-bold text-center my-4 ${themeStyles.text}`}>
        Daily Bible Message
      </Text>

      <View className="mb-4">
        <TextInput
          placeholder="Title"
          placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
          value={formData.title}
          onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
          className={`p-3 border rounded-lg ${themeStyles.input}`}
        />
      </View>

      <View className={`mb-4 border rounded-lg ${themeStyles.picker}`}>
        <Picker
          selectedValue={formData.category}
          onValueChange={(itemValue) => setFormData(prev => ({ ...prev, category: itemValue }))}
          dropdownIconColor={isDarkMode ? 'white' : 'black'}
          style={{ color: isDarkMode ? 'white' : 'black' }}
        >
          <Picker.Item label="Select a category" value="uncategorized" />
          <Picker.Item label="Faith and Hope" value="Faith and Hope" />
          <Picker.Item label="Love and Forgiveness" value="Love and Forgiveness" />
          <Picker.Item label="Prayer and Spiritual Growth" value="Prayer and Spiritual Growth" />
          <Picker.Item label="Wisdom and Guidance" value="Wisdom and Guidance" />
          <Picker.Item label="Salvation and Thanksgiving" value="Salvation and Thanksgiving" />
        </Picker>
      </View>

      <View className={`mb-4 border rounded-lg p-3 flex-row justify-between items-center ${themeStyles.input} ${themeStyles.buttonOutline}`}>
        <Button 
          mode="outlined" 
          onPress={pickImage}
          icon="image"
          className="flex-1 mr-2"
          textColor={isDarkMode ? 'white' : undefined}
          style={{ borderColor: isDarkMode ? '#6B7280' : '#D1D5DB' }}
        >
          Select Image
        </Button>
        <Button 
  mode="contained" 
  onPress={handleUploadImage}
  loading={isUploading}
  disabled={isUploading || !file}
  className="flex-1"
  textColor={isDarkMode ? 'white' : undefined}
  style={{ borderColor: isDarkMode ? '#6B7280' : '#D1D5DB' }}
>
  {isUploading ? 'Uploading...' : 'Upload'}
</Button>

      </View>

      {formData.image ? (
        <Image 
          source={{ uri: formData.image }} 
          className={`w-full h-64 rounded-lg my-2 border ${themeStyles.imageBorder}`}
          resizeMode="cover"
        />
      ) : null}

      <View className="mb-4">
        <TextInput
          placeholder="Write your inspiring message here..."
          placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
          value={formData.content}
          onChangeText={(text) => setFormData(prev => ({ ...prev, content: text }))}
          multiline
          numberOfLines={10}
          className={`p-3 border rounded-lg min-h-[200] text-left align-top ${themeStyles.input}`}
          textAlignVertical="top"
        />
      </View>

      <Button 
        mode="contained" 
        onPress={handleSubmit}
        className={`mt-2 ${themeStyles.button}`}
        icon="send"
        disabled={!formData.title || !formData.content}
        buttonColor={isDarkMode ? '#2563EB' : '#1D4ED8'}
      >
        Publish Message
      </Button>

      <Toast />
    </ScrollView>
  );
};

export default DailyBibleMessage;