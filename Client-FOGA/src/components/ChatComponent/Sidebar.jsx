import { useEffect } from "react";
import { Users } from "lucide-react";
import SidebarSkeleton from "./SidebarSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setSelectedUser } from "../../radux/chat/chatSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chat.users);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const isUsersLoading = useSelector((state) => state.chat.isUsersLoading);
  const { currentUser } = useSelector((state) => state.user); // Current user from Redux

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-gray-300 dark:border-gray-700 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-gray-700 dark:text-gray-300" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {users.length > 0 ? (
          users.map((user) => (
            <button
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className={`w-full p-3 flex items-center gap-3 rounded-md transition-colors 
                ${selectedUser?._id === user._id ? "bg-gray-300 dark:bg-gray-700 ring-1 ring-gray-400 dark:ring-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
            >
              {/* Profile Image */}
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePicture || "/avatar.png"}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-md"
                />
              </div>

              {/* User Info - Visible on Larger Screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.username}</div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">No users available</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
