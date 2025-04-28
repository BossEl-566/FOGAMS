import { View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Announcement = {
  _id: string;
  title: string;
  description: string;
  date: string;
  userId: string;
  username: string;
};

export default function AnnouncementScreen() {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Helper function to get color based on theme
  const getThemeColors = () => {
    return {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      input: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
      placeholder: theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500',
      button: theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600',
      danger: theme === 'dark' ? 'text-red-500' : 'text-red-600',
      border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
      refresh: theme === 'dark' ? '#3b82f6' : '#2563eb',
    };
  };

  const colors = getThemeColors();

  const fetchAnnouncements = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch('http://192.168.148.105:3000/api/announcement/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setAnnouncements(data.announcements || data);
      } else {
        throw new Error(data.message || 'Failed to fetch announcements');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch announcements',
        text2: error instanceof Error ? error.message : 'Please try again later',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAnnouncements();
  };

  const handleChange = (name: string, value: string | Date) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('date', selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!currentUser?._id || !currentUser?.username) {
      Toast.show({
        type: 'error',
        text1: 'User information is missing',
        text2: 'Please login again',
      });
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Title and description are required',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const payload = {
        title: formData.title,
        description: formData.description,
        date: formData.date.toISOString(),
        userId: currentUser._id,
        username: currentUser.username
      };

      const response = await fetch('http://192.168.148.105:3000/api/announcement/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create announcement');
      }

      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Announcement created successfully!',
      });
      
      setFormData({
        title: '',
        description: '',
        date: new Date()
      });
      setShowForm(false);
      fetchAnnouncements();

    } catch (err: any) {
      console.error('Error creating announcement:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message || 'Failed to create announcement',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.148.105:3000/api/announcement/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete announcement');
      }

      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Announcement deleted successfully!',
      });

      fetchAnnouncements();
    } catch (err: any) {
      console.error('Error deleting announcement:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message || 'Failed to delete announcement',
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <View className={`flex-1 justify-center items-center ${colors.background}`}>
        <ActivityIndicator size="large" color={theme === 'dark' ? '#3b82f6' : '#2563eb'} />
      </View>
    );
  }

  return (
    <View className={`flex-1 ${colors.background} p-4`}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.refresh]}
            tintColor={colors.refresh}
          />
        }
      >
        <Text className={`text-2xl font-bold ${colors.text} mb-2`}>Announcements</Text>
        <Text className={`text-base ${colors.secondaryText} mb-6`}>Important updates from your community</Text>

        {currentUser?.isAdmin && (
          <TouchableOpacity
            onPress={() => setShowForm(!showForm)}
            className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} p-3 rounded-lg mb-4 flex-row items-center justify-center ${showForm ? 'mb-4' : 'mb-6'}`}
          >
            <AntDesign
              name={showForm ? 'minuscircleo' : 'pluscircleo'}
              size={18}
              color={theme === 'dark' ? '#3b82f6' : '#2563eb'}
              style={{ marginRight: 8 }}
            />
            <Text className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-semibold`}>
              {showForm ? 'Hide Form' : 'Create Announcement'}
            </Text>
          </TouchableOpacity>
        )}

        {showForm && (
          <View className={`${colors.card} rounded-xl shadow-md p-6 mb-6`}>
            <TextInput
              placeholder="Title"
              placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              value={formData.title}
              onChangeText={(text) => handleChange('title', text)}
              className={`${colors.input} rounded-lg p-3 mb-4 ${colors.text}`}
            />

            <TextInput
              placeholder="Description"
              placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              value={formData.description}
              onChangeText={(text) => handleChange('description', text)}
              multiline
              numberOfLines={4}
              className={`${colors.input} rounded-lg p-3 mb-4 ${colors.text} h-32`}
            />

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className={`${colors.input} rounded-lg p-3 mb-6`}
            >
              <Text className={colors.text}>
                {formData.date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display="default"
                onChange={handleDateChange}
                themeVariant={theme === 'dark' ? 'dark' : 'light'}
              />
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`${colors.button} rounded-lg p-4 items-center ${isSubmitting ? 'opacity-50' : ''}`}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold">Publish Announcement</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {announcements.length === 0 ? (
          <View className={`${colors.card} rounded-xl p-8 items-center justify-center`}>
            <Text className={`${colors.secondaryText} text-lg mb-4`}>No announcements yet</Text>
            {currentUser?.isAdmin && (
              <TouchableOpacity
                onPress={() => setShowForm(true)}
                className={`${colors.button} rounded-lg px-6 py-3`}
              >
                <Text className="text-white font-semibold">Create your first announcement</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          announcements.map((announcement) => (
            <View key={announcement._id} className={`${colors.card} rounded-xl shadow-sm p-6 mb-4`}>
              <View className="flex-row justify-between items-start mb-2">
                <Text className={`text-lg font-semibold ${colors.text} flex-1`}>
                  {announcement.title}
                </Text>
                {currentUser?.isAdmin && (
                  <TouchableOpacity 
                    onPress={() => handleDelete(announcement._id)}
                    className="ml-2"
                  >
                    <AntDesign
                      name="delete"
                      size={20}
                      color={theme === 'dark' ? '#ef4444' : '#dc2626'}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <Text className={`text-sm ${colors.secondaryText} mb-3`}>
                {formatDate(announcement.date)}
              </Text>
              <Text className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
                {announcement.description}
              </Text>
              <Text className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mt-3`}>
                Posted by: {announcement.username}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}