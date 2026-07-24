import React, { useState, useEffect } from 'react';
import { X, Sparkles, ChefHat, Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import { Recipe } from '../types';

import { useToast } from '../context/ToastContext';

interface AIRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIRecipeModal: React.FC<AIRecipeModalProps> = ({ isOpen, onClose }) => {
  const { userIngredients, addAiRecipe, toggleFavorite } = useRecipe();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [extraNotes, setExtraNotes] = useState('');
  const [loadingMode, setLoadingMode] = useState<'none' | 'json' | 'stream'>('none');
  const [errorMessage, setErrorMessage] = useState('');
  const [streamText, setStreamText] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      setStreamText('');
      setGeneratedRecipe(null);
      setLoadingMode('none');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 1. Generate Structured JSON Recipe
  const handleGenerateJson = async () => {
    if (userIngredients.length === 0) {
      setErrorMessage('Masukkan minimal 1 bahan sisa kulkas di halaman utama terlebih dahulu.');
      return;
    }

    setLoadingMode('json');
    setErrorMessage('');
    setGeneratedRecipe(null);

    try {
      const res = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: userIngredients, extraNotes }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal membuat resep AI.');
      }

      setGeneratedRecipe(data.recipe);
      addAiRecipe(data.recipe);
      showToast('Resep AI berhasil dibuat! ✨');
    } catch (err: any) {
      const msg = err.message || 'Terjadi kesalahan saat menghubungkan ke Koki AI.';
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setLoadingMode('none');
    }
  };

  // 2. Real-time Streaming Recipe using SSE
  const handleStreamRecipe = () => {
    if (userIngredients.length === 0) {
      setErrorMessage('Masukkan minimal 1 bahan sisa kulkas terlebih dahulu.');
      return;
    }

    setLoadingMode('stream');
    setErrorMessage('');
    setStreamText('');
    setGeneratedRecipe(null);

    const params = new URLSearchParams({
      ingredients: userIngredients.join(','),
    });

    const eventSource = new EventSource(`/api/stream-recipe?${params.toString()}`);

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.done) {
          eventSource.close();
          setLoadingMode('none');
        } else if (parsed.text) {
          setStreamText((prev) => prev + parsed.text);
        } else if (parsed.error) {
          setErrorMessage(parsed.error);
          eventSource.close();
          setLoadingMode('none');
        }
      } catch (e) {
        showToast('Terjadi kesalahan memproses data SSE.', 'error');
      }
    };

    eventSource.onerror = () => {
      showToast('Koneksi streaming terputus.', 'error');
      eventSource.close();
      setLoadingMode('none');
    };
  };

  const handleOpenDetail = (recipe: Recipe) => {
    onClose();
    navigate(`/resep/${recipe.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md animate-fade-in text-white">
      <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20 flex flex-col">
        
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md text-white p-5 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                Koki AI Resep Sisa Kulkas
              </h2>
              <p className="text-xs text-emerald-200/90">
                Generator resep real-time berbasis Google Gemini 2.5 Flash
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-emerald-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* User Ingredients Summary */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-heading">
              Bahan di Kulkasmu Saat Ini:
            </label>
            <div className="flex flex-wrap gap-1.5 p-3.5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md">
              {userIngredients.length === 0 ? (
                <span className="text-xs text-rose-300 font-medium">
                  Belum ada bahan. Tambahkan bahan di halaman utama!
                </span>
              ) : (
                userIngredients.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/60 text-white text-xs font-semibold shadow-sm"
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Extra Custom Prompt Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 font-heading">
              Catatan Khusus (Opsional):
            </label>
            <input
              type="text"
              value={extraNotes}
              onChange={(e) => setExtraNotes(e.target.value)}
              placeholder="Contoh: Buat pedas manis, kuah hangat, tanpa santan, 15 menit..."
              className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-emerald-950/60 backdrop-blur-md border border-white/20 text-white placeholder:text-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex items-start gap-2.5 text-rose-200 text-xs backdrop-blur-md">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleGenerateJson}
              disabled={loadingMode !== 'none' || userIngredients.length === 0}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer border border-white/20"
            >
              {loadingMode === 'json' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Meracik Resep Lengkap...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Buat Resep Terstruktur</span>
                </>
              )}
            </button>

            <button
              onClick={handleStreamRecipe}
              disabled={loadingMode !== 'none' || userIngredients.length === 0}
              className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-emerald-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              {loadingMode === 'stream' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
                  <span>Streaming Resep AI...</span>
                </>
              ) : (
                <>
                  <ChefHat className="w-4 h-4 text-emerald-950" />
                  <span>Live Streaming Resep</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Structured Recipe Output */}
          {generatedRecipe && (
            <div className="p-4.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 space-y-3 animate-fade-in shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> Resep AI Berhasil Diciptakan!
                </span>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-amber-500 text-emerald-950">
                  {generatedRecipe.durasi} Mnt | {generatedRecipe.porsi} Porsi
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                {generatedRecipe.nama}
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {generatedRecipe.deskripsi}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleOpenDetail(generatedRecipe)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Buka Langkah Masak</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleFavorite(generatedRecipe)}
                  className="py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
                >
                  Simpan ke Favorit ❤️
                </button>
              </div>
            </div>
          )}

          {/* Stream Output Text View */}
          {(streamText || loadingMode === 'stream') && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 text-emerald-200 font-mono text-xs leading-relaxed max-h-72 overflow-y-auto space-y-2 border border-white/15 backdrop-blur-md">
              <div className="flex items-center justify-between text-emerald-300/80 pb-2 border-b border-white/10">
                <span className="font-bold flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" /> AI Streaming Response
                </span>
                {loadingMode === 'stream' && (
                  <span className="animate-pulse text-amber-300 font-bold">Menulis resep...</span>
                )}
              </div>
              <pre className="whitespace-pre-wrap font-sans text-white text-xs sm:text-sm">
                {streamText || 'Menyiapkan rekomendasi masakan terbaik...'}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white/5 backdrop-blur-md border-t border-white/15 flex items-center justify-between text-xs text-emerald-200">
          <span>Resep AI otomatis tersimpan di sesi aplikasi ini.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
