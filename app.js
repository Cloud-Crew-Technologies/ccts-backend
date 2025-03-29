import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import profile from "./Models/profilemodel";
import mongoose from "mongoose";

const app = express();
const server = createServer(app);

// 1. Enable CORS with specific options
const corsOptions = {
  origin: "*", // In production, specify your actual client-side origin(s)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// 2. JSON parsing middleware
app.use(express.json());

// 3. Mongoose connection
const mongoURI = "mongodb://localhost:27017/chatdb";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process on fatal error
  });

// 4. Define Mongoose schema and model for messages
const messageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// 5. Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your client-side origin if needed
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("chat", async (payload) => {
    console.log("Message received:", payload);
    try {
      // 5a. Validate Payload
      if (!payload || !payload.from || !payload.to || !payload.message) {
        console.warn("Invalid payload received:", payload);
        return socket.emit("chat_error", "Invalid message format");
      }
      // 5b. Create New Message
      const newMessage = new Message(payload);
      // 5c. Save Message
      await newMessage.save();

      io.emit("newMessage", payload); // Echo message to all clients
    } catch (error) {
      console.error("Error handling chat:", error);
      socket.emit("chat_error", "Failed to send message"); // Alert sender
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// 6. Enhanced API Endpoints

app.get("/profile/:name", async (req, res) => {
  try {
    // Replace with your actual user data retrieval logic from database
    const { name } = req.params;
    const userData = { name: name, avatar: "/static/images/avatar/1.jpg" };
    res.status(200).json(userData);
  } catch (err) {
    console.error("Error getting profile:", err);
    res.status(500).json({ message: "Failed to retrieve profile data" });
  }
});

app.get("/getallprofile", async (req, res) => {
  try {
    const users = await profile.find().exec();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error getting all profiles:", err);
    res.status(500).json({ message: "Failed to retrieve all profiles" });
  }
  const contactsData = res.status(200).json(contactsData);
});

app.get("/chat/:from/:to", async (req, res) => {
  try {
    const { from, to } = req.params;
    const chatHistory = await Message.find({
      $or: [
        { from: from, to: to },
        { from: to, to: from },
      ],
    })
      .sort({ timestamp: 1 })
      .limit(50);
    res.status(200).json(chatHistory);
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    res.status(500).json({ message: "Error retrieving chat history" });
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://192.168.56.1:3000`);
});
