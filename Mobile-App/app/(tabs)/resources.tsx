import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { MaterialIcons, FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, router } from 'expo-router';

const Resources = () => {
  const router = useRouter();
  const { theme } = useSelector((state: any) => state.theme);
  const navigation = useNavigation();
  const isDark = theme === 'dark';

  const ResourceCard = ({ 
    title, 
    description, 
    icon,
    onPress 
  }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    onPress: () => void;
  }) => (
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

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView 
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Spiritual Resources
        </Text>

        <ResourceCard
          title="Bible"
          description="Read and study Scripture"
          icon={<FontAwesome name="book" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
          onPress={() => router.push('/bible')}
        />

        <ResourceCard
          title="Study Resources"
          description="Sermons, devotionals and more"
          icon={<MaterialIcons name="menu-book" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
          onPress={() => router.push('/study-resources')}
        />

        <ResourceCard
          title="Spiritual Notepad"
          description="Journal your reflections"
          icon={<Feather name="edit" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
          onPress={() => router.push('/notepad')}
        />

        <View className="mt-8">
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recently Viewed
          </Text>
          <View className={`p-5 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <View className="flex-row items-center mb-3">
              <Feather 
                name="clock" 
                size={20} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
                className="mr-3"
              />
              <Text className={`flex-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Psalm 23 - The Lord is my Shepherd
              </Text>
            </View>
            <View className="flex-row items-center">
              <Feather 
                name="clock" 
                size={20} 
                color={isDark ? '#9ca3af' : '#6b7280'} 
                className="mr-3"
              />
              <Text className={`flex-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Sermon: Walking in Faith
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Resources;
