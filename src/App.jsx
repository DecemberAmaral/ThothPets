// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdoptionPage from "./pages/AdoptionPage";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroAdocao from "./pages/CadastroAdocao";
import Resgate from "./pages/Resgate";
import LoginUsuario from "./pages/LoginUsuario"; // Se necessário
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import UserPublications from "./pages/UserPublications";

export default function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <BrowserRouter>
      <Navbar setShowLoginModal={setShowLoginModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adocao" element={<AdoptionPage />} />
        <Route path="/cadastro-adocao" element={<CadastroAdocao />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route path="/login-usuario" element={<LoginUsuario />} />
        <Route path="/resgate" element={<Resgate />} />
        <Route path="/minhas-publicacoes" element={<UserPublications />} />
      </Routes>
      <Footer />
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </BrowserRouter>
  );
}

