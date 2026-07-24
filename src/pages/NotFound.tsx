import React from 'react';
import { Link } from 'react-router-dom';
import { Refrigerator, Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 text-white">
      <div className="w-24 h-24 rounded-3xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md">
        <Refrigerator className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs tracking-widest uppercase border border-amber-400/30">
          Error 404 — Resep Tidak Ditemukan
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          Waduh, Kulkasnya Kosong!
        </h1>
        <p className="text-sm sm:text-base text-emerald-200/80 max-w-md mx-auto leading-relaxed">
          Halaman atau resep yang kamu cari tidak ada di dalam kulkas kami. Yuk kembali ke beranda untuk mencari resep lezat lainnya!
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          <Home className="w-4 h-4 text-emerald-950" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
};
