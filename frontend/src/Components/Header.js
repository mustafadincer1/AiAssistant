import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export function BxMenu(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>);
}


function Header({ toggleSidebar, profileOpen, toggleProfile, userName,role }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('auth-token');

    // Kullanıcıyı giriş sayfasına yönlendir
    navigate('/login');
  }


  return (
    <header className="flex w-full items-center justify-between border-b-2 bg-gray-800 text-white sticky top-0 z-10 max-w-full p-4">
      <div className="flex items-center space-x-2">
        <button type="button" className="text-3xl" onClick={toggleSidebar}>
          <BxMenu></BxMenu>
        </button>
        <div>ChatBot</div>
      </div>
  
      <div className="flex items-center space-x-12">
        {/* Profil menüsü sol tarafta, linkler ise profil menüsünün sağında */}
        <div className="flex space-x-12 ">
          <Link to="/chatbot" className="text-white hover:text-gray-300 transition text-xl hover:opacity-90 ">Chat</Link>
          {role !== 'employer' && (
            <Link to="/quiz" className="text-white hover:text-gray-300 transition text-xl hover:opacity-90">Quiz</Link>
          )}
        </div>
        
        <div className="relative">
          <button
            type="button"
            onClick={toggleProfile}
            className="h-10 w-10 overflow-hidden rounded-full"
          >
            <img src="https://plchldr.co/i/40x40?bg=111111" alt="Profile" />
          </button>
  
          {profileOpen && (
            <div className="absolute right-0 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md">
              <div className="flex items-center space-x-2 p-2">
                <img src="https://plchldr.co/i/40x40?bg=111111" alt="Profile" className="h-9 w-9 rounded-full" />
                <div className="font-medium text-slate-800">{userName}</div>
              </div>
              <div className="flex flex-col space-y-3 p-2">
                <a href="#" className="transition hover:text-blue-600 text-slate-800">My Profile</a>
                <a href="#" className="transition hover:text-blue-600 text-slate-800">Edit Profile</a>
                <a href="#" className="transition hover:text-blue-600 text-slate-800">Settings</a>
              </div>
              <div className="p-2">
                <button className="flex items-center space-x-2 transition hover:text-blue-600">
                  <svg className="h-4 w-4 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <div onClick={handleLogout} className='text-slate-800'>Log Out</div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
  
}

export default Header;