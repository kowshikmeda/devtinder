const server = require("http");
const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const onlineUsers = new Map(); // ✅ Store online users

const getSecretRoomId = (userId, targetUserId) => {
  return crypto.createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: ["http://localhost:5173", "https://devtinder-oelc.onrender.com"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    // ✅ User joins chat and becomes online
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      onlineUsers.set(userId, socket.id);
      io.emit("userOnline", { userId });
      
      const roomId = getSecretRoomId(userId, targetUserId);
      socket.join(roomId); // ✅ Ensure the user joins the chat room
      
      console.log(`${firstName} joined chat with ${targetUserId} in room ${roomId}`);
    });
    
    socket.on("sendMessage", async ({ firstName, lastName, userId, targetUserId, text }) => {
      try {
        const roomId = getSecretRoomId(userId, targetUserId);
    
        const isFriends = await ConnectionRequest.findOne({
          $or: [
            { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
            { fromUserId: targetUserId, toUserId: userId, status: "accepted" }
          ]
        });
    
        if (!isFriends) {
          io.to(socket.id).emit("errorMessage", { message: "You are not friends. Messages can't be sent." });
          return;
        }
    
        let chat = await Chat.findOne({ participants: { $all: [userId, targetUserId] } });
    
        if (!chat) {
          chat = new Chat({ participants: [userId, targetUserId], messages: [] });
        }
    
        chat.messages.push({ senderId: userId, text });
        await chat.save();
    
        io.to(roomId).emit("messageReceived", { firstName, lastName, text }); // ✅ Broadcast message to room
    
      } catch (err) {
        console.error("Message error:", err);
      }
    });
    

    // ✅ Handle user disconnection
    socket.on("disconnect", () => {
      let disconnectedUserId = null;

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        io.emit("userOffline", { userId: disconnectedUserId }); // ✅ Notify all clients
        console.log("User disconnected:", disconnectedUserId);
      }
    });
  });
};

module.exports = initializeSocket;
