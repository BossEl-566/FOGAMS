import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl, Modal, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { format } from 'date-fns';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Card, Badge, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const UpcomingEventsScreen = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const navigation = useNavigation();
  const paperTheme = useTheme();
  
  // Enhanced theme styles
  const themeStyles = {
    container: {
      backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
      flex: 1,
      padding: 16,
    },
    textPrimary: {
      color: theme === 'dark' ? 'white' : '#111827',
    },
    textSecondary: {
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
    },
    card: {
      backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
      marginBottom: 16,
    },
    buttonPrimary: {
      backgroundColor: theme === 'dark' ? '#1d4ed8' : '#2563eb',
    },
    buttonSecondary: {
      backgroundColor: theme === 'dark' ? '#6d28d9' : '#7c3aed',
    },
    iconContainer: {
      backgroundColor: theme === 'dark' ? '#4c1d95' : '#e9d5ff',
      padding: 8,
      borderRadius: 8,
      marginRight: 12,
    },
    monthHeader: {
      color: theme === 'dark' ? 'white' : '#111827',
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 16,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#374151' : '#e5e7eb',
    },
    emptyStateCard: {
      backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
      width: 96,
      height: 96,
      borderRadius: 48,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
  };

  const fetchEvents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/event/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setEvents(data.data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load events',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const handleDeleteModal = (eventId: string) => {
    setEventToDelete(eventId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;
    
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP}/api/event/delete/${eventToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      
      setEvents(prev => prev.filter(event => event._id !== eventToDelete));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Event deleted successfully',
      });
    } catch (err) {
      console.error('Error deleting event:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete event',
      });
    } finally {
      setShowModal(false);
    }
  };

  // Group events by month
  const groupedEvents: Record<string, any[]> = events.reduce((acc: Record<string, any[]>, event: any) => {
    const monthYear = format(new Date(event.date), 'MMMM yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme === 'dark' ? '#ffffff' : '#000000'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={[themeStyles.textPrimary, { color: '#ef4444' }]}>
          Error: {error}
        </Text>
        <TouchableOpacity 
          style={[themeStyles.buttonPrimary, { marginTop: 16, padding: 12, borderRadius: 8 }]}
          onPress={fetchEvents}
        >
          <Text style={{ color: 'white' }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderEventItem = ({ item }: { item: any }) => (
    <Card style={themeStyles.card}>
      <Card.Content>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={themeStyles.iconContainer}>
              <MaterialIcons 
                name="event" 
                size={24} 
                color={theme === 'dark' ? '#a78bfa' : '#7c3aed'} 
              />
            </View>
            <View>
              <Text style={[themeStyles.textPrimary, { fontSize: 18, fontWeight: 'bold' }]}>
                {item.title}
              </Text>
              <Text style={[themeStyles.textSecondary, { fontSize: 14 }]}>
                {format(new Date(item.date), 'EEEE, MMMM do')}
              </Text>
            </View>
          </View>
          {new Date(item.date) > new Date() && (
            <Badge style={{ backgroundColor: '#10b981', color: 'white', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, fontSize: 12 }}>
              Upcoming
            </Badge>
          )}
        </View>

        <Text style={[themeStyles.textSecondary, { marginBottom: 12 }]}>
          {item.description}
        </Text>

        <View style={{ gap: 8 }}>
          {item.location && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons 
                name="location-on" 
                size={16} 
                color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
              />
              <Text style={[themeStyles.textSecondary, { marginLeft: 8 }]}>
                {item.location}
              </Text>
            </View>
          )}
          {item.time && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons 
                name="access-time" 
                size={16} 
                color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
              />
              <Text style={[themeStyles.textSecondary, { marginLeft: 8 }]}>
                {item.time}
              </Text>
            </View>
          )}
        </View>

        {currentUser?.isAdmin && (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
            <TouchableOpacity
              style={{ padding: 8, borderRadius: 8, backgroundColor: '#ef4444' }}
              onPress={() => handleDeleteModal(item._id)}
            >
              <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={themeStyles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme === 'dark' ? '#ffffff' : '#000000']}
            tintColor={theme === 'dark' ? '#ffffff' : '#000000'}
          />
        }
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Text style={[themeStyles.textPrimary, { fontSize: 24, fontWeight: 'bold' }]}>
            Upcoming Events
          </Text>
          {currentUser?.isAdmin && (
            <TouchableOpacity
              style={[themeStyles.buttonPrimary, { padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }]}
              onPress={() => router.push('/CreateEvent')}
            >
              <AntDesign name="plus" size={16} color="white" />
              <Text style={{ color: 'white', marginLeft: 8 }}>Add Event</Text>
            </TouchableOpacity>
          )}
        </View>

        {Object.keys(groupedEvents).length > 0 ? (
          Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
            <View key={monthYear} style={{ marginBottom: 24 }}>
              <Text style={themeStyles.monthHeader}>
                {monthYear}
              </Text>
              <FlatList
                data={monthEvents as any[]}
                renderItem={renderEventItem}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
              />
            </View>
          ))
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 48 }}>
            <View style={{ alignItems: 'center' }}>
              <View style={themeStyles.emptyStateCard as ViewStyle}>
                <MaterialIcons 
                  name="event" 
                  size={36} 
                  color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                />
              </View>
              <Text style={[themeStyles.textPrimary, { fontSize: 20, fontWeight: '500', marginBottom: 8 }]}>
                No events scheduled
              </Text>
              <Text style={[themeStyles.textSecondary, { marginBottom: 16 }]}>
                Check back later or add a new event
              </Text>
              {currentUser?.isAdmin && (
                <TouchableOpacity
                  style={[themeStyles.buttonPrimary, { padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }]}
                  onPress={() => console.log('Add Event')}
                >
                  <AntDesign name="plus" size={16} color="white" />
                  <Text style={{ color: 'white', marginLeft: 8 }}>Add Your First Event</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 16 }}>
          <View style={[themeStyles.card, { padding: 24, borderRadius: 8, width: '100%', maxWidth: 500 }]}>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <MaterialIcons 
                name="warning" 
                size={48} 
                color={theme === 'dark' ? '#FCA5A5' : '#EF4444'} 
              />
            </View>
            <Text style={[themeStyles.textPrimary, { fontSize: 18, textAlign: 'center', marginBottom: 24 }]}>
              Are you sure you want to delete this event?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
              <TouchableOpacity
                style={{ padding: 12, backgroundColor: '#ef4444', borderRadius: 8, flex: 1, alignItems: 'center' }}
                onPress={handleDelete}
              >
                <Text style={{ color: 'white' }}>Yes, Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[themeStyles.buttonSecondary, { padding: 12, borderRadius: 8, flex: 1, alignItems: 'center' }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

export default UpcomingEventsScreen;