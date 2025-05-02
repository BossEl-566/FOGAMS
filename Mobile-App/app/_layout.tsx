// app/_layout.tsx
import { Stack } from 'expo-router'
import './global.css'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../src/store/store'
import { View } from 'react-native'
import { RootState } from '../src/store/store'
import { useEffect, useState } from 'react'


function ThemedLayout() {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(theme === 'dark')
  }, [theme])

  return (
    <View className={`${isDark ? 'dark' : ''} flex-1 bg-white dark:bg-black`}>
      <Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="index" options={{ headerShown: false }} />
  <Stack.Screen name="signup" options={{ headerShown: false }} />
  <Stack.Screen name="signin" options={{ headerShown: false }} />
  <Stack.Screen
    name="dailybiblemessage"
    options={() => ({
      headerShown: true,
      title: 'Daily Message',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
<Stack.Screen
    name="comment"
    options={() => ({
      headerShown: true,
      title: 'Comment',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="broadcast"
    options={() => ({
      headerShown: true,
      title: 'Broadcast',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="upcomingevent"
    options={() => ({
      headerShown: true,
      title: 'Upcoming Event',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="users"
    options={() => ({
      headerShown: true,
      title: 'Users',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="announcement"
    options={() => ({
      headerShown: true,
      title: 'Announcement',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="anonymouspastor"
    options={() => ({
      headerShown: true,
      title: 'Annonymous Messages',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="anonymousmember"
    options={() => ({
      headerShown: true,
      title: 'Annonymous Messages',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="booktime"
    options={() => ({
      headerShown: true,
      title: 'Book Time',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="poll"
    options={() => ({
      headerShown: true,
      title: 'Poll',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="birthday"
    options={() => ({
      headerShown: true,
      title: 'Birthday',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="baptism"
    options={() => ({
      headerShown: true,
      title: 'Baptism',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="tithe"
    options={() => ({
      headerShown: true,
      title: 'Tithe & Offering',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="bible"
    options={() => ({
      headerShown: true,
      title: 'Bible',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="study-resources"
    options={() => ({
      headerShown: true,
      title: 'Study Resources',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="notepad"
    options={() => ({
      headerShown: true,
      title: 'Notepad',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
  <Stack.Screen
    name="edit-profile"
    options={() => ({
      headerShown: true,
      title: 'Edit Profile',
      headerStyle: {
        backgroundColor: isDark ? '#000' : '#fff',
      },
      headerTintColor: isDark ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  />
</Stack>



    </View>
  )
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemedLayout />
      </PersistGate>
    </Provider>
  )
}
