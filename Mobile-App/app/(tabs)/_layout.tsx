import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'


const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <Text style={{ color }}>👤</Text>,
        }}
      />
        

    </Tabs>
  )
}

export default _layout