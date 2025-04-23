import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_900Black, Inter_600SemiBold, Inter_400Regular } from '@expo-google-fonts/inter';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';




WebBrowser.maybeCompleteAuthSession();


const SignUp = () => {
    const { currentUser } = useSelector((state: any) => state.user);
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [fontsLoaded] = useFonts({
        Inter_900Black,
        Inter_600SemiBold,
        Inter_400Regular,
    });
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '546264222419-2jsdiq9d4ihdn2irh0bj8tb9suv7f0q9.apps.googleusercontent.com',
        iosClientId: '546264222419-uis4m7khbnhgsnreu5laat9e582vdfra.apps.googleusercontent.com',
        webClientId: '546264222419-ldn8rh0niiu7bmfv3guvbriibi48o419.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({
            scheme: 'FOGAMS', // optional if using bare workflow
        }),
      })

    useEffect(() => {
        if (currentUser) {
            router.replace('/home');
        }
    }, [userInfo, currentUser]);

    useEffect(() => {
        handleGoogleSignIn(); 
    }, [response]);

    async function handleGoogleSignIn() {
        const user = await AsyncStorage.getItem('@user');
        if (!user) {
         if(response?.type === 'success') {
            const { authentication } = response.params;
            if (response.authentication) {
                await getUserInfo(response.authentication.accessToken);
            }
         }
        } else {
          setUserInfo(JSON.parse(user));  
        }
    }

    interface UserInfo {
        id: string;
        email: string;
        name: string;
        picture: string;
    }

    const getUserInfo = async (token: string | null): Promise<void> => {
        if (!token) return;
        try {
            const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userData: UserInfo = await user.json();
            await AsyncStorage.setItem('@user', JSON.stringify(userData));
            setUserInfo(userData);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    interface FormData {
        username: string;
        email: string;
        password: string;
    }

    const handleChange = (name: keyof FormData, value: string): void => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async () => {
        if (!formData.username || !formData.email || !formData.password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://192.168.234.105:3000/api/auth/signup', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Sign up failed');
            }

            Alert.alert('Success', 'Sign up successful! Redirecting to Sign In...');
            router.push('/signin');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe']}
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
                            Join Our Community
                        </Text>
                        <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-lg text-slate-500 mt-2 text-center">
                            Create an account to connect with your spiritual family
                        </Text>
                    </View>

                    {/* Form Section */}
                    <View className="px-8 pb-8">
                        {/* Username Input */}
                        <TextInput
                            className="bg-white border-2 border-blue-300 rounded-xl px-5 py-4 text-slate-700 mb-5 text-lg"
                            placeholder="Choose a username"
                            placeholderTextColor="#94a3b8"
                            value={formData.username}
                            onChangeText={(text) => handleChange('username', text)}
                            autoCapitalize="none"
                        />

                        {/* Email Input */}
                        <TextInput
                            className="bg-white border-2 border-blue-300 rounded-xl px-5 py-4 text-slate-700 mb-5 text-lg"
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
                                className="bg-white border-2 border-blue-300 rounded-xl px-5 py-4 text-slate-700 pr-12 text-lg"
                                placeholder="Create a password"
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

                        {/* Sign Up Button */}
                        <TouchableOpacity 
                            className="bg-blue-600 py-5 rounded-2xl items-center justify-center mb-6 shadow-sm shadow-blue-200"
                            onPress={handleSignUp}
                            disabled={loading}
                        >
                            {loading ? (
                                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-white text-lg">
                                    Creating account...
                                </Text>
                            ) : (
                                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-white text-lg">
                                    Sign Up
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
                            className="flex-row items-center justify-center border-2 border-blue-100 py-4 rounded-2xl bg-white shadow-sm mb-6"
                            onPress={() => promptAsync()}
                        >
                            <AntDesign name="google" size={22} color="#DB4437" style={{ marginRight: 10 }} />
                            <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-slate-700 text-lg">
                                Continue with Google
                            </Text>
                        </TouchableOpacity>

                        {/* Sign In Link */}
                        <View className="flex-row justify-center">
                            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-slate-500 text-lg">
                                Already have an account?{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push('/signin')}
                                activeOpacity={0.8}
                                className="ml-1"
                            >
                                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-blue-500 text-lg">
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default SignUp;