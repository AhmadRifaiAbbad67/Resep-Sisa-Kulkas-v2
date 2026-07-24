import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Heart,
  Users,
  CheckCircle2,
  Sparkles,
  ChefHat,
  Flame,
  Utensils,
  BookOpen,
  Send,
  Leaf,
  Copy,
  Printer,
  ChevronRight,
  Home,
} from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { useToast } from '../context/ToastContext';
import { CardResep } from '../components/CardResep';
import { CookingTimer } from '../components/CookingTimer';

export const DetailResep: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes, isFavorite, toggleFavorite, userIngredients } = useRecipe();
  const { showToast } = useToast();

  const recipe = recipes.find((r) => r.id === id);

  // Checked state for step-by-step interactive cooking
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  if (!recipe) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center space-y-4 text-white">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-amber-300">
          <ChefHat className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-white">
          Resep Tidak Ditemukan
        </h2>
        <p className="text-sm text-emerald-200/80 max-w-md">
          Resep yang kamu cari tidak ada atau telah dihapus.
        </p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold rounded-xl text-sm transition-all shadow-lg active:scale-95"
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

  const handleToggleFavorite = () => {
    toggleFavorite(recipe);
    if (favorite) {
      showToast('Resep dihapus dari favorit', 'info');
    } else {
      showToast('Resep disimpan ke favorit! ❤️');
    }
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

  // 2. Copy Recipe Text to Clipboard
  const handleCopyRecipe = () => {
    const text = `🍳 ${recipe.nama}\n\n${recipe.deskripsi}\n\nDurasi: ${recipe.durasi} Mnt | Porsi: ${recipe.porsi} Orang\n\nBAHAN-BAHAN:\n${recipe.bahan.map(b => `- ${b}`).join('\n')}\n\nLANGKAH MASAK:\n${recipe.langkah.map((l, i) => `${i + 1}. ${l}`).join('\n')}`;
    
    navigator.clipboard.writeText(text);
    showToast('Teks resep berhasil disalin ke clipboard! 📋');
  };

  // 3. Print Recipe
  const handlePrint = () => {
    window.print();
  };

  // Related recipes recommendation
  const relatedRecipes = recipes
    .filter((r) => r.id !== recipe.id && (r.kategori === recipe.kategori || r.kesulitan === recipe.kesulitan))
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-white">
      
      {/* Breadcrumb Navigation Bar */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200/80 font-medium no-print">
        <Link to="/" className="hover:text-amber-300 flex items-center gap-1 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Beranda</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-emerald-400/50" />
        <span className="capitalize text-emerald-300 font-semibold">{recipe.kategori}</span>
        <ChevronRight className="w-3.5 h-3.5 text-emerald-400/50" />
        <span className="text-white font-bold truncate max-w-[150px] sm:max-w-xs">{recipe.nama}</span>
      </nav>

      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Recipe */}
          <button
            onClick={handleCopyRecipe}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
            title="Salin Teks Resep"
          >
            <Copy className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Salin</span>
          </button>

          {/* Print Recipe */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
            title="Cetak Resep"
          >
            <Printer className="w-4 h-4 text-emerald-300" />
            <span className="hidden sm:inline">Cetak</span>
          </button>

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
            onClick={handleToggleFavorite}
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

      {/* Printable Area Card */}
      <div className="print-area bg-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl transition-all text-white">
        
        {/* Banner Image */}
        <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden bg-emerald-950/60 no-print">
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
          
          <div className="space-y-2">
            <h1 className="hidden print:block font-heading font-black text-3xl text-black border-b border-gray-300 pb-2">
              {recipe.nama} ({recipe.kategori})
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 print:text-black leading-relaxed font-medium">
              {recipe.deskripsi}
            </p>
          </div>

          {/* Stat Badges */}
          <div className={`grid ${recipe.kalori ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'} gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center print:bg-gray-100 print:text-black print:border-gray-300`}>
            
            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-amber-400 print:text-black font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Durasi</span>
              </div>
              <p className="font-heading font-extrabold text-base sm:text-lg text-white print:text-black">
                {recipe.durasi} Mnt
              </p>
            </div>

            <div className="space-y-0.5 border-x border-white/15 print:border-gray-300">
              <div className="flex items-center justify-center gap-1 text-emerald-300 print:text-black font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Porsi</span>
              </div>
              <p className="font-heading font-extrabold text-base sm:text-lg text-white print:text-black">
                {recipe.porsi} Orang
              </p>
            </div>

            <div className={`space-y-0.5 ${recipe.kalori ? 'border-r border-white/15 sm:border-r-0' : ''} print:border-gray-300`}>
              <div className="flex items-center justify-center gap-1 text-rose-300 print:text-black font-bold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Kesulitan</span>
              </div>
              <p className="font-heading font-extrabold text-base sm:text-lg text-white print:text-black capitalize">
                {recipe.kesulitan}
              </p>
            </div>

            {recipe.kalori && (
              <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-0 print:border-gray-300">
                <div className="flex items-center justify-center gap-1 text-amber-300 print:text-black font-bold text-xs uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Kalori</span>
                </div>
                <p className="font-heading font-extrabold text-base sm:text-lg text-amber-300 print:text-black">
                  ~{recipe.kalori} kkal
                </p>
              </div>
            )}

          </div>

          {/* Main Grid: Ingredients & Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            
            {/* Ingredients Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 print:border-gray-300 pb-2">
                <h3 className="font-heading font-bold text-lg text-amber-400 print:text-black flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-400 print:text-black" />
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
                      className={`p-3 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all print:bg-white print:text-black print:border-gray-300 ${
                        isUserHas
                          ? 'bg-emerald-600/30 border-emerald-400/60 text-white backdrop-blur-md'
                          : 'bg-white/10 border-white/15 text-emerald-100 backdrop-blur-md'
                      }`}
                    >
                      {isUserHas ? (
                        <CheckCircle2 className="w-4 h-4 text-amber-300 print:text-black shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-400/60 print:bg-black shrink-0" />
                      )}
                      <span className="flex-1">{item}</span>
                      {isUserHas && (
                        <span className="text-[10px] font-extrabold bg-amber-500 text-emerald-950 px-2 py-0.5 rounded-full shadow-sm no-print">
                          Ada di Kulkas
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Anti-food waste tip callout */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-start gap-2.5 text-xs text-amber-200 print:bg-gray-100 print:text-black print:border-gray-300 no-print">
                <Leaf className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="font-bold text-white print:text-black">Tips Dapur Hemat:</strong> Jika ada bumbu yang tidak lengkap, kamu bisa menggantinya dengan kecap, saus tiram, atau kaldu bubuk yang tersedia!
                </p>
              </div>
            </div>

            {/* Steps Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 print:border-gray-300 pb-2">
                <h3 className="font-heading font-bold text-lg text-amber-400 print:text-black flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400 print:text-black" />
                  <span>Langkah Memasak Step-by-Step</span>
                </h3>
                <span className="text-xs text-emerald-300 font-medium no-print">
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
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 backdrop-blur-md print:bg-white print:text-black print:border-gray-300 ${
                        isDone
                          ? 'bg-emerald-950/40 border-white/10 opacity-50'
                          : 'bg-white/10 border-white/20 hover:border-amber-400/60 shadow-lg'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors print:bg-black print:text-white ${
                          isDone
                            ? 'bg-amber-500 text-emerald-950'
                            : 'bg-white/20 text-white'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : idx + 1}
                      </button>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed print:text-black ${
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

      {/* Cooking Timer Tool */}
      <CookingTimer />

      {/* Related Recipes Section */}
      {relatedRecipes.length > 0 && (
        <section className="space-y-4 pt-6 no-print">
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
