import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, Users, Sparkles, ChefHat, CheckCircle2, Flame } from 'lucide-react';
import { Recipe } from '../types';
import { useRecipe } from '../context/RecipeContext';
import { useInView } from '../hooks/useInView';

interface CardResepProps {
  recipe: Recipe;
  matchingCount?: number;
  totalRecipeIngredientsCount?: number;
}

export const CardResep: React.FC<CardResepProps> = ({
  recipe,
  matchingCount = 0,
  totalRecipeIngredientsCount = recipe.bahan.length,
}) => {
  const { isFavorite, toggleFavorite, userIngredients } = useRecipe();
  const favorite = isFavorite(recipe.id);
  const [cardRef, isInView] = useInView<HTMLDivElement>();

  // Calculate matching ingredients from user list
  const matchedUserIngredients = recipe.bahan.filter((reqBahan) =>
    userIngredients.some((userBahan) =>
      reqBahan.toLowerCase().includes(userBahan.toLowerCase())
    )
  );

  const matchPercentage =
    totalRecipeIngredientsCount > 0
      ? Math.round((matchedUserIngredients.length / totalRecipeIngredientsCount) * 100)
      : 0;

  return (
    <div
      ref={cardRef}
      className={`group bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:border-amber-400/50 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 text-white ${
        isInView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      
      {/* Image & Badges Banner */}
      <div className="relative aspect-16/10 overflow-hidden bg-emerald-950/60">
        <img
          src={recipe.foto}
          alt={recipe.nama}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent opacity-90"></div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(recipe);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-90 transition-all z-10 cursor-pointer"
          aria-label={favorite ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
          title={favorite ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              favorite ? 'fill-rose-500 text-rose-500' : 'text-white hover:text-rose-400'
            }`}
          />
        </button>

        {/* AI Badge or Matching Ratio Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {recipe.isAiGenerated && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-emerald-950 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
              <span>Kreasi AI</span>
            </span>
          )}

          {userIngredients.length > 0 && matchedUserIngredients.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-md border border-white/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{matchedUserIngredients.length} Bahan Cocok</span>
            </span>
          )}
        </div>

        {/* Kategori Overlay Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold tracking-wider uppercase bg-emerald-950/80 text-amber-300 backdrop-blur-md border border-white/20">
            {recipe.kategori}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
            {recipe.nama}
          </h3>

          <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 line-clamp-2 leading-relaxed">
            {recipe.deskripsi}
          </p>

          {/* Quick Stats (Duration, Difficulty, Portions, Calories) */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 mt-3 pt-3 border-t border-white/10 text-xs text-emerald-200">
            <div className="flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{recipe.durasi}m</span>
            </div>

            <div className="flex items-center gap-1 font-semibold">
              <Users className="w-3.5 h-3.5 text-emerald-300" />
              <span>{recipe.porsi} porsi</span>
            </div>

            {recipe.kalori && (
              <div className="flex items-center gap-1 font-semibold text-amber-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>~{recipe.kalori} kcal</span>
              </div>
            )}

            <div className="ml-auto">
              <span
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold capitalize border ${
                  recipe.kesulitan === 'mudah'
                    ? 'bg-emerald-900/60 text-emerald-200 border-emerald-500/40'
                    : recipe.kesulitan === 'sedang'
                    ? 'bg-amber-900/60 text-amber-200 border-amber-500/40'
                    : 'bg-rose-900/60 text-rose-200 border-rose-500/40'
                }`}
              >
                {recipe.kesulitan}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <Link
            to={`/resep/${recipe.id}`}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-700/50 hover:bg-emerald-600 border border-white/20 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-200 group-hover:bg-amber-500 group-hover:text-emerald-950 group-hover:font-extrabold shadow-md"
          >
            <ChefHat className="w-4 h-4" />
            <span>Lihat Resep Lengkap</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
