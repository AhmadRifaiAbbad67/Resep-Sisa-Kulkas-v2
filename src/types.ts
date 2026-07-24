export type Kesulitan = 'mudah' | 'sedang' | 'sulit';
export type Kategori = 'goreng' | 'rebus' | 'kukus' | 'tumis' | 'panggang';

export interface Recipe {
  id: string;
  nama: string;
  deskripsi: string;
  foto: string;
  bahan: string[]; // List of required ingredients
  langkah: string[]; // Step-by-step cooking steps
  durasi: number; // In minutes
  kesulitan: Kesulitan;
  kategori: Kategori;
  porsi: number;
  kalori?: number;
  isAiGenerated?: boolean;
  tags?: string[];
}

export interface FilterState {
  maxDurasi: number | null; // e.g. 15, 30, 60 or null
  kesulitan: 'semua' | Kesulitan;
  kategori: 'semua' | Kategori;
  searchQuery: string;
  sortBy: 'match' | 'durasi' | 'porsi';
}
