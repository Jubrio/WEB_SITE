import { useEffect, useState } from 'react';
import ModifierVent from './ModifierVente';

function ListeVent() {
  const [ventes, setVentes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [notification, setNotification] = useState(null); // { message, type }

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchVentes = () => {
    setLoading(true);
    fetch('http://localhost:3000/ventes')
      .then(res => res.json())
      .then(data => {
        setVentes(data);
        setLoading(false);
      });
  };

  useEffect(() => { fetchVentes(); }, []);

  const supprimer = async (id) => {
    const vente = ventes.find(v => v.id === id);
    setDeleteId(id);
    await fetch(`http://localhost:3000/ventes/${id}`, { method: 'DELETE' });
    setDeleteId(null);
    fetchVentes();
    showNotification(`« ${vente?.design} » a été supprimé avec succès.`, 'delete');
  };

  const handleModifier = (v) => {
    setSelected(v);
  };

  if (selected) {
    return (
      <ModifierVent
        vente={selected}
        refresh={() => {
          fetchVentes();
          showNotification(`« ${selected.design} » a été modifié avec succès.`, 'edit');
        }}
        close={() => setSelected(null)}
      />
    );
  }

  const total = ventes.reduce((sum, v) => sum + v.prix * v.quantite, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-400/60 text-xs font-medium tracking-widest uppercase mb-2">
            <span>◈</span> Registre
          </div>
          <h2 className="text-white text-2xl font-bold tracking-tight">Liste des ventes</h2>
          <p className="text-gray-500 text-sm mt-1">{ventes.length} transaction{ventes.length > 1 ? 's' : ''} enregistrée{ventes.length > 1 ? 's' : ''}</p>
        </div>

        {ventes.length > 0 && (
          <div className="text-right">
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Chiffre d'affaires total</p>
            <p className="text-amber-400 text-xl font-bold">{total.toLocaleString('fr-FR')} Ar</p>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          </div>
        ) : ventes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-4xl mb-4">◈</p>
            <p className="text-gray-500 text-sm">Aucune vente enregistrée</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-gray-500 text-xs font-medium tracking-widest uppercase">Désignation</th>
                <th className="text-right px-6 py-4 text-gray-500 text-xs font-medium tracking-widest uppercase">Prix unit.</th>
                <th className="text-right px-6 py-4 text-gray-500 text-xs font-medium tracking-widest uppercase">Qté</th>
                <th className="text-right px-6 py-4 text-gray-500 text-xs font-medium tracking-widest uppercase">Montant</th>
                <th className="text-right px-6 py-4 text-gray-500 text-xs font-medium tracking-widest uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {ventes.map((v, i) => (
                <tr
                  key={v.id}
                  className="group hover:bg-white/[0.02] transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-400 text-xs font-semibold">
                        {i + 1}
                      </div>
                      <span className="text-white text-sm font-medium">{v.design}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-300 text-sm">
                    {parseFloat(v.prix).toLocaleString('fr-FR')} Ar
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-gray-300 text-sm">
                      {v.quantite}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-amber-400 text-sm font-semibold">
                    {(v.prix * v.quantite).toLocaleString('fr-FR')} Ar
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleModifier(v)}
                        className="px-3 py-1.5 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/25 rounded-lg transition-all duration-200"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => supprimer(v.id)}
                        disabled={deleteId === v.id}
                        className="px-3 py-1.5 text-xs text-red-400/70 hover:text-red-400 border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/5 rounded-lg transition-all duration-200 disabled:opacity-50"
                      >
                        {deleteId === v.id ? '...' : 'Supprimer'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/8 bg-white/[0.015]">
                <td colSpan="3" className="px-6 py-4 text-gray-500 text-xs uppercase tracking-wide">Total général</td>
                <td className="px-6 py-4 text-right text-amber-400 font-bold">
                  {total.toLocaleString('fr-FR')} Ar
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* Notification en bas du tableau */}
      {notification && (
        <div
          className={`mt-4 flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-300
            ${notification.type === 'delete'
              ? 'bg-red-500/10 border-red-500/20 text-red-400'
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            }`}
        >
          <span className="text-base">
            {notification.type === 'delete' ? '🗑️' : '✏️'}
          </span>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default ListeVent;