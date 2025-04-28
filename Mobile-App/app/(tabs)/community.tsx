import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { MaterialIcons, FontAwesome, Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
  color: string;
};

const FeatureCard = ({ title, description, icon, onPress, color }: FeatureCardProps) => {
  const isDark = useSelector((state: any) => state.theme.theme === 'dark');

  return (

    <TouchableOpacity
      onPress={onPress}
      className={`p-5 rounded-2xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      activeOpacity={0.9}
      style={{
        shadowColor: isDark ? '#1e40af' : '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6
      }}
    >
      <View className="flex-row items-center">
        <LinearGradient
          colors={[color, `${color}90`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-12 h-12 rounded-xl items-center justify-center mr-4"
        >
          {icon}
        </LinearGradient>
        <View className="flex-1">
          <Text className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
      </View>
    </TouchableOpacity>
  );
};

const RecentActivityPlaceholder = () => {
  const isDark = useSelector((state: any) => state.theme.theme === 'dark');

  return (
    <View className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} items-center justify-center`}
      style={{
        shadowColor: isDark ? '#1e293b' : '#e5e7eb',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4
      }}
    >
      <Image
        source={isDark 
          ? require('../../assets/images/assembliesOfGodLogo.png') 
          : require('../../assets/images/assembliesOfGodLogo.png')}
        className="w-32 h-32 mb-4"
      />
      <Text className={`text-lg font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        No activities yet
      </Text>
      <Text className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Community activities will appear here
      </Text>
    </View>
  );
};

const Community = () => {
  const { theme } = useSelector((state: any) => state.theme);
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const navigation = useNavigation<NavigationProp<any>>();
  const isDark = theme === 'dark';
  const router = useRouter();

  const handleAnonymousMessage = () => {
    if (currentUser?.isMember && currentUser?.isPastor) {
      router.push('/anonymouspastor');
    } else if (currentUser?.isMember) {
      router.push('/anonymousmember');
    } else {
      router.push('/anonymousmember');
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView 
        className="flex-1 px-5 pt-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Community Hub
          </Text>
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Connect, communicate, and grow together
          </Text>
        </View>
        
        {/* Main Features */}
        <View className="mb-6">
          <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Communication Tools
          </Text>
          
          <FeatureCard
            title="Anonymous Message"
            description={currentUser?.isPastor ? "View messages from congregation" : "Send message to leadership"}
            icon={<MaterialIcons name="message" size={24} color="white" />}
            onPress={handleAnonymousMessage}
            color="#3b82f6"
          />
          
          <FeatureCard
            title="Book Time with Pastor"
            description="Schedule a meeting with church leadership"
            icon={<FontAwesome name="calendar" size={22} color="white" />}
            onPress={() => navigation.navigate('BookPastor')}
            color="#10b981"
          />
          
          <FeatureCard
            title="Community Polls"
            description="Participate in important decisions"
            icon={<Feather name="check-circle" size={22} color="white" />}
            onPress={() => navigation.navigate('CommunityPolls')}
            color="#f59e0b"
          />
        </View>

        {/* Recent Activities */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Activities
            </Text>
            <TouchableOpacity>
              <Text className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          <RecentActivityPlaceholder />
        </View>

        {/* Quick Links */}
        <View className="mb-10">
          <Text className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Quick Links
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity 
              className={`items-center p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              style={{ width: '30%' }}
              onPress={() => navigation.navigate('CommunityGuidelines')}
            >
              <View className={`w-12 h-12 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} items-center justify-center mb-2`}>
                <Feather name="book" size={20} color={isDark ? '#3b82f6' : '#2563eb'} />
              </View>
              <Text className={`text-xs text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Guidelines
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className={`items-center p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              style={{ width: '30%' }}
              onPress={() => navigation.navigate('PrayerRequests')}
            >
              <View className={`w-12 h-12 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} items-center justify-center mb-2`}>
                <Ionicons name="hand-left" size={20} color={isDark ? '#3b82f6' : '#2563eb'} />
              </View>
              <Text className={`text-xs text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Prayer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className={`items-center p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              style={{ width: '30%' }}
              onPress={() => navigation.navigate('CommunityResources')}
            >
              <View className={`w-12 h-12 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} items-center justify-center mb-2`}>
                <Feather name="folder" size={20} color={isDark ? '#3b82f6' : '#2563eb'} />
              </View>
              <Text className={`text-xs text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Resources
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Community;