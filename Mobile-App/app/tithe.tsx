import { View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Modal, Image, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

type Tithe = {
  _id: string;
  amount: string;
  period: string;
  paymentForMonth: string;
  weekOrMonth: string;
  mode: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
};

const TitheScreen = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<Tithe[]>([]);
  const [isApproved, setIsApproved] = useState<Tithe[]>([]);
  const [isPending, setIsPending] = useState<Tithe[]>([]);
  const [firstTransaction, setFirstTransaction] = useState<Tithe | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    userID: currentUser._id,
    amount: '',
    period: 'weekly',
    paymentForMonth: 'January',
    weekOrMonth: '',
    mode: 'mobile money',
  });

  const getThemeColors = () => {
    return {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      input: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
      button: theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600',
      border: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',
      accent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    };
  };

  const colors = getThemeColors();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/tithe/getTithe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTransactions(data);
        const approved = data.filter((tx: Tithe) => tx.isApproved);
        const pending = data.filter((tx: Tithe) => !tx.isApproved);
        setIsApproved(approved);
        setIsPending(pending);
        if (approved.length > 0) {
          setFirstTransaction(approved[0]);
        }
      } else {
        throw new Error(data.message || 'Failed to fetch transactions');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTransactions();
  };

  const handlePayment = async () => {
    if (!formData.amount || !formData.weekOrMonth) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/tithe/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Alert.alert('Success', 'Payment submitted successfully!');
        setFormData({
          ...formData,
          amount: '',
          weekOrMonth: '',
        });
        fetchTransactions();
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Payment submission failed');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Payment submission failed');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <View className={`flex-1 justify-center items-center ${colors.background}`}>
        <ActivityIndicator size="large" color={theme === 'dark' ? '#3b82f6' : '#2563eb'} />
      </View>
    );
  }

  return (
    <View className={`flex-1 ${colors.background}`}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme === 'dark' ? '#3b82f6' : '#2563eb']}
            tintColor={theme === 'dark' ? '#3b82f6' : '#2563eb'}
          />
        }
        className="p-4"
      >
        {/* Last Tithe Record */}
        <View className={`${colors.card} rounded-xl p-6 mb-4`}>
          <Text className={`text-2xl font-bold ${colors.text} mb-4`}>Tithe Dashboard</Text>
          
          <TouchableOpacity 
            onPress={() => router.push('/transactions')}
            className={`${colors.button} p-3 rounded-lg mb-4 items-center`}
          >
            <Text className="text-white font-medium">View All Records</Text>
          </TouchableOpacity>

          <View className={`${colors.card} rounded-xl p-4 mb-4`}>
            <Text className={`text-xl font-bold ${colors.text} mb-2`}>Last Tithe Record</Text>
            
            {firstTransaction ? (
              <>
                <Text className={`text-3xl font-bold ${colors.text} mb-4`}>
                  GHS {firstTransaction.amount}
                </Text>
                
                <View className="flex-row items-center mb-2">
                  <Text className={`text-sm font-medium ${colors.secondaryText}`}>Mode:</Text>
                  <Text className={`text-sm ${colors.text} ml-2`}>{firstTransaction.mode}</Text>
                </View>
                
                <View className="flex-row items-center mb-2">
                  <Text className={`text-sm font-medium ${colors.secondaryText}`}>Period:</Text>
                  <Text className={`text-sm ${colors.text} ml-2`}>
                    {firstTransaction.period} - {firstTransaction.paymentForMonth}
                  </Text>
                </View>
                
                <View className="flex-row justify-between mt-4">
                  <View>
                    <Text className={`text-xs ${colors.secondaryText}`}>Paid On:</Text>
                    <Text className={`text-xs ${colors.text}`}>
                      {formatDate(firstTransaction.createdAt)}
                    </Text>
                  </View>
                  
                  <View>
                    <Text className={`text-xs ${colors.secondaryText}`}>Updated:</Text>
                    <Text className={`text-xs ${colors.text}`}>
                      {formatDate(firstTransaction.updatedAt)}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <Text className={`${colors.secondaryText} text-center py-4`}>No Tithe Record available</Text>
            )}
          </View>
        </View>

        {/* Payment Methods */}
        <View className={`${colors.card} rounded-xl p-4 mb-4`}>
          <Text className={`text-xl font-semibold ${colors.text} mb-2`}>Mobile Money</Text>
          <Text className={`text-sm ${colors.secondaryText} mb-4`}>
            Select a Mobile Money Network to Pay your Tithe
          </Text>
          
          <View className="flex-row justify-between mb-4">
            {/* MTN Mobile Money */}
            <TouchableOpacity className={`${colors.input} p-4 items-center rounded-lg w-1/3`}>
              <Image 
                source={require('../assets/images/pngfind.com-money-symbol-png-163563.png')} 
                className="w-12 h-12 mb-2"
              />
              <Text className={`text-sm ${colors.text}`}>MTN</Text>
            </TouchableOpacity>
            
            {/* Telecel Cash */}
            <TouchableOpacity className={`${colors.input} p-4 items-center rounded-lg w-1/3 mx-2`}>
              <Image 
                source={require('../assets/images/telecel-cash.jpg')} 
                className="w-12 h-12 mb-2"
              />
              <Text className={`text-sm ${colors.text}`}>Telecel</Text>
            </TouchableOpacity>
            
            {/* AirtelTigo */}
            <TouchableOpacity className={`${colors.input} p-4 items-center rounded-lg w-1/3`}>
              <Image 
                source={require('../assets/images/airteltigo.png')} 
                className="w-12 h-12 mb-2"
              />
              <Text className={`text-sm ${colors.text}`}>AirtelTigo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Form */}
        <View className={`${colors.card} rounded-xl p-4 mb-4`}>
          <Text className={`text-lg font-semibold ${colors.text} mb-2`}>Make a Payment</Text>
          
          <Text className={`text-sm ${colors.text} mb-1`}>Enter an Amount</Text>
          <TextInput
            placeholder="Enter amount"
            placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={formData.amount}
            onChangeText={(text) => setFormData({...formData, amount: text})}
            keyboardType="numeric"
            className={`${colors.input} p-3 rounded-lg mb-4 ${colors.text}`}
          />
          
          <Text className={`text-sm ${colors.text} mb-1`}>Select Period</Text>
          <View className={`${colors.input} rounded-lg mb-4 overflow-hidden`}>
            <Picker
              selectedValue={formData.period}
              onValueChange={(itemValue) => setFormData({...formData, period: itemValue})}
              style={{ color: theme === 'dark' ? 'white' : 'black' }}
            >
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
            </Picker>
          </View>
          
          <Text className={`text-sm ${colors.text} mb-1`}>Select Month</Text>
          <View className={`${colors.input} rounded-lg mb-4 overflow-hidden`}>
            <Picker
              selectedValue={formData.paymentForMonth}
              onValueChange={(itemValue) => setFormData({...formData, paymentForMonth: itemValue})}
              style={{ color: theme === 'dark' ? 'white' : 'black' }}
            >
              {months.map((month) => (
                <Picker.Item key={month} label={month} value={month} />
              ))}
            </Picker>
          </View>
          
          <Text className={`text-sm ${colors.text} mb-1`}>Describe Week/Month</Text>
          <TextInput
            placeholder="e.g. Week 2 of March 2025"
            placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={formData.weekOrMonth}
            onChangeText={(text) => setFormData({...formData, weekOrMonth: text})}
            maxLength={30}
            className={`${colors.input} p-3 rounded-lg mb-1 ${colors.text}`}
          />
          <Text className={`text-xs ${colors.secondaryText} mb-4`}>
            {formData.weekOrMonth.length} / 30 characters
          </Text>
          
          <Text className={`text-sm ${colors.text} mb-1`}>Select Payment Mode</Text>
          <View className={`${colors.input} rounded-lg mb-4 overflow-hidden`}>
            <Picker
              selectedValue={formData.mode}
              onValueChange={(itemValue) => setFormData({...formData, mode: itemValue})}
              style={{ color: theme === 'dark' ? 'white' : 'black' }}
            >
              <Picker.Item label="Physical Cash" value="physical cash" />
              <Picker.Item label="Mobile Money" value="mobile money" />
            </Picker>
          </View>
          
          <TouchableOpacity
            onPress={handlePayment}
            className={`${colors.button} p-3 rounded-lg flex-row items-center justify-center`}
          >
            <FontAwesome name="money" size={16} color="white" style={{ marginRight: 8 }} />
            <Text className="text-white font-medium">Pay</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction History */}
        <View className={`${colors.card} rounded-xl p-4 mb-4`}>
          <Text className={`text-lg font-semibold ${colors.text} mb-4`}>Transaction History</Text>
          
          {isApproved.length === 0 ? (
            <Text className={`${colors.secondaryText} text-center py-4`}>No completed transactions</Text>
          ) : (
            <View className="gap-3">
              {isApproved.slice(0, 3).map((tx) => (
                <TouchableOpacity 
                  key={tx._id}
                  onPress={() => navigation.navigate('Receipt', { titheId: tx._id })}
                  className={`${colors.input} p-3 rounded-lg`}
                >
                  <Text className={`text-sm ${colors.secondaryText}`}>
                    {formatDate(tx.createdAt)}
                  </Text>
                  <Text className={`text-lg font-semibold ${colors.text}`}>
                    GHS {tx.amount}
                  </Text>
                  <Text className={`text-sm ${colors.text}`}>
                    {tx.period} - {tx.paymentForMonth}
                  </Text>
                  <Text className={`text-sm ${colors.text}`}>{tx.mode}</Text>
                  <View className={`bg-green-500 px-2 py-1 rounded-full self-start mt-2`}>
                    <Text className="text-white text-xs font-semibold">Completed</Text>
                  </View>
                </TouchableOpacity>
              ))}
              
              {isApproved.length > 3 && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllTransactions')}
                  className={`${colors.accent} text-center py-2`}
                >
                  <Text className={`${colors.accent} font-medium`}>View All Records</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Pending Transactions */}
        <View className={`${colors.card} rounded-xl p-4`}>
          <Text className={`text-lg font-semibold ${colors.text} mb-4`}>Pending Transactions</Text>
          
          {isPending.length === 0 ? (
            <Text className={`${colors.secondaryText} text-center py-4`}>No pending transactions</Text>
          ) : (
            <View className="gap-3">
              {isPending.slice(0, 3).map((tx) => (
                <TouchableOpacity 
                  key={tx._id}
                  onPress={() => navigation.navigate('Receipt', { titheId: tx._id })}
                  className={`${colors.input} p-3 rounded-lg`}
                >
                  <Text className={`text-sm ${colors.secondaryText}`}>
                    {formatDate(tx.createdAt)}
                  </Text>
                  <Text className={`text-lg font-semibold ${colors.text}`}>
                    GHS {tx.amount}
                  </Text>
                  <Text className={`text-sm ${colors.text}`}>
                    {tx.period} - {tx.paymentForMonth}
                  </Text>
                  <Text className={`text-sm ${colors.text}`}>{tx.mode}</Text>
                  <View className={`bg-yellow-500 px-2 py-1 rounded-full self-start mt-2`}>
                    <Text className="text-black text-xs font-semibold">Pending</Text>
                  </View>
                </TouchableOpacity>
              ))}
              
              {isPending.length > 3 && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllTransactions')}
                  className={`${colors.accent} text-center py-2`}
                >
                  <Text className={`${colors.accent} font-medium`}>View All Records</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TitheScreen;