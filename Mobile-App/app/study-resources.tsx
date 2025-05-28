import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Linking, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const ResourcesScreen = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 12;
  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  // Theme colors with more vibrant options
  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        background: 'bg-gray-900',
        card: 'bg-gray-800',
        cardBorder: 'border-gray-700',
        text: 'text-white',
        secondaryText: 'text-gray-300',
        button: 'bg-indigo-600',
        buttonText: 'text-white',
        header: 'bg-gray-800',
        icon: 'white',
        loading: 'white',
        searchBg: 'bg-gray-700',
        searchText: 'text-white',
        searchPlaceholder: 'text-gray-400',
      };
    } else {
      return {
        background: 'bg-gray-50',
        card: 'bg-white',
        cardBorder: 'border-gray-200',
        text: 'text-gray-900',
        secondaryText: 'text-gray-600',
        button: 'bg-indigo-500',
        buttonText: 'text-white',
        header: 'bg-indigo-600',
        icon: 'gray',
        loading: 'gray',
        searchBg: 'bg-gray-100',
        searchText: 'text-gray-900',
        searchPlaceholder: 'text-gray-500',
      };
    }
  };

  const colors = getThemeColors();

  const fetchResources = async (page = 0, isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `http://${process.env.EXPO_PUBLIC_IP}/api/resource/get?page=${page}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      
      const data = await response.json();
      
      if (page === 0 || isRefreshing) {
        setResources(data.resources || []);
      } else {
        setResources((prev) => [...prev, ...(data.resources || [])]);
      }
      
      setHasMore((data.resources?.length || 0) === pageSize);
    } catch (error) {
      console.error('Error fetching resources:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch resources',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleRefresh = () => {
    setCurrentPage(0);
    fetchResources(0, true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchResources(nextPage);
    }
  };

  const getFileIcon = (fileType: string) => {
    const iconSize = 28;
    const iconColor = theme === 'dark' ? '#A78BFA' : '#7C3AED';
    
    switch (fileType) {
      case 'pdf':
        return <FontAwesome name="file-pdf-o" size={iconSize} color="#E53E3E" />;
      case 'image':
        return <FontAwesome name="file-image-o" size={iconSize} color="#38A169" />;
      case 'document':
        return <FontAwesome name="file-word-o" size={iconSize} color="#2B6CB0" />;
      case 'spreadsheet':
        return <FontAwesome name="file-excel-o" size={iconSize} color="#1F9D55" />;
      case 'presentation':
        return <FontAwesome name="file-powerpoint-o" size={iconSize} color="#DD6B20" />;
      case 'video':
        return <FontAwesome name="file-video-o" size={iconSize} color="#805AD5" />;
      case 'audio':
        return <FontAwesome name="file-audio-o" size={iconSize} color="#D53F8C" />;
      default:
        return <FontAwesome name="file-o" size={iconSize} color={iconColor} />;
    }
  };

  const getFileTypeDisplay = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return 'PDF';
      case 'image': return 'Image';
      case 'document': return 'Document';
      case 'spreadsheet': return 'Spreadsheet';
      case 'presentation': return 'Presentation';
      case 'video': return 'Video';
      case 'audio': return 'Audio';
      default: return 'File';
    }
  };

  const handleViewResource = async (url: string, fileType: string) => {
    try {
      // For PDFs, open in WebBrowser
      if (fileType === 'pdf') {
        await WebBrowser.openBrowserAsync(url);
      } 
      // For images, try to open with default viewer
      else if (fileType === 'image') {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          throw new Error("Don't know how to open this URL");
        }
      }
      // For other types, try to download or open
      else {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          // Fallback to WebBrowser if Linking can't handle it
          await WebBrowser.openBrowserAsync(url);
        }
      }
    } catch (error) {
      console.error('Error opening resource:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to open resource',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const handleDelete = async (resourceId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `http://${process.env.EXPO_PUBLIC_IP}/api/resource/delete/${resourceId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to delete resource');
      
      setResources(resources.filter(res => res._id !== resourceId));
      
      Toast.show({
        type: 'success',
        text1: 'Resource deleted successfully',
      });
    } catch (error) {
      console.error('Delete error:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to delete resource',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } 
  }; 

  const confirmDelete = (resourceId: string) => {
    Alert.alert(
      'Delete Resource',
      'Are you sure you want to delete this resource? This action cannot be undone.',
      [
        { 
          text: 'Cancel', 
          style: 'cancel',
        },
        { 
          text: 'Delete', 
          onPress: () => handleDelete(resourceId), 
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const renderResourceItem = ({ item }: { item: any }) => (
    <View className={`p-4 rounded-xl ${colors.card} border ${colors.cardBorder} mb-3 shadow-sm`}>
      <View className="flex-row items-start">
        <View className="mr-4">
          {getFileIcon(item.fileType)}
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-semibold ${colors.text} mb-1`} numberOfLines={1}>
            {item.title || 'Untitled'}
          </Text>
          <Text className={`text-xs ${colors.secondaryText} mb-2`}>
            {getFileTypeDisplay(item.fileType)} • {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          {item.description && (
            <Text className={`text-sm ${colors.secondaryText}`} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>
      </View>
      <View className="flex-row justify-end mt-3 space-x-2">
        <TouchableOpacity
          onPress={() => handleViewResource(item.fileUrl, item.fileType)}
          className={`px-4 py-2 rounded-lg flex-row items-center ${colors.button}`}
        >
          <Feather name="eye" size={16} color="white" />
          <Text className="text-white ml-2">View</Text>
        </TouchableOpacity>
        {currentUser?.isAdmin && (
          <TouchableOpacity
            onPress={() => confirmDelete(item._id)}
            className="px-4 py-2 ml-2 rounded-lg flex-row items-center bg-red-500"
          >
            <Feather name="trash-2" size={16} color="white" />
            <Text className="text-white ml-2">Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!hasMore && resources.length > 0) {
      return (
        <View className="py-4 items-center">
          <Text className={`${colors.secondaryText}`}>No more resources to load</Text>
        </View>
      );
    }
    
    if (loading && resources.length > 0) {
      return (
        <View className="py-4 items-center">
          <ActivityIndicator size="small" color={colors.loading} />
        </View>
      );
    }
    
    return null;
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background} pt-10`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {/* Header */}
      <LinearGradient
        colors={theme === 'dark' ? ['#1F2937', '#111827'] : ['#4F46E5', '#7C3AED']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 py-4"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-bold">Resources</Text>
          {currentUser?.isAdmin && (
            <TouchableOpacity
              className="flex-row items-center px-4 py-2 rounded-lg bg-white bg-opacity-20"
              onPress={() => router.push('/upload-resource')}
            >
              <Feather name="upload" size={18} color="#38A169" />
              <Text className="text-black ml-2">Upload</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Search and Filter (placeholder for future implementation) */}
      <View className={`px-4 pt-3 pb-2 ${colors.searchBg}`}>
        <View className={`flex-row items-center px-3 py-2 rounded-lg ${colors.searchBg}`}>
          <Feather name="search" size={18} color={colors.secondaryText} />
          <Text className={`ml-2 ${colors.searchPlaceholder}`}>Search resources...</Text>
        </View>
      </View>

      {/* Main Content */}
      {loading && resources.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.loading} />
          <Text className={`mt-4 ${colors.text}`}>Loading resources...</Text>
        </View>
      ) : resources.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <MaterialIcons name="folder-off" size={48} color={colors.secondaryText} />
          <Text className={`text-xl mt-4 ${colors.text}`}>No resources available</Text>
          <Text className={`mt-2 ${colors.secondaryText}`}>Upload new files to get started</Text>
          {currentUser?.isAdmin && (
            <TouchableOpacity
              className="mt-4 flex-row items-center px-4 py-2 rounded-lg bg-indigo-500"
              onPress={() => console.log('Add new resource')}
            >
              <Feather name="upload" size={18} color="white" />
              <Text className="text-white ml-2">Upload First Resource</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={resources}
          renderItem={renderResourceItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16 }}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}

      {/* Toast Notification */}
      <Toast />
    </SafeAreaView>
  );
};

export default ResourcesScreen;