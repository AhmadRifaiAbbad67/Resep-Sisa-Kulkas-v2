import React from 'react';
import { Clock, Flame, Utensils, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { Kesulitan, Kategori } from '../types';

export const FilterBar: React.FC = () => {
  const { filterState, setFilterState, resetFilters } = useRecipe();

  const isFiltered =
    filterState.maxDurasi !== null ||
    filterState.kesulitan !== 'semua' ||
    filterState.kategori !== 'semua' ||
    filterState.searchQuery !== '';

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20 transition-all text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/15">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-widest text-amber-400">
            Filter Masak & Urutan
          </span>
        </div>

        {isFiltered && (
          <button
            onClick={resetFilters}
            className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
        
        {/* 1. Durasi Masak */}
        <div>
          <label className="block text-xs font-semibold text-emerald-300 mb-1.5 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Maksimal Durasi:</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[null, 15, 30, 60].map((mins) => (
              <button
                key={mins === null ? 'semua' : mins}
                onClick={() => setFilterState((prev) => ({ ...prev, maxDurasi: mins }))}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filterState.maxDurasi === mins
                    ? 'bg-amber-500 text-emerald-950 shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                {mins === null ? 'Semua' : `≤ ${mins} mnt`}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Kesulitan */}
        <div>
          <label className="block text-xs font-semibold text-emerald-300 mb-1.5 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Tingkat Kesulitan:</span>
          </label>
          <select
            value={filterState.kesulitan}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, kesulitan: e.target.value as 'semua' | Kesulitan }))
            }
            className="w-full px-3.5 py-2 rounded-xl bg-emerald-950/60 backdrop-blur-md border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80 font-medium cursor-pointer"
          >
            <option value="semua" className="bg-slate-900 text-white">Semua Tingkatan</option>
            <option value="mudah" className="bg-slate-900 text-white">Mudah</option>
            <option value="sedang" className="bg-slate-900 text-white">Sedang</option>
            <option value="sulit" className="bg-slate-900 text-white">Sulit</option>
          </select>
        </div>

        {/* 3. Kategori Masakan */}
        <div>
          <label className="block text-xs font-semibold text-emerald-300 mb-1.5 flex items-center gap-1">
            <Utensils className="w-3.5 h-3.5 text-emerald-400" />
            <span>Jenis Masakan:</span>
          </label>
          <select
            value={filterState.kategori}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, kategori: e.target.value as 'semua' | Kategori }))
            }
            className="w-full px-3.5 py-2 rounded-xl bg-emerald-950/60 backdrop-blur-md border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80 font-medium cursor-pointer"
          >
            <option value="semua" className="bg-slate-900 text-white">Semua Kategori</option>
            <option value="goreng" className="bg-slate-900 text-white">Goreng</option>
            <option value="tumis" className="bg-slate-900 text-white">Tumis</option>
            <option value="rebus" className="bg-slate-900 text-white">Rebus/Sup</option>
            <option value="kukus" className="bg-slate-900 text-white">Kukus</option>
            <option value="panggang" className="bg-slate-900 text-white">Panggang</option>
          </select>
        </div>

        {/* 4. Urutkan */}
        <div>
          <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
            Urutkan Berdasarkan:
          </label>
          <select
            value={filterState.sortBy}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, sortBy: e.target.value as 'match' | 'durasi' | 'porsi' }))
            }
            className="w-full px-3.5 py-2 rounded-xl bg-emerald-950/60 backdrop-blur-md border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/80 font-medium cursor-pointer"
          >
            <option value="match" className="bg-slate-900 text-white">Kecocokan Bahan Terbaik</option>
            <option value="durasi" className="bg-slate-900 text-white">Durasi Masak Tercepat</option>
            <option value="porsi" className="bg-slate-900 text-white">Porsi Terbanyak</option>
          </select>
        </div>

      </div>
    </div>
  );
};
