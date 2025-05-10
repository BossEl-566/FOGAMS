import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_900Black, Inter_600SemiBold, Inter_400Regular } from '@expo-google-fonts/inter';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../src/features/users/userSlice';

const SignIn = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { currentUser, loading, error } = useSelector((state: any) => state.user);
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [fontsLoaded] = useFonts({
        Inter_900Black,
        Inter_600SemiBold,
        Inter_400Regular,
    });

    // Check if user is already logged in
    useEffect(() => {
        if (currentUser) {
            router.replace('/(tabs)/home');
        }
    }, [currentUser]);

    if (!fontsLoaded) {
        return null;
    }

    interface FormData {
      email: string;
      password: string;
    }

    interface HandleChange {
      (name: keyof FormData, value: string): void;
    }

    const handleChange: HandleChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        try {
            dispatch(signInStart());
            
            const res = await fetch('http://192.168.205.105:3000/api/auth/signin', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok) {
              const { token, ...user } = data;
              dispatch(signInSuccess(user));
              await AsyncStorage.setItem('userToken', token); // 👈 Save the token
              ToastAndroid.show('Login successful', ToastAndroid.SHORT);
              router.replace('/(tabs)/home');
            }else {
                dispatch(signInFailure(data.message));
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
            dispatch(signInFailure(errorMessage));
            Alert.alert('Error', errorMessage);
        }
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
                            value={formData.email}
                            onChangeText={(text) => handleChange('email', text)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        
                        {/* Password Input */}
                        <View className="relative mb-6">
                            <TextInput
                                className="bg-white border-2 border-blue-100 rounded-xl px-5 py-4 text-slate-700 pr-12 text-lg"
                                placeholder="Enter your password"
                                placeholderTextColor="#94a3b8"
                                value={formData.password}
                                onChangeText={(text) => handleChange('password', text)}
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
                            <TouchableOpacity 
                                className="w-5 h-5 border border-slate-300 rounded mr-2 items-center justify-center"
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                {rememberMe && (
                                    <View className="w-3 h-3 bg-blue-500 rounded-sm" />
                                )}
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-slate-600">
                                Remember me
                            </Text>
                            <TouchableOpacity
                                onPress={() => console.log('Forgot password')}
                                className="ml-auto"
                            >
                                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-blue-500">
                                    Forgot password?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity 
                            className="bg-blue-600 py-4 rounded-2xl items-center justify-center mb-6 shadow-sm shadow-blue-200"
                            onPress={handleSubmit}
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