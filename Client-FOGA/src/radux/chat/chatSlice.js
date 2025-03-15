// slices/chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
};

export const getUsers = createAsyncThunk("chat/getUsers", async (_, { dispatch }) => {
  dispatch(setUsersLoading(true));
  try {
    const res = await fetch("/api/messages/users");
    const data = await res.json();
    dispatch(setUsers(data));
  } catch (error) {
    toast.error("Failed to fetch users");
  } finally {
    dispatch(setUsersLoading(false));
  }
});

export const getMessages = createAsyncThunk("chat/getMessages", async (userId, { dispatch }) => {
  dispatch(setMessagesLoading(true));
  try {
    const res = await fetch(`/api/messages/${userId}`);
    const data = await res.json();
    dispatch(setMessages(data));
  } catch (error) {
    toast.error("Failed to fetch messages");
  } finally {
    dispatch(setMessagesLoading(false));
  }
});

export const sendMessage = createAsyncThunk("chat/sendMessage", async (messageData, { dispatch, getState }) => {
  const { selectedUser, messages } = getState().chat;

  // Ensure a user is selected
  if (!selectedUser || !selectedUser._id) {
      toast.error("No recipient selected");
      return;
  }

  try {
      console.log("Sending message to:", selectedUser._id);
      console.log("Message Data:", messageData);

      const res = await fetch(`/api/messages/send/${selectedUser._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData),
      });

      if (!res.ok) {
          const errorData = await res.json();
          console.error("Server Error:", errorData);
          toast.error(errorData.message || "Failed to send message");
          return;
      }

      const data = await res.json();
      dispatch(setMessages([...messages, data]));
  } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
  }
});


export const subscribeToMessages = createAsyncThunk("chat/subscribeToMessages", async (_, { dispatch, getState }) => {
  const { selectedUser } = getState().chat;
  if (!selectedUser) return;
  
  const { socket } = getState().auth;
  
  socket.on("newMessage", (newMessage) => {
    if (newMessage.senderId !== selectedUser._id) return;
    dispatch(setMessages([...getState().chat.messages, newMessage]));
  });
});

export const unsubscribeFromMessages = createAsyncThunk("chat/unsubscribeFromMessages", async (_, { getState }) => {
  const { socket } = getState().auth;
  socket.off("newMessage");
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setUsersLoading: (state, action) => {
      state.isUsersLoading = action.payload;
    },
    setMessagesLoading: (state, action) => {
      state.isMessagesLoading = action.payload;
    },
  },
});

export const { setMessages, setUsers, setSelectedUser, setUsersLoading, setMessagesLoading } = chatSlice.actions;
export const chatReducer = chatSlice.reducer; 
