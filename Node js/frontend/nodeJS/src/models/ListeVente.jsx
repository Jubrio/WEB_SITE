import { useEffect, useState } from 'react';
import ModifierVent from './ModifierVente';
import { List, Search, AlertTriangle, Trash2, Pencil, Hash } from 'lucide-react';

function ListeVent() {
  const [ventes, setVentes] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

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

  const demanderConfirmation = (vente) => {
    setConfirmDelete(vente);
  };

  const supprimer = async () => {
    if (!confirmDelete) return;
    
    const vente = confirmDelete;
    setDeleteId(vente.id);
    await fetch(`http://localhost:3000/ventes/${vente.id}`, { method: 'DELETE' });
    setDeleteId(null);
    setConfirmDelete(null);
    fetchVentes();
    showNotification(`« ${vente?.design} » a été supprimé avec succès.`, 'delete');
  };

  const annulerSuppression = () => {
    setConfirmDelete(null);
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

  const ventesFiltrees = ventes.filter(v =>
    v.design.toLowerCase().includes(search.toLowerCase())
  );

  const total = ventes.reduce((sum, v) => sum + v.prix * v.quantite, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-amber-400/60 text-xs font-medium tracking-widest uppercase mb-2">
            <span><List size={13} /></span> Registre
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

      {/* Barre de recherche */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"><Search size={13} /></span>
          <input
            type="text"
            placeholder="Rechercher une désignation..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-gray-600
              focus:outline-none focus:border-amber-500/40 focus:bg-white/7 transition-all duration-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          </div>
        ) : ventesFiltrees.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-4xl mb-4"><List size={13} /></p>
            <p className="text-gray-500 text-sm">
              {search ? 'Aucun résultat pour cette recherche' : 'Aucune vente enregistrée'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-gray-500 text-xs font-medium tracking-widest uppercase">Désignation</th>
                <th className="text-right px-6 py-4 text-gray-500 text-xs font-medium tracking-widest uppercase">Prix unitaire</th>
                <th className="text-right px-6 py-4 text-gray-500 text-xs font-medium tracking-widest uppercase">Qté</th>
                <th className="text-right px-6 py-4 text-gray-500 text-xs font-medium tracking-widest uppercase">Montant</th>
                <th className="text-right px-6 py-4 text-gray-500 text-xs font-medium tracking-widest uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {ventesFiltrees.map((v, i) => (
                <tr
                  key={v.id}
                  className="group hover:bg-white/[0.02] transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
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
                        onClick={() => demanderConfirmation(v)}
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
                <td colSpan="4" className="px-6 py-4 text-gray-500 text-xs uppercase tracking-wide">Total général</td>
                <td className="px-6 py-4 text-right text-amber-400 font-bold">
                  {total.toLocaleString('fr-FR')} Ar
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* Modal de confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm transition-all duration-300">
          <div className="bg-[#0f0f12] border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <span className="text-white text-2xl"><AlertTriangle size={20}/></span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Confirmer la suppression</h3>
              <p className="text-gray-400 text-sm mb-6">
                Êtes-vous sûr de vouloir supprimer la vente<br />
                <span className="text-amber-400 font-medium">« {confirmDelete.design} »</span> ?
              </p>
              <p className="text-gray-500 text-xs mb-6">Cette action est irréversible.</p>
              <div className="flex gap-3">
                <button
                  onClick={annulerSuppression}
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={supprimer}
                  className="flex-1 px-4 py-2.5 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all duration-200 text-sm font-medium"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div
          className={`mt-4 flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-300
            ${notification.type === 'delete'
              ? 'bg-red-500/10 border-red-500/20 text-red-400'
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            }`}
        >
          <span className="text-base">
            {notification.type === 'delete' ? <Trash2 size={16} /> : <Pencil size={16} />}
          </span>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default ListeVent;