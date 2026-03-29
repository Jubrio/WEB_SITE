function Foot() {
  return (
    <footer className="border-t border-white/5 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <p className="text-gray-600 text-xs tracking-widest uppercase">
          © 2026 — Gestion Vente
        </p>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
          <span className="text-gray-600 text-xs">Système actif</span>
        </div>
      </div>
    </footer>
  );
}

export default Foot;