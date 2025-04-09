// Import required modules
import express from 'express'; // Web framework for building the API
import mongoose from 'mongoose'; // MongoDB object modeling tool
import dotenv from 'dotenv'; // Loads environment variables from a .env file
import userRoute from './routes/user.route.js'; // User-related routes
import dailyBibleMessageRoute from './routes/dailybiblemessage.route.js'; // Daily Bible message routes
import authRoute from './routes/auth.route.js'; // Authentication routes
import commentRoute from './routes/comment.route.js'; // Comment-related routes
import resourceRoute from './routes/resource.route.js'; // Resource-related routes
import eventRoute from './routes/event.route.js'; // Event-related routes
import membershipRoute from './routes/membership.route.js'; // Membership-related routes
import messageRoute from './routes/message.route.js'; // Message-related routes
import titheRoute from './routes/tithe.route.js'
import churchAccountRoute from './routes/churchAccount.route.js'; // Church account routes
import baptismRoute from './routes/baptism.route.js'; // Baptism-related routes
import bookRoute from './routes/book.route.js'; // Book-related routes
import notepadRoute from './routes/notepad.route.js'; // Notepad-related routes
import pollRoute from './routes/poll.route.js'; // Poll-related routes
import anonymousRoute from './routes/anonymous.route.js'; // Anonymouse-related routes
import cookieParser from 'cookie-parser'; // Middleware to parse cookies
import jwt from 'jsonwebtoken'; // JWT for authentication
import { createServer } from 'http'; // HTTP server module
import { Server } from 'socket.io'; // Socket.IO for real-time communication
import { getVerse, BOOK } from 'bible-kjv';


dotenv.config(); // Load environment variables from .env file

// Database connection
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to database successfully'); // Log successful connection
  })
  .catch((error) => {   
    console.log('Error:', error); // Log errors if connection fails
  });

const app = express(); // Initialize Express application
app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); // Middleware to parse cookies

// Create an HTTP server and integrate Socket.IO
const server = createServer(app); // Wrap Express app in HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from frontend (update URL if necessary)
    methods: ["GET", "POST"], // Allow specified HTTP methods
  },
});

// Store online users
const userSocketMap = {}; // { userId: socketId }

// Function to get a user's socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Socket.IO authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token; // Get token from handshake auth
  if (!token) {
    return next(new Error('Authentication error: Token is missing')); // Reject connection if no token
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    socket.user = decoded; // Attach user data to the socket object
    next(); // Proceed to the next middleware
  } catch (error) {
    next(new Error('Authentication error: Invalid token')); // Reject connection if token is invalid
  }
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.id}`); // Log user ID upon successful connection

  const userId = socket.user.id;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Broadcast online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`); // Log user ID on disconnection
    delete userSocketMap[userId]; // Remove user from tracking map
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Broadcast updated list
  });

  // Custom events can be added here
});

app.get('/api/bible', (req, res) => {
  const { book, chapter, verse } = req.query;

  if (!book || !chapter || !verse) {
    return res.status(400).json({ error: 'Please provide book, chapter, and verse' });
  }

  const bookEnum = BOOK[book];
  if (!bookEnum) {
    return res.status(400).json({ error: 'Invalid book name. Use names like John, Genesis, etc.' });
  }

  try {
    const result = getVerse(bookEnum, parseInt(chapter), parseInt(verse));
    res.json({ book, chapter, verse, text: result });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve verse' });
  }
});

// API Routes
app.use('/api/user', userRoute); // Routes for user management
app.use('/api/auth', authRoute); // Routes for authentication
app.use('/api', dailyBibleMessageRoute); // Routes for daily Bible messages
app.use('/api/comment', commentRoute); // Routes for comments
app.use('/api/resource', resourceRoute); // Routes for resources
app.use('/api/event', eventRoute); // Routes for events
app.use('/api/membership', membershipRoute); // Routes for memberships
app.use('/api/messages', messageRoute); // Routes for messages
app.use('/api/tithe', titheRoute); // Routes for tithes
app.use('/api/church-account', churchAccountRoute); // Routes for church account
app.use('/api/baptism', baptismRoute); // Routes for baptism
// Error handling middleware
app.use('/api/poll', pollRoute); // Routes for polls
app.use('/api/book', bookRoute); // Routes for books
app.use('/api/anonymous', anonymousRoute); // Routes for anonymouse
app.use('/api/notepad', notepadRoute); // Routes for notepad
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
  const message = err.message || 'Internal Server Error'; // Default to generic error message
  res.status(statusCode).json({ success: false, statusCode, message }); // Send error response
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on port 3000'); // Log that the server is running
});
 