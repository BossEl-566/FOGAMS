import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AntDesign, MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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

const MemberContent = ({ theme, user, refreshing }: { theme: 'light' | 'dark'; user: any; refreshing?: boolean }) => {
  const isDark = theme === 'dark';
  
  // Mock data - in a real app, this would come from your state or API
  const posts = [
    { id: 1, title: 'Sunday Service', content: 'Join us this Sunday for a special service at 10 AM' },
    { id: 2, title: 'Bible Study', content: 'Wednesday Bible study at 7 PM in the main hall' },
  ];
  
  const announcements = [
    { id: 1, title: 'Food Drive', content: 'We are collecting non-perishable food items this month' },
  ];
  
  const events = [
    { id: 1, title: 'Youth Camp', date: 'June 15-18', location: 'Green Valley Retreat' },
  ];

  if (refreshing) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Refreshing content...
        </Text>
      </View>
    );
  }

  return (
    <View className="mb-8">
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text 
            className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            style={{ fontFamily: 'Inter_400Regular' }}
          >
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>
        {user?.profilePicture && (
          <View className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            {/* You would use an Image component here for the profile picture */}
            <View className="w-full h-full bg-blue-500 items-center justify-center">
              <Text className="text-white font-bold text-lg">
                {user?.username?.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Posts Section */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-3">
          <Text 
            className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Inter_600SemiBold' }}
          >
            Recent Posts
          </Text>
          <TouchableOpacity>
            <Text 
              className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
              style={{ fontFamily: 'Inter_500Medium' }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
        {posts.map(post => (
          <View 
            key={post.id} 
            className={`p-4 rounded-lg mb-3 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
          >
            <Text 
              className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Inter_600SemiBold' }}
            >
              {post.title}
            </Text>
            <Text 
              className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              style={{ fontFamily: 'Inter_400Regular' }}
            >
              {post.content}
            </Text>
          </View>
        ))}
      </View>

      {/* Announcements Section */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-3">
          <Text 
            className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Inter_600SemiBold' }}
          >
            Announcements
          </Text>
          <TouchableOpacity>
            <Text 
              className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
              style={{ fontFamily: 'Inter_500Medium' }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
        {announcements.map(announcement => (
          <View 
            key={announcement.id} 
            className={`p-4 rounded-lg mb-3 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
          >
            <View className="flex-row items-start">
              <Feather 
                name="bell" 
                size={18} 
                color={isDark ? '#3b82f6' : '#2563eb'} 
                style={{ marginTop: 2, marginRight: 8 }}
              />
              <View className="flex-1">
                <Text 
                  className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Inter_600SemiBold' }}
                >
                  {announcement.title}
                </Text>
                <Text 
                  className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                  style={{ fontFamily: 'Inter_400Regular' }}
                >
                  {announcement.content}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Events Section */}
      <View>
        <View className="flex-row items-center justify-between mb-3">
          <Text 
            className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Inter_600SemiBold' }}
          >
            Upcoming Events
          </Text>
          <TouchableOpacity>
            <Text 
              className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
              style={{ fontFamily: 'Inter_500Medium' }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
        {events.map(event => (
          <View 
            key={event.id} 
            className={`p-4 rounded-lg mb-3 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
          >
            <View className="flex-row items-start">
              <MaterialIcons 
                name="event" 
                size={18} 
                color={isDark ? '#3b82f6' : '#2563eb'} 
                style={{ marginTop: 2, marginRight: 8 }}
              />
              <View className="flex-1">
                <Text 
                  className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Inter_600SemiBold' }}
                >
                  {event.title}
                </Text>
                <Text 
                  className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                  style={{ fontFamily: 'Inter_400Regular' }}
                >
                  {event.date} • {event.location}
                </Text>
              </View>
              <TouchableOpacity className="p-2">
                <Text className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  RSVP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
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
        onPress={() => console.log('Navigate to Daily Bible Message')}
        theme={theme}
      />

      <DashboardCard
        title="Comment Page"
        description="Moderate comments on daily messages"
        icon={<FontAwesome name="comments" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
        onPress={() => console.log('Navigate to Comment Page')}
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
      <View className={`mt-8 p-5 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
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
              <Text 
                className={`text-4xl font-bold mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Inter_700Bold' }}
              >
                Welcome {currentUser?.username || 'Member'}👋!
              </Text>
              
              {showAdminDashboard ? (
                <>
                  <AdminDashboard theme={theme} />
                  <MemberContent theme={theme} user={currentUser} />
                </>
              ) : showMemberContent ? (
                <MemberContent theme={theme} user={currentUser} />
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