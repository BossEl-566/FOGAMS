import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./MessageSkeleton";
import MessageInput from "./MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, subscribeToMessages, unsubscribeFromMessages } from "../../radux/chat/chatSlice";

const ChatContainer = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const selectedUser = useSelector((state) => state.chat.selectedUser);
    const isMessagesLoading = useSelector((state) => state.chat.isMessagesLoading);
    const { currentUser } = useSelector((state) => state.user);
    const messageEndRef = useRef(null);

    // Format message time
    const formatMessageTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    useEffect(() => {
        if (selectedUser) {
            dispatch(getMessages(selectedUser._id));
            dispatch(subscribeToMessages());
        }

        return () => {
            dispatch(unsubscribeFromMessages());
        };
    }, [dispatch, selectedUser]);

    useEffect(() => {
        if (messageEndRef.current && messages.length > 0) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto bg-gray-100 dark:bg-gray-900">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto bg-gray-100 dark:bg-gray-900">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`flex items-end space-x-3 ${
                            message.senderId === currentUser._id ? "justify-end" : "justify-start"
                        }`}
                        ref={messageEndRef}
                    >
                        {/* Profile Picture */}
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-300 shadow-md">
                            <img
                                src={
                                    message.senderId === currentUser._id
                                        ? currentUser.profilePicture || "/avatar.png"
                                        : selectedUser.profilePicture || "/avatar.png"
                                }
                                alt="profile pic"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Chat Message Bubble */}
                        <div
                            className={`max-w-[70%] px-4 py-2 rounded-lg ${
                                message.senderId === currentUser._id
                                    ? "bg-blue-500 text-white self-end"
                                    : "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                            }`}
                        >
                            {message.text && <p>{message.text}</p>}
                            <span className="text-xs text-gray-600 dark:text-gray-400 block text-right mt-1">
                                {formatMessageTime(message.createdAt)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatContainer;
