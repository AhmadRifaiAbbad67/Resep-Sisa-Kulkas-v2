import React, { useMemo, useState, useEffect } from 'react';
import { ChefHat, Sparkles, AlertCircle, RotateCcw } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { SearchBar } from '../components/SearchBar';
import { TagBahan } from '../components/TagBahan';
import { FilterBar } from '../components/FilterBar';
import { CardResep } from '../components/CardResep';
import { CardSkeleton } from '../components/CardSkeleton';
import { AIRecipeModal } from '../components/AIRecipeModal';
import { FoodWasteCounter } from '../components/FoodWasteCounter';

export const Home: React.FC = () => {
  const { recipes, userIngredients, filterState, resetFilters } = useRecipe();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'match_only'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Trigger brief skeleton loading effect on filter/search change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [filterState, userIngredients, activeTab]);

  // Compute matches and filter recipes
  const processedRecipes = useMemo(() => {
    return recipes
      .map((recipe) => {
        // Calculate matched ingredients count
        const matched = recipe.bahan.filter((reqBahan) =>
          userIngredients.some((userBahan) =>
            reqBahan.toLowerCase().includes(userBahan.toLowerCase())
          )
        );

        return {
          recipe,
          matchingCount: matched.length,
          totalCount: recipe.bahan.length,
          matchRatio: recipe.bahan.length > 0 ? matched.length / recipe.bahan.length : 0,
        };
      })
      .filter(({ recipe, matchingCount }) => {
        // Tab filter: if match_only is selected, must have at least 1 ingredient match
        if (activeTab === 'match_only' && matchingCount === 0 && userIngredients.length > 0) {
          return false;
        }

        // Search query (Search name, description, category, and ingredient list)
        if (filterState.searchQuery) {
          const q = filterState.searchQuery.toLowerCase();
          const matchesName = recipe.nama.toLowerCase().includes(q);
          const matchesDesc = recipe.deskripsi.toLowerCase().includes(q);
          const matchesCategory = recipe.kategori.toLowerCase().includes(q);
          const matchesIngredients = recipe.bahan.some((b) => b.toLowerCase().includes(q));

          if (!matchesName && !matchesDesc && !matchesCategory && !matchesIngredients) {
            return false;
          }
        }

        // Max Duration
        if (filterState.maxDurasi !== null && recipe.durasi > filterState.maxDurasi) {
          return false;
        }

        // Difficulty
        if (filterState.kesulitan !== 'semua' && recipe.kesulitan !== filterState.kesulitan) {
          return false;
        }

        // Kategori
        if (filterState.kategori !== 'semua' && recipe.kategori !== filterState.kategori) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'durasi') {
          return a.recipe.durasi - b.recipe.durasi;
        }
        if (filterState.sortBy === 'porsi') {
          return b.recipe.porsi - a.recipe.porsi;
        }
        // Default: match ratio then matching count
        if (b.matchingCount !== a.matchingCount) {
          return b.matchingCount - a.matchingCount;
        }
        return b.matchRatio - a.matchRatio;
      });
  }, [recipes, userIngredients, filterState, activeTab]);

  return (
    <div className="min-h-screen flex flex-col space-y-8 pb-12 text-white">
      
      {/* Hero Banner Header */}
      <section className="relative overflow-hidden bg-white/10 backdrop-blur-2xl text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 rounded-b-3xl sm:rounded-b-[2.5rem] shadow-2xl border-b border-white/20">
        
        {/* Background Subtle Shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs sm:text-sm font-bold backdrop-blur-md shadow-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Solusi Cerdas & Hemat Cegah Food Waste</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white drop-shadow-md">
            Punya Bahan Sisa di Kulkas? <br className="hidden sm:inline" />
            <span className="text-amber-300 underline decoration-amber-400/50 decoration-wavy">
              Ubah Jadi Masakan Lezat!
            </span>
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Ketik atau pilih bahan makanan yang tersisa di kulkasmu. Kami akan mencarikan resep masakan yang paling cocok, cepat, dan ekonomis!
          </p>

          {/* Action trigger button */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all duration-200 flex items-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-emerald-950 animate-bounce" />
              <span>Minta Koki AI Buatkan Resep Baru</span>
            </button>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full -mt-10 relative z-20">
        
        {/* Ingredient Search & Selection Module */}
        <section className="space-y-4">
          <SearchBar />
          <TagBahan onOpenAiGenerator={() => setIsAiModalOpen(true)} />
        </section>

        {/* Impact Counter Widget */}
        <section>
          <FoodWasteCounter />
        </section>

        {/* Filters & Sorting */}
        <section>
          <FilterBar />
        </section>

        {/* Recipe List Header & Tab Switcher */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
            
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-amber-400" />
                <span>Bisa Masak Apa Hari Ini?</span>
                <span className="text-xs bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-0.5 rounded-full font-bold">
                  {processedRecipes.length} Resep
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 font-medium">
                {userIngredients.length > 0
                  ? `Ditemukan berdasarkan bahanmu (${userIngredients.join(', ')})`
                  : 'Menampilkan seluruh resep pilihan kulkas'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-2xl self-start sm:self-auto text-xs font-bold">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-amber-500 text-emerald-950 shadow-md font-extrabold'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                Semua Resep ({recipes.length})
              </button>
              <button
                onClick={() => setActiveTab('match_only')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'match_only'
                    ? 'bg-amber-500 text-emerald-950 shadow-md font-extrabold'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                Hanya Cocok Bahan ({
                  recipes.filter((r) =>
                    r.bahan.some((b) =>
                      userIngredients.some((u) => b.toLowerCase().includes(u.toLowerCase()))
                    )
                  ).length
                })
              </button>
            </div>

          </div>

          {/* Recipe Grid */}
          {isLoading ? (
            <CardSkeleton count={6} />
          ) : processedRecipes.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 text-center border border-white/20 space-y-4 max-w-xl mx-auto shadow-2xl text-white">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-lg text-white">
                  Tidak Ada Resep yang Sesuai Filter
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                  Coba atur ulang filter, kurangi kata pencarian, atau minta Koki AI kami untuk membuatkan resep kustom dari bahanmu!
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-amber-300" />
                  <span>Reset Filter</span>
                </button>

                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-950" />
                  <span>Minta AI Buatkan Resep Baru</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedRecipes.map(({ recipe, matchingCount, totalCount }) => (
                <CardResep
                  key={recipe.id}
                  recipe={recipe}
                  matchingCount={matchingCount}
                  totalRecipeIngredientsCount={totalCount}
                />
              ))}
            </div>
          )}

        </section>

      </main>

      {/* AI Recipe Generator Modal */}
      <AIRecipeModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

    </div>
  );
};
