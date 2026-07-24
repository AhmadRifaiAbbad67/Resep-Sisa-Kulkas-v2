import React from 'react';
import { X, Plus, Trash2, Sparkles } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { useToast } from '../context/ToastContext';
import { POPULAR_INGREDIENTS } from '../data/recipes';

interface TagBahanProps {
  onOpenAiGenerator?: () => void;
}

export const TagBahan: React.FC<TagBahanProps> = ({ onOpenAiGenerator }) => {
  const { userIngredients, removeIngredient, addIngredient, clearIngredients } = useRecipe();
  const { showToast } = useToast();

  const handleClear = () => {
    clearIngredients();
    showToast('Isi kulkas dibersihkan', 'info');
  };

  const handleToggle = (item: string) => {
    const isAdded = userIngredients.some((i) => i.toLowerCase() === item.toLowerCase());
    if (isAdded) {
      removeIngredient(item);
      showToast(`Menghapus ${item} dari kulkas`, 'info');
    } else {
      addIngredient(item);
      showToast(`Menambahkan ${item} ke kulkas ✨`);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20 transition-all text-white">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400 font-heading">
            Isi Kulkas Kamu ({userIngredients.length})
          </h3>
        </div>

        {userIngredients.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs text-rose-300 hover:text-rose-100 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Semua</span>
          </button>
        )}
      </div>

      {/* Selected Ingredient Chips */}
      {userIngredients.length === 0 ? (
        <div className="p-4 rounded-2xl border border-dashed border-white/20 text-center bg-white/5 my-2">
          <p className="text-xs sm:text-sm text-emerald-200/90 font-medium">
            Kulkasmu masih kosong. Ketik atau klik opsi bahan populer di bawah untuk mulai mencari resep!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mb-4">
          {userIngredients.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-700/80 text-white border border-emerald-500/60 shadow-sm backdrop-blur-md transition-all hover:bg-emerald-600"
            >
              <span>{item}</span>
              <button
                onClick={() => {
                  removeIngredient(item);
                  showToast(`Menghapus ${item}`, 'info');
                }}
                className="hover:text-amber-400 rounded-full p-0.5 text-emerald-200 transition-colors cursor-pointer"
                title={`Hapus ${item}`}
                aria-label={`Hapus ${item}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Popular Suggestions Bar */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs font-semibold text-emerald-300 mb-2.5 uppercase tracking-wider">
          Pilih Cepat Bahan Populer:
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {POPULAR_INGREDIENTS.map((item) => {
            const isAdded = userIngredients.some((i) => i.toLowerCase() === item.toLowerCase());
            return (
              <button
                key={item}
                onClick={() => handleToggle(item)}
                className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-amber-500 text-emerald-950 font-extrabold shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/10'
                }`}
              >
                {isAdded ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3 text-amber-300" />}
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Callout Bar */}
      {onOpenAiGenerator && (
        <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3 text-white text-xs sm:text-sm">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <span className="font-extrabold text-white text-sm">Punya bahan unik lainnya?</span>
              <p className="text-xs text-emerald-200/90">
                Gunakan Koki AI untuk buatkan resep kustom dari bahan apa saja di kulkasmu!
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAiGenerator}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-950" />
            <span>Racik resep AI</span>
          </button>
        </div>
      )}
    </div>
  );
};
