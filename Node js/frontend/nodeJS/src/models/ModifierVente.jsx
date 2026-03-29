import { useState } from 'react';

function ModifierVent({ vente, refresh, close }) {
  const [design, setDesign] = useState(vente.design);
  const [prix, setPrix] = useState(vente.prix);
  const [quantite, setQuantite] = useState(vente.quantite);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const modifier = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`http://localhost:3000/ventes/${vente.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ design, prix, quantite })
    });

    const data = await res.json();
    setLoading(false);
    setMessage(data.message);

    setTimeout(() => {
      refresh();
      close();
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-2 text-amber-400/60 text-xs font-medium tracking-widest uppercase mb-2">
              <span>◈</span> Modification
            </div>
            <h2 className="text-white text-2xl font-bold tracking-tight">Modifier la vente</h2>
            <p className="text-gray-500 text-sm mt-1">ID #{vente.id} — {vente.design}</p>
          </div>
          <button
            onClick={close}
            className="flex items-center gap-2 text-gray-500 hover:text-white text-xs border border-white/8 hover:border-white/20 px-3 py-2 rounded-lg transition-all duration-200"
          >
            ← Retour
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.02] border border-amber-500/10 rounded-2xl p-7">
          <form onSubmit={modifier} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase block">
                Désignation
              </label>
              <input
                value={design}
                onChange={e => setDesign(e.target.value)}
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-white text-sm
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
                    value={prix}
                    onChange={e => setPrix(e.target.value)}
                    className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 pr-12 text-white text-sm
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
                  value={quantite}
                  onChange={e => setQuantite(e.target.value)}
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-white text-sm
                    focus:outline-none focus:border-amber-500/40 focus:bg-white/7 transition-all duration-200"
                />
              </div>
            </div>

            {/* Nouveau montant */}
            <div className="bg-amber-500/8 border border-amber-500/15 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-gray-400 text-xs">Nouveau montant</span>
              <span className="text-amber-400 font-semibold text-sm">
                {(parseFloat(prix || 0) * parseFloat(quantite || 0)).toLocaleString('fr-FR')} Ar
              </span>
            </div>

            {message && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <p className="text-emerald-400 text-xs">{message}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500
                  text-black font-semibold py-3 rounded-xl text-sm transition-all duration-200
                  disabled:opacity-50 shadow-lg shadow-amber-500/15 hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sauvegarde...
                  </span>
                ) : (
                  'Enregistrer les modifications'
                )}
              </button>
              <button
                type="button"
                onClick={close}
                className="px-4 py-3 text-gray-400 hover:text-white border border-white/8 hover:border-white/20 rounded-xl text-sm transition-all duration-200"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifierVent;