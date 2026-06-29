import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Head from './composants/Head';
import Foot from './composants/Foot';
import AjoutVent from './models/AjoutVente';
import ListeVent from './models/ListeVente';
import Graph from './models/Graphique';
import Login from './models/Login';

function AppContent() {
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const location = useLocation();
  const navigate = useNavigate();

  const getPage = () => {
    if (location.pathname === '/Ajoutvente') return 'ajout';
    if (location.pathname === '/Listevente') return 'liste';
    if (location.pathname === '/Bilan') return 'graph';
    return 'ajout';
  };

  const setPage = (p) => {
    if (p === 'ajout') navigate('/Ajoutvente');
    else if (p === 'liste') navigate('/Listevente');
    else if (p === 'graph') navigate('/Bilan');
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  const page = getPage();

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <Head setPage={setPage} user={user} setUser={setUser} currentPage={page} />
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="animate-fadeIn">
          <Routes>
            <Route path="/Ajoutvente" element={<AjoutVent />} />
            <Route path="/Listevente" element={<ListeVent />} />
            <Route path="/Bilan" element={<Graph />} />
            <Route path="*" element={<Navigate to="/Ajoutvente" replace />} />
          </Routes>
        </div>
      </main>
      <Foot />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;