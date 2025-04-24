import { Text, View, Image, StatusBar } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useSelector } from 'react-redux'
import { AntDesign, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const CustomHeader = () => {
  const { theme } = useSelector((state: any) => state.theme)
  const currentUser = useSelector((state: any) => state.user.currentUser)
  const isDark = theme === 'dark'

  return (
    <View 
  className={`rounded-br-[10px] rounded-bl-[100px] ${isDark ? 'bg-gray-900 border-b border-gray-700' : 'bg-white border-b border-gray-200'}`}
  style={{ paddingTop: StatusBar.currentHeight }}
>
  <LinearGradient
    colors={isDark ? ['#0f172a', '#1e3a8a'] : ['#2563eb', '#3b82f6']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    className="pb-6 px-6 rounded-br-[10px] rounded-bl-[100px]"
  >
    <View className="flex-row justify-between items-center pt-4 rounded-br-[10px] rounded-bl-[100px]">
      <View className="flex-row items-center">
        <Image 
          source={require('../../assets/images/assembliesOfGodLogo.png')} 
          className="w-12 h-12 mr-3"
          resizeMode="contain"
        />
        <View>
          <Text className="text-white text-2xl font-bold">FOGA</Text>
          <Text className="text-blue-100 text-xs">Fellowship of Grace Assembly</Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-blue-100 text-xs">Welcome back</Text>
        <Text className="text-white text-lg font-bold">
          {currentUser?.username ? `Hi, ${currentUser.username.split(' ')[0]}` : 'Hi, Friend'}
        </Text>
      </View>
    </View>
  </LinearGradient>
</View>

  )
}

const _layout = () => {
  const { theme } = useSelector((state: any) => state.theme)
  const isDark = theme === 'dark'

  return (
    <View className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: isDark ? '#111827' : '#ffffff',
            borderTopColor: isDark ? '#374151' : '#e5e7eb',
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 5,
          },
          tabBarActiveTintColor: isDark ? '#3b82f6' : '#2563eb',
          tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginBottom: 5,
          },
          header: () => null, // This hides the default header for all screens
        }}
      >
        {/* Home Tab - the only one with custom header */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            header: () => <CustomHeader />,
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />

        {/* Other tabs - no header */}
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
    </View>
  )
}

export default _layout