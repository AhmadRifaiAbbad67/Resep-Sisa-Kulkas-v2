import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecipeProvider, useRecipe } from './context/RecipeContext';
import { ToastProvider } from './context/ToastContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { DetailResep } from './pages/DetailResep';
import { Favorit } from './pages/Favorit';
import { NotFound } from './pages/NotFound';
import { ScrollToTop } from './components/ScrollToTop';
import { PwaInstallBanner } from './components/PwaInstallBanner';

function AppContent() {
  const { theme, openAiModal } = useRecipe();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div
        className={`min-h-screen flex flex-col transition-colors duration-200 font-sans selection:bg-amber-400 selection:text-emerald-950 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white'
            : 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-emerald-950'
        }`}
      >
        <Navbar onOpenAiGenerator={openAiModal} />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resep/:id" element={<DetailResep />} />
            <Route path="/favorit" element={<Favorit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />

        <PwaInstallBanner />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <RecipeProvider>
          <AppContent />
        </RecipeProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
