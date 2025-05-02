import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStart, updateSuccess, updateFailure } from '../src/features/users/userSlice';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ToastAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { ID } from 'react-native-appwrite';
import { AppwriteClientFactory } from '../appwrite-client';

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
  const [debugInfo, setDebugInfo] = useState<string>('');
  
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
      setDebugInfo(errorMsg);
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

  const handleImageChange = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets[0].uri) {
        setImageFileUploading(true);
        setUploadImageError(null);
        try {
          const fileUrl = await uploadImageAsync(result.assets[0]);
          setImageFileUrl(fileUrl.href);
          setFormData(prev => ({ ...prev, profilePicture: fileUrl.href }));
          ToastAndroid.show('Profile picture uploaded successfully', ToastAndroid.SHORT);
        } catch (error) {
          ToastAndroid.show('Image upload failed', ToastAndroid.SHORT);
        } finally {
          setImageFileUploading(false);
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
      const res = await fetch(`http://192.168.201.105:3000/api/user/update/${currentUser._id}`, {
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
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';

  return (
    <View className={`flex-1 ${bgColor}`}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView className="flex-1 p-4">
        {/* Profile Picture */}
        <View className="items-center my-6">
          <TouchableOpacity 
            onPress={handleImageChange}
            disabled={imageFileUploading}
            className="relative"
          >
            <View className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600 overflow-hidden">
              <Image
                source={{ uri: imageFileUrl || 'https://via.placeholder.com/150' }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black/30 items-center justify-center opacity-0 hover:opacity-100">
                <Text className="text-slate-950 font-medium">Change Photo</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          {imageFileUploading && (
            <Text className="mt-2 text-sm text-blue-600">Uploading image...</Text>
          )}
          {uploadImageError && (
            <Text className="mt-2 text-sm text-red-600">{uploadImageError}</Text>
          )}

          
        </View>

        {/* Edit Form */}
        <View className="space-y-4">
          {/* Username */}
          <View>
            <Text className={`text-sm mb-1 ${textColor}`}>Username</Text>
            <TextInput
              value={formData.username}
              onChangeText={(text) => handleChange('username', text)}
              className={`p-3 rounded-lg ${inputBg} ${textColor}`}
              placeholder="Username"
              placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
            />
          </View>

          {/* Email */}
          <View>
            <Text className={`text-sm mb-1 ${textColor}`}>Email</Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              className={`p-3 rounded-lg ${inputBg} ${textColor}`}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
            />
          </View>

          {/* Password */}
          <View>
            <Text className={`text-sm mb-1 ${textColor}`}>Password</Text>
            <View className={`flex-row items-center p-3 rounded-lg ${inputBg}`}>
              <TextInput
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                className={`flex-1 ${textColor}`}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                />
              </TouchableOpacity>
            </View>
            <Text className={`text-xs mt-1 ${textColor} opacity-70`}>
              Leave blank to keep current password
            </Text>
          </View>

          {/* Save Button */}
          <View className="flex-row justify-end gap-4 pt-4">
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading || imageFileUploading}
              className={`px-6 py-3 rounded-lg ${loading || imageFileUploading ? 'bg-blue-400' : 'bg-blue-500'}`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold">Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;