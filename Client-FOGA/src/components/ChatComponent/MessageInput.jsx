import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { sendMessage } from "../../radux/chat/chatSlice"; // Ensure the correct import path

const MessageInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const { currentUser } = useSelector((state) => state.user); // Current user from Redux

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedUser) return;


    try {
      await dispatch(
        sendMessage({
        //   text: text.trim(),
        //   receiverId: selectedUser._id,  
        //   senderId: currentUser._id,
        senderId: currentUser._id,
        receiverId: selectedUser._id,
        text: text.trim(),
        })
      ).unwrap(); // Ensures we handle async properly

      // Clear input field
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim()}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
