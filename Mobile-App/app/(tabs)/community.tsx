import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { MaterialIcons, FontAwesome, Feather, Ionicons, AntDesign } from '@expo/vector-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

type FeatureCardProps = {
  title: string
  description: string
  icon: React.ReactNode
  onPress: () => void
}

const FeatureCard = ({ title, description, icon, onPress }: FeatureCardProps) => {
  const isDark = useSelector((state: any) => state.theme.theme === 'dark')

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-4 rounded-xl mb-4 flex-row items-center ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
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
  )
}

const Community = () => {
  const { theme } = useSelector((state: any) => state.theme)
  const currentUser = useSelector((state: any) => state.user.currentUser)
  const navigation = useNavigation<NavigationProp<any>>()
  const isDark = theme === 'dark'

  const handleAnonymousMessage = () => {
    if (currentUser?.isPastor && currentUser?.isMember) {
      navigation.navigate('PastorMemberMessages')
    } else if (currentUser?.isPastor) {
      navigation.navigate('PastorMessages')
    } else {
      navigation.navigate('SendAnonymousMessage')
    }
  }

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView 
        className="flex-1 p-4"
        showsVerticalScrollIndicator={false}
      >
        <Text className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Community Features
        </Text>
        
        {/* Anonymous Message */}
        <FeatureCard
          title="Anonymous Message"
          description={currentUser?.isPastor ? "View anonymous messages" : "Send anonymous message"}
          icon={<MaterialIcons name="message" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />}
          onPress={handleAnonymousMessage}
        />
        
        {/* Book Time with Pastor */}
        <FeatureCard
          title="Book Time with Pastor"
          description="Schedule a meeting with church leadership"
          icon={<FontAwesome name="calendar" size={22} color={isDark ? '#3b82f6' : '#2563eb'} />}
          onPress={() => navigation.navigate('BookPastor')}
        />
        
        {/* Poll for Voting */}
        <FeatureCard
          title="Poll for Voting"
          description="Participate in community decisions"
          icon={<Feather name="check-circle" size={22} color={isDark ? '#3b82f6' : '#2563eb'} />}
          onPress={() => navigation.navigate('CommunityPolls')}
        />
        
        {/* Recent Activities */}
        <View className="mt-8">
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Activities
          </Text>
          <View className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} items-center justify-center`}>
            <Text className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No recent activities yet
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Community
