import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { MaterialIcons, FontAwesome, Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


const ChurchLife = () => {
  const router = useRouter();
  const { theme } = useSelector((state: any) => state.theme);
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const navigation = useNavigation<any>();
  const isDark = theme === 'dark';

  type FeatureCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    onPress: () => void;
    adminOnly?: boolean;
  };

  const FeatureCard = ({ 
    title, 
    description, 
    icon, 
    onPress, 
    adminOnly = false 
  }: FeatureCardProps) => {
    if (adminOnly && !currentUser?.isAdmin) return null;

    return (
      <TouchableOpacity
        onPress={onPress}
        className={`p-5 rounded-xl mb-4 flex-row items-center ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
        activeOpacity={0.8}
      >
        <View className={`p-3 rounded-lg mr-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {icon}
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </Text>
          <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </Text>
        </View>
        <AntDesign 
          name="right" 
          size={20} 
          color={isDark ? '#9ca3af' : '#6b7280'} 
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView 
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Church Life
        </Text>

        <FeatureCard
          title="Baptism Application"
          description="Apply for water baptism"
          icon={<FontAwesome name="tint" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
          onPress={() => router.push('/baptism')}
        />

        <FeatureCard
          title="Birthdays"
          description="View upcoming birthdays"
          icon={<MaterialIcons name="cake" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
          onPress={() => router.push('/birthday')}
        />

        <FeatureCard
          title="Tithe & Offerings"
          description="Give your tithes and offerings"
          icon={<FontAwesome name="money" size={22} color={isDark ? '#3b82f6' : '#2563eb'} />}
          onPress={() => router.push('/tithe')}
        />


        {/* Upcoming Events */}
        <View className="mt-8">
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Upcoming Events
          </Text>
          <View className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} items-center justify-center`}>
            <Feather 
              name="calendar" 
              size={32} 
              color={isDark ? '#9ca3af' : '#6b7280'} 
            />
            <Text className={`text-center mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No upcoming events scheduled
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChurchLife;
