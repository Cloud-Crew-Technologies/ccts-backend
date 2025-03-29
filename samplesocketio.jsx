import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  IconButton,
  InputAdornment,
  Badge,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const socket = io.connect("http://192.168.56.1:3000");

function ChatInterface() {
  const { name } = useParams();
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    const fetchUserAndContacts = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/profile/${name}`
        );
        console.log(userResponse);
        setUser(userResponse.data);
        console.log(user);

        const contactsResponse = await axios.get(
          "http://localhost:8080/profile/getallprofile"
        );
        setContacts(contactsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserAndContacts();
  }, [name]);

  useEffect(() => {
    if (selectedContact) {
      const fetchChatHistory = async () => {
        try {
          const chatResponse = await axios.get(
            `http://192.168.56.1:3000/chat/${user.name}/${selectedContact.name}`
          );
          setChat(chatResponse.data);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      };
      fetchChatHistory();
    }
  }, [selectedContact, user]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const sendMessage = () => {
    if (selectedContact && message.trim()) {
      socket.emit("chat", {
        from: user.name,
        to: selectedContact.name,
        message: message.trim(),
      });
      setChat((prevChat) => [
        ...prevChat,
        {
          from: user.name,
          to: selectedContact.name,
          message: message.trim(),
        },
      ]);
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", // Full height
        backgroundColor: "#f5f8fa", // Light background
      }}
    >
      <Paper
        sx={{
          width: "300px",
          borderRight: "1px solid #e0e0e0", // Divider
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar alt="Tarakesh" src="/static/images/avatar/1.jpg" />
            <Box ml={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                Tarakesh
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Available
              </Typography>
            </Box>
          </Box>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        {/* Contact List */}
        <List>
          {contacts.map((contact) => (
            <React.Fragment key={contact.id}>
              <ListItem
                button
                alignItems="flex-start"
                onClick={() => handleContactClick(contact)}
                selected={
                  selectedContact && selectedContact.name === contact.name
                }
                sx={{
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={contact.name} src={contact.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="bold">
                        {contact.name}
                      </Typography>
                      {contact.unreadMessages > 0 && (
                        <Badge
                          badgeContent={contact.unreadMessages}
                          color="primary"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {contact.lastMessage}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      {/* Chat Window */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", }}>
                <Avatar
                  alt={selectedContact.name}
                  src={selectedContact.avatar}
                />
                <Box ml={1}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {selectedContact.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Active now
                  </Typography>
                </Box>
              </Box>
            </Paper>
            {/* Message Area */}
            <Box
              ref={chatBoxRef}
              sx={{
                flexGrow: 1,
                padding: 2,
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {chat.map(({ from, message }, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      from === user?.email ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Paper
                    sx={{
                      padding: 1,
                      maxWidth: "60%",
                      backgroundColor:"green",
                      borderRadius: "10px",
                      textAlign: from === user?.email ? "right" : "left",
                    }}
                  >
                    <Typography variant="body1">{message}</Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: "block" }}
                    >
                      {new Date().toLocaleTimeString()}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
            {/* Message Input */}
            <Paper
              sx={{
                padding: 1,
                display: "flex",
                alignItems: "center",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <IconButton>
                <InsertEmoticonIcon />
              </IconButton>
              <TextField
                fullWidth
                placeholder="Type your message..."
                variant="outlined"
                size="small"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                sx={{ ml: 1, mr: 1 }}
              />
              <IconButton color="primary" onClick={sendMessage}>
                <SendIcon />
              </IconButton>
            </Paper>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Select a contact to start chatting.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ChatInterface;
