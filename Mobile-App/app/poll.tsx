import { View, ScrollView, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;

type Candidate = {
  _id: string;
  name: string;
  votes: number;
};

type Poll = {
  _id: string;
  title: string;
  candidates: Candidate[];
  expiresAt: string;
  createdAt: string;
};

const PollScreen = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const [title, setTitle] = useState('');
  const [candidates, setCandidates] = useState(['']);
  const [expiresAt, setExpiresAt] = useState('');
  const [polls, setPolls] = useState<Poll[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPollId, setSelectedPollId] = useState('');
  const [selectedCandidateName, setSelectedCandidateName] = useState('');
  const [visualData, setVisualData] = useState<Poll[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pollToDelete, setPollToDelete] = useState<Poll | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getThemeColors = (): Record<string, string> => {
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

  const fetchPolls = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/poll/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPolls(data);
      } else {
        throw new Error(data.message || 'Failed to fetch polls');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to fetch polls');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVisualData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/poll/getpolls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setVisualData(data);
      } else {
        throw new Error(data.message || 'Failed to fetch visual data');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to fetch visual data');
    }
  };

  useEffect(() => {
    fetchPolls();
    if (currentUser.isPastor) {
      fetchVisualData();
    }
  }, [currentUser.isPastor]);

  const handleAddCandidate = () => {
    setCandidates([...candidates, '']);
  };

  const handleCandidateChange = (index: number, value: string) => {
    const newCandidates = [...candidates];
    newCandidates[index] = value;
    setCandidates(newCandidates);
  };

  const handleCreatePoll = async () => {
    if (!title || candidates.some(c => !c.trim()) || !expiresAt) {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/poll/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, candidates, expiresAt }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Poll created successfully!');
        setTitle('');
        setCandidates(['']);
        setExpiresAt('');
        fetchPolls();
        if (currentUser.isPastor) {
          fetchVisualData();
        }
      } else {
        throw new Error('Failed to create poll');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to create poll');
    }
  };

  const openConfirmationModal = (pollId: string) => {
    const candidateId = selectedCandidates[pollId];
    if (!candidateId) {
      Alert.alert('Error', 'Please select a candidate');
      return;
    }

    const poll = polls.find(p => p._id === pollId);
    const candidate = poll?.candidates.find(c => c._id === candidateId);
    if (candidate) {
      setSelectedPollId(pollId);
      setSelectedCandidateName(candidate.name);
      setIsModalOpen(true);
    }
  };

  const openDeleteModal = (poll: Poll) => {
    setPollToDelete(poll);
    setIsDeleteModalOpen(true);
  };

  const handleDeletePoll = async () => {
    if (!currentUser.isPastor || !pollToDelete) return;

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/poll/delete/${pollToDelete._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Poll deleted successfully!');
        setPolls(polls.filter(p => p._id !== pollToDelete._id));
        setVisualData(visualData.filter(p => p._id !== pollToDelete._id));
      } else {
        throw new Error('Failed to delete poll');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to delete poll');
    } finally {
      setIsDeleteModalOpen(false);
      setPollToDelete(null);
    }
  };

  const handleVote = async () => {
    const candidateId = selectedCandidates[selectedPollId];
    if (!candidateId) return;

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/poll/vote/${selectedPollId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: currentUser._id,
          candidateId,
          pollId: selectedPollId,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Vote cast successfully!');
        setIsModalOpen(false);
        fetchPolls();
        if (currentUser.isPastor) {
          fetchVisualData();
        }
      } else {
        throw new Error('You have already voted in this poll');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to cast vote');
      setIsModalOpen(false);
    }
  };

  const handleSelectCandidate = (pollId: string, candidateId: string) => {
    setSelectedCandidates(prev => ({
      ...prev,
      [pollId]: candidateId,
    }));
  };

  const generateColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${(i * 360) / count}, 70%, 50%)`);
    }
    return colors;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
      <ScrollView>
        {/* Admin Panel */}
        {currentUser.isPastor && (
          <View className={`${colors.card} rounded-xl p-6 mb-6`}>
            <Text className={`text-2xl font-bold ${colors.text} mb-4`}>Create New Poll</Text>
            
            <Text className={`text-sm font-medium ${colors.text} mb-2`}>Poll Title</Text>
            <TextInput
              placeholder="Enter poll title"
              placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              value={title}
              onChangeText={setTitle}
              className={`${colors.input} p-3 rounded-lg mb-4 ${colors.text}`}
            />

            <Text className={`text-sm font-medium ${colors.text} mb-2`}>Candidates</Text>
            {candidates.map((candidate, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <TextInput
                  placeholder={`Candidate ${index + 1}`}
                  placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                  value={candidate}
                  onChangeText={(text) => handleCandidateChange(index, text)}
                  className={`${colors.input} flex-1 p-2 rounded-md ${colors.text}`}
                />
                {candidates.length > 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      const newCandidates = [...candidates];
                      newCandidates.splice(index, 1);
                      setCandidates(newCandidates);
                    }}
                    className="ml-2 p-2"
                  >
                    <AntDesign
                      name="delete"
                      size={20}
                      color={theme === 'dark' ? '#ef4444' : '#dc2626'}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity
              onPress={handleAddCandidate}
              className="flex-row items-center mb-4"
            >
              <AntDesign
                name="pluscircleo"
                size={16}
                color={theme === 'dark' ? '#3b82f6' : '#2563eb'}
                style={{ marginRight: 8 }}
              />
              <Text className={`${colors.accent} text-sm`}>Add Candidate</Text>
            </TouchableOpacity>

            <Text className={`text-sm font-medium ${colors.text} mb-2`}>Expiration Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className={`${colors.input} p-3 rounded-lg mb-4`}
            >
              <Text className={colors.text}>{expiresAt || 'Select expiration date'}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={expiresAt ? new Date(expiresAt) : new Date()}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setExpiresAt(selectedDate.toISOString());
                  }
                }}
                minimumDate={new Date()}
              />
            )}

            <TouchableOpacity
              onPress={handleCreatePoll}
              className={`${colors.button} p-3 rounded-lg items-center`}
            >
              <Text className="text-white font-medium">Create Poll</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Polls for Voting */}
        <Text className={`text-2xl font-bold ${colors.text} mb-4`}>Current Polls</Text>
        {polls.length === 0 ? (
          <Text className={`${colors.secondaryText} text-center py-4`}>No polls available</Text>
        ) : (
          polls.map((poll) => {
            const totalVotes = poll.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

            return (
              <View key={poll._id} className={`${colors.card} rounded-xl p-6 mb-6`}>
                <View className="flex-row justify-between items-start">
                  <Text className={`text-xl font-bold ${colors.text} mb-4`}>{poll.title}</Text>
                  {currentUser.isPastor && (
                    <TouchableOpacity
                      onPress={() => openDeleteModal(poll)}
                    >
                      <AntDesign
                        name="delete"
                        size={20}
                        color={theme === 'dark' ? '#ef4444' : '#dc2626'}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <Text className={`${colors.secondaryText} mb-4`}>
                  Expires: {formatDate(poll.expiresAt)}
                </Text>

                <Text className={`text-sm font-medium ${colors.text} mb-2`}>Candidates</Text>
                <View className="mb-4">
                  {poll.candidates.map((candidate) => (
                    <View key={candidate._id} className="flex-row items-center mb-2">
                      <TouchableOpacity
                        onPress={() => handleSelectCandidate(poll._id, candidate._id)}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <View className={`w-5 h-5 rounded-full border ${colors.border} mr-2 items-center justify-center`}>
                          {selectedCandidates[poll._id] === candidate._id && (
                            <View className="w-3 h-3 rounded-full bg-blue-500" />
                          )}
                        </View>
                        <Text className={colors.text}>{candidate.name}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  onPress={() => openConfirmationModal(poll._id)}
                  className={`${colors.button} p-3 rounded-lg items-center`}
                >
                  <Text className="text-white font-medium">Submit Vote</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}

        {/* Admin Visualizations */}
        {currentUser.isPastor && (
          <View className="mt-6">
            <Text className={`text-2xl font-bold ${colors.text} mb-4`}>Poll Results</Text>
            {visualData.length === 0 ? (
              <Text className={`${colors.secondaryText} text-center py-4`}>No poll data to display</Text>
            ) : (
              visualData.map((poll) => {
                const totalVotes = poll.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
                const colors = generateColors(poll.candidates.length);

                const pieChartData = poll.candidates.map((candidate, index) => ({
                  name: candidate.name,
                  votes: candidate.votes,
                  color: colors[index],
                  legendFontColor: theme === 'dark' ? 'white' : 'black',
                  legendFontSize: 12,
                }));

                const barChartData = {
                  labels: poll.candidates.map(c => c.name),
                  datasets: [{
                    data: poll.candidates.map(c => c.votes),
                  }],
                };

                return (
                  <View key={poll._id} className={`${colors.card} rounded-xl p-6 mb-6`}>
                    <View className="flex-row justify-between items-start">
                      <Text className={`text-xl font-bold ${colors.text} mb-4`}>{poll.title}</Text>
                      <TouchableOpacity
                        onPress={() => openDeleteModal(poll)}
                      >
                        <AntDesign
                          name="delete"
                          size={20}
                          color={theme === 'dark' ? '#ef4444' : '#dc2626'}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text className={`${colors.text} mb-4`}>Total Votes: {totalVotes}</Text>

                    <Text className={`${colors.text} font-medium mb-2`}>Pie Chart</Text>
                    <PieChart
                      data={pieChartData}
                      width={screenWidth - 48}
                      height={220}
                      chartConfig={{
                        backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                        backgroundGradientFrom: theme === 'dark' ? '#1e293b' : '#ffffff',
                        backgroundGradientTo: theme === 'dark' ? '#1e293b' : '#ffffff',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      }}
                      accessor="votes"
                      backgroundColor="transparent"
                      paddingLeft="15"
                      absolute
                    />

                    <Text className={`${colors.text} font-medium mb-2 mt-4`}>Bar Chart</Text>
                    <BarChart
                      data={barChartData}
                      width={screenWidth - 48}
                      height={220}
                      yAxisLabel=""
                      chartConfig={{
                        backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                        backgroundGradientFrom: theme === 'dark' ? '#1e293b' : '#ffffff',
                        backgroundGradientTo: theme === 'dark' ? '#1e293b' : '#ffffff',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        barPercentage: 0.5,
                        propsForBackgroundLines: {
                          stroke: theme === 'dark' ? '#64748b' : '#e2e8f0',
                        },
                      }}
                    />
                  </View>
                );
              })
            )}
          </View>
        )}
      </ScrollView>

      {/* Vote Confirmation Modal */}
      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className={`${colors.card} rounded-xl p-6 w-full max-w-md`}>
            <Text className={`text-xl font-bold ${colors.text} mb-4`}>Confirm Your Vote</Text>
            <Text className={`${colors.text} mb-6`}>
              You are about to vote for <Text className="font-bold">{selectedCandidateName}</Text>. Are you sure?
            </Text>
            <View className="flex-row justify-end gap-4">
              <TouchableOpacity
                onPress={() => setIsModalOpen(false)}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} px-4 py-2 rounded-md`}
              >
                <Text className={colors.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleVote}
                className={`${colors.button} px-4 py-2 rounded-md`}
              >
                <Text className="text-white font-medium">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={isDeleteModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className={`${colors.card} rounded-xl p-6 w-full max-w-md`}>
            <Text className={`text-xl font-bold ${colors.text} mb-4`}>Delete Poll</Text>
            <Text className={`${colors.text} mb-6`}>
              Are you sure you want to delete the poll <Text className="font-bold">{pollToDelete?.title}</Text>? This action cannot be undone.
            </Text>
            <View className="flex-row justify-end gap-4">
              <TouchableOpacity
                onPress={() => setIsDeleteModalOpen(false)}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} px-4 py-2 rounded-md`}
              >
                <Text className={colors.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeletePoll}
                className={`${colors.danger} px-4 py-2 rounded-md`}
              >
                <Text className="text-white font-medium">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PollScreen;