import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function MembershipRequest() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/membership/get`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUsers(data);
        }
      } catch (error) {
        toast.error("Failed to fetch users!");
        console.log(error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser?._id]);

  if (!currentUser?.isAdmin) {
    return <p className="text-center text-red-500">You are not allowed to view this page</p>;
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-blue-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">User Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg shadow-lg overflow-hidden">
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
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-medium relative">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(user.createdAt))}
                    <div className="absolute left-0 top-0 h-full w-[2px] bg-gray-300 dark:bg-gray-600"></div>
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{user.fullname}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{user.email}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{user.contact}</td>
                  <td className="p-3 text-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mx-1">
                      Accept
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md mx-1">
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No membership requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
