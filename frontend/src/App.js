import React from 'react';
import ChatBot from './Components/ChatBot/ChatBot';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { Route, Routes,Navigate  } from "react-router-dom";
import QuizApp from './Components/Quiz/QuizContainer';
import NotFound from './Components/NotFound';
import MainPage from './Components/MainPage';
  




function App() {
  return (

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage></MainPage>} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/quiz" element={<QuizApp />} />

        <Route path="*" element={<NotFound />} />
      </Routes> 
    // </div>
  );

}

export default App;
