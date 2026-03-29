import { useState } from 'react';

function AjoutVent() {
  const [design, setDesign] = useState('');
  const [prix, setPrix] = useState('');
  const [quantite, setQuantite] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const ajouter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('http://localhost:3000/ventes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ design, prix, quantite })
    });

    const data = await res.json();
    setLoading(false);
    setMessage(data.message);
    setSuccess(true);

    // Réinitialiser les champs après soumission
    setDesign('');
    setPrix('');
    setQuantite('');

    setTimeout(() => {
      setSuccess(false);
      setMessage('');
    }, 3000);
  };

  const montantEstime = prix && quantite ? (parseFloat(prix) * parseFloat(quantite)).toLocaleString('fr-FR') : null;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 text-amber-400/60 text-xs font-medium tracking-widest uppercase mb-2">
            <span>✦</span> Enregistrement
          </div>
          <h2 className="text-white text-2xl font-bold tracking-tight">Nouvelle Vente</h2>
          <p className="text-gray-500 text-sm mt-1">Saisissez les informations de la transaction</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-7">
          <form onSubmit={ajouter} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase block">
                Désignation
              </label>
              <input
                placeholder="Ex: Iphone 17 Pro Max"
                value={design}
                onChange={e => setDesign(e.target.value)}
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700
                  focus:outline-none focus:border-amber-500/40 focus:bg-white/7 transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-gray-400 text-xs font-medium tracking-wide uppercase block">
                  Prix unitaire
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0"
                    value={prix}
                    onChange={e => setPrix(e.target.value)}
                    className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-gray-700
                      focus:outline-none focus:border-amber-500/40 focus:bg-white/7 transition-all duration-200"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs">Ar</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400 text-xs font-medium tracking-wide uppercase block">
                  Quantité
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={quantite}
                  onChange={e => setQuantite(e.target.value)}
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700
                    focus:outline-none focus:border-amber-500/40 focus:bg-white/7 transition-all duration-200"
                />
              </div>
            </div>

            {/* Montant estimé */}
            {montantEstime && (
              <div className="bg-amber-500/8 border border-amber-500/15 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-gray-400 text-xs">Montant total estimé</span>
                <span className="text-amber-400 font-semibold text-sm">{montantEstime} Ar</span>
              </div>
            )}

            {/* Message */}
            {message && (
              <div className={`rounded-xl px-4 py-3 flex items-center gap-2 ${
                success
                  ? 'bg-emerald-500/10 border border-emerald-500/20'
                  : 'bg-red-500/10 border border-red-500/20'
              }`}>
                <span className={success ? 'text-emerald-400' : 'text-red-400'}>
                  {success ? '✓' : '✕'}
                </span>
                <p className={`text-xs ${success ? 'text-emerald-400' : 'text-red-400'}`}>
                  {message}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500
                text-black font-semibold py-3 rounded-xl text-sm transition-all duration-200
                disabled:opacity-50 shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25
                hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Enregistrement...
                </span>
              ) : (
                'Enregistrer la vente'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AjoutVent;