import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl, Image, Modal, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Card, Badge, TextInput, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersScreen = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { theme: appTheme } = useSelector((state: any) => state.theme);
  const [members, setMembers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();

  // Theme-aware styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appTheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
      padding: 16,
    },
    header: {
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: appTheme === 'dark' ? 'white' : '#333',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: appTheme === 'dark' ? '#aaa' : '#666',
    },
    searchContainer: {
      marginBottom: 20,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: appTheme === 'dark' ? '#2a2a2a' : 'white',
      elevation: 2,
    },
    searchInput: {
      backgroundColor: appTheme === 'dark' ? '#2a2a2a' : 'white',
    },
    memberCountBadge: {
      alignSelf: 'flex-start',
      marginTop: 8,
      backgroundColor: theme.colors.primary,
    },
    memberCard: {
      marginBottom: 16,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: appTheme === 'dark' ? '#2a2a2a' : 'white',
      elevation: 2,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 12,
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    memberName: {
      fontSize: 18,
      fontWeight: '600',
      color: appTheme === 'dark' ? 'white' : '#333',
      textAlign: 'center',
      marginBottom: 4,
    },
    memberEmail: {
      fontSize: 14,
      color: appTheme === 'dark' ? '#aaa' : '#666',
      textAlign: 'center',
      marginBottom: 8,
    },
    birthdayText: {
      fontSize: 13,
      color: appTheme === 'dark' ? '#888' : '#999',
      marginBottom: 12,
      textAlign: 'center',
    },
    badgeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 16,
      gap: 8,
    },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    actionButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
      marginTop: 8,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
    },
    loadMoreButton: {
      backgroundColor: theme.colors.primary,
      padding: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    emptyStateCard: {
      alignItems: 'center',
      padding: 24,
      borderRadius: 12,
      backgroundColor: appTheme === 'dark' ? '#2a2a2a' : 'white',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: appTheme === 'dark' ? '#2a2a2a' : 'white',
      padding: 24,
      borderRadius: 12,
      width: '90%',
      maxWidth: 400,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16,
      marginTop: 20,
    },
  });

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const [membersRes, usersRes] = await Promise.all([
        fetch('http://192.168.106.105:3000/api/membership/get', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://192.168.106.105:3000/api/user/getusers', {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      
      const [membersData, usersData] = await Promise.all([
        membersRes.json(),
        usersRes.json()
      ]);
      
      if (membersRes.ok && usersRes.ok) {
        const activeMembers = membersData.filter((member: any) => member.member);
        const combinedData = activeMembers.map((member: any) => {
          const user = usersData.users.find((u: any) => u._id === member.userId);
          return {
            ...member,
            profilePicture: user?.profilePicture || 'https://i.imgur.com/0LKZQYM.png',
            username: user?.username || '',
            isAdmin: user?.isAdmin || false,
            isPastor: user?.isPastor || false,
            isDeptHead: user?.isDeptHead || false,
            isMember: user?.isMember || false
          };
        });
        
        setMembers(combinedData);
        setUsers(usersData.users);
        setShowMore(combinedData.length >= 9);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch data',
      });
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchData();
    }
  }, [currentUser?._id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleShowMore = async () => {
    const startIndex = members.length;
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://192.168.106.105:3000/api/membership?startIndex=${startIndex}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const newMembers = data.filter((member: any) => member.member);
        setMembers(prev => [...prev, ...newMembers]);
        setShowMore(newMembers.length >= 9);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load more members',
      });
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://192.168.106.105:3000/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMembers(prev => prev.filter(member => member.userId !== userIdToDelete));
        setShowModal(false);
        Toast.show({
          type: 'success',
          text1: 'User deleted successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: data.message || 'Failed to delete user',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error deleting user',
      });
      console.error(error);
    }
  };

  const filteredMembers = members.filter(member => 
    member.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderMemberCard = ({ item }: { item: any }) => (
    <Card style={styles.memberCard}>
      <Card.Content style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: item.profilePicture }}
          style={styles.profileImage}
          defaultSource={{ uri: 'https://i.imgur.com/0LKZQYM.png' }}
        />
        <Text style={styles.memberName}>{item.fullname}</Text>
        <Text style={styles.memberEmail}>{item.email}</Text>
        
        {item.birthDay && item.birthMonth && (
          <Text style={styles.birthdayText}>
            Birthday: {item.birthMonth}/{item.birthDay}
          </Text>
        )}

        <View style={styles.badgeContainer}>
          {item.isAdmin && (
            <Badge style={[styles.badge, { backgroundColor: '#8b5cf6' }]}>
              Admin
            </Badge>
          )}
          {item.isPastor && (
            <Badge style={[styles.badge, { backgroundColor: '#6366f1' }]}>
              Pastor
            </Badge>
          )}
          {item.isDeptHead && (
            <Badge style={[styles.badge, { backgroundColor: '#ec4899' }]}>
              Dept Head
            </Badge>
          )}
          <Badge style={[styles.badge, { backgroundColor: '#10b981' }]}>
            Member
          </Badge>
        </View>

        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}
            onPress={() => console.log('Edit member', item)}
          >
            <MaterialIcons name="edit" size={16} color="white" />
            <Text style={{ color: 'white', marginLeft: 6 }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
            onPress={() => {
              setShowModal(true);
              setUserIdToDelete(item.userId);
            }}
          >
            <MaterialIcons name="delete" size={16} color="white" />
            <Text style={{ color: 'white', marginLeft: 6 }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Church Members</Text>
          <Text style={styles.headerSubtitle}>Manage all active members of the church</Text>
        </View>

        <Card style={styles.searchContainer}>
          <Card.Content>
            <TextInput
              mode="outlined"
              placeholder="Search members..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
              left={<TextInput.Icon icon="magnify" color={appTheme === 'dark' ? '#aaa' : '#666'} />}
              outlineColor="transparent"
              activeOutlineColor={theme.colors.primary}
              theme={{
                colors: {
                  text: appTheme === 'dark' ? 'white' : 'black',
                  placeholder: appTheme === 'dark' ? '#aaa' : '#666',
                }
              }}
            />
            <Badge style={styles.memberCountBadge}>
              {`Total Members: ${members.length}`}
            </Badge>
          </Card.Content>
        </Card>

        {filteredMembers.length > 0 ? (
          <FlatList
            data={filteredMembers}
            renderItem={renderMemberCard}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            nestedScrollEnabled
          />
        ) : (
          <Card style={styles.emptyStateCard}>
            <MaterialIcons 
              name="people-outline" 
              size={48} 
              color={appTheme === 'dark' ? '#aaa' : '#666'} 
            />
            <Text style={[styles.memberName, { marginTop: 12 }]}>
              {searchTerm ? 'No matching members found' : 'No members yet'}
            </Text>
            <Text style={styles.memberEmail}>
              {searchTerm ? 'Try a different search term' : 'Add your first member'}
            </Text>
          </Card>
        )}

        {showMore && (
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={handleShowMore}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Load More Members</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <MaterialIcons 
                name="warning" 
                size={48} 
                color="#ef4444" 
              />
            </View>
            <Text style={[styles.memberName, { textAlign: 'center', marginBottom: 24 }]}>
              Are you sure you want to delete this member?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#ef4444', flex: 1 }]}
                onPress={handleDeleteUser}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#6b7280', flex: 1 }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

export default UsersScreen;