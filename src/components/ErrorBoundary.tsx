import React, { ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  declare props: Props;
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {
    // Gracefully handle unexpected error
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-rose-500/20 border border-rose-400/40 text-rose-300 flex items-center justify-center shadow-2xl backdrop-blur-md">
            <AlertTriangle className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-md">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-extrabold text-xs tracking-widest uppercase border border-rose-400/30">
              Terjadi Kesalahan Sistem
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Waduh, Ada Kendala Teknis!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              {this.state.error?.message || 'Aplikasi mengalami kesalahan yang tidak terduga.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={this.handleReload}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Muat Ulang Halaman</span>
            </button>

            <a
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
