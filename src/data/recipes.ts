import { Recipe } from '../types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'nasi-goreng-telur-spesial',
    nama: 'Nasi Goreng Telur Sisa Kulkas',
    deskripsi: 'Nasi goreng lezat penolong nasi dingin kemarin dengan bumbu gurih dan kecap manis khas Nusantara.',
    foto: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Nasi putih dingin (1 piring)',
      'Telur ayam (1-2 butir)',
      'Bawang merah (3 siung, cincang)',
      'Bawang putih (2 siung, cincang)',
      'Kecap manis (1.5 sdm)',
      'Cabai rawit / merah (sesuai selera, iris)',
      'Garam & kaldu bubuk (secukupnya)',
      'Minyak goreng (2 sdm)',
      'Daun bawang (1 batang, iris)'
    ],
    langkah: [
      'Panaskan minyak goreng di wajan dengan api sedang.',
      'Tumis bawang merah, bawang putih, dan cabai iris hingga harum dan matang.',
      'Sisihkan tumisan bumbu ke pinggir wajan, orak-arik telur hingga setengah matang.',
      'Masukkan nasi putih dingin, aduk rata dan uraikan gumpalan nasi.',
      'Bumbui dengan kecap manis, garam, dan kaldu bubuk. Aduk dengan api besar hingga tercium aroma wangi nasi goreng.',
      'Tambahkan irisan daun bawang menjelang diangkat. Aduk sebentar dan sajikan selagi hangat!'
    ],
    durasi: 15,
    kesulitan: 'mudah',
    kategori: 'goreng',
    porsi: 2,
    kalori: 380,
    tags: ['Nasi', 'Telur', 'Cepat', 'Hemat']
  },
  {
    id: 'tumis-kangkung-terasi',
    nama: 'Tumis Kangkung Terasi Gurih',
    deskripsi: 'Masakan tumis sayur kangkung lezat dengan aroma terasi khas, cepat saji hanya 10 menit.',
    foto: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Kangkung segar (1 ikat, potong & cuci bersih)',
      'Bawang merah (4 siung, iris tipis)',
      'Bawang putih (2 siung, iris tipis)',
      'Terasi bakar (1/2 sdt)',
      'Cabai merah / rawit (3 buah, iris serong)',
      'Tomat (1/2 buah, potong kasar)',
      'Saus tiram (1 sdm)',
      'Garam, gula & minyak goreng'
    ],
    langkah: [
      'Haluskan atau remas terasi dengan sedikit air atau tumis langsung bersama bumbu.',
      'Panaskan 2 sdm minyak, tumis bawang merah, bawang putih, cabai, dan terasi hingga wangi.',
      'Masukkan tomat potongan, aduk sebentar.',
      'Masukkan kangkung, tambahkan saus tiram, sedikit garam, dan sejumput gula.',
      'Tumis dengan api sangat besar selama 2-3 menit hingga kangkung layu namun tetap hijau renyah.',
      'Sajikan hangat bersama nasi panas.'
    ],
    durasi: 15,
    kesulitan: 'mudah',
    kategori: 'tumis',
    porsi: 2,
    kalori: 120,
    tags: ['Sayur', 'Kangkung', 'Pedas', 'Cepat']
  },
  {
    id: 'telur-dadar-crispy-daun-bawang',
    nama: 'Telur Dadar Crispy Tebal Daun Bawang',
    deskripsi: 'Telur dadar tebal, crispy di luar dan lembut di dalam dengan harum daun bawang yang melimpah.',
    foto: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Telur ayam (3 butir)',
      'Daun bawang (2 batang, iris halus)',
      'Bawang merah (2 siung, iris tipis)',
      'Tepung terigu / maizena (1 sdm larutkan sedikit air)',
      'Garam & lada putih (secukupnya)',
      'Minyak goreng agak banyak (untuk mendadar)'
    ],
    langkah: [
      'Kocok telur bersama irisan daun bawang, bawang merah, larutan tepung, garam, dan lada hingga berbusa.',
      'Panaskan minyak yang cukup banyak di wajan anti lengket hingga benar-benar panas.',
      'Tuang adonan telur dari agak tinggi agar mengembang rintik.',
      'Gunakan api sedang cenderung kecil agar bagian dalam matang dan bagian luar menjadi renyah keemasan.',
      'Balik telur dengan hati-hati. Masak hingga kedua sisi berwarna kuning keemasan.',
      'Angkat, tiriskan minyaknya, dan potong-potong sesuai selera.'
    ],
    durasi: 15,
    kesulitan: 'mudah',
    kategori: 'goreng',
    porsi: 2,
    kalori: 240,
    tags: ['Telur', 'Lauk', 'Praktis']
  },
  {
    id: 'sup-ayam-sayur-sederhana',
    nama: 'Sup Ayam Sayur Bening Sederhana',
    deskripsi: 'Sup kuah bening hangat yang menyegarkan dengan gabungan sisa potongan ayam, wortel, dan kentang.',
    foto: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Daging ayam Sisa / segar (200 gr, potong dadu)',
      'Wortel (1-2 buah, iris bulat)',
      'Kentang (1 buah, potong dadu)',
      'Bawang putih (3 siung, geprek & cincang)',
      'Daun bawang & seledri (iris)',
      'Garam, kaldu ayam, & lada bubuk',
      'Air (750 ml)',
      'Bawang goreng (opsional)'
    ],
    langkah: [
      'Rebus air hingga mendidih, masukkan potongan ayam. Buang busa kotoran yang mengapung jika ada.',
      'Tumis bawang putih cincang dengan sedikit minyak hingga harum, lalu masukkan tumisan bumbu ke dalam kuah rebusan.',
      'Masukkan kentang dan wortel, masak dengan api sedang hingga sayuran empuk.',
      'Bumbui dengan garam, lada putih, dan kaldu ayam. Cicipi rasanya.',
      'Matikan api, masukkan irisan daun bawang dan seledri.',
      'Taburi bawang goreng di atasnya dan sajikan hangat.'
    ],
    durasi: 30,
    kesulitan: 'mudah',
    kategori: 'rebus',
    porsi: 3,
    kalori: 210,
    tags: ['Kuah', 'Ayam', 'Sayur', 'Sehat']
  },
  {
    id: 'capcay-goreng-sayuran-kulit',
    nama: 'Capcay Goreng Rumahan Sisa Sayur',
    deskripsi: 'Capcay aneka sayur gurih bersaus tiram kental, cocok memanfaatkan potongan wortel, sawi, dan bakso di kulkas.',
    foto: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Wortel (1 buah, iris tipis miring)',
      'Sawi hijau / putih (100 gr, potong)',
      'Kembang kol / Buncis (50 gr)',
      'Bakso sisa / sosis (4-5 butir, iris)',
      'Bawang putih (3 siung, cincang)',
      'Bawang bombay (1/2 buah, iris)',
      'Saus tiram (2 sdm)',
      'Kecap asin (1 sdm)',
      'Tepung maizena (1 sdt dilarutkan air)',
      'Garam, lada, & sedikit air'
    ],
    langkah: [
      'Panaskan minyak, tumis bawang putih dan bawang bombay hingga wangi aromatis.',
      'Masukkan irisan bakso/sosis, aduk sebentar.',
      'Masukkan sayuran keras seperti wortel dan kembang kol, beri sedikit air (sekitar 50ml), masak sebentar hingga setengah matang.',
      'Masukkan daun sawi hijau/putih.',
      'Bumbui dengan saus tiram, kecap asin, garam, dan lada bubuk.',
      'Tuang larutan maizena, aduk cepat hingga kuah mengental indah. Angkat dan sajikan.'
    ],
    durasi: 20,
    kesulitan: 'mudah',
    kategori: 'tumis',
    porsi: 3,
    kalori: 180,
    tags: ['Capcay', 'Sayur', 'Bakso', 'Sehat']
  },
  {
    id: 'tahu-cabe-garam',
    nama: 'Tahu Cabe Garam Crispy',
    deskripsi: 'Camilan atau lauk renyah gurih pedas manis yang dibuat dari sisa tahu putih atau tahu kuning di kulkas.',
    foto: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Tahu putih/kuning (4 kotak, potong dadu kecil)',
      'Tepung maizena / terigu (3 sdm)',
      'Bawang putih (4 siung, cincang sangat halus)',
      'Cabai rawit merah & hijau (6 buah, iris tipis)',
      'Daun bawang (1 batang, iris)',
      'Garam, kaldu bubuk, & minyak goreng'
    ],
    langkah: [
      'Balurkan potongan tahu ke dalam tepung maizena hingga terlapisi tipis secara merata.',
      'Goreng tahu dalam minyak panas hingga berwarna kuning keemasan dan kulitnya krispi. Tiriskan.',
      'Panaskan 1 sdm minyak, tumis bawang putih cincang halus dengan api kecil hingga harum dan kekuningan.',
      'Masukkan irisan cabai rawit dan daun bawang, aduk sebentar.',
      'Bumbui dengan garam dan kaldu bubuk.',
      'Masukkan tahu crispy yang sudah digoreng, aduk cepat hingga semua bumbu cabai garam menempel rata. Angkat segera.'
    ],
    durasi: 20,
    kesulitan: 'mudah',
    kategori: 'goreng',
    porsi: 2,
    kalori: 220,
    tags: ['Tahu', 'Crispy', 'Pedas', 'Snack']
  },
  {
    id: 'omelet-sayur-sosis-keju',
    nama: 'Omelet Sayur & Sosis Keju Leleh',
    deskripsi: 'Sarapan praktis memanfaatkan sisa sosis, wortel, dan keju yang dikocok bersama telur lembut.',
    foto: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Telur ayam (2-3 butir)',
      'Sosis (2 batang, iris tipis)',
      'Wortel (1/2 buah, parut halus atau cincang)',
      'Keju parut / lembaran (secukupnya)',
      'Mentega / minyak (1 sdm)',
      'Susu cair (2 sdm, opsional agar lebih lembut)',
      'Garam & lada'
    ],
    langkah: [
      'Kocok telur bersama parutan wortel, susu cair, garam, dan lada hingga rata.',
      'Lelehkan mentega di wajan dadar anti lengket.',
      'Tumis irisan sosis sebentar hingga matang, lalu ratakan di dasar wajan.',
      'Tuang adonan telur di atas sosis dengan api kecil.',
      'Saat setengah matang, taburkan keju parut di atasnya. Lipat dua omelet atau gulung perlahan.',
      'Masak hingga keju meleleh dan telur matang sempurna.'
    ],
    durasi: 15,
    kesulitan: 'mudah',
    kategori: 'goreng',
    porsi: 2,
    kalori: 310,
    tags: ['Sarapan', 'Sosis', 'Telur', 'Keju']
  },
  {
    id: 'mie-goreng-jawa-sisa-sayur',
    nama: 'Mie Goreng Jawa Spesial Kulkas',
    deskripsi: 'Mie goreng manis gurih khas Jawa dengan orak-arik telur, sawi, dan bumbu halus yang medok.',
    foto: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Mie telur kering / mie instan tanpa bumbu (1 bungkus, rebus setengah matang)',
      'Telur (1 butir)',
      'Sawi hijau & kol (1 genggam, potong-potong)',
      'Bawang merah (3 siung, haluskan/iris)',
      'Bawang putih (2 siung, haluskan/iris)',
      'Kemiri (1 butir, sangrai & haluskan)',
      'Kecap manis (2 sdm)',
      'Saus tiram & kecap asin (1 sdt)',
      'Garam, lada putih, & minyak'
    ],
    langkah: [
      'Rebus mie hingga lunak tapi tidak lembek, tiriskan dan beri 1 sdt minyak agar tidak lengket.',
      'Panaskan minyak, tumis bumbu halus (bawang merah, putih, kemiri) hingga harum harum.',
      'Sisihkan bumbu, orak-arik telur di sampingnya hingga matang.',
      'Masukkan potongan sawi dan kol, aduk sebentar hingga agak layu.',
      'Masukkan mie yang sudah ditiriskan.',
      'Bumbui dengan kecap manis, saus tiram, kecap asin, garam, dan lada. Aduk merata di atas api sedang-besar hingga mie terkaramelisasi lembut.'
    ],
    durasi: 20,
    kesulitan: 'mudah',
    kategori: 'goreng',
    porsi: 2,
    kalori: 420,
    tags: ['Mie', 'Jawa', 'Kecap', 'Kenyang']
  },
  {
    id: 'tumis-tempe-kecap-cabai-hijau',
    nama: 'Tumis Tempe Kecap Cabai Hijau',
    deskripsi: 'Olah sisa papan tempe jadi masakan orek tumis manis gurih beraroma lengkuas dan cabai hijau segar.',
    foto: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Tempe (1 papan/200 gr, potong korek api / dadu)',
      'Cabai hijau besar (3 buah, iris miring)',
      'Cabai rawit (3 buah, iris)',
      'Bawang merah (4 siung, iris)',
      'Bawang putih (2 siung, iris)',
      'Lengkuas (1 cm, geprek)',
      'Daun salam (1 lembar)',
      'Kecap manis (2.5 sdm)',
      'Garam, kaldu bubuk, & minyak goreng'
    ],
    langkah: [
      'Goreng potongan tempe hingga setengah matang/berkulit agak berkulit kecokelatan. Tiriskan.',
      'Panaskan 2 sdm minyak, tumis bawang merah, bawang putih, lengkuas, dan daun salam hingga harum.',
      'Masukkan irisan cabai hijau dan cabai rawit, tumis sebentar hingga cabai layu.',
      'Masukkan tempe yang sudah digoreng.',
      'Tambahkan kecap manis, sedikit air (2-3 sdm), garam, dan kaldu bubuk.',
      'Adung rata hingga bumbu meresap dan kuah menyusut manis berkilat. Angkat.'
    ],
    durasi: 20,
    kesulitan: 'mudah',
    kategori: 'tumis',
    porsi: 3,
    kalori: 230,
    tags: ['Tempe', 'Hemat', 'ManisGurih']
  },
  {
    id: 'fuyunghai-telur-tahu-saus-asam-manis',
    nama: 'Fuyunghai Telur Tahu Saus Asam Manis',
    deskripsi: 'Olahan dadar telur tahu super tebal dengan siraman saus asam manis gurih khas chinese food.',
    foto: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Telur (3 butir)',
      'Tahu putih (2 kotak, lumatkan halus)',
      'Wortel (1/2 buah, potong korek api halus)',
      'Tepung maizena / terigu (2 sdm)',
      'Bawang bombay (1/2 buah, iris)',
      'Bawang putih (2 siung, cincang)',
      'Saus tomat (3 sdm)',
      'Saus sambal (1 sdm)',
      'Gula pasir (1 sdt), garam, lada, & air (100 ml)'
    ],
    langkah: [
      'Campur telur kocok, tahu lumat, wortel irisan, tepung terigu, garam, dan lada. Aduk rata.',
      'Goreng adonan fuyunghai dalam minyak panas cukup banyak hingga tebal berkulit renyah. Balik dan matangkan kedua sisi.',
      'Buat saus: Tumis bawang bombay dan bawang putih hingga wangi.',
      'Masukkan saus tomat, saus sambal, gula, garam, dan air. Aduk hingga mendidih.',
      'Kentalkan saus dengan sedikit larutan maizena.',
      'Siramkan saus asam manis hangat di atas adonan fuyunghai telur tahu!'
    ],
    durasi: 25,
    kesulitan: 'sedang',
    kategori: 'goreng',
    porsi: 3,
    kalori: 340,
    tags: ['Fuyunghai', 'AsamManis', 'Telur', 'Tahu']
  },
  {
    id: 'nasi-gila-kulkas',
    nama: 'Nasi Gila Komplit Sisa Kulkas',
    deskripsi: 'Nasi hangat disiram tumisan meriah sosis, bakso, telur, dan sayuran bercita rasa manis gurih pedas.',
    foto: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Nasi putih hangat (2 porsi)',
      'Telur (2 butir)',
      'Sosis (2 batang, iris)',
      'Bakso sapi/ayam (4 butir, iris)',
      'Sawi hijau & kol (secukupnya, potong)',
      'Bawang putih (3 siung, cincang)',
      'Saus tiram (1 sdm)',
      'Kecap manis (2 sdm)',
      'Saus sambal (1 sdm)',
      'Garam & lada'
    ],
    langkah: [
      'Panaskan minyak, tumis bawang putih cincang hingga kekuningan harum.',
      'Orak-arik telur hingga matang di wajan.',
      'Masukkan irisan sosis dan bakso, tumis sebentar.',
      'Masukkan sayuran sawi dan kol.',
      'Bumbui dengan saus tiram, kecap manis, saus sambal, garam, dan lada.',
      'Aduk cepat hingga bumbu membalut gurih. Siramkan di atas nasi hangat!'
    ],
    durasi: 15,
    kesulitan: 'mudah',
    kategori: 'tumis',
    porsi: 2,
    kalori: 450,
    tags: ['NasiGila', 'Sosis', 'Bakso', 'Favorit']
  },
  {
    id: 'perkedel-kentang-kornet-sosis',
    nama: 'Perkedel Kentang Sosis Gurih',
    deskripsi: 'Perkedel lembut dari sisa kentang rebus yang ditumbuk halus dengan rasa gurih telur dan bawang goreng.',
    foto: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Kentang (300 gr, kupas, potong & goreng lunak)',
      'Sosis / Kornet (1-2 batang, cincang halus)',
      'Telur (1 butir untuk pelapis dadar)',
      'Bawang goreng (1.5 sdm)',
      'Daun seledri (1 batang, iris halus)',
      'Pala bubuk (1/8 sdt, opsional)',
      'Garam & lada putih (secukupnya)'
    ],
    langkah: [
      'Tumbuk kentang yang sudah digoreng selagi masih hangat hingga halus.',
      'Campur tumbukan kentang dengan sosis cincang, bawang goreng, seledri, pala bubuk, garam, dan lada.',
      'Bentuk adonan menjadi bulatan pipih padat.',
      'Celupkan adonan perkedel ke dalam kocokan telur.',
      'Goreng dalam minyak panas dengan api sedang hingga berwarna cokelat keemasan.',
      'Angkat dan tiriskan. Siap disajikan sebagai lauk pendamping.'
    ],
    durasi: 30,
    kesulitan: 'sedang',
    kategori: 'goreng',
    porsi: 4,
    kalori: 260,
    tags: ['Kentang', 'Perkedel', 'Lauk']
  },
  {
    id: 'bakwan-sayur-renyah',
    nama: 'Bakwan Sayur Renyah Tahan Lama',
    deskripsi: 'Gorengan bakwan / bala-bala sayuran renyah garing memanfaatkan sisa wortel, kol, dan daun bawang.',
    foto: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Wortel (1 buah, potong korek api halus)',
      'Kol (100 gr, iris tipis)',
      'Daun bawang (2 batang, iris)',
      'Tepung terigu (150 gr)',
      'Tepung beras (2 sdm, rahasia renyah!)',
      'Bawang putih (2 siung, haluskan)',
      'Ketumbar bubuk (1/2 sdt)',
      'Garam, kaldu bubuk, & air es (secukupnya)'
    ],
    langkah: [
      'Campur tepung terigu, tepung beras, bawang putih halus, ketumbar, garam, dan kaldu bubuk.',
      'Tuangkan air es sedikit demi sedikit hingga menjadi adonan kental bertekstur lunak.',
      'Masukkan irisan wortel, kol, dan daun bawang. Aduk rata.',
      'Panaskan minyak yang banyak di wajan.',
      'Ambil 1 sendok sayur adonan, tuang miring di tepi wajan atau langsung dalam minyak.',
      'Goreng hingga bakwan berwarna kuning keemasan renyah. Angkat dan nikmati dengan cabai rawit.'
    ],
    durasi: 25,
    kesulitan: 'mudah',
    kategori: 'goreng',
    porsi: 4,
    kalori: 290,
    tags: ['Gorengan', 'Bakwan', 'Sayur', 'Renyah']
  },
  {
    id: 'sup-telur-air-sederhana',
    nama: 'Sup Telur Kuah Bening Chinese Style',
    deskripsi: 'Sup kuah hangat super cepat 5 menit! Menggunakan air, telur yang diputar lembut, dan minyak wijen harum.',
    foto: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Telur (2 butir, kocok lepas)',
      'Air / Kuah kaldu (600 ml)',
      'Bawang putih (2 siung, cincang halus)',
      'Daun bawang (1 batang, iris tipis)',
      'Kecap asin (1 sdm)',
      'Minyak wijen (1 sdt)',
      'Garam, lada putih, & maizena (1 sdt dilarutkan air)'
    ],
    langkah: [
      'Tumis bawang putih dengan sedikit minyak hingga harum kecokelatan dalam panci.',
      'Tuangkan air / kuah kaldu, biarkan hingga mendidih.',
      'Bumbui dengan kecap asin, garam, dan lada. Tuang larutan maizena agar kuah sedikit kental licin.',
      'Aduk kuah mendidih membentuk pusaran air, lalu tuangkan kocokan telur perlahan dari atas.',
      'Biarkan serabut telur mengapung cantik selama 10 detik lalu matikan api.',
      'Tambahkan minyak wijen dan irisan daun bawang. Sajikan selagi panas menyegarkan.'
    ],
    durasi: 10,
    kesulitan: 'mudah',
    kategori: 'rebus',
    porsi: 2,
    kalori: 140,
    tags: ['Sup', 'Telur', 'SuperCepat', 'Sehat']
  },
  {
    id: 'oseng-buncis-jagung-manis',
    nama: 'Oseng Buncis Jagung Manis Saus Tiram',
    deskripsi: 'Tumisan warna-warni segar dari buncis dan jagung manis, kriuk lezat untuk santap siang.',
    foto: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80',
    bahan: [
      'Buncis (150 gr, potong miring)',
      'Jagung manis (1/2 buah, sisir halus)',
      'Bawang merah (3 siung, iris)',
      'Bawang putih (2 siung, iris)',
      'Cabai merah (2 buah, iris miring)',
      'Saus tiram (1 sdm)',
      'Garam, gula pasir, & minyak goreng'
    ],
    langkah: [
      'Panaskan minyak, tumis bawang merah, bawang putih, dan cabai merah hingga wangi.',
      'Masukkan sisiran jagung manis dan beri sedikit air (3 sdm). Masak 2 menit hingga jagung agak empuk.',
      'Masukkan potongan buncis.',
      'Bumbui saus tiram, sejumput garam, dan gula.',
      'Tumis cepat dengan api besar agar buncis tetap segar renyah bertekstur.',
      'Angkat dan siap disajikan.'
    ],
    durasi: 15,
    kesulitan: 'mudah',
    kategori: 'tumis',
    porsi: 3,
    kalori: 150,
    tags: ['Buncis', 'Jagung', 'Sayur', 'Healthy']
  }
];

export const POPULAR_INGREDIENTS = [
  'Telur',
  'Nasi',
  'Bawang',
  'Ayam',
  'Tahu',
  'Tempe',
  'Sosis',
  'Wortel',
  'Bakso',
  'Kangkung',
  'Sawi',
  'Kentang',
  'Cabai',
  'Mie',
  'Keju'
];
