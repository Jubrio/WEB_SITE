import { useState } from 'react';

function Head({ setPage, user, setUser, currentPage }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const navItems = [
    { id: 'ajout', label: 'Ajouter une vente', icon: '✦' },
    { id: 'liste', label: 'Liste des ventes', icon: '◈' },
    { id: 'graph', label: 'Bilan et graph', icon: '◉' },
  ];

  return (
    <>
      <header className="border-b border-amber-500/10 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-sm">
              V
            </div>
            <span className="text-white font-semibold tracking-widest text-xs uppercase">
              Gestion <span className="text-amber-400">Vente</span>
            </span>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`
                  px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200
                  flex items-center gap-2
                  ${currentPage === item.id
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span className="text-[10px]">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black text-xs font-bold">
                {user?.[0]?.toUpperCase()}
              </div>
              <span className="text-gray-400 text-xs">{user}</span>
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              className="px-3 py-1.5 text-xs text-gray-500 hover:text-red-400 border border-white/5 hover:border-red-500/30 rounded-lg transition-all duration-200"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />
          <div className="relative bg-[#0f0f17] border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 mx-auto mb-4">
              <span className="text-red-400 text-xl">⎋</span>
            </div>
            <h3 className="text-white text-base font-semibold text-center mb-1">Déconnexion</h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              Voulez-vous vraiment vous déconnecter ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 text-xs font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  setShowConfirm(false);
                  setUser(null);
                }}
                className="flex-1 px-4 py-2.5 text-xs font-medium text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-xl transition-all duration-200"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Head;