import React, { useState } from 'react';
import { Heart, Trash2, Search, ChefHat, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import { CardResep } from '../components/CardResep';

export const Favorit: React.FC = () => {
  const { favorites, toggleFavorite } = useRecipe();
  const [search, setSearch] = useState('');

  const filteredFavorites = favorites.filter((r) =>
    r.nama.toLowerCase().includes(search.toLowerCase()) ||
    r.deskripsi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>Koleksi Resep Tersimpan</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            Resep Favorit Saya ({favorites.length})
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 font-medium">
            Daftar resep favorit yang kamu simpan untuk dimasak kapan saja!
          </p>
        </div>

        <Link
          to="/"
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <ChefHat className="w-4 h-4 text-emerald-950" />
          <span>Jelajahi Resep Lain</span>
        </Link>
      </div>

      {/* Main Body */}
      {favorites.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 text-center border border-white/20 space-y-4 max-w-lg mx-auto shadow-2xl text-white">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-400/30 text-rose-300 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 fill-rose-300" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-lg text-white">
              Belum Ada Resep Favorit
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Klik ikon hati ❤️ pada kartu resep di beranda untuk menyimpannya di sini.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Jelajahi Resep Beranda</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Search inside favorites */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300/70" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari dalam resep favoritmu..."
              className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-emerald-950/60 backdrop-blur-md border border-white/20 text-white placeholder:text-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xl transition-all"
            />
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((recipe) => (
              <CardResep key={recipe.id} recipe={recipe} />
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
