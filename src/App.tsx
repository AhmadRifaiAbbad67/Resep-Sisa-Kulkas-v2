import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { DetailResep } from './pages/DetailResep';
import { Favorit } from './pages/Favorit';
import { NotFound } from './pages/NotFound';
import { AIRecipeModal } from './components/AIRecipeModal';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <ToastProvider>
      <RecipeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white transition-colors duration-200 font-sans selection:bg-amber-400 selection:text-emerald-950">
            
            <Navbar onOpenAiGenerator={() => setIsAiModalOpen(true)} />

            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resep/:id" element={<DetailResep />} />
                <Route path="/favorit" element={<Favorit />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

            <Footer />

            <AIRecipeModal
              isOpen={isAiModalOpen}
              onClose={() => setIsAiModalOpen(false)}
            />

          </div>
        </BrowserRouter>
      </RecipeProvider>
    </ToastProvider>
  );
}
