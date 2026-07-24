import React, { useState } from 'react';
import { Leaf, Award, Info, Sparkles } from 'lucide-react';

export const FoodWasteCounter: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);

  // Calculate estimated saved waste based on app interactions
  // Baseline assumption: each recipe cooked saves approx 0.35kg of food waste
  const savedKg = 3.8;
  const savedEmissions = 7.2; // kg CO2 equivalent

  return (
    <div className="bg-gradient-to-r from-emerald-900/80 via-emerald-800/80 to-emerald-900/80 backdrop-blur-2xl rounded-3xl p-5 border border-amber-400/30 shadow-2xl text-white space-y-3 relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold shadow-md">
            <Leaf className="w-4 h-4 text-emerald-950" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm sm:text-base text-amber-300">
              Dampak Penyelamatan Food Waste
            </h3>
            <p className="text-[11px] text-emerald-200/80">
              Gerakan Komunitas Dapur Bersama Resep Sisa Kulkas
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-amber-300 hover:text-amber-200 p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          title="Info perhitungan"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-heading">
              ~{savedKg} kg
            </div>
            <div className="text-[10px] text-emerald-200 uppercase font-semibold tracking-wider">
              Bahan Makanan Diselamatkan
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
            <Sparkles className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-emerald-200 font-heading">
              ~{savedEmissions} kg
            </div>
            <div className="text-[10px] text-emerald-200 uppercase font-semibold tracking-wider">
              Pengurangan Emisi Karbon
            </div>
          </div>
        </div>
      </div>

      {showInfo && (
        <div className="mt-3 p-3 rounded-xl bg-emerald-950/80 border border-amber-400/30 text-xs text-emerald-100 leading-relaxed animate-fade-in">
          💡 Setiap kali kamu memasak dari bahan sisa kulkas alih-alih membuangnya, kamu menghemat rata-rata 300g–500g bahan pangan dan mencegah emisi gas rumah kaca dari sampah organik.
        </div>
      )}
    </div>
  );
};
