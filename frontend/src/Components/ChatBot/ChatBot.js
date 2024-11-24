

import React, { useEffect, useState } from 'react';
import Header from '../Header';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

function ChatBot() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [asideOpen, setAsideOpen] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const message = "Yeni Sohbet Başlat";


  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleSidebar = () => setAsideOpen(!asideOpen);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (selectedConversationIndex !== null) {
      setMessages(conversations[selectedConversationIndex].messages);
    }
  }, [selectedConversationIndex, conversations]);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { sender: 'user', text: inputMessage };
    const botMessage = await getBotReply(inputMessage);

    const updatedConversations = [...conversations];
    if (selectedConversationIndex !== null) {
      updatedConversations[selectedConversationIndex].messages.push(userMessage, botMessage);
    } else {
      const newConversation = {
        title: inputMessage,
        messages: [userMessage, botMessage],
      };
      updatedConversations.push(newConversation);
      setSelectedConversationIndex(updatedConversations.length - 1);
    }
    setConversations(updatedConversations);
    setInputMessage('');
  };

  const getBotReply = async (message) => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://127.0.0.1:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token 
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      console.log(data);
      if (data.Status ==="Success") {
        console.log("defe");
      }
      return { sender: 'bot', text: data.choices[0].message.content };
    } catch (error) {
      console.error("Message sending failed:", error);
      return { sender: 'bot', text: 'Bir hata oluştu, lütfen tekrar deneyin.' };
    }
  };

  const startNewConversation = () => {
    setSelectedConversationIndex(null);
    setMessages([]);
    setInputMessage('');
  };

  const onSelectConversation = (index) => {
    setSelectedConversationIndex(index);
  };
  useEffect(() => {
    console.log("useeffet");
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        const response = await fetch('http://127.0.0.1:3000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token 
          },
          
        });
  
        const data = await response.json();
        setName(data.user._name);
        setRole(data.user._role);
        console.log(data);
        if (data.Status === "Success") {
          setAuth(true);
        } else {
          console.error("Authentication failed:", data.error);
          setAuth(false);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        setAuth(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (!auth) {
    return (
      <div>
        <h1>You are not authenticated. Please log in.</h1>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gray-100 text-gray-700">
      <Header
        toggleSidebar={toggleSidebar}
        profileOpen={profileOpen}
        toggleProfile={toggleProfile}
        userName={name}
        role={role}
      />
      <div className="flex">
        <Sidebar isOpen={asideOpen} 
        conversations={conversations} 
        startNewConversation={startNewConversation} 
        onSelectConversation={onSelectConversation} 
        message={message}/>
        <div className="w-full p-4">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isSender={msg.sender === 'user'} />
            ))
          ) : (
            <p>Yeni bir sohbet başlatın veya bir sohbet seçin.</p>
          )}
        </div>
      </div>
      <ChatInput sendMessage={sendMessage} inputMessage={inputMessage} setInputMessage={setInputMessage} />
    </main>
  );
}

export default ChatBot;
