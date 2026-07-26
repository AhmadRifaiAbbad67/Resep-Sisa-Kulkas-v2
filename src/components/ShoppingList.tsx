import React, { useState } from 'react';
import { ShoppingCart, Copy } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface ShoppingListProps {
  bahan: string[];
  recipeName: string;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({ bahan, recipeName }) => {
  const { showToast } = useToast();
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggleItem = (idx: number) => {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyList = () => {
    const text = `🛒 Belanja untuk: ${recipeName}\n${bahan
      .filter((_, i) => !checked[i])
      .map((b) => `• ${b}`)
      .join('\n')}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Daftar belanja disalin! 📋');
      }).catch(() => {
        fallbackCopy(text);
        showToast('Daftar belanja disalin! 📋');
      });
    } else {
      fallbackCopy(text);
      showToast('Daftar belanja disalin! 📋');
    }
  };

  function fallbackCopy(textToCopy: string) {
    const ta = document.createElement('textarea');
    ta.value = textToCopy;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  return (
    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-3 no-print">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
          <ShoppingCart className="w-4 h-4" /> Daftar Belanja
        </h4>
        <button
          onClick={copyList}
          className="text-xs px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold cursor-pointer transition-all active:scale-95"
        >
          <Copy className="w-3 h-3 inline mr-1" /> Salin
        </button>
      </div>
      <ul className="space-y-1.5">
        {bahan.map((item, idx) => (
          <li
            key={idx}
            onClick={() => toggleItem(idx)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs cursor-pointer transition-all ${
              checked[idx] ? 'bg-emerald-950/40 opacity-50 line-through' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <span>{checked[idx] ? '✅' : '⬜'}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
