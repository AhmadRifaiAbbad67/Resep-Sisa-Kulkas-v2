import React from 'react';
import { Heart, Refrigerator, ShieldCheck, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white/10 backdrop-blur-2xl text-white border-t border-white/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
                <Refrigerator className="w-5 h-5 text-emerald-950" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white">
                Resep Sisa Kulkas
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed font-medium">
              Platform pembantu dapur terdepan untuk mengurangi food waste (sampah makanan). Olah sisa bahan makanan di kulkasmu menjadi hidangan lezat dan bernutrisi tinggi.
            </p>
          </div>

          {/* Col 2: Tips Hemat & Bebas Sampah */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-amber-400" />
              <span>Tips Dapur Cerdas</span>
            </h4>
            <ul className="text-xs text-emerald-200/80 space-y-2 font-medium">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>Simpan sayur hijau dilapisi tisu kering agar tahan lebih dari 1 minggu.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>Nasi dingin semalam memiliki indeks glikemik lebih rendah dan ideal untuk Nasi Goreng.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>Potongan ayam sisa bisa disuwir untuk isian sup, capcay, atau nasi gila.</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Navigasi Penting</span>
            </h4>
            <div className="flex flex-col gap-2 text-xs font-semibold">
              <Link to="/" className="text-emerald-200/90 hover:text-amber-300 transition-colors">
                Cari Resep Berdasarkan Bahan
              </Link>
              <Link to="/favorit" className="text-emerald-200/90 hover:text-amber-300 transition-colors">
                Daftar Resep Favorit Saya
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/80 gap-3">
          <p>© {new Date().getFullYear()} Resep Sisa Kulkas. Dibuat dengan cinta untuk dapur Indonesia.</p>
          <div className="flex items-center gap-1 text-emerald-200 font-medium">
            <span>Diracik dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>React 19 & Google Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
