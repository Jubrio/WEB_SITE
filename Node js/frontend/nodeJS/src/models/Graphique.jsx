import { useEffect, useState } from 'react';
import { Plus, List, BarChart2, ArrowDown, ArrowUp, Circle, CircleDot } from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

function Graph() {
  const [bilan, setBilan] = useState({});
  const [ventes, setVentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prixStats, setPrixStats] = useState({ minPrix: 0, maxPrix: 0, totalMin: 0, totalMax: 0 });

  useEffect(() => {
    fetch('http://localhost:3000/bilan')
      .then(res => res.json())
      .then(data => setBilan(data));

    fetch('http://localhost:3000/ventes')
      .then(res => res.json())
      .then(data => {
        setVentes(data);
        const prixUnitaire = data.map(v => parseFloat(v.prix));
        const minPrix = Math.min(...prixUnitaire);
        const maxPrix = Math.max(...prixUnitaire);

        const venteMin = data.find(v => parseFloat(v.prix) === minPrix);
        const venteMax = data.find(v => parseFloat(v.prix) === maxPrix);
        const totalMin = minPrix * parseFloat(venteMin?.quantite || 0);
        const totalMax = maxPrix * parseFloat(venteMax?.quantite || 0);

        setPrixStats({ minPrix, maxPrix, totalMin, totalMax });
        setLoading(false);
      });
  }, []);

  const barData = {
    labels: ['Montant min', 'Montant max', 'Montant total'],
    datasets: [{
      label: 'Montants (Ar)',
      data: [prixStats.totalMin || 0, prixStats.totalMax || 0, bilan.total || 0],
      backgroundColor: [
        'rgba(251, 191, 36, 0.3)',
        'rgba(251, 191, 36, 0.6)',
        'rgba(251, 191, 36, 0.9)',
      ],
      borderColor: [
        'rgba(251, 191, 36, 0.5)',
        'rgba(251, 191, 36, 0.7)',
        'rgba(251, 191, 36, 1)',
      ],
      borderWidth: 1,
      borderRadius: 8,
    }]
  };

  const pieData = {
    labels: ['Montant min', 'Montant max', 'Montant total'],
    datasets: [{
      data: [prixStats.totalMin || 0, prixStats.totalMax || 0, bilan.total || 0],
      backgroundColor: [
        'rgba(251, 191, 36, 0.5)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(217, 119, 6, 0.4)',
      ],
      borderColor: [
        'rgba(251, 191, 36, 0.8)',
        'rgba(245, 158, 11, 0.9)',
        'rgba(217, 119, 6, 0.6)',
      ],
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#9ca3af', font: { size: 11 }, padding: 16 }
      },
      tooltip: {
        backgroundColor: '#1a1a2e',
        borderColor: 'rgba(251,191,36,0.2)',
        borderWidth: 1,
        titleColor: '#fbbf24',
        bodyColor: '#d1d5db',
        padding: 12,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#6b7280', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#6b7280', font: { size: 11 } }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#9ca3af', font: { size: 11 }, padding: 16 }
      },
      tooltip: {
        backgroundColor: '#1a1a2e',
        borderColor: 'rgba(251,191,36,0.2)',
        borderWidth: 1,
        titleColor: '#fbbf24',
        bodyColor: '#d1d5db',
        padding: 12,
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-amber-400/60 text-xs font-medium tracking-widest uppercase mb-2">
          <span><BarChart2 size={13} /></span> Bilan
        </div>
        <h2 className="text-white text-2xl font-bold tracking-tight">Tableau de bord</h2>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble des bilan et graphe</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-xs uppercase tracking-wide">Prix minimum</span>
            <span className="text-sm text-gray-500"><ArrowDown size={16} /></span>
          </div>
          {loading ? (
            <>
              <div className="h-7 w-28 bg-white/5 rounded animate-pulse mb-3" />
              <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-white">
                {(prixStats.totalMin || 0).toLocaleString('fr-FR')}
                <span className="text-xs font-normal text-gray-500 ml-1">Ar</span>
              </p>
              <p className="text-gray-500 text-[10px] uppercase tracking-wide mt-0.5 mb-3">Montant total minimum</p>
              <div className="pt-3 border-t border-white/5">
                <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">Prix unitaire minimum</p>
                <p className="text-sm font-semibold text-amber-400/80">
                  {(prixStats.minPrix || 0).toLocaleString('fr-FR')}
                  <span className="text-xs font-normal text-gray-500 ml-1">Ar</span>
                </p>
              </div>
            </>
          )}
        </div>
        <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-xs uppercase tracking-wide">Prix maximum</span>
            <span className="text-sm text-gray-500"><ArrowUp size={16} /></span>
          </div>
          {loading ? (
            <>
              <div className="h-7 w-28 bg-white/5 rounded animate-pulse mb-3" />
              <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-white">
                {(prixStats.totalMax || 0).toLocaleString('fr-FR')}
                <span className="text-xs font-normal text-gray-500 ml-1">Ar</span>
              </p>
              <p className="text-gray-500 text-[10px] uppercase tracking-wide mt-0.5 mb-3">Montant total maximum</p>
              <div className="pt-3 border-t border-white/5">
                <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">Prix unitaire maximum</p>
                <p className="text-sm font-semibold text-amber-400/80">
                  {(prixStats.maxPrix || 0).toLocaleString('fr-FR')}
                  <span className="text-xs font-normal text-gray-500 ml-1">Ar</span>
                </p>
              </div>
            </>
          )}
        </div>
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-xs uppercase tracking-wide">Chiffre d'affaires</span>
            <span className="text-sm text-amber-400"><CircleDot size={13} /></span>
          </div>
          {loading ? (
            <>
              <div className="h-7 w-28 bg-white/5 rounded animate-pulse mb-3" />
              <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-amber-400">
                {(bilan.total || 0).toLocaleString('fr-FR')}
                <span className="text-xs font-normal text-gray-500 ml-1">Ar</span>
              </p>
              <p className="text-gray-500 text-[10px] uppercase tracking-wide mt-0.5 mb-3">Montant total</p>
              <div className="pt-3 border-t border-amber-500/10">
                <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">Écart min → max</p>
                <p className="text-sm font-semibold text-amber-400/80">
                  {((prixStats.maxPrix - prixStats.minPrix) || 0).toLocaleString('fr-FR')}
                  <span className="text-xs font-normal text-gray-500 ml-1">Ar</span>
                </p>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Charts */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <span className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3 bg-white/[0.02] border border-white/8 rounded-2xl p-6">
            <h3 className="text-white text-sm font-semibold mb-1">Histogramme des montants</h3>
            <p className="text-gray-500 text-xs mb-6">Montant total min / max / global</p>
            <Bar data={barData} options={chartOptions} />
          </div>

          <div className="col-span-2 bg-white/[0.02] border border-white/8 rounded-2xl p-6">
            <h3 className="text-white text-sm font-semibold mb-1">Répartition</h3>
            <p className="text-gray-500 text-xs mb-6">Montant total min / max / global</p>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Graph;