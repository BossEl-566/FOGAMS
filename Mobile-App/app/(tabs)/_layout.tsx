import { Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useSelector } from 'react-redux'
import { AntDesign, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'

const _layout = () => {
  const { theme } = useSelector((state: any) => state.theme)

  return (
    <View className={`flex-1 bg-white dark:bg-black`}>
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
          borderTopColor: theme === 'dark' ? '#374151' : '#e5e7eb',
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
        tabBarInactiveTintColor: theme === 'dark' ? '#9ca3af' : '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 5,
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />

      {/* Community Tab */}
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="groups" size={26} color={color} />
          ),
        }}
      />

      {/* Church Life Tab */}
      <Tabs.Screen
        name="churchlife"
        options={{
          title: 'Church Life',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="church" size={22} color={color} />
          ),
        }}
      />

      {/* Resources Tab */}
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Resources',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="library" size={24} color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
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