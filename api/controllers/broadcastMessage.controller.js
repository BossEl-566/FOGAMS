import { errorHandler } from "../utils/error.js";


import BroadcastMessage from '../models/broadcastMessage.model.js';


export const createBroadcastMessage = async (req, res, next) => {
  if (!req.user.isAdmin && !req.user.isPastor) {
    return next(errorHandler(403, "You are not authorized to perform this action"));
  }

  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return next(errorHandler(400, "Request body must be a non-empty array of messages"));
  }

  try {
    const savedMessages = await Promise.all(
      messages.map(async ({ memberId, contact, fullname, message, scheduledTime }) => {
        if (!message || !memberId || !contact || !fullname) {
          throw errorHandler(400, "Each message must have memberId, contact, fullname, and message");
        }

        const newBroadcastMessage = new BroadcastMessage({
          memberId,
          contact,
          fullname,
          message,
          scheduledTime,
        });

        return await newBroadcastMessage.save();
      })
    );

    res.status(201).json({
      status: 'success',
      message: `${savedMessages.length} messages scheduled successfully.`,
      data: savedMessages,
    });
  } catch (error) {
    next(error);
  }
};


export const sendScheduledMessages = async (req, res, next) => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
    try {
      const allMessages = await BroadcastMessage.find();
  
      // Filter only messages scheduled for today
      const messagesToSend = allMessages.filter((msg) => {
        if (!msg.scheduledTime) return false;
        const msgDate = new Date(msg.scheduledTime).toISOString().split('T')[0];
        return msgDate === today;
      });
  
      if (messagesToSend.length === 0) {
        console.log("✅ No scheduled messages for today.");
        return;
      }
  
      for (const msg of messagesToSend) {
        const response = await fetch("https://sms.arkesel.com/api/v2/sms/send", {
          method: "POST",
          headers: {
            "api-key": process.env.ARKESEL_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: "FOGA_PEDU",
            message: `Hi ${msg.fullname}, ${msg.message}`,
            recipients: [`233${msg.contact.slice(-9)}`], // Format: 233XXXXXXXXX
          }),
        });
  
        const result = await response.json();
        console.log(`📤 Sent to ${msg.fullname}:`, result);
      }
  
      // Optional HTTP response if called through API
      if (res) {
        res.status(200).json({ message: "Scheduled messages processed", count: messagesToSend.length });
      }
  
    } catch (error) {
      console.error("❌ Error sending scheduled messages:", error);
      if (res) {
        return next(error);
      }
    }
  };
  
  
