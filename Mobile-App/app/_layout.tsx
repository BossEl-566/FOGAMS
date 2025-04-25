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
