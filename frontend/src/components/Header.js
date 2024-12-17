import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-500 text-white"> 
      
      <h1 className="text-4xl font-bold text-yellow-300">Travel Agency</h1>

      
      <nav className="space-x-6">
        {/* Links with hover effect and light pink hover color */}
        <Link 
          to="/" 
          className="text-lg hover:text-pink-300 transition duration-300 ease-in-out"
        >
          Home
        </Link>
        <Link 
          to="/admin/login" 
          className="text-lg hover:text-pink-300 transition duration-300 ease-in-out"
        >
          Admin Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
