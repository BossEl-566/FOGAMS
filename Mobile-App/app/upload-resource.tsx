import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ID } from 'react-native-appwrite';
import { AppwriteClientFactory } from '../appwrite-client';

const storage = AppwriteClientFactory.getInstance().storage;

const Upload = () => {
  const { theme } = useSelector((state: any) => state.theme);
  const { currentUser } = useSelector((state: any) => state.user);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileUrl: '',
    fileType: '',
    fileName: '',
    fileSize: 0
  });
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

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

  const prepareFileForUpload = async (file: DocumentPicker.DocumentResult) => {
    if (file.type === 'cancel') {
      throw new Error('File selection cancelled');
    }

    const fileInfo = await FileSystem.getInfoAsync(file.uri);
    
    if (!fileInfo.exists) {
      throw new Error('File does not exist');
    }

    if (fileInfo.size && fileInfo.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
    }

    return {
      name: file.name || `file-${Date.now()}`,
      size: fileInfo.size || 0,
      type: file.mimeType || 'application/octet-stream',
      uri: file.uri,
    };
  };

  const uploadFile = async () => {
    try {
      setUploading(true);
      setFileUploadError(null);
      
      const file = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all file types
      });

      const fileToUpload = await prepareFileForUpload(file);
      
      if (fileToUpload.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
      }

      setFormData(prev => ({
        ...prev,
        fileName: fileToUpload.name,
        fileType: fileToUpload.type,
        fileSize: fileToUpload.size
      }));

      const response = await storage.createFile(
        process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
        ID.unique(),
        fileToUpload,
        undefined,
        (progress) => {
          setUploadProgress(progress.progress);
        }
      );

      const fileUrl = storage.getFileView(
        process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
        response.$id
      );

      setFormData(prev => ({
        ...prev,
        fileUrl: fileUrl.href
      }));

      Toast.show({
        type: 'success',
        text1: 'File uploaded successfully',
        text2: `${fileToUpload.name} (${(fileToUpload.size / (1024 * 1024)).toFixed(2)}MB)`,
      });
    } catch (error: any) {
      console.error('Upload failed:', error);
      setFileUploadError(error.message);
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: error.message,
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.fileUrl) {
      Alert.alert('Validation Error', 'Title, description and file are required');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/resource/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create resource');
      }

      Toast.show({
        type: 'success',
        text1: 'Resource created successfully',
      });

      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        fileUrl: '',
        fileType: '',
        fileName: '',
        fileSize: 0
      });
    } catch (error) {
      console.error('Error creating resource:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to create resource',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  return (
    <View className={`flex-1 ${colors.background} p-4`}>
      <ScrollView>
        <Text className={`text-2xl font-bold mb-6 ${colors.text}`}>Upload Resource</Text>
        
        {/* Title Input */}
        <View className="mb-4">
          <Text className={`mb-2 ${colors.text}`}>Title</Text>
          <TextInput
            className={`p-3 rounded-lg ${colors.input} ${colors.text} border ${colors.border}`}
            placeholder="Resource title"
            placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={formData.title}
            onChangeText={(text) => setFormData({...formData, title: text})}
          />
        </View>

        {/* Description Input */}
        <View className="mb-4">
          <Text className={`mb-2 ${colors.text}`}>Description</Text>
          <TextInput
            className={`p-3 rounded-lg ${colors.input} ${colors.text} border ${colors.border} min-h-[100px]`}
            placeholder="Resource description"
            placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={formData.description}
            onChangeText={(text) => setFormData({...formData, description: text})}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* File Upload Section */}
        <View className="mb-6">
          <Text className={`mb-2 ${colors.text}`}>File</Text>
          
          {formData.fileUrl ? (
            <View className={`p-4 rounded-lg ${colors.card} border ${colors.border}`}>
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={`font-medium ${colors.text}`} numberOfLines={1}>
                    {formData.fileName}
                  </Text>
                  <Text className={`text-sm ${colors.secondaryText}`}>
                    {formData.fileType} • {(formData.fileSize / (1024 * 1024)).toFixed(2)}MB
                  </Text>
                </View>
                <TouchableOpacity 
                  onPress={uploadFile}
                  disabled={uploading}
                  className="ml-2 p-2"
                >
                  <MaterialIcons 
                    name="cloud-upload" 
                    size={24} 
                    color={uploading ? '#9ca3af' : '#3b82f6'} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              className={`p-8 rounded-lg border-2 border-dashed ${colors.border} items-center justify-center`}
              onPress={uploadFile}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <ActivityIndicator size="large" color="#3b82f6" />
                  <Text className={`mt-4 ${colors.text}`}>
                    Uploading... {Math.round(uploadProgress * 100)}%
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons 
                    name="cloud-upload-outline" 
                    size={48} 
                    color={theme === 'dark' ? '#9ca3af' : '#6b7280'} 
                  />
                  <Text className={`mt-4 text-center ${colors.text}`}>
                    Tap to select a file (max 10MB)
                  </Text>
                  <Text className={`text-sm mt-2 ${colors.secondaryText}`}>
                    Supports all file types
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}

          {fileUploadError && (
            <Text className={`mt-2 text-red-500 ${colors.text}`}>
              {fileUploadError}
            </Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className={`p-4 rounded-lg ${colors.button} items-center justify-center`}
          onPress={handleSubmit}
          disabled={uploading || !formData.title || !formData.description || !formData.fileUrl}
        >
          <Text className="text-white font-bold">Upload Resource</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Toast Notification */}
      <Toast />
    </View>
  );
};

export default Upload;