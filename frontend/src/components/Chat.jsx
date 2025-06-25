import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  const user = useSelector((store) => store?.user);
  const userId = user?._id;

  const chatBodyRef = useRef(null); // ✅ Scrollable container ref

  const scrollToBottom = () => {
    const container = chatBodyRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to latest on new message
  }, [messages]);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

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

    socket.emit("joinChat", {
      firstName: user.firstName,
      targetUserId,
      userId,
    });

    socket.on("messageReceived", ({ senderId, firstName, lastName, text }) => {
      setMessages((prev) => [
        ...prev,
        { senderId, firstName, lastName, text },
      ]);
      setNewMessage('');
      setTimeout(scrollToBottom, 100);
    });

    socket.on("errorMessage", ({ message }) => {
      alert(message);
    });

    socket.on("userOnline", ({ userId }) => {
      setOnlineUsers((prev) => new Set([...prev, userId]));
    });

    socket.on("userOffline", ({ userId }) => {
      const newSet = new Set(onlineUsers);
      newSet.delete(userId);
      setOnlineUsers(newSet);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      senderId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage('');
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className='w-3/4 mx-auto m-5 border border-gray-600 h-[70vh] flex flex-col overflow-hidden'>
      <h1 className='p-5 border-b border-gray-600 font-bold'>Chat</h1>

      {/* ✅ Scrollable chat body */}
      <div
        className='flex-1 overflow-y-auto px-5 py-3'
        ref={chatBodyRef}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={"chat" + (msg.senderId === userId ? " chat-end" : " chat-start")}
          >
            <div className="chat-header flex items-center gap-2">
              <span>{`${msg.firstName} ${msg.lastName}`}</span>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>

      {/* ✅ Message input */}
      <div className='flex border-t border-gray-600 items-center gap-2 p-2'>
        <input
          className='flex-1 border border-gray-400 rounded p-1'
          type='text'
          placeholder='Type your message...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button className='btn btn-primary' onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
