import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";


export const getUsersForSidebar = async (req, res, next) => {
    try {
        const loggedInUserId = req.user.id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
    } catch (error) {
        next(error);
        
    }
};
export const getMessages = async (req, res, next) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user.id;
    
        const messages = await Message.find({
          $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
          ],
        });
    
        res.status(200).json(messages);
      } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
      }  
};

export const sendMessage = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Params:", req.params);
    console.log("User:", req.user);

    // Extracting values from request
    const { text } = req.body; // Define text before checking
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    // Ensure text is provided
    if (!text) {
        return res.status(400).json({ error: "Message text is required" });
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
    });

    await newMessage.save();

    // Emit message to receiver if they are online
    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //     io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    res.status(201).json(newMessage);
  } catch (error) {
    next(errorHandler(400, "Failed to send message"));
    console.log("Error in sendMessage controller: ", error.message);
  }
};




