import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StatusBar, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AntDesign, MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {  Pressable, } from 'react-native';
import { Link, router, Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SkeletonLoader = ({ theme }: { theme: 'light' | 'dark' }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-gray-800' : 'bg-gray-200';
  
  return (
    <View className="space-y-4">
      {/* Welcome Skeleton */}
      <View className={`h-8 w-3/4 rounded-lg ${bgColor}`} />
      
      {/* Cards Skeleton */}
      {[1, 2, 3, 4].map((item) => (
        <View key={item} className={`p-5 rounded-xl mt-5 ${bgColor}`}>
          <View className="flex-row items-center">
            <View className={`w-12 h-12 rounded-lg ${bgColor}`} />
            <View className="flex-1 ml-4 space-y-2">
              <View className={`h-4 w-2/3 rounded ${bgColor}`} />
              <View className={`h-3 w-full rounded ${bgColor}`} />
            </View>
          </View>
        </View>
      ))}
      
      {/* Stats Skeleton */}
      <View className={`p-5 rounded-xl ${bgColor}`}>
        <View className={`h-5 w-1/3 rounded ${bgColor}`} />
        <View className="flex-row justify-between mt-4">
          {[1, 2, 3].map((item) => (
            <View key={item} className="items-center">
              <View className={`h-8 w-8 rounded-full ${bgColor}`} />
              <View className={`h-3 w-16 mt-2 rounded ${bgColor}`} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const DashboardCard = ({ 
  title, 
  description, 
  icon, 
  onPress,
  theme 
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
  theme: 'light' | 'dark';
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`p-5 rounded-xl mb-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
    activeOpacity={0.8}
  >
    <View className="flex-row items-center">
      <View className={`p-3 rounded-lg mr-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
        {icon}
      </View>
      <View className="flex-1">
        <Text 
          className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          style={{ fontFamily: 'Inter_600SemiBold' }}
        >
          {title}
        </Text>
        <Text 
          className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          style={{ fontFamily: 'Inter_400Regular' }}
        >
          {description}
        </Text>
      </View>
      <AntDesign 
        name="right" 
        size={18} 
        color={theme === 'dark' ? '#9ca3af' : '#6b7280'} 
      />
    </View>
  </TouchableOpacity>
);

const MemberContent = ({ theme, user, refreshing }: { theme: 'light' | 'dark'; user: any; refreshing: boolean }) => {
  const isDark = theme === 'dark';
  const [dailyMessage, setDailyMessage] = useState<any>(null);
  const [announcement, setAnnouncement] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      
      // Fetch daily bible message (only first one)
      const messageResponse = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/get-daily-bible-message`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const messageData = await messageResponse.json();
      if (messageResponse.ok) {
        setDailyMessage(Array.isArray(messageData.dailyBibleMessage) ? messageData.dailyBibleMessage[0] : messageData.dailyBibleMessage);
      } else {
        throw new Error(messageData.message || 'Failed to fetch daily message');
      }

      // Fetch announcements (only first one)
      const announcementResponse = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/announcement/get`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const announcementData = await announcementResponse.json();
      if (announcementResponse.ok) {
        setAnnouncement(Array.isArray(announcementData) ? announcementData[0] : announcementData);
      } else {
        throw new Error(announcementData.message || 'Failed to fetch announcements');
      }

      // Fetch events (only first one)
      const eventResponse = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/event/get`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const eventData = await eventResponse.json();
      if (eventResponse.ok) {
        setEvent(Array.isArray(eventData.data) ? eventData.data[0] : eventData.data);
      } else {
        throw new Error(eventData.message || 'Failed to fetch events');
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch content');
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchContent();
    }
  }, [refreshing]);

  const formatEventDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number = 100): string => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (refreshing || loading) {
    return (
      <View className="flex-1 items-center justify-center py-10 bg-gray-50 dark:bg-gray-900">
        <ActivityIndicator size="large" color={isDark ? "#3b82f6" : "#2563eb"} />
        <Text className={`text-lg mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading content...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center py-10 bg-gray-50 dark:bg-gray-900">
        <Text className={`text-lg ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </Text>
        <Pressable
          onPress={() => {
            setError(null);
            fetchContent();
          }}
          className={`mt-4 px-4 py-2 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
        >
          <Text className="text-white">Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView 
      className={`flex-1 pb-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with greeting */}
      <View className={`px-6 pt-6 pb-4 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-b-3xl shadow-lg`}>
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
            </Text>
            <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </Text>
          </View>
          {user?.profilePicture ? (
            <Image 
              source={{ uri: user.profilePicture }}
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            />
          ) : (
            <View className="w-12 h-12 rounded-full bg-blue-500 items-center justify-center">
              <Text className="text-white font-bold text-xl">
                {user?.username?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        
        <Text className={`text-xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Welcome back, {user?.username?.split(' ')[0] || 'Friend'}!
        </Text>
        <Text className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Here's what's happening in our community.
        </Text>
      </View>

      {/* Daily Bible Message */}
      {dailyMessage && (
  <View className="px-6 mt-6">
    <View className="flex-row justify-between items-center mb-3">
      <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Daily Bible Message
      </Text>
      <Link href="/dailymessage" asChild>
        <Pressable>
          <Text className="text-sm text-purple-500 font-medium">View All</Text>
        </Pressable>
      </Link>
    </View>

    <Link href={`/daily-message/${dailyMessage._id}`} asChild>
      <Pressable>
        <View className="rounded-2xl overflow-hidden">
          {dailyMessage.imageUrl ? (
            <Image
              source={{ uri: dailyMessage.imageUrl }}
              className="w-full h-48"
              resizeMode="cover"
            />
          ) : (
            <View className={`w-full h-48 ${isDark ? 'bg-purple-900' : 'bg-purple-100'} items-center justify-center`}>
              <Feather
                name="book"
                size={48}
                color={isDark ? '#d8b4fe' : '#7e22ce'}
              />
            </View>
          )}
          <View className={`absolute bottom-0 left-0 right-0 p-4 ${isDark ? 'bg-gray-900/90' : 'bg-white/90'}`}>
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {dailyMessage.title}
            </Text>
            <Text className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {truncateText(dailyMessage.content, 90)}
            </Text>
          </View>

          <View className={`absolute top-2 right-2 px-2 py-1 rounded-full ${isDark ? 'bg-purple-700/90' : 'bg-purple-600/90'}`}>
            <Text className="text-white text-xs font-medium">Today</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  </View>
)}


      {/* Featured Event */}
      {event && (
  <View className="px-6 mt-6">
    {/* Section header with View All */}
    <View className="flex-row justify-between items-center mb-3">
      <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Featured Event
      </Text>
      <Link href="/events" asChild>
        <Pressable>
          <Text className="text-sm text-blue-500 font-medium">View All</Text>
        </Pressable>
      </Link>
    </View>

    {/* Single Featured Event Card */}
    <Link href={`/event/${event._id}`} asChild>
      <Pressable>
        <View className="rounded-2xl overflow-hidden">
          {/* Image or fallback icon */}
          {event.imageUrl ? (
            <Image 
              source={{ uri: event.imageUrl }}
              className="w-full h-48"
              resizeMode="cover"
            />
          ) : (
            <View className={`w-full h-48 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} items-center justify-center`}>
              <MaterialIcons 
                name="event" 
                size={48} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
              />
            </View>
          )}

          {/* Overlay content */}
          <View className={`absolute bottom-0 left-0 right-0 p-4 ${isDark ? 'bg-gray-900/90' : 'bg-white/90'}`}>
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {event.title}
            </Text>
            <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
              {formatEventDate(event.date)} • {event.location}
            </Text>
          </View>

          {/* Badge */}
          <View className={`absolute top-2 right-2 px-2 py-1 rounded-full ${isDark ? 'bg-blue-600/90' : 'bg-blue-500/90'}`}>
            <Text className="text-white text-xs font-medium">Upcoming</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  </View>
)}


      {/* Announcement Section */}
      {announcement && (
        <View className="px-6 mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Latest Announcement
            </Text>
            <Link href="/announcements" asChild>
              <Pressable>
                <Text className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                  View All
                </Text>
              </Pressable>
            </Link>
          </View>
          
          <Link key={announcement._id} href={`/announcement/${announcement._id}`} asChild>
            <Pressable className={`p-5 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm border-l-4 ${isDark ? 'border-yellow-600' : 'border-yellow-500'}`}>
              <View className="flex-row items-start">
                <View className={`p-2 rounded-lg ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'} mr-3`}>
                  <Feather 
                    name="bell" 
                    size={18} 
                    color={isDark ? '#f59e0b' : '#d97706'} 
                  />
                </View>
                <View className="flex-1">
                  <Text className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {announcement.title}
                  </Text>
                  <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                    {truncateText(announcement.description)}
                  </Text>
                  <Text className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {formatEventDate(announcement.date)} • Posted by {announcement.username}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Link>
        </View>
      )}

      {/* Empty state messages */}
      {!dailyMessage && !event && !announcement && (
        <View className="px-6 mt-8">
          <Text className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center`}>
            No content available at the moment
          </Text>
        </View>
      )}
    </ScrollView>
  );
};






const AdminDashboard = ({ theme, refreshing }: { theme: 'light' | 'dark'; refreshing?: boolean }) => {
  const isDark = theme === 'dark';

  if (refreshing) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Refreshing dashboard...
        </Text>
      </View>
    );
  }

  return (
    <>
      <View className="mb-6">
        <Text 
          className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{ fontFamily: 'Inter_900Black' }}
        >
          Admin Dashboard
        </Text>
        <Text 
          className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          style={{ fontFamily: 'Inter_400Regular' }}
        >
          Manage church activities and content
        </Text>
      </View>

      <DashboardCard
        title="Daily Bible Message"
        description="Post today's scripture and reflection"
        icon={<MaterialIcons name="menu-book" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
        onPress={() => router.push('/dailybiblemessage')}
        theme={theme}
      />

      <DashboardCard
        title="Comment Page"
        description="Moderate comments on daily messages"
        icon={<FontAwesome name="comments" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
        onPress={() => router.push('/comment')}
        theme={theme}
      />

      <DashboardCard
        title="Broadcast"
        description="Send messages to congregation"
        icon={<Ionicons name="megaphone" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
        onPress={() => router.push('/broadcast')}
        theme={theme}
      />

      <DashboardCard
        title="Announcements"
        description="Create and manage church announcements"
        icon={<Feather name="bell" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
        onPress={() => router.push('/announcement')}
        theme={theme}
      />

      <DashboardCard
        title="Upcoming Events"
        description="Schedule and promote church events"
        icon={<MaterialIcons name="event" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
        onPress={() => router.push('/upcomingevent')}
        theme={theme}
      />
      <DashboardCard
        title="Users"
        description="Schedule and promote church events"
        icon={<MaterialIcons name="group" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
        onPress={() => router.push('/users')}
        theme={theme}
      />
      <DashboardCard
        title="Church Tithe Records"
        description="Manage member financial records"
        icon={<Feather name="book" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
        onPress={() => router.push('/accountrecords')}
        theme={theme}
      />
      

      {/* Stats Section */}
      <View className={`mt-8 p-5 rounded-xl mb-2 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <Text 
          className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{ fontFamily: 'Inter_600SemiBold' }}
        >
          Quick Stats
        </Text>
        
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>24</Text>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>New Messages</Text>
          </View>
          <View className="items-center">
            <Text className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>5</Text>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pending Events</Text>
          </View>
          <View className="items-center">
            <Text className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>12</Text>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Comments</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const home = () => {
  const { theme } = useSelector((state: any) => state.theme);
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const isDark = theme === 'dark';
  const [refreshing, setRefreshing] = useState(false);

  if (!currentUser) {
    return <Redirect href="/welcome" />;
  }
    

  // Determine which dashboard to show
  const showAdminDashboard = currentUser?.isAdmin || currentUser?.isPastor || currentUser?.isDeptHead;
  const showMemberContent = currentUser?.isMember && !showAdminDashboard;

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request
    MemberContent({ theme, user: currentUser, refreshing })
  };
 

  return (
    <SafeAreaProvider>
      <SafeAreaView 
        edges={['top']}
        className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#111827' : '#ffffff'} />
        <ScrollView 
          className="flex-1 p-5" 
          contentContainerStyle={{ paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[isDark ? '#3b82f6' : '#2563eb']}
              tintColor={isDark ? '#3b82f6' : '#2563eb'}
            />
          }
        >
          {refreshing ? (
            <SkeletonLoader theme={theme} />
          ) : (
            <>
              
              {showAdminDashboard ? (
                <>
                  <AdminDashboard theme={theme} />
                  <MemberContent theme={theme} user={currentUser} refreshing={refreshing} />
                </>
              ) : showMemberContent ? (
                <MemberContent theme={theme} user={currentUser} refreshing={refreshing} />
              ) : (
                <View className="items-center justify-center py-10">
                  <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Loading user information...
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default home;