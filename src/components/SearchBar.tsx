import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Dices } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const { recipes, addIngredient, filterState, setFilterState } = useRecipe();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState('');
  const [searchInput, setSearchInput] = useState(filterState.searchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync searchInput when filterState changes externally (e.g. reset)
  useEffect(() => {
    setSearchInput(filterState.searchQuery);
  }, [filterState.searchQuery]);

  // Debounce search update (300ms)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setFilterState((prev) => ({ ...prev, searchQuery: val }));
    }, 300);
  };

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    // Handle comma separated input like "telur, sosis, wortel"
    const items = inputVal.split(',').map((s) => s.trim()).filter(Boolean);
    items.forEach((item) => addIngredient(item));
    showToast(`Berhasil menambahkan ${items.length} bahan ke kulkas! ✨`);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRandomRecipe = () => {
    if (recipes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const selected = recipes[randomIndex];
    showToast(`🎲 Membuka resep acak: ${selected.nama}`, 'info');
    navigate(`/resep/${selected.id}`);
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

      {/* Recipe Search & Random Recipe Row */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300/70" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Cari nama resep atau bahan... (Tekan '/' untuk fokus)"
            className="w-full pl-11 pr-12 py-2.5 text-xs sm:text-sm rounded-xl bg-emerald-950/40 backdrop-blur-md border border-white/10 text-white placeholder:text-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/60 transition-all"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-emerald-300 border border-white/15">
            /
          </kbd>
        </div>

        <button
          type="button"
          onClick={handleRandomRecipe}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          title="Pilih resep acak untukmu!"
        >
          <Dices className="w-4 h-4 text-amber-400" />
          <span>Acak Resep</span>
        </button>
      </div>
    </div>
  );
};
