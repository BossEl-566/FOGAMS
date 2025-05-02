import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl, Image, Modal, Text, Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import type { RootState } from '../src/store/store'; // Adjust import path as needed

interface Member {
  _id: string;
  userId: string;
  fullname: string;
  email: string;
  username: string;
  profilePicture: string;
  birthDay?: string;
  birthMonth?: string;
  isAdmin: boolean;
  isPastor: boolean;
  isDeptHead: boolean;
  isMember: boolean;
  member: boolean;
}

const UsersScreen = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { theme: appTheme } = useSelector((state: RootState) => state.theme);
  const [members, setMembers] = useState<Member[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.95))[0];

  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    if (currentUser?.isAdmin) {
      fetchData();
    }
  }, [currentUser?._id]);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const [membersRes, usersRes] = await Promise.all([
        fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/membership/get`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/user/getusers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      
      const [membersData, usersData] = await Promise.all([
        membersRes.json(),
        usersRes.json()
      ]);
      
      if (membersRes.ok && usersRes.ok) {
        const activeMembers = membersData.filter((member: Member) => member.member);
        const combinedData = activeMembers.map((member: Member) => {
          const user = usersData.users.find((u: any) => u._id === member.userId);
          return {
            ...member,
            profilePicture: user?.profilePicture || 'https://i.imgur.com/0LKZQYM.png',
            username: user?.username || '',
            isAdmin: user?.isAdmin || false,
            isPastor: user?.isPastor || false,
            isDeptHead: user?.isDeptHead || false,
            isMember: user?.isMember || false
          };
        });
        
        setMembers(combinedData);
        setUsers(usersData.users);
        setShowMore(combinedData.length >= 9);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch data',
        position: 'bottom',
      });
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleShowMore = async () => {
    Haptics.selectionAsync();
    const startIndex = members.length;
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/membership?startIndex=${startIndex}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const newMembers = data.filter((member: Member) => member.member);
        setMembers(prev => [...prev, ...newMembers]);
        setShowMore(newMembers.length >= 9);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load more members',
        position: 'bottom',
      });
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${process.env.EXPO_PUBLIC_IP}/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMembers(prev => prev.filter(member => member.userId !== userIdToDelete));
        setShowModal(false);
        Toast.show({
          type: 'success',
          text1: 'User deleted successfully',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: data.message || 'Failed to delete user',
          position: 'bottom',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error deleting user',
        position: 'bottom',
      });
      console.error(error);
    }
  };

  const filteredMembers = members.filter(member => 
    member.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderMemberCard = ({ item, index }: { item: Member, index: number }) => {
    const cardAnim = new Animated.Value(0);
    
    Animated.spring(cardAnim, {
      toValue: 1,
      delay: index * 50,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View
        className="mb-4"
        style={{
          transform: [{ scale: cardAnim }],
          opacity: cardAnim,
        }}
      >
        <View className={`rounded-2xl overflow-hidden ${appTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <View className="items-center p-5">
            <View className="relative mb-4">
              <Image
                source={{ uri: item.profilePicture }}
                className="w-24 h-24 rounded-full border-2"
                style={{ borderColor: appTheme === 'dark' ? '#6366f1' : '#4f46e5' }}
                defaultSource={{ uri: 'https://i.imgur.com/0LKZQYM.png' }}
              />
              {item.isAdmin && (
                <View className="absolute bottom-0 right-0 bg-indigo-500 rounded-xl p-1">
                  <Feather name="shield" size={16} color="white" />
                </View>
              )}
            </View>
            
            <Text className={`text-lg font-semibold text-center ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1`}>
              {item.fullname}
            </Text>
            
            <Text className={`text-sm text-center ${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
              {item.email}
            </Text>
            
            {item.birthDay && item.birthMonth && (
              <View className="flex-row items-center mb-4">
                <Feather name="gift" size={14} color={appTheme === 'dark' ? '#9ca3af' : '#6b7280'} />
                <Text className={`text-xs ml-1 ${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.birthMonth}/{item.birthDay}
                </Text>
              </View>
            )}

            <View className="flex-row flex-wrap justify-center mb-4 gap-2">
              {item.isPastor && (
                <View className="flex-row items-center px-3 py-1 rounded-full bg-purple-600">
                  <Feather name="cross" size={12} color="white" />
                  <Text className="text-white text-xs ml-1">Pastor</Text>
                </View>
              )}
              {item.isDeptHead && (
                <View className="flex-row items-center px-3 py-1 rounded-full bg-pink-600">
                  <Feather name="award" size={12} color="white" />
                  <Text className="text-white text-xs ml-1">Dept Head</Text>
                </View>
              )}
              <View className="flex-row items-center px-3 py-1 rounded-full bg-emerald-600">
                <Feather name="user" size={12} color="white" />
                <Text className="text-white text-xs ml-1">Member</Text>
              </View>
            </View>

            <View className="flex-row justify-center mt-2 gap-3">
              <TouchableOpacity
                className="flex-row items-center px-4 py-2.5 rounded-lg bg-indigo-600"
                onPress={() => {
                  Haptics.selectionAsync();
                  console.log('Edit member', item);
                }}
                activeOpacity={0.8}
              >
                <Feather name="edit-2" size={16} color="white" />
                <Text className="text-white ml-2">Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-row items-center px-4 py-2.5 rounded-lg bg-red-600"
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setShowModal(true);
                  setUserIdToDelete(item.userId);
                }}
                activeOpacity={0.8}
              >
                <Feather name="trash-2" size={16} color="white" />
                <Text className="text-white ml-2">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View className={`flex-1 justify-center items-center ${appTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <ActivityIndicator size="large" color={appTheme === 'dark' ? '#6366f1' : '#4f46e5'} />
      </View>
    );
  }

  return (
    <Animated.View 
      className={`flex-1 ${appTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[appTheme === 'dark' ? '#6366f1' : '#4f46e5']}
            tintColor={appTheme === 'dark' ? '#6366f1' : '#4f46e5'}
            progressBackgroundColor={appTheme === 'dark' ? '#1f2937' : '#f9fafb'}
          />
        }
        contentContainerClassName="p-4"
      >
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Text className={`text-3xl font-extrabold ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'} mr-3`}>
              Church Members
            </Text>
            <View className="bg-indigo-600 rounded-xl px-3 py-1">
              <Text className="text-white font-medium">
                {members.length} members
              </Text>
            </View>
          </View>
          
          <Text className={`text-base ${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage all active members of the church
          </Text>
        </View>

        <View className={`rounded-2xl overflow-hidden ${appTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-5`}>
          <View className="p-4">
            <View className={`flex-row items-center rounded-xl px-3 ${appTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Feather name="search" size={20} color={appTheme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <TextInput
                placeholder="Search members..."
                placeholderTextColor={appTheme === 'dark' ? '#9ca3af' : '#6b7280'}
                value={searchTerm}
                onChangeText={setSearchTerm}
                className={`flex-1 ml-2 ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                underlineColorAndroid="transparent"
                selectionColor={appTheme === 'dark' ? '#6366f1' : '#4f46e5'}
                style={{
                  backgroundColor: 'transparent',
                  height: 48,
                }}
              />
              {searchTerm.length > 0 && (
                <TouchableOpacity onPress={() => setSearchTerm('')}>
                  <Feather name="x" size={20} color={appTheme === 'dark' ? '#9ca3af' : '#6b7280'} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {filteredMembers.length > 0 ? (
          <FlatList
            data={filteredMembers}
            renderItem={renderMemberCard}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            nestedScrollEnabled
            contentContainerClassName="pb-4"
          />
        ) : (
          <View className={`rounded-2xl items-center p-8 ${appTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} mt-4`}>
            <Feather 
              name="users" 
              size={48} 
              color={appTheme === 'dark' ? '#9ca3af' : '#6b7280'} 
              className="mb-4"
            />
            <Text className={`text-lg font-semibold text-center ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
              {searchTerm ? 'No matching members found' : 'No members yet'}
            </Text>
            <Text className={`text-sm text-center ${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {searchTerm ? 'Try a different search term' : 'Add your first member'}
            </Text>
          </View>
        )}

        {showMore && (
          <TouchableOpacity
            className={`py-3 px-4 rounded-lg items-center mt-4 ${appTheme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-600'}`}
            onPress={handleShowMore}
            activeOpacity={0.8}
          >
            <Text className="text-white font-medium">Load More Members</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/70">
          <View className={`rounded-2xl w-[90%] max-w-md ${appTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <View className="items-center mb-4">
              <MaterialCommunityIcons 
                name="alert-circle-outline" 
                size={48} 
                color="#ef4444" 
              />
            </View>
            <Text className={`text-lg font-semibold text-center ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>
              Are you sure you want to delete this member?
            </Text>
            <View className="flex-row justify-center mt-5 gap-4">
              <TouchableOpacity
                className="flex-1 py-2.5 px-4 rounded-lg bg-red-600"
                onPress={handleDeleteUser}
                activeOpacity={0.8}
              >
                <Text className="text-white font-medium text-center">Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-2.5 px-4 rounded-lg ${appTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}
                onPress={() => setShowModal(false)}
                activeOpacity={0.8}
              >
                <Text className={`font-medium text-center ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </Animated.View>
  );
};

export default UsersScreen;