import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not defined in environment variables.');
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API endpoint: Generate Recipe JSON
  app.post('/api/generate-recipe', async (req, res) => {
    try {
      const { ingredients, extraNotes } = req.body;
      if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: 'Bahan makanan tidak boleh kosong.' });
      }

      const ai = getAi();
      const prompt = `Buatkan 1 resep masakan khas Indonesia yang paling lezat, praktis, dan hemat menggunakan bahan-bahan sisa kulkas berikut: ${ingredients.join(', ')}. ${extraNotes ? `Catatan tambahan: ${extraNotes}` : ''}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Kamu adalah Koki Utama "Resep Sisa Kulkas". Tugasmu menciptakan resep masakan rumah Indonesia yang kreatif, mudah diikuti, lezat, dan menghemat bahan sisa.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              nama: { type: Type.STRING, description: 'Nama resep menarik' },
              deskripsi: { type: Type.STRING, description: 'Deskripsi singkat resep' },
              durasi: { type: Type.NUMBER, description: 'Durasi masak dalam menit' },
              kesulitan: { type: Type.STRING, description: 'mudah, sedang, atau sulit' },
              kategori: { type: Type.STRING, description: 'goreng, rebus, kukus, tumis, atau panggang' },
              porsi: { type: Type.NUMBER, description: 'Jumlah porsi' },
              bahan: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Daftar bahan beserta takarannya',
              },
              langkah: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Langkah-langkah pembuatan bertahap',
              },
              tipsHemat: { type: Type.STRING, description: 'Tips praktis mengolah sisa bahan ini' },
            },
            required: ['nama', 'deskripsi', 'durasi', 'kesulitan', 'kategori', 'porsi', 'bahan', 'langkah'],
          },
        },
      });

      const text = response.text || '{}';
      const parsed = JSON.parse(text);

      // Add default photo URL and generated ID
      const photoKeywords = encodeURIComponent(parsed.nama || 'indonesian food');
      const recipe = {
        id: 'ai-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        nama: parsed.nama || 'Resep Kreasi Sisa Kulkas',
        deskripsi: parsed.deskripsi || 'Resep spesial kreasi AI dari sisa kulkasmu.',
        foto: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80`,
        bahan: parsed.bahan || ingredients,
        langkah: parsed.langkah || ['Campur semua bahan.', 'Masak hingga matang.', 'Sajikan selagi hangat.'],
        durasi: parsed.durasi || 20,
        kesulitan: (['mudah', 'sedang', 'sulit'].includes(parsed.kesulitan) ? parsed.kesulitan : 'mudah'),
        kategori: (['goreng', 'rebus', 'kukus', 'tumis', 'panggang'].includes(parsed.kategori) ? parsed.kategori : 'tumis'),
        porsi: parsed.porsi || 2,
        isAiGenerated: true,
        tags: ['AI-Recipe', ...ingredients.slice(0, 3)],
        tipsHemat: parsed.tipsHemat || 'Gunakan api sedang agar bumbu meresap sempurna.',
      };

      res.json({ success: true, recipe });
    } catch (error: any) {
      console.error('Error in /api/generate-recipe:', error);
      res.status(500).json({
        error: error.message || 'Gagal membuat resep dengan AI. Silakan coba lagi.',
      });
    }
  });

  // API endpoint: Streaming Recipe Generation using SSE
  app.get('/api/stream-recipe', async (req, res) => {
    const ingredientsQuery = req.query.ingredients as string;
    if (!ingredientsQuery) {
      return res.status(400).send('Ingredients query parameter required.');
    }

    const ingredients = ingredientsQuery.split(',').map((i) => i.trim()).filter(Boolean);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      const ai = getAi();
      const prompt = `Buatkan 1 resep kreasi masakan khas Indonesia dari bahan sisa kulkas berikut: ${ingredients.join(', ')}. Tulis dengan format Markdown yang rapi:
# [Nama Resep]
*Deskripsi singkat*
**Durasi**: [X] menit | **Porsi**: [Y] porsi | **Tingkat Kesulitan**: [mudah/sedang/sulit] | **Kategori**: [goreng/rebus/kukus/tumis/panggang]

### Bahan-bahan:
- [Bahan 1 + takaran]
- [Bahan 2 + takaran]

### Langkah Masak:
1. [Langkah 1]
2. [Langkah 2]

### Tips Olah Sisa Kulkas:
[Tips bermanfaat agar makanan tidak terbuang]`;

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Kamu adalah Koki Utama "Resep Sisa Kulkas" yang memberikan resep kreasi menarik secara cepat dan menginspirasi.',
        },
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          const lines = chunk.text.split('\n');
          for (const line of lines) {
            res.write(`data: ${JSON.stringify({ text: line + '\n' })}\n\n`);
          }
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error: any) {
      console.error('Error in /api/stream-recipe:', error);
      res.write(`data: ${JSON.stringify({ error: error.message || 'Error streaming recipe' })}\n\n`);
      res.end();
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
