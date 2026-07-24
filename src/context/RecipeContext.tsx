import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe, FilterState } from '../types';
import { INITIAL_RECIPES } from '../data/recipes';

interface RecipeContextType {
  recipes: Recipe[];
  userIngredients: string[];
  favorites: Recipe[];
  theme: 'light' | 'dark';
  filterState: FilterState;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  clearIngredients: () => void;
  toggleFavorite: (recipe: Recipe) => void;
  isFavorite: (id: string) => boolean;
  toggleTheme: () => void;
  addAiRecipe: (recipe: Recipe) => void;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  maxDurasi: null,
  kesulitan: 'semua',
  kategori: 'semua',
  searchQuery: '',
  sortBy: 'match',
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. User ingredients state
  const [userIngredients, setUserIngredients] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sisa_kulkas_ingredients');
      return saved ? JSON.parse(saved) : ['Nasi', 'Telur'];
    } catch {
      return ['Nasi', 'Telur'];
    }
  });

  // 2. Favorites state
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem('sisa_kulkas_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. AI Recipes generated in session or stored
  const [aiRecipes, setAiRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem('sisa_kulkas_ai_recipes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Dark mode state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('sisa_kulkas_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  });

  // 5. Filter state
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);

  // Sync ingredients to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sisa_kulkas_ingredients', JSON.stringify(userIngredients));
    } catch (e) {
      console.error('Failed to save ingredients to localStorage', e);
    }
  }, [userIngredients]);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sisa_kulkas_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Sync AI recipes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sisa_kulkas_ai_recipes', JSON.stringify(aiRecipes));
    } catch (e) {
      console.error('Failed to save AI recipes', e);
    }
  }, [aiRecipes]);

  // Sync theme to document html & localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sisa_kulkas_theme', theme);
  }, [theme]);

  // All recipes = static initial + AI generated recipes
  const recipes = [...INITIAL_RECIPES, ...aiRecipes];

  const addIngredient = (ingredient: string) => {
    const trimmed = ingredient.trim();
    if (!trimmed) return;
    setUserIngredients((prev) => {
      // Avoid duplicate case-insensitive
      const exists = prev.some((i) => i.toLowerCase() === trimmed.toLowerCase());
      if (exists) return prev;
      return [...prev, trimmed];
    });
  };

  const removeIngredient = (ingredient: string) => {
    setUserIngredients((prev) => prev.filter((i) => i.toLowerCase() !== ingredient.toLowerCase()));
  };

  const clearIngredients = () => {
    setUserIngredients([]);
  };

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      if (exists) {
        return prev.filter((r) => r.id !== recipe.id);
      } else {
        return [recipe, ...prev];
      }
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some((r) => r.id === id);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addAiRecipe = (newRecipe: Recipe) => {
    setAiRecipes((prev) => [newRecipe, ...prev]);
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        userIngredients,
        favorites,
        theme,
        filterState,
        addIngredient,
        removeIngredient,
        clearIngredients,
        toggleFavorite,
        isFavorite,
        toggleTheme,
        addAiRecipe,
        setFilterState,
        resetFilters,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};
