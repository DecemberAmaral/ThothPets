// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdoptionPage from "./pages/AdoptionPage";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroAdocao from "./pages/CadastroAdocao";
import Resgate from "./pages/Resgate";
import LoginUsuario from "./pages/LoginUsuario";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import UserPublications from "./pages/UserPublications";
import ScrollToTop from "./components/ScrollToTop"; // Importação do componente ScrollToTop
import { supabase } from "./supabaseClient";

export default function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);

  // Consulta a sessão do usuário via Supabase
  useEffect(() => {
    async function getUserSession() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUserSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Este componente fará o scroll para o topo em cada mudança de rota */}
      <Navbar setShowLoginModal={setShowLoginModal} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/adocao"
          element={<AdoptionPage setShowLoginModal={setShowLoginModal} user={user} />}
        />
        <Route
          path="/cadastro-adocao"
          element={
            user ? (
              <CadastroAdocao user={user} />
            ) : (
              <LoginModal onClose={() => setShowLoginModal(false)} />
            )
          }
        />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route path="/login-usuario" element={<LoginUsuario />} />
        <Route
          path="/resgate"
          element={<Resgate user={user} setShowLoginModal={setShowLoginModal} />}
        />
        <Route
          path="/minhas-publicacoes"
          element={
            user ? (
              <UserPublications user={user} setShowLoginModal={setShowLoginModal} />
            ) : (
              <LoginModal onClose={() => setShowLoginModal(false)} />
            )
          }
        />
      </Routes>
      <Footer />
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </BrowserRouter>
  );
}
