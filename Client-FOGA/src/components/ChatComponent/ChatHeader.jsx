import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../radux/chat/chatSlice"; // Ensure the correct import path

const ChatHeader = () => {
    const dispatch = useDispatch();
    const selectedUser = useSelector((state) => state.chat.selectedUser);

    if (!selectedUser) return null; // Prevents crashes if no user is selected

    return (
        <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 shadow-md">
                        <img
                            src={selectedUser.profilePicture || "/avatar.png"}
                            alt={selectedUser.username}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-semibold text-lg">{selectedUser.username}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
                    </div>
                </div>

                {/* Close button */}
                <button
                    onClick={() => dispatch(setSelectedUser(null))}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    <X className="size-5 text-gray-700 dark:text-gray-300" />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
