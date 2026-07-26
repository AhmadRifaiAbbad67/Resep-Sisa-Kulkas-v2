import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Heart, Moon, Sun, Sparkles, Refrigerator } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';

interface NavbarProps {
  onOpenAiGenerator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiGenerator }) => {
  const { favorites, theme, toggleTheme, openAiModal } = useRecipe();
  const location = useLocation();

  const handleOpenAi = onOpenAiGenerator || openAiModal;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/10 backdrop-blur-xl text-white shadow-2xl border-b border-white/20 transition-all no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Refrigerator className="w-6 h-6 text-emerald-950" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1.5">
                Resep Sisa Kulkas
              </span>
              <span className="text-[11px] text-emerald-200 block -mt-1 font-medium">
                Cegah Food Waste, Masak Lezat
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="flex items-center gap-2 sm:gap-3">
            {/* AI Generator Button */}
            <button
              onClick={handleOpenAi}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-950 animate-pulse" />
              <span>Koki AI</span>
            </button>

            {/* Home Link */}
            <Link
              to="/"
              className={`px-3.5 py-1.5 rounded-xl font-medium text-sm flex items-center gap-1.5 transition-all ${
                isActive('/')
                  ? 'bg-emerald-600/80 text-white font-bold shadow-inner border border-white/20'
                  : 'text-emerald-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              <span className="hidden md:inline">Beranda</span>
            </Link>

            {/* Favorites Link */}
            <Link
              to="/favorit"
              className={`px-3.5 py-1.5 rounded-xl font-medium text-sm flex items-center gap-1.5 transition-all relative ${
                isActive('/favorit')
                  ? 'bg-emerald-600/80 text-white font-bold shadow-inner border border-white/20'
                  : 'text-emerald-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span className="hidden md:inline">Favorit</span>
              {favorites.length > 0 && (
                <span className="bg-amber-400 text-emerald-950 font-bold text-[11px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-xl text-emerald-100 hover:bg-white/10 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-300" />
              ) : (
                <Moon className="w-5 h-5 text-emerald-100" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
