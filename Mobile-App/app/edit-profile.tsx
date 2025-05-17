import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStart, updateSuccess, updateFailure } from '../src/features/users/userSlice';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { ID } from 'react-native-appwrite';
import { AppwriteClientFactory } from '../appwrite-client';
import * as FileSystem from 'expo-file-system';

const storage = AppwriteClientFactory.getInstance().storage;

const EditProfile = () => {
  // Get data from Redux
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();

  // State management
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [uploadImageError, setUploadImageError] = useState<string | null>(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  
  interface FormData {
    username: string;
    email: string;
    password: string;
    profilePicture: string | null;
  }

  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    profilePicture: null,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        password: '',
        profilePicture: currentUser.profilePicture,
      });
      setImageFileUrl(currentUser.profilePicture);
    }
  }, [currentUser]);

  const prepareNativeFile = async (
    asset: ImagePicker.ImagePickerAsset
  ): Promise<{ name: string; type: string; size: number; uri: string }> => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(asset.uri);
      let fileName = asset.uri.split('/').pop() || `file-${Date.now()}.jpg`;
      
      // Normalize extensions
      fileName = fileName.replace('.jpeg', '.jpg');

      const fileExt = fileName.split('.').pop()?.toLowerCase() || 'jpg';
      const mimeType = asset.mimeType || `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;

      return {
        name: fileName,
        size: fileInfo.exists ? fileInfo.size || 0 : 0,
        type: mimeType,
        uri: asset.uri,
      };
    } catch (error) {
      console.error('File preparation error:', error);
      throw error;
    }
  };

  async function uploadImageAsync(asset: ImagePicker.ImagePickerAsset) {
    try {
      setImageFileUploading(true);
      setUploadImageError(null);
      
      console.log('Starting upload...');
      const fileToUpload = await prepareNativeFile(asset);
      console.log('File prepared:', fileToUpload);

      const response = await storage.createFile(
        process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
        ID.unique(),
        fileToUpload
      );

      console.log('Upload completed:', response);
      const fileUrl = storage.getFileView(
        process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
        response.$id
      );

      return fileUrl;
    } catch (error: any) {
      console.error('Upload failed:', error);
      setUploadImageError(error.message);
      throw error;
    } finally {
      setImageFileUploading(false);
    }
  }

  const handleImageChange = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets[0].uri) {
        try {
          const fileUrl = await uploadImageAsync(result.assets[0]);
          setImageFileUrl(fileUrl.href);
          setFormData(prev => ({ ...prev, profilePicture: fileUrl.href }));
          ToastAndroid.show('Profile picture uploaded successfully', ToastAndroid.SHORT);
        } catch (error) {
          ToastAndroid.show('Image upload failed', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.log('Image picker error:', error);
      ToastAndroid.show('Failed to pick image', ToastAndroid.SHORT);
    }
  };

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      if (Object.keys(formData).length === 0) {
        ToastAndroid.show('No changes made', ToastAndroid.SHORT);
        return;
      }
      
      if (imageFileUploading) {
        ToastAndroid.show('Please wait for image upload to complete', ToastAndroid.SHORT);
        return;
      }
      
      setLoading(true);
      dispatch(updateStart());
      
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      dispatch(updateSuccess(data));
      ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(updateFailure(errorMessage));
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Theme styles
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const inputBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const buttonBg = theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500';
  const buttonDisabledBg = theme === 'dark' ? 'bg-indigo-800' : 'bg-indigo-300';

  return (
    <View className={`flex-1 ${bgColor} pt-10`}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header */}
        <View className={`px-6 pt-6 pb-4 flex-row items-center justify-between border-b ${borderColor}`}>
          <Text className={`text-2xl font-bold ${textColor}`}>Edit Profile</Text>
        </View>

        {/* Profile Picture */}
        <View className="items-center my-8">
          <TouchableOpacity 
            onPress={handleImageChange}
            disabled={imageFileUploading}
            className="relative"
          >
            <View className="w-36 h-36 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              <Image
                source={{ uri: imageFileUrl || 'https://via.placeholder.com/150' }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="absolute bottom-0 right-0 bg-indigo-500 dark:bg-indigo-600 w-10 h-10 rounded-full items-center justify-center shadow-md">
              <Ionicons 
                name="camera" 
                size={20} 
                color="white" 
              />
            </View>
          </TouchableOpacity>
          
          {imageFileUploading && (
            <View className="mt-4 flex-row items-center space-x-2">
              <ActivityIndicator size="small" color="#6366f1" />
              <Text className="text-sm text-indigo-500 dark:text-indigo-400">Uploading image...</Text>
            </View>
          )}
          {uploadImageError && (
            <Text className="mt-2 text-sm text-red-500 dark:text-red-400">{uploadImageError}</Text>
          )}
        </View>

        {/* Edit Form */}
        <View className="px-6 space-y-6">
          {/* Username */}
          <View>
            <Text className={`text-sm font-medium mb-2 ${textColor}`}>Username</Text>
            <TextInput
              value={formData.username}
              onChangeText={(text) => handleChange('username', text)}
              className={`p-4 rounded-xl ${inputBg} ${textColor} border ${borderColor}`}
              placeholder="Enter your username"
              placeholderTextColor={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
            />
          </View>

          {/* Email */}
          <View>
            <Text className={`text-sm font-medium mb-2 ${textColor}`}>Email</Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              className={`p-4 rounded-xl ${inputBg} ${textColor} border ${borderColor}`}
              placeholder="Enter your email"
              keyboardType="email-address"
              placeholderTextColor={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
            />
          </View>

          {/* Password */}
          <View>
            <Text className={`text-sm font-medium mb-2 ${textColor}`}>Password</Text>
            <View className={`flex-row items-center p-4 rounded-xl ${inputBg} border ${borderColor}`}>
              <TextInput
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                className={`flex-1 ${textColor}`}
                placeholder="Enter new password"
                secureTextEntry={!showPassword}
                placeholderTextColor={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                />
              </TouchableOpacity>
            </View>
            <Text className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Leave blank to keep current password
            </Text>
          </View>

          {/* Save Button */}
          <View className="pt-4">
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading || imageFileUploading}
              className={`py-4 rounded-xl ${loading || imageFileUploading ? buttonDisabledBg : buttonBg} items-center justify-center shadow-md`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;