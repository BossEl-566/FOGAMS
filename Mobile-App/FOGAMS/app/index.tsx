import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Logo from '../assets/images/assembliesOfGodLogo.png'
import { useRouter } from 'expo-router'

const App = () => {
  const router = useRouter(); 
  return (
    <View className='flex-1 '>
      <ImageBackground source={Logo} resizeMode='cover' className='flex-1'>
        <View className='flex-1 bg-orange-500 h-5 w-full border-cyan-950'>
        <TouchableOpacity  onPress={()=> router.push('/anotherpage')} activeOpacity={0.7} className='flex-1 bg-orange-500 h-5 w-full border-cyan-950'>
          <Text>
            hello world
          </Text>

        </TouchableOpacity>  
        </View>
     
      </ImageBackground>
      
    </View>
  )
}

export default App