import React, { useState } from 'react';
import { Plus, Search, Sparkles } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';

export const SearchBar: React.FC = () => {
  const { addIngredient, filterState, setFilterState } = useRecipe();
  const [inputVal, setInputVal] = useState('');

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    // Handle comma separated input like "telur, sosis, wortel"
    const items = inputVal.split(',').map((s) => s.trim()).filter(Boolean);
    items.forEach((item) => addIngredient(item));
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Ingredient Addition Box */}
      <form onSubmit={handleAdd} className="relative flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik bahan sisa kulkas (contoh: telur, sosis, wortel)..."
            className="w-full pl-4 pr-28 py-3.5 sm:py-4 text-sm sm:text-base rounded-2xl bg-emerald-950/60 backdrop-blur-xl border border-white/20 text-white placeholder:text-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xl transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>TAMBAH</span>
          </button>
        </div>
      </form>

      {/* Recipe Name Search Query */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300/70" />
        <input
          type="text"
          value={filterState.searchQuery}
          onChange={(e) => setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))}
          placeholder="Cari resep favoritmu..."
          className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-emerald-950/40 backdrop-blur-md border border-white/10 text-white placeholder:text-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/60 transition-all"
        />
      </div>
    </div>
  );
};
