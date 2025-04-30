import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import AdoptionPage from './pages/AdoptionPage.jsx';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow pt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adocao" element={<AdoptionPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
