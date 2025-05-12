import { 
    View, 
    ScrollView, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator, 
    Image, 
    Platform,
    Text,
    ToastAndroid 
  } from 'react-native';
  import { useState } from 'react';
  import Toast from 'react-native-toast-message';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import { useSelector } from 'react-redux';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { AntDesign } from '@expo/vector-icons';
  import * as ImagePicker from 'expo-image-picker';
  import { ID } from 'react-native-appwrite';
  import { AppwriteClientFactory } from '../appwrite-client';
import React from 'react';
  
  const storage = AppwriteClientFactory.getInstance().storage;
  
  const CreateEvent = () => {
    const { currentUser } = useSelector((state: any) => state.user);
    const { theme } = useSelector((state: any) => state.theme);
    
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      date: new Date(),
      location: '',
      imageUrl: null as string | null,
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadImageError, setUploadImageError] = useState<string | null>(null);
  
    // Theme colors
    const colors = {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      input: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
      placeholder: theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500',
      button: theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600',
      border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    };
  
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
        console.error('File preparation failed:', error);
        throw error;
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
        
        const fileUrl = storage.getFileView(
          process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
          response.$id
        );
  
        return fileUrl.href;
      } catch (error: any) {
        console.error('Upload failed:', error);
        setUploadImageError(error.message);
        throw error;
      }
    }
  
    const pickImage = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled && result.assets && result.assets[0].uri) {
          setImageUploading(true);
          setUploadImageError(null);
          try {
            const fileUrl = await uploadImageAsync(result.assets[0]);
            setFormData(prev => ({ ...prev, imageUrl: fileUrl }));
            ToastAndroid.show('Image uploaded successfully', ToastAndroid.SHORT);
          } catch (error) {
            ToastAndroid.show('Image upload failed', ToastAndroid.SHORT);
          } finally {
            setImageUploading(false);
          }
        }
      } catch (error) {
        console.log('Image picker error:', error);
        ToastAndroid.show('Failed to pick image', ToastAndroid.SHORT);
      }
    };
  
    const handleChange = (name: string, value: string | Date) => {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleDateChange = (event: any, selectedDate?: Date) => {
      setShowDatePicker(false);
      if (selectedDate) {
        handleChange('date', selectedDate);
      }
    };
  
    const handleSubmit = async () => {
      if (!currentUser?.isAdmin) {
        Toast.show({
          type: 'error',
          text1: 'Unauthorized',
          text2: 'Only admins can create events',
        });
        return;
      }
  
      if (!formData.title || !formData.description || !formData.date || !formData.location) {
        Toast.show({
          type: 'error',
          text1: 'Validation Error',
          text2: 'All fields are required except image',
        });
        return;
      }
  
      if (imageUploading) {
        ToastAndroid.show('Please wait for image upload to complete', ToastAndroid.SHORT);
        return;
      }
  
      setIsSubmitting(true);
  
      try {
        const token = await AsyncStorage.getItem('token');
        
        const eventData = {
          title: formData.title,
          description: formData.description,
          date: formData.date.toISOString(),
          location: formData.location,
          imageUrl: formData.imageUrl || undefined,
        };
  
        const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/event/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Failed to create event');
        }
  
        Toast.show({
          type: 'success',
          text1: 'Event Created',
          text2: 'Your event has been created successfully!',
        });
  
        // Reset form
        setFormData({
          title: '',
          description: '',
          date: new Date(),
          location: '',
          imageUrl: null,
        });
  
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Creation Failed',
          text2: error.message || 'Failed to create event',
        });
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    return (
      <ScrollView className={`flex-1 ${colors.background} p-4`}>
        <Text className={`text-2xl font-bold ${colors.text} mb-6`}>Create New Event</Text>
  
        <View className={`${colors.card} rounded-xl shadow-md p-6 mb-6`}>
          {/* Title Input */}
          <TextInput
            placeholder="Event Title"
            placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={formData.title}
            onChangeText={(text) => handleChange('title', text)}
            className={`${colors.input} rounded-lg p-3 mb-4 ${colors.text}`}
          />
  
          {/* Description Input */}
          <TextInput
            placeholder="Event Description"
            placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={formData.description}
            onChangeText={(text) => handleChange('description', text)}
            multiline
            numberOfLines={4}
            className={`${colors.input} rounded-lg p-3 mb-4 ${colors.text} h-32`}
          />
  
          {/* Location Input */}
          <TextInput
            placeholder="Event Location"
            placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={formData.location}
            onChangeText={(text) => handleChange('location', text)}
            className={`${colors.input} rounded-lg p-3 mb-4 ${colors.text}`}
          />
  
          {/* Date Picker */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className={`${colors.input} rounded-lg p-3 mb-6`}
          >
            <Text className={colors.text}>
              {formData.date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={formData.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              themeVariant={theme === 'dark' ? 'dark' : 'light'}
            />
          )}
  
          {/* Image Upload */}
          <TouchableOpacity
            onPress={pickImage}
            disabled={imageUploading}
            className={`${colors.input} rounded-lg p-4 items-center mb-4 ${imageUploading ? 'opacity-50' : ''}`}
          >
            {imageUploading ? (
              <ActivityIndicator color={theme === 'dark' ? '#ffffff' : '#000000'} />
            ) : (
              <>
                <AntDesign
                  name="picture"
                  size={24}
                  color={theme === 'dark' ? '#3b82f6' : '#2563eb'}
                  style={{ marginBottom: 8 }}
                />
                <Text className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {formData.imageUrl ? 'Change Image' : 'Add Event Image (Optional)'}
                </Text>
              </>
            )}
          </TouchableOpacity>
  
          {uploadImageError && (
            <Text className={`text-red-500 text-sm mb-4`}>{uploadImageError}</Text>
          )}
  
          {formData.imageUrl && (
            <View className="mb-6 items-center">
              <Image
                source={{ uri: formData.imageUrl }}
                style={{ width: '100%', height: 200, borderRadius: 8 }}
                resizeMode="cover"
              />
            </View>
          )}
  
          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting || imageUploading}
            className={`${colors.button} rounded-lg p-4 items-center ${isSubmitting || imageUploading ? 'opacity-50' : ''}`}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold">Create Event</Text>
            )}
          </TouchableOpacity>
        </View>
        
        <Toast />
      </ScrollView>
    );
  };
  
  export default CreateEvent;