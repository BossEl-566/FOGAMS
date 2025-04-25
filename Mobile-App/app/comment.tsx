import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

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

  const fetchComments = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Assuming you stored it like this
  
      const res = await fetch(`http://192.168.106.105:3000/api/comment/getcomments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 👈 This makes your middleware happy
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log('Fetched comments:', data);
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
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <ActivityIndicator size="large" color={theme === 'dark' ? '#ffffff' : '#000000'} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView 
        className="p-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme === 'dark' ? '#ffffff' : '#000000']}
            tintColor={theme === 'dark' ? '#ffffff' : '#000000'}
          />
        }
      >
        <View className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <View className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-row justify-between items-center">
            <Text className="text-2xl font-semibold text-gray-800 dark:text-white">
              Comments Management
            </Text>
            <View className="bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">
              <Text className="text-indigo-800 dark:text-indigo-200 text-sm">
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
                    className="p-4 border-b border-gray-200 dark:border-gray-700 flex-row items-start"
                  >
                    <Avatar 
                      uri={comment.userProfilePicture || 'https://via.placeholder.com/40'}
                      size={40}
                      className="mr-3"
                    />
                    <View className="flex-1">
                      <View className="flex-row justify-between items-start mb-1">
                        <Text className="font-medium text-gray-900 dark:text-white">
                          {comment.username}
                        </Text>
                        <Text className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(comment.updatedAt)}
                        </Text>
                      </View>
                      <Text className="text-gray-800 dark:text-gray-200 mb-2">
                        {truncateContent(comment.content)}
                      </Text>
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center space-x-2">
                          <View className="flex-row items-center">
                            <FontAwesome 
                              name="thumbs-o-up" 
                              size={14} 
                              color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                            />
                            <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                              {comment.numberOfLikes}
                            </Text>
                          </View>
                          <Text className="text-xs text-purple-600 dark:text-purple-400">
                            Post: {comment.postId?.slice(-6)}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal(true);
                            setCommentIdToDelete(comment._id);
                          }}
                          className="flex-row items-center px-3 py-1 bg-red-50 dark:bg-red-900/30 rounded-full"
                        >
                          <Feather 
                            name="trash-2" 
                            size={14} 
                            color={theme === 'dark' ? '#FCA5A5' : '#EF4444'} 
                          />
                          <Text className="text-xs text-red-500 dark:text-red-400 ml-1">
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}

                {showMore && (
                  <View className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 items-center">
                    <TouchableOpacity
                      onPress={handleShowMore}
                      className="flex-row items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full"
                    >
                      <Text className="text-gray-700 dark:text-gray-300 mr-1">
                        Load more
                      </Text>
                      <AntDesign 
                        name="down" 
                        size={14} 
                        color={theme === 'dark' ? '#D1D5DB' : '#4B5563'} 
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <View className="p-8 items-center">
                <Text className="text-gray-500 dark:text-gray-400">
                  No comments found
                </Text>
              </View>
            )
          ) : (
            <View className="p-8 items-center">
              <Text className="text-gray-500 dark:text-gray-400">
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
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <View className="items-center mb-4">
              <View className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 items-center justify-center">
                <Feather 
                  name="alert-circle" 
                  size={24} 
                  color={theme === 'dark' ? '#FCA5A5' : '#EF4444'} 
                />
              </View>
            </View>
            <Text className="text-lg font-medium text-gray-900 dark:text-white text-center mb-2">
              Delete comment
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
              Are you sure you want to delete this comment? This action cannot be undone.
            </Text>
            <View className="flex-row justify-center space-x-3">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                disabled={isDeleting}
              >
                <Text className="text-gray-800 dark:text-gray-200">
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