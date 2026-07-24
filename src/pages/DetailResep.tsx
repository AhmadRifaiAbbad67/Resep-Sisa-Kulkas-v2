import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Heart,
  Share2,
  Users,
  CheckCircle2,
  Sparkles,
  ChefHat,
  Flame,
  Utensils,
  BookOpen,
  Send,
  Leaf,
} from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { CardResep } from '../components/CardResep';

export const DetailResep: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes, isFavorite, toggleFavorite, userIngredients } = useRecipe();

  const recipe = recipes.find((r) => r.id === id);

  // Checked state for step-by-step interactive cooking
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [copiedToast, setCopiedToast] = useState(false);

  if (!recipe) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
          <ChefHat className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-slate-800 dark:text-slate-200">
          Resep Tidak Ditemukan
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
          Resep yang kamu cari tidak ada atau telah dihapus.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(recipe.id);

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 1. Share via WhatsApp Action
  const handleShareWhatsApp = () => {
    const title = `🍳 *RESEP: ${recipe.nama.toUpperCase()}*`;
    const desc = recipe.deskripsi;
    const info = `⏱ Durasi: ${recipe.durasi} menit | 👥 Porsi: ${recipe.porsi} | ⚡ Kesulitan: ${recipe.kesulitan}`;
    
    const bahanText = recipe.bahan.map((b) => `• ${b}`).join('\n');
    const langkahText = recipe.langkah.map((l, i) => `${i + 1}. ${l}`).join('\n');

    const fullMessage = `${title}\n${desc}\n\n${info}\n\n*BAHAN-BAHAN:*\n${bahanText}\n\n*LANGKAH MASAK:*\n${langkahText}\n\n_Dibuat dengan Aplikasi Resep Sisa Kulkas_ 🥬🍳`;

    const encoded = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  // Related recipes recommendation
  const relatedRecipes = recipes
    .filter((r) => r.id !== recipe.id && (r.kategori === recipe.kategori || r.kesulitan === recipe.kesulitan))
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-white">
      
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-2">
          {/* WhatsApp Share */}
          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition-all cursor-pointer active:scale-95"
            title="Bagikan ke WhatsApp"
          >
            <Send className="w-4 h-4 text-emerald-200" />
            <span>Share WA</span>
          </button>

          {/* Favorite Toggle */}
          <button
            onClick={() => toggleFavorite(recipe)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all border cursor-pointer active:scale-95 ${
              favorite
                ? 'bg-rose-500/20 text-rose-300 border-rose-400/50 backdrop-blur-md'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-400 text-rose-400' : ''}`} />
            <span>{favorite ? 'Tersimpan' : 'Simpan'}</span>
          </button>
        </div>
      </div>

      {/* Hero Recipe Header Card */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl transition-all text-white">
        
        {/* Banner Image */}
        <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden bg-emerald-950/60">
          <img
            src={recipe.foto}
            alt={recipe.nama}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />

          {/* AI Badge */}
          {recipe.isAiGenerated && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-amber-500 text-emerald-950 shadow-md">
                <Sparkles className="w-4 h-4 text-emerald-950" />
                <span>Resep Kreasi AI</span>
              </span>
            </div>
          )}

          {/* Title on Image on mobile/desktop */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="px-3 py-1 rounded-lg text-[10px] font-extrabold tracking-widest uppercase bg-amber-500 text-emerald-950 mb-2 inline-block">
              {recipe.kategori}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white drop-shadow-md">
              {recipe.nama}
            </h1>
          </div>
        </div>

        {/* Content & Metadata bar */}
        <div className="p-5 sm:p-8 space-y-6">
          
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
            {recipe.deskripsi}
          </p>

          {/* Stat Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            
            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Durasi</span>
              </div>
              <p className="font-heading font-extrabold text-base sm:text-lg text-white">
                {recipe.durasi} Mnt
              </p>
            </div>

            <div className="space-y-0.5 border-x border-white/15">
              <div className="flex items-center justify-center gap-1 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Porsi</span>
              </div>
              <p className="font-heading font-extrabold text-base sm:text-lg text-white">
                {recipe.porsi} Orang
              </p>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-rose-300 font-bold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Kesulitan</span>
              </div>
              <p className="font-heading font-extrabold text-base sm:text-lg text-white capitalize">
                {recipe.kesulitan}
              </p>
            </div>

          </div>

          {/* Main Grid: Ingredients & Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            
            {/* Ingredients Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <h3 className="font-heading font-bold text-lg text-amber-400 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-400" />
                  <span>Bahan-bahan ({recipe.bahan.length})</span>
                </h3>
              </div>

              <ul className="space-y-2.5">
                {recipe.bahan.map((item, idx) => {
                  const isUserHas = userIngredients.some((u) =>
                    item.toLowerCase().includes(u.toLowerCase())
                  );

                  return (
                    <li
                      key={idx}
                      className={`p-3 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all ${
                        isUserHas
                          ? 'bg-emerald-600/30 border-emerald-400/60 text-white backdrop-blur-md'
                          : 'bg-white/10 border-white/15 text-emerald-100 backdrop-blur-md'
                      }`}
                    >
                      {isUserHas ? (
                        <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-400/60 shrink-0" />
                      )}
                      <span className="flex-1">{item}</span>
                      {isUserHas && (
                        <span className="text-[10px] font-extrabold bg-amber-500 text-emerald-950 px-2 py-0.5 rounded-full shadow-sm">
                          Ada di Kulkas
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Anti-food waste tip callout */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-start gap-2.5 text-xs text-amber-200">
                <Leaf className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="font-bold text-white">Tips Dapur Hemat:</strong> Jika ada bumbu yang tidak lengkap, kamu bisa menggantinya dengan kecap, saus tiram, atau kaldu bubuk yang tersedia!
                </p>
              </div>
            </div>

            {/* Steps Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <h3 className="font-heading font-bold text-lg text-amber-400 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>Langkah Memasak Step-by-Step</span>
                </h3>
                <span className="text-xs text-emerald-300 font-medium">
                  Centang saat memasak
                </span>
              </div>

              <div className="space-y-3">
                {recipe.langkah.map((step, idx) => {
                  const isDone = checkedSteps[idx];

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStep(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 backdrop-blur-md ${
                        isDone
                          ? 'bg-emerald-950/40 border-white/10 opacity-50'
                          : 'bg-white/10 border-white/20 hover:border-amber-400/60 shadow-lg'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                          isDone
                            ? 'bg-amber-500 text-emerald-950'
                            : 'bg-white/20 text-white'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : idx + 1}
                      </button>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDone
                            ? 'line-through text-emerald-300/60'
                            : 'text-white font-medium'
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Related Recipes Section */}
      {relatedRecipes.length > 0 && (
        <section className="space-y-4 pt-6">
          <h3 className="font-heading font-bold text-xl text-white">
            Resep Menarik Lainnya
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRecipes.map((rel) => (
              <CardResep key={rel.id} recipe={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
