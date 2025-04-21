import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_900Black, Inter_600SemiBold, Inter_400Regular } from '@expo-google-fonts/inter';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const SignIn = () => {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_600SemiBold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSignIn = () => {
    setLoading(true);
    // Handle sign in logic
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <LinearGradient
      colors={['#f8fafc', '#e2e8f0']}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Header Section */}
          <View className="items-center pt-12 pb-8 px-8">
            <Image 
              source={require('../assets/images/assembliesOfGodLogo.png')}
              className="w-32 h-32 mb-4"
              resizeMode="contain"
            />
            <Text style={{ fontFamily: 'Inter_900Black' }} className="text-3xl text-blue-800">
              Welcome Back
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-lg text-slate-500 mt-2">
              Sign in to access your account
            </Text>
          </View>

          {/* Form Section */}
          <View className="px-8 pb-8">
            {/* Email Input */}
            <TextInput
                                        className="bg-white border-2 border-blue-100 rounded-xl px-5 py-4 text-slate-700 mb-5 text-lg"
                                        placeholder="your@email.com"
                                        placeholderTextColor="#94a3b8"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
            
                                    {/* Password Input */}
                                    <View className="relative mb-6">
                                        <TextInput
                                            className="bg-white border-2 border-blue-100 rounded-xl px-5 py-4 text-slate-700 pr-12 text-lg"
                                            placeholder="Create a password"
                                            placeholderTextColor="#94a3b8"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                        />
                                        <TouchableOpacity 
                                            className="absolute right-4 top-4"
                                            onPress={() => setShowPassword(!showPassword)}
                                        >
                                            <AntDesign 
                                                name={showPassword ? "eye" : "eyeo"} 
                                                size={22} 
                                                color="#64748b" 
                                            />
                                        </TouchableOpacity>
                                    </View>

            {/* Remember Me */}
            <View className="flex-row items-center mb-6">
              <TouchableOpacity className="w-5 h-5 border border-slate-300 rounded mr-2 items-center justify-center">
                <View className="w-3 h-3 bg-blue-500 rounded-sm" />
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-slate-600">
                Remember me
              </Text>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity 
              className="bg-blue-600 py-4 rounded-2xl items-center justify-center mb-6 shadow-sm shadow-blue-200"
              onPress={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-white text-lg">
                  Signing in...
                </Text>
              ) : (
                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-white text-lg">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-slate-200" />
              <Text style={{ fontFamily: 'Inter_400Regular' }} className="px-4 text-slate-500">
                or
              </Text>
              <View className="flex-1 h-px bg-slate-200" />
            </View>

            {/* Google Sign In */}
            <TouchableOpacity 
              className="flex-row items-center justify-center border border-slate-200 py-3 rounded-2xl bg-white shadow-sm mb-6"
            >
              <AntDesign name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
              <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-slate-700">
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-slate-500">
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/signup')}
                activeOpacity={0.7}
                className="ml-1"
              >
                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-blue-500">
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignIn;