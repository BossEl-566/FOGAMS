import { View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_900Black, Inter_600SemiBold, Inter_400Regular } from '@expo-google-fonts/inter';
import React, { useEffect, useRef } from 'react';
import { useRouter, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';

const WelcomeScreen = () => {
  // Redux state
  const { currentUser } = useSelector((state: any) => state.user);
  console.log("currentUser", currentUser);

  // Router
  const router = useRouter();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_600SemiBold,
    Inter_400Regular,
  });

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(20)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Logo fade-in + pulse animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          })
        ])
      )
    ]).start();

    // Button slide-up animation (staggered)
    Animated.stagger(200, [
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (currentUser) {
    return <Redirect href="/welcome" />;
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="#f8fafc" />

      <LinearGradient
        colors={['#f8fafc', '#e2e8f0']}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 px-8" edges={['top', 'left', 'right']}>
          {/* Main Content Container - Centered */}
          <View className="flex-1 justify-center">
            {/* Logo Section */}
            <Animated.View 
              style={{ 
                opacity: fadeAnim,
                transform: [{ scale: pulseAnim }]
              }}
              className="items-center mb-12"
            >
              <Image 
                source={require('../assets/images/assembliesOfGodLogo.png')}
                className="w-40 h-40 mb-6"
                resizeMode="contain"
              />
              <Text style={{ fontFamily: 'Inter_900Black' }} className="text-4xl text-blue-800 mb-1">
                Welcome to FOGA
              </Text>
              <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-lg text-slate-500">
                Sign in to continue
              </Text>
            </Animated.View>

            {/* Buttons Section */}
            <Animated.View 
              style={{ 
                transform: [{ translateY: slideUpAnim }],
                opacity: fadeAnim
              }}
              className="space-y-4"
            >
              <TouchableOpacity 
                className="py-4 rounded-xl overflow-hidden"
                activeOpacity={0.8}
                onPress={() => router.push('/signin')}
              >
                <LinearGradient
                  colors={['#3b82f6', '#2563eb']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 10 }}
                  className="py-4"
                >
                  <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-white text-center text-lg">
                    Login
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="border-2 border-blue-500 py-4 rounded-xl bg-white"
                activeOpacity={0.8}
                onPress={() => router.push('/signup')}
              >
                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-blue-500 text-center text-lg">
                  Register
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Footer */}
          <Animated.View 
            style={{ opacity: fadeAnim }}
            className="items-center pb-8"
          >
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-slate-400 text-xs mb-1">
              By continuing, you agree to our
            </Text>
            <View className="flex-row">
              <TouchableOpacity>
                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-blue-500 text-xs">
                  Terms of Service
                </Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-slate-400 text-xs mx-1">
                and
              </Text>
              <TouchableOpacity>
                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-blue-500 text-xs">
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default WelcomeScreen;