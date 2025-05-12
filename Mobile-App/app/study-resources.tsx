import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import * as WebBrowser from 'expo-web-browser';

const ResourcesScreen = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 9;

  const getThemeColors = () => {
    return {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      button: theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600',
    };
  };

  const colors = getThemeColors();

  const fetchResources = async (page = 0) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/resource/get?page=${page}&size=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      
      const data = await response.json();
      
      if (page === 0) {
        setResources(data.resources || []);
      } else {
        setResources((prev) => [...prev, ...(data.resources || [])]);
      }
      
      setShowMore(data.resources?.length === pageSize);
    } catch (error) {
      console.error('Error fetching resources:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch resources',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FontAwesome name="file-pdf-o" size={40} color="#E53E3E" />;
      case 'image':
        return <FontAwesome name="file-image-o" size={40} color="#38A169" />;
      case 'document':
        return <FontAwesome name="file-word-o" size={40} color="#2B6CB0" />;
      default:
        return <FontAwesome name="file-o" size={40} color="#718096" />;
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
      const response = await fetch(`http://192.168.201.105:3000/api/resources/${resourceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

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
      'Are you sure you want to delete this resource?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleDelete(resourceId), style: 'destructive' },
      ]
    );
  };

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchResources(nextPage);
  };

  return (
    <View className={`flex-1 ${colors.background} p-4`}>
      <ScrollView>
        {/* Admin Controls */}
        {currentUser?.isAdmin && (
          <View className="flex-row justify-end mb-4">
            <TouchableOpacity
              className={`flex-row items-center px-4 py-2 rounded-lg ${colors.button}`}
              onPress={() => console.log('Add new resource')}
            >
              <Feather name="upload" size={20} color="white" />
              <Text className="text-white ml-2">Add New File</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Resources List */}
        {loading && resources.length === 0 ? (
          <View className="flex-1 justify-center items-center py-8">
            <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'gray'} />
            <Text className={`mt-4 ${colors.text}`}>Loading resources...</Text>
          </View>
        ) : resources.length === 0 ? (
          <View className="flex-1 justify-center items-center py-8">
            <Text className={`text-xl ${colors.text}`}>No resources available</Text>
          </View>
        ) : (
          <View className="flex flex-col space-y-4">
            {resources.map((resource) => (
              <View
                key={resource._id}
                className={`p-4 rounded-lg ${colors.card} shadow`}
              >
                <View className="flex-row items-center mb-3">
                  <View className="mr-4">
                    {getFileIcon(resource.fileType)}
                  </View>
                  <View className="flex-1">
                    <Text className={`text-lg font-bold ${colors.text}`}>
                      {resource.title || 'Untitled'}
                    </Text>
                    <Text className={`text-sm ${colors.secondaryText}`}>
                      {resource.description || 'No description'}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-end space-x-2">
                  <TouchableOpacity
                    onPress={() => handleViewResource(resource.fileUrl, resource.fileType)}
                    className={`px-3 py-1 rounded ${colors.button}`}
                  >
                    <Text className="text-white">View</Text>
                  </TouchableOpacity>
                  {currentUser?.isAdmin && (
                    <TouchableOpacity
                      onPress={() => confirmDelete(resource._id)}
                      className="px-3 py-1 rounded bg-red-500"
                    >
                      <Text className="text-white">Delete</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Show More Button */}
        {showMore && (
          <TouchableOpacity
            onPress={handleShowMore}
            className="py-4 items-center"
          >
            <Text className="text-blue-500">Show More</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Toast Notification */}
      <Toast />
    </View>
  );
};

export default ResourcesScreen;