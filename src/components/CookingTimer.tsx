import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Bell } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const CookingTimer: React.FC = () => {
  const [targetMinutes, setTargetMinutes] = useState<number>(10);
  const [timeLeft, setTimeLeft] = useState<number>(10 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      showToast('🔔 Timer Masak Selesai! Saatnya cek masakanmu.', 'info');
      
      // Play web audio alert beep
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
      } catch {
        // Web audio playback prevented or unavailable
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, showToast]);

  const handleSelectMinutes = (mins: number) => {
    setTargetMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(targetMinutes * 60);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(targetMinutes * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = targetMinutes > 0 ? ((targetMinutes * 60 - timeLeft) / (targetMinutes * 60)) * 100 : 0;

  return (
    <div className="p-5 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl text-white space-y-4 no-print">
      <div className="flex items-center justify-between border-b border-white/15 pb-3">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-amber-400" />
          <h3 className="font-heading font-bold text-sm sm:text-base text-amber-400 uppercase tracking-widest">
            Timer Dapur Masak
          </h3>
        </div>
        {isRunning && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold animate-pulse bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/40">
            <Bell className="w-3.5 h-3.5 text-amber-300" /> sedang berjalan...
          </span>
        )}
      </div>

      {/* Preset duration buttons */}
      <div className="flex flex-wrap gap-2">
        {[3, 5, 10, 15, 20, 30].map((mins) => (
          <button
            key={mins}
            onClick={() => handleSelectMinutes(mins)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              targetMinutes === mins && !isRunning
                ? 'bg-amber-500 text-emerald-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            }`}
          >
            {mins} mnt
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-950/60 border border-white/15 relative overflow-hidden">
        {/* Progress Bar background */}
        <div
          className="absolute bottom-0 left-0 top-0 bg-amber-500/20 transition-all duration-1000"
          style={{ width: `${progressPercent}%` }}
        />

        <div className="relative z-10 font-mono text-4xl sm:text-5xl font-black text-amber-300 tracking-wider">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        {/* Controls */}
        <div className="relative z-10 flex items-center gap-3 mt-3">
          <button
            onClick={toggleTimer}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-emerald-950" /> Jeda
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-emerald-950" /> Mulai
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
