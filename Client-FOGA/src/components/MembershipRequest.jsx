import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function MembershipRequest() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [memberIdToUpdate, setMemberIdToUpdate] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/membership/get`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        }
      } catch (error) {
        toast.error("Failed to fetch users!");
      }
    };
    console.log(currentUser);
    console.log(currentUser?._id);
    console.log(memberIdToUpdate)

    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser?._id]);

  if (!currentUser?.isAdmin) {
    return <p className="text-center text-red-500">You are not allowed to view this page</p>;
  }
  

  // Accept Membership (Update "member" field to true)
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
        setUsers(users.filter(user => user._id !== userIdToUpdate)); // Remove from UI
        setShowAcceptModal(false);
      } else {
        toast.error("Failed to accept user");
      }
    } catch (error) {
      toast.error("Failed to accept user");
    }
  };

  // Reject Membership (Delete Request)
  const handleRejectUser = async () => {
    try {
      const res = await fetch(`/api/membership/delete/${userIdToUpdate}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("User rejected successfully");
        setUsers(users.filter(user => user._id !== userIdToUpdate)); // Remove from UI
        setShowRejectModal(false);
      } else {
        toast.error("Failed to reject user");
      }
    } catch (error) {
      toast.error("Failed to reject user");
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-blue-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 w-[90%] mx-auto">
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">User Membership Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.filter(user => !user.member).length > 0 ? (
    users.filter(user => !user.member).map((user, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="p-3 text-blue-600 font-medium">
                    {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(user.createdAt))}
                  </td>
                  <td className="p-3">{user.fullname}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.contact}</td>
                  <td className="p-3 text-center">
                    {/* Accept Button */}
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mx-1"
                      onClick={() => {
                        setUserIdToUpdate(user._id);setMemberIdToUpdate(user.userId);
                        setShowAcceptModal(true);
                      }}
                    >
                      Accept
                    </button>
                    {/* Reject Button */}
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md mx-1"
                      onClick={() => {
                        setUserIdToUpdate(user._id);
                        setShowRejectModal(true);
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No membership requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Accept Confirmation Modal */}
      <Modal show={showAcceptModal} onClose={() => setShowAcceptModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500">Are you sure you want to accept this user?</h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={handleAcceptUser}>Yes, Accept</Button>
              <Button color="gray" onClick={() => setShowAcceptModal(false)}>Cancel</Button>
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
            <h3 className="mb-5 text-lg text-gray-500">Are you sure you want to reject this user?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleRejectUser}>Yes, Reject</Button>
              <Button color="gray" onClick={() => setShowRejectModal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
