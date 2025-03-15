// Desc: Chat component that contains the sidebar and chat container
import ChatContainer from "./ChatComponent/ChatContainer";
import NoChatSelected from "./ChatComponent/NoChatSelected";
import Sidebar from "./ChatComponent/Sidebar";
import { useSelector } from "react-redux";

const Chat = () => {
  const { selectedUser } = useSelector((state) => state.chat);

  return (
    <div className="h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      {/* Full-width Divider */}
      <div className="w-full border-t border-gray-300 dark:border-gray-700 mb-4"></div>

      {/* Chat Container */}
      <div className="bg-base-100 rounded-xl shadow-lg w-full max-w-6xl h-[calc(100vh-7rem)] flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Chat Area */}
        <div className="flex flex-1">
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
