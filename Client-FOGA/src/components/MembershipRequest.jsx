import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Button, Modal, Card, Badge } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FiUser, FiMail, FiPhone, FiCalendar, FiCheck, FiX, FiUsers, FiClock } from "react-icons/fi";

export default function MembershipRequest() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [memberIdToUpdate, setMemberIdToUpdate] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/membership/get`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        }
      } catch (error) {
        toast.error("Failed to fetch users!");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser?.isAdmin]);

  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiX className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Access Denied
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            You are not authorized to view this page
          </p>
        </div>
      </div>
    );
  }

  const pendingUsers = users.filter(user => !user.member);

  // Accept Membership
  const handleAcceptUser = async () => {
    try {
      const res = await fetch(`/api/membership/update/${userIdToUpdate}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      const res1 = await fetch(`/api/user/updatemember/${memberIdToUpdate}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ member: true }),
      });

      if (res.ok && res1.ok) {
        toast.success("User accepted successfully");
        setUsers(users.filter(user => user._id !== userIdToUpdate));
        setShowAcceptModal(false);
      } else {
        toast.error("Failed to accept user");
      }
    } catch (error) {
      toast.error("Failed to accept user");
    }
  };

  // Reject Membership
  const handleRejectUser = async () => {
    try {
      const res = await fetch(`/api/membership/delete/${userIdToUpdate}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("User rejected successfully");
        setUsers(users.filter(user => user._id !== userIdToUpdate));
        setShowRejectModal(false);
      } else {
        toast.error("Failed to reject user");
      }
    } catch (error) {
      toast.error("Failed to reject user");
    }
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return formatDate(dateString);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Membership Requests
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {pendingUsers.length} pending request{pendingUsers.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Badge color="blue" className="px-3 py-1">
              {pendingUsers.length} Pending
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : pendingUsers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">
              No pending requests
            </h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              All membership requests have been processed
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingUsers.map((user) => (
              <Card 
                key={user._id} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => openUserDetails(user)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                        {user.fullname}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <FiMail className="w-3 h-3" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <FiPhone className="w-3 h-3" />
                          <span>{user.contact}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiClock className="w-3 h-3" />
                          <span>{formatRelativeTime(user.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        setUserIdToUpdate(user._id);
                        setMemberIdToUpdate(user.userId);
                        setShowAcceptModal(true);
                      }}
                      className="p-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                      title="Accept"
                    >
                      <FiCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setUserIdToUpdate(user._id);
                        setShowRejectModal(true);
                      }}
                      className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Reject"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Applicant Details
              </h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <FiUser className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {selectedUser.fullname}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Membership Applicant
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FiMail className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FiPhone className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedUser.contact}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FiCalendar className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Applied On</p>
                    <p className="text-gray-800 dark:text-white font-medium">
                      {formatDate(selectedUser.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setUserIdToUpdate(selectedUser._id);
                  setMemberIdToUpdate(selectedUser.userId);
                  setShowAcceptModal(true);
                }}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <FiCheck className="w-4 h-4" />
                <span>Accept Membership</span>
              </button>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setUserIdToUpdate(selectedUser._id);
                  setShowRejectModal(true);
                }}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <FiX className="w-4 h-4" />
                <span>Reject Application</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accept Confirmation Modal */}
      <Modal show={showAcceptModal} onClose={() => setShowAcceptModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
              Accept Membership?
            </h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              This will grant membership access to the user. They will be able to access member-only features.
            </p>
            <div className="flex justify-center gap-3">
              <Button color="gray" onClick={() => setShowAcceptModal(false)}>
                Cancel
              </Button>
              <Button color="success" onClick={handleAcceptUser}>
                Accept
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Reject Confirmation Modal */}
      <Modal show={showRejectModal} onClose={() => setShowRejectModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
              Reject Application?
            </h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              This will permanently delete the membership request. The user will need to reapply.
            </p>
            <div className="flex justify-center gap-3">
              <Button color="gray" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button color="failure" onClick={handleRejectUser}>
                Reject
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}