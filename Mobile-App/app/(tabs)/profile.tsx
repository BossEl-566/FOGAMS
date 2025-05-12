import { View, Text, TouchableOpacity, Image, ScrollView, Switch, Modal, Pressable, SafeAreaView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../../src/features/users/userSlice';
import { toggleTheme } from '../../src/features/theme/themeSlice';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_900Black, Inter_600SemiBold, Inter_400Regular } from '@expo-google-fonts/inter';
import { ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const router = useRouter();
  const { theme } = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();
  const [image, setImage] = useState(currentUser?.profilePicture || null);
  const [uploading, setUploading] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_600SemiBold,
    Inter_400Regular,
  });

  if (!fontsLoaded || !currentUser) {
    return null;
  }
 
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Simulate a network request or any async operation
      // In a real app, you might fetch the latest user data here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration, we'll just show a toast
      ToastAndroid.show('Profile refreshed!', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Refresh failed', ToastAndroid.SHORT);
    } finally {
      setRefreshing(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUploading(true);
      setImage(result.assets[0].uri);
      setTimeout(() => {
        setUploading(false);
        ToastAndroid.show('Profile picture updated!', ToastAndroid.SHORT);
      }, 1500);
    }
  };
 
  const handleSignOut = async () => {
    setShowSignOutModal(false);
    try {
      dispatch(signoutSuccess());
        ToastAndroid.show('Signed out successfully', ToastAndroid.SHORT);
        router.replace('./welcome');
      const res = await fetch('http://192.168.106.105/api/user/signout', {
        method: 'POST',
      });

      if (res.ok) {
        dispatch(signoutSuccess());
        ToastAndroid.show('Signed out successfully', ToastAndroid.SHORT);
        router.replace('/welcome');
      } else {
        const error = await res.json();
        ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
      }
    } catch (err) {
      ToastAndroid.show('Sign out failed. Please try again.', ToastAndroid.SHORT);
      console.error('Sign out error:', err);
    }
  };

  const containerStyles = theme === 'dark' 
    ? 'bg-gray-900' 
    : 'bg-gray-50';
  
  const cardStyles = theme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';
  
  const textStyles = theme === 'dark' 
    ? 'text-white' 
    : 'text-gray-900';
  
  const secondaryTextStyles = theme === 'dark' 
    ? 'text-gray-300' 
    : 'text-gray-600';

  const modalBg = theme === 'dark' ? 'bg-black/70' : 'bg-black/50';
  const modalContent = theme === 'dark' ? 'bg-gray-800' : 'bg-white';

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <LinearGradient
        colors={theme === 'dark' ? ['#1f2937', '#111827'] : ['#f8fafc', '#e2e8f0']}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingBottom: 40 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={theme === 'dark' ? ['#3b82f6'] : ['#2563eb']}
              tintColor={theme === 'dark' ? '#3b82f6' : '#2563eb'}
            />
          }
        >
          {/* Header */}
          <View className="items-center pt-12 pb-6 px-6">
            <TouchableOpacity 
              onPress={pickImage}
              className="relative mb-4"
            >
              <Image
                source={{ uri: image || 'https://via.placeholder.com/150' }}
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
              {uploading && (
                <View className="absolute inset-0 bg-black bg-opacity-50 rounded-full items-center justify-center">
                  <Text className="text-white">Uploading...</Text>
                </View>
              )}
              <View className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
                <Feather name="edit-2" size={16} color="white" />
              </View>
            </TouchableOpacity>
            
            <Text style={{ fontFamily: 'Inter_900Black' }} className={`text-2xl ${textStyles}`}>
              {currentUser.username}
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular' }} className={`text-sm ${secondaryTextStyles}`}>
              {currentUser.email}
            </Text>
          </View>

          {/* Profile Sections */}
          <View className="px-6 mt-6">
            {/* Account Settings */}
            <View className={`mb-6 rounded-xl border ${cardStyles}`}>
              <Text style={{ fontFamily: 'Inter_600SemiBold' }} className={`px-4 pt-4 pb-2 ${textStyles}`}>
                Account Settings
              </Text>
              
              <TouchableOpacity className={`flex-row items-center px-4 py-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} onPress={() => router.push('/edit-profile')}>
                <Ionicons name="person-outline" size={20} color={theme === 'dark' ? 'white' : 'gray'} />
                <Text style={{ fontFamily: 'Inter_400Regular' }} className={`ml-3 flex-1 ${textStyles}`}>
                  Edit Profile
                </Text>
                <AntDesign name="right" size={16} color={theme === 'dark' ? 'gray' : 'gray'} />
              </TouchableOpacity>
              
              <TouchableOpacity className={`flex-row items-center px-4 py-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} onPress={() => router.push('/edit-profile')}>
                <Ionicons name="lock-closed-outline" size={20} color={theme === 'dark' ? 'white' : 'gray'} />
                <Text style={{ fontFamily: 'Inter_400Regular' }} className={`ml-3 flex-1 ${textStyles}`}>
                  Change Password
                </Text>
                <AntDesign name="right" size={16} color={theme === 'dark' ? 'gray' : 'gray'} />
              </TouchableOpacity>
            </View>

            {/* App Settings */}
            <View className={`mb-6 rounded-xl border ${cardStyles}`}>
              <Text style={{ fontFamily: 'Inter_600SemiBold' }} className={`px-4 pt-4 pb-2 ${textStyles}`}>
                App Settings
              </Text>
              
              <View className={`flex-row items-center justify-between px-4 py-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <View className="flex-row items-center">
                  <Ionicons name="moon-outline" size={20} color={theme === 'dark' ? 'white' : 'gray'} />
                  <Text style={{ fontFamily: 'Inter_400Regular' }} className={`ml-3 ${textStyles}`}>
                    Dark Mode
                  </Text>
                </View>
                <Switch
                  value={theme === 'dark'}
                  onValueChange={(value) => dispatch(toggleTheme())}
                  trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                  thumbColor={theme === 'dark' ? '#f8fafc' : '#f8fafc'}
                />
              </View>
              
              <TouchableOpacity className={`flex-row items-center px-4 py-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <Ionicons name="notifications-outline" size={20} color={theme === 'dark' ? 'white' : 'gray'} />
                <Text style={{ fontFamily: 'Inter_400Regular' }} className={`ml-3 flex-1 ${textStyles}`}>
                  Notifications
                </Text>
                <AntDesign name="right" size={16} color={theme === 'dark' ? 'gray' : 'gray'} />
              </TouchableOpacity>
            </View>

            {/* Support & About */}
            <View className={`mb-6 rounded-xl border ${cardStyles}`}>
              <Text style={{ fontFamily: 'Inter_600SemiBold' }} className={`px-4 pt-4 pb-2 ${textStyles}`}>
                Support & About
              </Text>
              
              <TouchableOpacity className={`flex-row items-center px-4 py-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <Ionicons name="help-circle-outline" size={20} color={theme === 'dark' ? 'white' : 'gray'} />
                <Text style={{ fontFamily: 'Inter_400Regular' }} className={`ml-3 flex-1 ${textStyles}`}>
                  Help & Support
                </Text>
                <AntDesign name="right" size={16} color={theme === 'dark' ? 'gray' : 'gray'} />
              </TouchableOpacity>
              
              <TouchableOpacity className={`flex-row items-center px-4 py-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <Ionicons name="information-circle-outline" size={20} color={theme === 'dark' ? 'white' : 'gray'} />
                <Text style={{ fontFamily: 'Inter_400Regular' }} className={`ml-3 flex-1 ${textStyles}`}>
                  About App
                </Text>
                <AntDesign name="right" size={16} color={theme === 'dark' ? 'gray' : 'gray'} />
              </TouchableOpacity>
            </View>

            {/* Sign Out Button */}
            <TouchableOpacity 
              onPress={() => setShowSignOutModal(true)}
              className="bg-red-500 py-4 rounded-xl items-center justify-center mt-6"
            >
              <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-white text-lg">
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Sign Out Confirmation Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showSignOutModal}
          onRequestClose={() => setShowSignOutModal(false)}
        >
          <Pressable 
            className={`flex-1 justify-center items-center ${modalBg}`}
            onPress={() => setShowSignOutModal(false)}
          >
            <Pressable className={`w-4/5 rounded-xl p-6 ${modalContent}`}>
              <Text style={{ fontFamily: 'Inter_600SemiBold' }} className={`text-xl mb-4 ${textStyles}`}>
                Sign Out
              </Text>
              <Text style={{ fontFamily: 'Inter_400Regular' }} className={`text-base mb-6 ${secondaryTextStyles}`}>
                Are you sure you want to sign out?
              </Text>
              
              <View className="flex-row justify-end space-x-4">
                <TouchableOpacity
                  onPress={() => setShowSignOutModal(false)}
                  className="px-5 py-2 rounded-lg border border-gray-300 mr-4"
                >
                  <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-gray-700 dark:text-gray-300">
                    Cancel
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={handleSignOut}
                  className="px-5 py-2 rounded-lg bg-red-500"
                >
                  <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-white">
                    Sign Out
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Profile;