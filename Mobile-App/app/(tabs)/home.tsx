import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StatusBar, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AntDesign, MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {  Pressable, } from 'react-native';
import { Link, router } from 'expo-router';


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
  
  // Mock data
  const posts = [
    { 
      id: 1, 
      title: 'Sunday Service', 
      content: 'Join us this Sunday for a special service at 10 AM',
      createdAt: "2025-04-05T09:00:00.000Z"
    },
    { 
      id: 2, 
      title: 'Bible Study', 
      content: 'Wednesday Bible study at 7 PM in the main hall',
      createdAt: "2025-04-03T14:30:00.000Z"
    },
  ];
  
  const announcements = [
    { 
      id: 1, 
      title: 'Food Drive', 
      content: 'We are collecting non-perishable food items this month to support local families in need.',
      createdAt: "2025-04-01T10:15:00.000Z"
    },
  ];
  
  const events = [
    { 
      id: 1, 
      title: 'Easter Celebration', 
      description: 'A time to celebrate the death and the resurrection of Christ',
      date: "2025-04-29T05:00:00.000Z",
      location: "PEDU",
      imageUrl: "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      createdAt: "2025-04-07T02:01:58.950Z"
    },
    { 
      id: 2, 
      title: 'Youth Camp', 
      description: 'Annual summer retreat for our youth group',
      date: '2025-06-15', 
      endDate: '2025-06-18',
      location: 'Green Valley Retreat',
      imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1368&q=80",
      createdAt: "2025-03-20T09:45:00.000Z"
    },
  ];

  if (refreshing) {
    return (
      <View className="flex-1 items-center justify-center py-10 bg-gray-50 dark:bg-gray-900">
        <ActivityIndicator size="large" color={isDark ? "#3b82f6" : "#2563eb"} />
        <Text className={`text-lg mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Refreshing content...
        </Text>
      </View>
    );
  }

  interface FormatEventDateProps {
    dateString: string | null | undefined;
  }

  const formatEventDate = ({ dateString }: FormatEventDateProps): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  interface FormatDateRangeProps {
    startDate: string | null | undefined;
    endDate: string | null | undefined;
  }

  const formatDateRange = ({ startDate, endDate }: FormatDateRangeProps): string => {
    if (!startDate || !endDate) return '';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getMonth() === end.getMonth()) {
      return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.getDate()}`;
    }
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

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

      {/* Featured Event Banner */}
      {events.length > 0 && (
        <View className="px-6 mt-6">
          <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Featured Event
          </Text>
          <Link href={`/events/${String(events[0].id)}`} asChild>
            <Pressable>
              <View className="rounded-2xl overflow-hidden">
                {events[0].imageUrl ? (
                  <Image 
                    source={{ uri: events[0].imageUrl }}
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
                <View className={`absolute bottom-0 left-0 right-0 p-4 ${isDark ? 'bg-gray-900/90' : 'bg-white/90'}`}>
                  <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {events[0].title}
                  </Text>
                  <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                    {events[0].endDate 
                      ? formatDateRange({ startDate: events[0].date, endDate: events[0].endDate })
                      : formatEventDate({ dateString: events[0].date })
                    } • {events[0].location}
                  </Text>
                </View>
                <View className={`absolute top-2 right-2 px-2 py-1 rounded-full ${isDark ? 'bg-blue-600/90' : 'bg-blue-500/90'}`}>
                  <Text className="text-white text-xs font-medium">Upcoming</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        </View>
      )}

      {/* Posts Section */}
      <View className="px-6 mt-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Posts
          </Text>
          <Link href="/posts" asChild>
            <Pressable>
              <Text className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                View All
              </Text>
            </Pressable>
          </Link>
        </View>
        
        {posts.map(post => (
          <Link key={post.id} href={`/posts/${String(post.id)}`} asChild>
            <Pressable className={`p-5 rounded-xl mb-3 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <View className="flex-row items-start">
                <View className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} mr-3`}>
                  <Feather 
                    name="file-text" 
                    size={18} 
                    color={isDark ? '#3b82f6' : '#2563eb'} 
                  />
                </View>
                <View className="flex-1">
                  <Text className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {post.title}
                  </Text>
                  <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                    {post.content}
                  </Text>
                  <Text className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Posted {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>

      {/* Announcements Section */}
      <View className="px-6 mt-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Announcements
          </Text>
          <Link href="/announcements" asChild>
            <Pressable>
              <Text className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                View All
              </Text>
            </Pressable>
          </Link>
        </View>
        
        {announcements.map(announcement => (
          <Link key={announcement.id} href={`/announcements/${announcement.id}`} asChild>
            <Pressable className={`p-5 rounded-xl mb-3 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm border-l-4 ${isDark ? 'border-blue-600' : 'border-blue-500'}`}>
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
                    {announcement.content}
                  </Text>
                  <Text className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Posted {new Date(announcement.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>

      {/* Upcoming Events Section */}
      <View className="px-6 mt-8 mb-10">
        <View className="flex-row items-center justify-between mb-4">
          <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Upcoming Events
          </Text>
          <Link href="/events" asChild>
            <Pressable>
              <Text className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                View All
              </Text>
            </Pressable>
          </Link>
        </View>
        
        {events.map(event => (
          <Link key={event.id} href={`/events/${event.id}`} asChild>
            <Pressable className={`p-0 rounded-xl mb-4 overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              {event.imageUrl ? (
                <Image 
                  source={{ uri: event.imageUrl }}
                  className="w-full h-32"
                  resizeMode="cover"
                />
              ) : (
                <View className={`w-full h-32 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} items-center justify-center`}>
                  <MaterialIcons 
                    name="event" 
                    size={40} 
                    color={isDark ? '#9ca3af' : '#6b7280'} 
                  />
                </View>
              )}
              <View className="p-4">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {event.title}
                    </Text>
                    <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                      {event.description}
                    </Text>
                  </View>
                  <Pressable 
                    className={`px-3 py-1 rounded-full ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
                    onPress={(e) => {
                      e.stopPropagation();
                      // Handle RSVP logic here
                    }}
                  >
                    <Text className="text-white text-sm font-medium">RSVP</Text>
                  </Pressable>
                </View>
                
                <View className="flex-row items-center mt-3">
                  <MaterialIcons 
                    name="location-on" 
                    size={16} 
                    color={isDark ? '#9ca3af' : '#6b7280'} 
                  />
                  <Text className={`ml-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {event.location}
                  </Text>
                  
                  <MaterialIcons 
                    name="access-time" 
                    size={16} 
                    color={isDark ? '#9ca3af' : '#6b7280'} 
                    style={{ marginLeft: 12 }}
                  />
                  <Text className={`ml-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {event.endDate 
                      ? formatDateRange({ startDate: event.date, endDate: event.endDate })
                      : formatEventDate({ dateString: event.date })
                    }
                  </Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
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
        onPress={() => console.log('Navigate to Broadcast')}
        theme={theme}
      />

      <DashboardCard
        title="Announcements"
        description="Create and manage church announcements"
        icon={<Feather name="bell" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
        onPress={() => console.log('Navigate to Announcements')}
        theme={theme}
      />

      <DashboardCard
        title="Upcoming Events"
        description="Schedule and promote church events"
        icon={<MaterialIcons name="event" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
        onPress={() => console.log('Navigate to Upcoming Events')}
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

  // Determine which dashboard to show
  const showAdminDashboard = currentUser?.isAdmin || currentUser?.isPastor || currentUser?.isDeptHead;
  const showMemberContent = currentUser?.isMember && !showAdminDashboard;

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
      console.log('Refresh complete!');
      // Here you would typically refetch your data
    }, 1500);
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