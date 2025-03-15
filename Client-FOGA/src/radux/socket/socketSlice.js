import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000"; // Your backend URL

const initialState = {
  socket: null,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
  },
});

export const { setSocket, setOnlineUsers, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;

// Thunk function to connect socket
export const connectSocket = () => (dispatch, getState) => {
  const { currentUser } = getState().user; // Get logged-in user

  if (!currentUser || getState().socket.socket?.connected) return;

  const socket = io(BASE_URL, {
    query: { userId: currentUser.id },
  });

  socket.on("connect", () => {
    console.log(`✅ Connected to WebSocket: ${socket.id}`);
    dispatch(setSocket(socket));
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from WebSocket");
    dispatch(setSocket(null));
  });

  socket.on("getOnlineUsers", (userIds) => {
    dispatch(setOnlineUsers(userIds));
  });
};
