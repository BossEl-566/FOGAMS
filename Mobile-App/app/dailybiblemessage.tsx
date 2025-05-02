import { View, Text, ScrollView, Image, TextInput, Alert, Platform, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { Client, Storage, ID } from 'appwrite';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../src/store/store';
import { AppwriteClientFactory } from '../appwrite-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = AppwriteClientFactory.getInstance().storage;

const DailyBibleMessage = () => {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [previewUri, setPreviewUri] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: 'uncategorized',
    content: '',
    image: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const { theme } = useSelector((state: RootState) => state.theme);
  const isDarkMode = theme === 'dark';
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [uploadImageError, setUploadImageError] = useState<string | null>(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  // Theme styles
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
  const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || 'default-project-id');

  const prepareNativeFile = async (
      asset: ImagePicker.ImagePickerAsset
    ): Promise<{ name: string; type: string; size: number; uri: string }> => {
      try {
        // Get filename or generate one
        let fileName = asset.uri.split('/').pop() || `file-${Date.now()}`;
        
        // Normalize extensions
        if (fileName.endsWith('.jpeg')) {
          fileName = fileName.replace('.jpeg', '.jpg');
        }
  
        // Ensure the file has an extension
        if (!fileName.includes('.')) {
          fileName = `${fileName}.jpg`;
        }
  
        const fileExt = fileName.split('.').pop()?.toLowerCase() || 'jpg';
        const mimeType = asset.mimeType || `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;
  
        return {
          name: fileName,
          size: asset.fileSize || 0,
          type: mimeType,
          uri: Platform.OS === "android" ? asset.uri : asset.uri.replace('file://', ''),
        };
      } catch (error) {
        const errorMsg = `File preparation failed: ${error}`;
        console.error(errorMsg);
        return Promise.reject(error);
      }
    };

  async function uploadImageAsync(asset: ImagePicker.ImagePickerAsset) {
      try {
        const fileToUpload = await prepareNativeFile(asset);
        
        // Double-check the extension
        const fileExt = fileToUpload.name.split('.').pop()?.toLowerCase();
        const allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        
        if (!fileExt || !allowedExts.includes(fileExt)) {
          throw new Error(`Invalid file extension: ${fileExt || 'none'}`);
        }
  
        console.log('Uploading file:', {
          name: fileToUpload.name,
          type: fileToUpload.type,
          size: fileToUpload.size,
          uri: fileToUpload.uri.substring(0, 50) + '...'
        });
  
        const response = await storage.createFile(
          process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
          ID.unique(),
          fileToUpload
        );
  
        console.log('Upload response:', response);
        
        const fileUrl = storage.getFileView(
          process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
          response.$id
        );
  
        setDebugInfo(prev => prev + `\n\n✅ Upload successful! File ID: ${response.$id}`);
        return fileUrl;
      } catch (error: any) {
        const errorMsg = `❌ Upload failed: ${error.message}\n\n${debugInfo}`;
        console.error(errorMsg);
        setDebugInfo(errorMsg);
        setUploadImageError(error.message);
        throw error;
      }
    }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setFile(result.assets[0]);
        setPreviewUri(result.assets[0].uri);
        setImageFileUploading(true);
        setUploadImageError(null);
        try {
          const fileUrl = await uploadImageAsync(result.assets[0]);
          setImageFileUrl(fileUrl.href);
          setFormData(prev => ({ ...prev, image: fileUrl.href }));
          ToastAndroid.show('Image uploaded successfully', ToastAndroid.SHORT);
        } catch (error) {
          ToastAndroid.show('Image upload failed', ToastAndroid.SHORT);
        } finally {
          setImageFileUploading(false);
        }
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        ToastAndroid.show('No image selected', ToastAndroid.SHORT);
        return;
      }
      
      if (imageFileUploading) {
        ToastAndroid.show('Please wait for image upload to complete', ToastAndroid.SHORT);
        return;
      }
      
      setIsUploading(true);
      try {
        const fileUrl = await uploadImageAsync(file);
        setFormData(prev => ({ ...prev, image: fileUrl.href }));
        ToastAndroid.show('Image uploaded successfully', ToastAndroid.SHORT);
      } catch (error) {
        ToastAndroid.show('Image upload failed', ToastAndroid.SHORT);
      } finally {
        setIsUploading(false);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.content) {
        Alert.alert('Error', 'Title and message content are required');
        return;
      }

      if (!formData.image) {
        Alert.alert('Warning', 'No image uploaded. Continue without image?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue', onPress: actuallySubmit }
        ]);
        return;
      }

      await actuallySubmit();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred while submitting the form');
    }
  };

  const actuallySubmit = async () => {
    try {
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/daily-bible-message`, {
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
    } catch (error: any) {
      throw error;
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
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </View>

      {previewUri ? (
        <Image 
          source={{ uri: previewUri }} 
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
      >
        Publish Message
      </Button>

      <Toast />
    </ScrollView>
  );
};

export default DailyBibleMessage;