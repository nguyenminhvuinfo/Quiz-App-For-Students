// src/pages/Home.js
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

// Header Component
<Header/>
// Main Content Component
function Content() {
  return (
    <main className="p-6 text-center">
      <h2 className="text-2xl font-semibold">Khu vực Nội dung chính</h2>
      <p>Đây là nội dung chính của trang chủ.</p>
    </main>
  );
}

// Footer Component

// Home Component that combines Header, Content, and Footer
function Home() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default Home;
