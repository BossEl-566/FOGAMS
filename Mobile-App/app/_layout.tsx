import React from 'react'
import { Stack } from 'expo-router'
import './global.css'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../src/store/store'
import { View } from 'react-native'
import { RootState } from '../src/store/store'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

function ThemedLayout() {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const isDark = theme === 'dark'

  return (
    <View className={`flex-1 pt-5 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="study-resources" options={{ headerShown: false }} />
        <Stack.Screen
       name="edit-profile"
       options={{ headerShown: false }}
       />
        
        {/* All your other screens with themed headers */}
        <Stack.Screen
          name="dailybiblemessage"
          options={{
            headerShown: true,
            title: 'Daily Message',
            headerStyle: {
              backgroundColor: isDark ? '#000' : '#fff',
            },
            headerTintColor: isDark ? '#fff' : '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
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
    name="CreateEvent"
    options={() => ({
      headerShown: true,
      title: 'Create Event',
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
    name="welcome"
    options={() => ({
      headerShown: false,
      title: 'Create Broadcast',
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
    name="forget-password"
    options={() => ({
      headerShown: false,
      title: 'Create Broadcast',
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
    name="transactions"
    options={() => ({
      headerShown: true,
      title: 'Transactions',
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
    name="accountrecords"
    options={() => ({
      headerShown: true,
      title: 'Record',
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
    name="alltitherecords"
    options={() => ({
      headerShown: true,
      title: 'All Tithe Records',
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
        <SafeAreaProvider>
          <ThemedLayout />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}