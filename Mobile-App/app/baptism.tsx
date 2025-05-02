import { View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Modal, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

type Applicant = {
  _id: string;
  username: string;
  age: number;
  userId: string;
  isBaptized: boolean;
  createdAt: string;
};

const BaptismScreen = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicantId, setApplicantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getThemeColors = () => {
    return {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      input: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
      button: theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600',
      danger: theme === 'dark' ? 'bg-red-700' : 'bg-red-600',
      border: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',
      accent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    };
  };

  const colors = getThemeColors();

  const fetchApplicants = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/baptism/applicants`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setApplicants(data.filter((applicant: Applicant) => !applicant.isBaptized));
      } else {
        throw new Error(data.message || 'Failed to fetch applicants');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to fetch applicants');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchApplicants();
  };

  const handleApply = async () => {
    if (!username || !age) {
      Alert.alert('Validation Error', 'Please enter all fields');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/baptism/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          username, 
          userID: currentUser._id, 
          age: parseInt(age) 
        }),
      });

      if (response.ok) {
        const newApplicant = await response.json();
        setApplicants([...applicants, newApplicant]);
        setUsername('');
        setAge('');
        Alert.alert('Success', 'Application submitted successfully!');
      } else {
        console.log(response.status, await response.text())
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to submit application');
    }
  };

  const handleBaptize = async () => {
    if (!applicantId) return;

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/baptism/baptize/${applicantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setApplicants(applicants.filter(applicant => applicant._id !== applicantId));
        Alert.alert('Success', 'User has been baptized!');
        setIsModalOpen(false);
      } else {
        throw new Error('Failed to baptize applicant');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to baptize applicant');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
            colors={[theme === 'dark' ? '#3b82f6' : '#2563eb']}
            tintColor={theme === 'dark' ? '#3b82f6' : '#2563eb'}
          />
        }
      >
        <Text className={`text-2xl font-bold ${colors.text} mb-6`}>Baptism Application</Text>

        {/* Application Form */}
        {!applicants.some(app => app.userId === currentUser._id) && (
          <View className={`${colors.card} rounded-xl p-6 mb-6`}>
            <Text className={`text-xl font-semibold ${colors.text} mb-4`}>Apply for Baptism</Text>
            
            <Text className={`text-sm font-medium ${colors.text} mb-2`}>Full Name</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              value={username}
              onChangeText={setUsername}
              className={`${colors.input} p-3 rounded-lg mb-4 ${colors.text}`}
            />

            <Text className={`text-sm font-medium ${colors.text} mb-2`}>Age</Text>
            <TextInput
              placeholder="Enter your age"
              placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              className={`${colors.input} p-3 rounded-lg mb-4 ${colors.text}`}
            />

            <TouchableOpacity
              onPress={handleApply}
              className={`${colors.button} p-3 rounded-lg items-center`}
            >
              <Text className="text-white font-medium">Submit Application</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Admin Panel */}
        {currentUser.isAdmin && (
          <View className={`${colors.card} rounded-xl p-6`}>
            <Text className={`text-xl font-semibold ${colors.text} mb-4`}>Admin Panel</Text>
            <Text className={`text-lg font-semibold ${colors.text} mb-2`}>Applicants</Text>
            
            {applicants.length === 0 ? (
              <Text className={`${colors.secondaryText} text-center py-4`}>No applicants yet</Text>
            ) : (
              <View className="gap-2">
                {applicants.map((applicant) => (
                  <View key={applicant._id} className={`${colors.input} p-4 rounded-lg`}>
                    <View className="flex-row justify-between items-center">
                      <View>
                        <Text className={`font-medium ${colors.text}`}>{applicant.username}</Text>
                        <Text className={`text-sm ${colors.secondaryText}`}>
                          {applicant.age} years old • Applied on {formatDate(applicant.createdAt)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setApplicantId(applicant._id);
                          setIsModalOpen(true);
                        }}
                        className={`${colors.button} px-4 py-2 rounded-md`}
                      >
                        <Text className="text-white font-medium">Baptize</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className={`${colors.card} rounded-xl p-6 w-full max-w-md`}>
            <Text className={`text-xl font-bold ${colors.text} mb-4`}>Confirm Baptism</Text>
            <Text className={`${colors.text} mb-6`}>
              Are you sure this person has been baptized?
            </Text>
            <View className="flex-row justify-end gap-4">
              <TouchableOpacity
                onPress={() => setIsModalOpen(false)}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} px-4 py-2 rounded-md`}
              >
                <Text className={colors.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBaptize}
                className={`${colors.button} px-4 py-2 rounded-md`}
              >
                <Text className="text-white font-medium">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BaptismScreen;