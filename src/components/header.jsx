import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
      <header className="bg-white p-4 flex justify-between items-center px-16 py-4 shadow-xl">
        {/* Logo */}
        <Link to="/" className="text-black text-xl font-bold flex items-center">
          <img href="index.html" src="logo.png" alt="Logo" className="h-8 w-8 rounded-full inline-block" />
          <a href="index.html" className="px-2">Roboz</a>
        </Link>
  
        {/* Navigation Links */}
        <nav className="hidden md:flex flex-1 items-center">
          <ul className="flex justify-center space-x-6 px-8">
            <li><a href="#features" className="text-black hover:underline">Giới thiệu</a></li>
            <li><Link to="/course" className="text-black hover:underline">Làm bài kiểm tra</Link></li>
            <li><a href="#features" className="text-black hover:underline">Xem điểm</a></li>
            <li><a href="#guide" className="text-black hover:underline">Hướng dẫn</a></li>
            <li><a href="#contact" className="text-black hover:underline">Liên hệ</a></li>
          </ul>
        </nav>
  
        {/* Login and Register Links */}
      <div className="flex space-x-4 items-center font-medium">
        <Link to="/login" className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">Đăng nhập</Link>
        <Link to="/register" className="bg-white text-black py-2 px-4 hover:underline transition-colors">Đăng ký</Link>
      </div>
      </header>
    );
  }

export default Header;