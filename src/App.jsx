import React from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow pt-6">
        <Home />
      </main>
    </div>
  );
}