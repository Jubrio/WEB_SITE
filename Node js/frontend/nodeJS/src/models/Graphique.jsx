import { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/bilan')
      .then(res => res.json())
      .then(data => {
        setBilan(data);
        setLoading(false);
      });
  }, []);

  const barData = {
    labels: ['Minimum', 'Maximum', 'Total'],
    datasets: [{
      label: 'Montants (Ar)',
      data: [bilan.min || 0, bilan.max || 0, bilan.total || 0],
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
    labels: ['Minimum', 'Maximum', 'Reste'],
    datasets: [{
      data: [bilan.min || 0, bilan.max || 0, Math.max(0, (bilan.total || 0) - (bilan.min || 0) - (bilan.max || 0))],
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
        labels: {
          color: '#9ca3af',
          font: { size: 11 },
          padding: 16,
        }
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
        labels: {
          color: '#9ca3af',
          font: { size: 11 },
          padding: 16,
        }
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

  const statCards = [
    { label: 'Vente minimale', value: bilan.min, icon: '↓' },
    { label: 'Vente maximale', value: bilan.max, icon: '↑' },
    { label: 'Chiffre d\'affaires', value: bilan.total, icon: '◉', accent: true },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-amber-400/60 text-xs font-medium tracking-widest uppercase mb-2">
          <span>◉</span> Bilan
        </div>
        <h2 className="text-white text-2xl font-bold tracking-tight">Tableau de bord</h2>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble des performances</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map(card => (
          <div
            key={card.label}
            className={`bg-white/[0.02] border rounded-2xl p-5 ${
              card.accent ? 'border-amber-500/20 bg-amber-500/5' : 'border-white/8'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-xs uppercase tracking-wide">{card.label}</span>
              <span className={`text-sm ${card.accent ? 'text-amber-400' : 'text-gray-500'}`}>
                {card.icon}
              </span>
            </div>
            {loading ? (
              <div className="h-7 w-24 bg-white/5 rounded animate-pulse" />
            ) : (
              <p className={`text-xl font-bold ${card.accent ? 'text-amber-400' : 'text-white'}`}>
                {(card.value || 0).toLocaleString('fr-FR')}
                <span className="text-xs font-normal text-gray-500 ml-1">Ar</span>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <span className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-6">
          {/* Bar chart - larger */}
          <div className="col-span-3 bg-white/[0.02] border border-white/8 rounded-2xl p-6">
            <h3 className="text-white text-sm font-semibold mb-1">Histogramme des montants</h3>
            <p className="text-gray-500 text-xs mb-6">Comparaison min / max / total</p>
            <Bar data={barData} options={chartOptions} />
          </div>

          {/* Pie chart */}
          <div className="col-span-2 bg-white/[0.02] border border-white/8 rounded-2xl p-6">
            <h3 className="text-white text-sm font-semibold mb-1">Répartition</h3>
            <p className="text-gray-500 text-xs mb-6">Distribution des ventes</p>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Graph;