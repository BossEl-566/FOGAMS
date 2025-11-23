import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCheck, FaTimes, FaSearch, FaUserEdit, FaTrash, FaKey } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { Modal, Button, Badge, Card, Avatar } from 'flowbite-react';
import { TextInput } from 'flowbite-react';

export default function MembersDashboard() {
  const { currentUser } = useSelector(state => state.user);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [userToReset, setUserToReset] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch members
        const membersRes = await fetch('/api/membership/get');
        const membersData = await membersRes.json();
        
        // Fetch users
        const usersRes = await fetch('/api/user/getusers');
        const usersData = await usersRes.json();
        
        if (membersRes.ok && usersRes.ok) {
          // Filter members where member: true and combine with user data
          const activeMembers = membersData.filter(member => member.member);
          const combinedData = activeMembers.map(member => {
            const user = usersData.users.find(u => u._id === member.userId);
            return {
              ...member,
              profilePicture: user?.profilePicture || '',
              username: user?.username || '',
              isAdmin: user?.isAdmin || false,
              isPastor: user?.isPastor || false,
              isDeptHead: user?.isDeptHead || false,
              isMember: user?.isMember || false
            };
          });
          
          setMembers(combinedData);
          setUsers(usersData.users);
          if (combinedData.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch data!");
        console.error(error.message);
        window.location.href = '/re-authenticate';
      }
    };

    if (currentUser.isAdmin) {
      fetchData();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = members.length;
    try {
      const res = await fetch(`/api/membership?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        const newMembers = data.filter(member => member.member);
        setMembers(prev => [...prev, ...newMembers]);
        if (newMembers.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to load more members!");
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setMembers(prev => prev.filter(member => member.userId !== userIdToDelete));
        setShowDeleteModal(false);
        toast.success("User deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete user.");
        console.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting user!");
      console.error(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!currentUser.isAdmin || !userToReset) return;

    try {
      const res = await fetch(`/api/user/update/${userToReset._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: userToReset.email
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success(`Password reset successfully! New password is ${userToReset.email}`);
        setShowResetModal(false);
        setUserToReset(null);
      } else {
        toast.error(data.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("Error resetting password!");
      console.error(error.message);
    }
  };

  const filteredMembers = members.filter(member => 
    member.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Church Members</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage all active members of the church
        </p>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-1/3">
            <TextInput
              type="text"
              placeholder="Search members..."
              rightIcon={FaSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Badge color="blue" className="text-sm">
            Total Members: {members.length}
          </Badge>
        </div>
      </Card>

      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member._id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <Avatar
                  img={member.profilePicture || '/default-profile.png'}
                  alt={member.fullname}
                  rounded
                  size="xl"
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {member.fullname}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{member.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Birthday: {member.birthMonth}/{member.birthDay}
                </p>

                <div className="flex gap-2 mt-3 flex-wrap justify-center">
                  {member.isAdmin && (
                    <Badge color="purple" icon={member.isAdmin ? FaCheck : FaTimes}>
                      Admin
                    </Badge>
                  )}
                  {member.isPastor && (
                    <Badge color="indigo" icon={member.isPastor ? FaCheck : FaTimes}>
                      Pastor
                    </Badge>
                  )}
                  {member.isDeptHead && (
                    <Badge color="pink" icon={member.isDeptHead ? FaCheck : FaTimes}>
                      Dept Head
                    </Badge>
                  )}
                  <Badge color="green" icon={member.isMember ? FaCheck : FaTimes}>
                    Member
                  </Badge>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button
                    outline
                    gradientDuoTone="cyanToBlue"
                    size="sm"
                    onClick={() => {
                      const user = users.find(u => u._id === member.userId);
                      if (user) {
                        setUserToReset(user);
                        setShowResetModal(true);
                      }
                    }}
                  >
                    <FaKey className="mr-2" /> Reset PW
                  </Button>
                  <Button
                    outline
                    gradientDuoTone="pinkToOrange"
                    size="sm"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setUserIdToDelete(member.userId);
                    }}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm ? 'No matching members found' : 'There are no members yet!'}
          </p>
        </Card>
      )}

      {showMore && (
        <div className="text-center mt-8">
          <Button gradientDuoTone="cyanToBlue" onClick={handleShowMore}>
            Load More Members
          </Button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this member?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Password Reset Confirmation Modal */}
      <Modal show={showResetModal} onClose={() => setShowResetModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-blue-500">
              <FaKey className="h-full w-full" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Reset Password
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to reset password for {userToReset?.username}?
            </p>
            <p className="mb-5 text-xs text-gray-500 dark:text-gray-400">
              Password will be reset to the user's email: {userToReset?.email}
            </p>
            <div className="flex justify-center gap-4">
              <Button color="blue" onClick={handleResetPassword}>
                Yes, Reset
              </Button>
              <Button color="gray" onClick={() => setShowResetModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}