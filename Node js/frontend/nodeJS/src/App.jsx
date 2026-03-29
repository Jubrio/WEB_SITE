import { useState } from 'react';
import Head from './composants/Head';
import Foot from './composants/Foot';
import AjoutVent from './models/AjoutVente';
import ListeVent from './models/ListeVente';
import Graph from './models/Graphique';
import Login from './models/Login';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [page, setPage] = useState('ajout');

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <Head setPage={setPage} user={user} setUser={setUser} currentPage={page} />

      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="animate-fadeIn">
          {page === 'ajout' && <AjoutVent />}
          {page === 'liste' && <ListeVent />}
          {page === 'graph' && <Graph />}
        </div>
      </main>

      <Foot />
    </div>
  );
}

export default App;