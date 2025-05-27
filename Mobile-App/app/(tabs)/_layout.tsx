import { Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useSelector } from 'react-redux'
import { AntDesign, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const CustomHeader = () => {
  const { theme } = useSelector((state: any) => state.theme);
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <View 
      className={`rounded-b-3xl overflow-hidden shadow-lg ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
      
    >
      <LinearGradient
        colors={isDark ? ['#1e293b', '#0f172a'] : ['#3b82f6', '#2563eb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pb-6 px-3"
        style={{ paddingTop: insets.top - 6 }}
      >
        <View className="flex-row justify-between items-center">
          {/* Left side with logo and church info */}
          <View className="flex-row items-center space-x-3">
            <View className={`p-2 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/20'}`}>
              <Image 
                source={require('../../assets/images/assembliesOfGodLogo.png')} 
                className="w-10 h-10"
                resizeMode="contain"
              />
            </View>
            <View>
              <Text className="text-white text-2xl font-extrabold tracking-tight">FOGA</Text>
              <Text className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-100'}`}>
                Fellowship of Grace Assembly
              </Text>
            </View>
          </View>

          {/* Right side with user greeting */}
          <View className={`items-end p-3 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-white/10'}`}>
            <Text className={`text-xs font-medium ${isDark ? 'text-blue-300' : 'text-blue-100'}`}>
              Welcome back
            </Text>
            <Text className="text-white text-lg font-bold mt-1">
              {currentUser?.username ? `Hi, ${currentUser.username.split(' ')[0]}` : 'Hi, Friend'}
              <View className="absolute -right-2 -top-1 w-2 h-2 bg-green-400 rounded-full border border-white" />
            </Text>
          </View>
        </View>

        {/* Decorative elements */}
        <View className="absolute top-0 right-0 w-32 h-24 rounded-full bg-white/5" />
        <View className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-white/5" />
      </LinearGradient>
    </View>
  );
};
const TabLayout = () => {
  const { theme } = useSelector((state: any) => state.theme)
  const isDark = theme === 'dark'

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SafeAreaView 
        edges={['top']}
        className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}
      >
        <Tabs
          screenOptions={{
            tabBarStyle: {
              backgroundColor: isDark ? '#0f172a' : '#fff',
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarActiveTintColor: isDark ? '#3b82f6' : '#2563eb',
            tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
            headerShown: false, // Default to false for all screens
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              headerShown: true, // Explicitly set to true only for home
              header: () => <CustomHeader />,
              tabBarIcon: ({ color }) => (
                <AntDesign name="home" size={24} color={color} />
              ),
            }}
          />

          {/* Other screens remain with headerShown: false (inherited from screenOptions) */}
          <Tabs.Screen
            name="community"
            options={{
              title: 'Community',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="groups" size={26} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="churchlife"
            options={{
              title: 'Church Life',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="church" size={22} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="resources"
            options={{
              title: 'Resources',
              tabBarIcon: ({ color }) => (
                <Ionicons name="library" size={24} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => (
                <AntDesign name="user" size={24} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </>
  )
}

export default TabLayout