import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import React from 'react';

const Avatar = ({ uri, size, className }: { uri: string; size: number; className?: string }) => (
  <View className={className}>
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  </View>
);

type Comment = {
  _id: string;
  content: string;
  userId: string;
  postId: string;
  username: string;
  userProfilePicture?: string;
  numberOfLikes: number;
  updatedAt: string;
};

export default function CommentScreen() {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Theme-based styles
  const themeStyles = {
    container: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    card: theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    refreshControl: theme === 'dark' ? '#ffffff' : '#000000',
    icon: theme === 'dark' ? '#9CA3AF' : '#6B7280',
    dangerIcon: theme === 'dark' ? '#FCA5A5' : '#EF4444',
    dangerText: theme === 'dark' ? 'text-red-400' : 'text-red-500',
    dangerBg: theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50',
    modalBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    buttonSecondary: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
    buttonSecondaryText: theme === 'dark' ? 'text-gray-200' : 'text-gray-800',
    countBadge: theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-100',
    countText: theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800',
    postIdText: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
    loadMoreBg: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
    loadMoreText: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    loadMoreIcon: theme === 'dark' ? '#D1D5DB' : '#4B5563'
  };

  const fetchComments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/comment/getcomments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setComments(data.comments);
        setShowMore(data.comments.length >= 9);
      } else {
        Toast.show({
          type: 'error',
          text1: data.message || 'Unauthorized access',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch comments',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchComments();
    }
  }, [currentUser?._id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchComments();
  };

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`http://192.168.106.105:3000/api/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        setShowMore(data.comments.length >= 9);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load more comments',
      });
      console.error(error);
    }
  };

  const handleDeleteComment = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://192.168.106.105:3000/api/comment/deleteComment/${commentIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
        Toast.show({
          type: 'success',
          text1: 'Comment deleted successfully',
        });
        setShowModal(false);
      } else {
        Toast.show({
          type: 'error',
          text1: data.message || 'Failed to delete comment',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to delete comment',
      });
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (content: string, length = 60) => {
    return content.length > length 
      ? `${content.substring(0, length)}...` 
      : content;
  };

  if (isLoading && !refreshing) {
    return (
      <View className={`flex-1 items-center justify-center ${themeStyles.container}`}>
        <ActivityIndicator size="large" color={themeStyles.refreshControl} />
      </View>
    );
  }

  return (
    <View className={`flex-1 ${themeStyles.container}`}>
      <ScrollView 
        className="p-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[themeStyles.refreshControl]}
            tintColor={themeStyles.refreshControl}
          />
        }
      >
        <View className={`rounded-xl shadow-sm border ${themeStyles.card} ${themeStyles.border} overflow-hidden mb-6`}>
          <View className={`px-6 py-4 border-b ${themeStyles.border} flex-row justify-between items-center`}>
            <Text className={`text-2xl font-semibold ${themeStyles.textPrimary}`}>
              Comments Management
            </Text>
            <View className={`${themeStyles.countBadge} px-3 py-1 rounded-full`}>
              <Text className={`${themeStyles.countText} text-sm`}>
                {comments.length} total
              </Text>
            </View>
          </View>

          {currentUser?.isAdmin ? (
            comments.length > 0 ? (
              <>
                {comments.map((comment) => (
                  <View 
                    key={comment._id}
                    className={`p-4 border-b ${themeStyles.border} flex-row items-start`}
                  >
                    <Avatar 
                      uri={comment.userProfilePicture || 'https://via.placeholder.com/40'}
                      size={40}
                      className="mr-3"
                    />
                    <View className="flex-1">
                      <View className="flex-row justify-between items-start mb-1">
                        <Text className={`font-medium ${themeStyles.textPrimary}`}>
                          {comment.username}
                        </Text>
                        <Text className={`text-xs ${themeStyles.textSecondary}`}>
                          {formatDate(comment.updatedAt)}
                        </Text>
                      </View>
                      <Text className={`${themeStyles.textPrimary} mb-2`}>
                        {truncateContent(comment.content)}
                      </Text>
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center space-x-2">
                          <View className="flex-row items-center">
                            <FontAwesome 
                              name="thumbs-o-up" 
                              size={14} 
                              color={themeStyles.icon} 
                            />
                            <Text className={`text-xs ${themeStyles.textSecondary} ml-1`}>
                              {comment.numberOfLikes}
                            </Text>
                          </View>
                          <Text className={`text-xs ${themeStyles.postIdText}`}>
                            Post: {comment.postId?.slice(-6)}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal(true);
                            setCommentIdToDelete(comment._id);
                          }}
                          className={`flex-row items-center px-3 py-1 ${themeStyles.dangerBg} rounded-full`}
                        >
                          <Feather 
                            name="trash-2" 
                            size={14} 
                            color={themeStyles.dangerIcon} 
                          />
                          <Text className={`text-xs ${themeStyles.dangerText} ml-1`}>
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}

                {showMore && (
                  <View className={`px-6 py-4 border-t ${themeStyles.border} items-center`}>
                    <TouchableOpacity
                      onPress={handleShowMore}
                      className={`flex-row items-center px-4 py-2 ${themeStyles.loadMoreBg} rounded-full`}
                    >
                      <Text className={`${themeStyles.loadMoreText} mr-1`}>
                        Load more
                      </Text>
                      <AntDesign 
                        name="down" 
                        size={14} 
                        color={themeStyles.loadMoreIcon} 
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <View className="p-8 items-center">
                <Text className={themeStyles.textSecondary}>
                  No comments found
                </Text>
              </View>
            )
          ) : (
            <View className="p-8 items-center">
              <Text className={themeStyles.textSecondary}>
                You need admin privileges to view comments
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className={`rounded-xl p-6 w-full max-w-md ${themeStyles.modalBg}`}>
            <View className="items-center mb-4">
              <View className={`w-12 h-12 rounded-full ${themeStyles.dangerBg} items-center justify-center`}>
                <Feather 
                  name="alert-circle" 
                  size={24} 
                  color={themeStyles.dangerIcon} 
                />
              </View>
            </View>
            <Text className={`text-lg font-medium text-center mb-2 ${themeStyles.textPrimary}`}>
              Delete comment
            </Text>
            <Text className={`text-sm text-center mb-6 ${themeStyles.textSecondary}`}>
              Are you sure you want to delete this comment? This action cannot be undone.
            </Text>
            <View className="flex-row justify-center space-x-3">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className={`px-4 py-2 ${themeStyles.buttonSecondary} rounded-lg`}
                disabled={isDeleting}
              >
                <Text className={themeStyles.buttonSecondaryText}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteComment}
                className="px-4 py-2 bg-red-500 rounded-lg items-center justify-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-white">
                    Delete
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <Toast />
    </View>
  );
}