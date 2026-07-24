import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 p-4 bg-emerald-900/90 backdrop-blur-xl border border-amber-400/40 rounded-2xl shadow-2xl text-white flex items-center justify-between gap-3 no-print">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-emerald-950 font-black flex items-center justify-center shrink-0">
          <Download className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-xs sm:text-sm text-amber-300">
            Install Aplikasi Resep
          </h4>
          <p className="text-[11px] text-emerald-100">
            Akses cepat tanpa kuota &amp; masak offline!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleInstallClick}
          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs shadow-md transition-all cursor-pointer"
        >
          Install
        </button>
        <button
          onClick={() => setShowBanner(false)}
          className="p-1 text-emerald-300 hover:text-white transition-colors"
          aria-label="Tutup Banner Install"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
