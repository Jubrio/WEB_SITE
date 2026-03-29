import { useState } from 'react';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isRegister
      ? 'http://localhost:3000/register'
      : 'http://localhost:3000/login';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      localStorage.setItem('user', username); // ← Sauvegarde dans localStorage
      setUser(username);
    } else {
      setMessage(data.message || 'Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative w-full max-w-sm mx-auto px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 mb-4 shadow-lg shadow-amber-500/20">
            <span className="text-black font-black text-xl">V</span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Gestion <span className="text-amber-400">Vente</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isRegister ? 'Créer votre compte' : 'Connexion à votre espace'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                Identifiant
              </label>
              <input
                placeholder="votre_nom"
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600
                  focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition-all duration-200"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600
                  focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition-all duration-200"
              />
            </div>

            {message && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                <p className="text-red-400 text-xs">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500
                text-black font-semibold py-3 rounded-xl text-sm transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20
                hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Connexion...
                </span>
              ) : (
                isRegister ? 'Créer le compte' : 'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-white/5 text-center">
            <button
              onClick={() => { setIsRegister(!isRegister); setMessage(''); }}
              className="text-gray-500 hover:text-amber-400 text-xs transition-colors duration-200"
            >
              {isRegister ? 'Déjà un compte ? Se connecter →' : 'Pas encore de compte ? Créer →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;