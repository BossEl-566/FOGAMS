import { View, Text, Image, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts, Inter_900Black, Inter_600SemiBold, Inter_400Regular } from '@expo-google-fonts/inter';
import React from 'react';

const ForgotPassword = () => {
  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_600SemiBold,
    Inter_400Regular,
  });

  const churchPhoneNumber = '+233240395732'; // Remove formatting for dialing

  const handleContactSupport = () => {
    Linking.openURL(`tel:${churchPhoneNumber}`)
      .catch(err => console.error('Failed to open phone dialer:', err));
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#f8fafc', '#e2e8f0']}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        {/* Back Button */}
        <TouchableOpacity 
          className="absolute top-12 left-5 z-10 p-2 bg-white/70 rounded-lg"
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={24} color="#1e40af" />
        </TouchableOpacity>

        {/* Main Content */}
        <View className="flex-1 justify-center px-8">
          {/* Logo */}
          <Image 
            source={require('../assets/images/assembliesOfGodLogo.png')} 
            className="w-32 h-32 self-center mb-8"
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={{ fontFamily: 'Inter_900Black' }} className="text-3xl text-blue-800 text-center mb-8">
            Password Reset
          </Text>

          {/* Message Card */}
          <View className="bg-white rounded-2xl p-6 mb-8 shadow-sm shadow-blue-200">
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-slate-700 text-center text-base leading-6 mb-5">
              For security reasons, please contact church administrator to reset your password.
            </Text>
            
            <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-slate-700 text-center text-base mb-2">
              You can visit the church office or call:
            </Text>
            
            <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-blue-800 text-center text-lg">
              (+233) 24-039-5732
            </Text>
          </View>

          {/* Support Button */}
          <TouchableOpacity 
            className="bg-blue-600 py-4 rounded-xl flex-row items-center justify-center shadow-sm shadow-blue-200"
            onPress={handleContactSupport}
          >
            <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-white text-base mr-2">
              Contact Support
            </Text>
            <AntDesign name="customerservice" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ForgotPassword;