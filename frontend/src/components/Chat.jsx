import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(new Set()); // ✅ Track online users

  const user = useSelector((store) => store?.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
      console.log(chat?.data?.messages);
      const chatMessages = chat?.data?.messages.map((msg) => {
        let { senderId, text } = msg;
        return {
          senderId: senderId?._id,
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text: text,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    
    const socket = createSocketConnection();
    
    socket.emit("joinChat", { firstName: user.firstName, targetUserId, userId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
      setNewMessage("");
    });

    socket.on("errorMessage", ({ message }) => {
      alert(message);
    });

    // ✅ Handle online users
    socket.on("userOnline", ({ userId }) => {
      setOnlineUsers((prev) => new Set([...prev, userId])); // Add user to set
    });

    // ✅ Handle offline users
    socket.on("userOffline", ({ userId }) => {
      setOnlineUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { 
      firstName: user.firstName, 
      lastName: user.lastName,
      userId, 
      targetUserId, 
      text: newMessage 
    });
  };

  return (
    <div className='w-3/4 mx-auto m-5 border border-gray-600 h-[70vh] flex flex-col'>
      <h1 className='p-5 border-b border-gray-600 font-bold'>Chat</h1>

      <div className='flex-1 overflow-scroll p-5'>
        {
          messages.map((msg, index) => (
            <div className={"chat" + (msg.senderId === userId ? " chat-end" : " chat-start")} key={index}>
              <div className="chat-header flex items-center gap-2">
                <span>{`${msg.firstName} ${msg.lastName}`}</span>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))
        }
      </div>

      <div className='flex border-t border-gray-600 items-center gap-2 p-2'>
        <input 
          className='flex-1 border border-gray-400 rounded p-1' 
          type='text' 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className='btn btn-primary' onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
