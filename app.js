import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors"; // Import cors
import mongoose from "mongoose";

const app = express();
const server = createServer(app);

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Add this line to parse JSON request bodies

const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your client-side origin if needed
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/chatdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// Define Mongoose schema and model for messages
const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat", async (payload) => {
    console.log("Message received:", payload);

    // Save the message to MongoDB
    try {
      const newMessage = new Message(payload);
      await newMessage.save();
      io.emit("newMessage", payload);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Example API endpoints (replace with your actual endpoints)
app.get("/profile/:name", (req, res) => {
  // Replace with your actual user data retrieval logic
  const { name } = req.params;
  const userData = {
    email: name,
    name: "Example User",
    avatar: "/static/images/avatar/1.jpg",
  };
  res.json(userData);
});

app.get("/contacts", (req, res) => {
  // Replace with your actual contacts data retrieval logic
  const contactsData = [
    {
      id: 1,
      email: "kathryn@example.com",
      name: "Kathryn Murphy",
      avatar: "/static/images/avatar/2.jpg",
      lastMessage: "Hey! there I'm...",
      unreadMessages: 7,
    },
  ];
  res.json(contactsData);
});
app.get("/getallprofile", (req, res) => {
  // Replace with your actual contacts data retrieval logic
  const contactsData = [
    {
      id: 1,
      email: "kathryn@example.com",
      name: "Kathryn Murphy",
      avatar: "/static/images/avatar/2.jpg",
      lastMessage: "Hey! there I'm...",
      unreadMessages: 7,
    },
    {
      id: 2,
      email: "aleen@test.com",
      name: "Aleen test",
      avatar: "/static/images/avatar/2.jpg",
      lastMessage: "Hey! there I'm...",
      unreadMessages: 7,
    },
  ];
  res.json(contactsData);
});

app.get("/chat/:from/:to", async (req, res) => {
  const { from, to } = req.params;
  try {
    // Use Mongoose to retrieve chat history from the database
    const chatHistory = await Message.find({
      $or: [
        { from: from, to: to },
        { from: to, to: from },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp for chronological order
    res.json(chatHistory); // Send the retrieved chat history as a response
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    res.status(500).send({ message: "Error retrieving chat history" });
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
