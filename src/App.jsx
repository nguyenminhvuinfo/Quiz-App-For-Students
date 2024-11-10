// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';  // Trang chính
import Login from './pages/login';  // Trang đăng nhập
import Register from './pages/register';  // Trang đăng ký

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />  {/* Trang chính */}
          <Route path="/login" element={<Login />} />  {/* Trang đăng nhập */}
          <Route path="/register" element={<Register />} />  {/* Trang đăng ký */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
