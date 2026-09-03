export interface HalalProduct {
  id: string;
  name: string;
  category: 'Makanan' | 'Minuman' | 'Bumbu' | 'Kosmetik' | 'Suplemen' | 'Dairy';
  price: number;
  supplier: string;
  supplierId: number;
  rating: number;
  reviewsCount: number;
  halalCert: boolean;
  halalNumber: string;
  halalValidUntil: string;
  stockStatus: 'green' | 'yellow' | 'red';
  stock: number;
  image: string;
  barcode: string;
  description: string;
  ingredients: string;
  origin: string;
  shelfLife: string;
  netWeight: string;
  processStandard: string;
}

export interface HalalSupplier {
  id: number;
  name: string;
  legalName: string;
  nib: string;
  region: string;
  city: string;
  address: string;
  categories: string;
  verified: boolean;
  halalCertNumber: string;
  halalSupervisor: string; // Penyelia Halal
  supervisorCert: string;
  omax: number;
  rating: number;
  reviews: number;
  productsCount: number;
  status: 'Aktif' | 'Verifikasi Ulang' | 'Non-Aktif';
  image: string;
  avatar: string;
  phone: string;
  email: string;
  description: string;
  establishedYear: number;
}

export interface DistributorFleet {
  id: string;
  vehiclePlate: string;
  fleetType: string;
  operator: string;
  driverName: string;
  driverPhone: string;
  route: string;
  currentLocation: string;
  temperature: number;
  humidity: number;
  targetTemp: string;
  sealStatus: 'Aman (Terkunci)' | 'Peringatan' | 'Terbuka';
  sealCode: string;
  gpsStatus: 'Online' | 'Offline';
  image: string;
}

export const REAL_PRODUCTS: HalalProduct[] = [
  {
    id: '1',
    name: 'Rendang Sapi Suwir Padang (Retort Pack)',
    category: 'Makanan',
    price: 75000,
    supplier: 'PT Bunda Halal Foods Nusantara',
    supplierId: 1,
    rating: 4.9,
    reviewsCount: 342,
    halalCert: true,
    halalNumber: 'ID32110000123450223',
    halalValidUntil: '2027-08-20',
    stockStatus: 'green',
    stock: 145,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    barcode: '8997234120012',
    description: 'Daging sapi pilihan asal RPH bersertifikat Halal, dimasak lambat dengan santan kelapa murni dan rempah Nusantara. Menggunakan teknologi sterilisasi pouch retort tanpa bahan pengawet sintesis.',
    ingredients: 'Daging Sapi Halal (75%), Santan Kelapa Segar, Cabai Merah Keriting, Bawang Merah, Bawang Putih, Jahe, Lengkuas, Serai, Daun Kunyit, Garam Beriodium.',
    origin: 'Payakumbuh & Lembang (RPH Halal Modern)',
    shelfLife: '12 Bulan pada suhu ruang',
    netWeight: '250 gram',
    processStandard: 'Sterilisasi Retort 121°C, HACCP & SJPH Kemenag',
  },
  {
    id: '2',
    name: 'Kopi Arabika Gayo Single Origin 250g',
    category: 'Minuman',
    price: 85000,
    supplier: 'Koperasi Kopi Barokah Takengon',
    supplierId: 3,
    rating: 4.9,
    reviewsCount: 520,
    halalCert: true,
    halalNumber: 'ID11210000876540122',
    halalValidUntil: '2028-02-15',
    stockStatus: 'green',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    barcode: '8998123000456',
    description: 'Kopi Arabika murni dari dataran tinggi Gayo Aceh pada elevasi 1.400 mdpl. Diproses secara semi-washed dan disangrai medium roast dengan profil rasa citrusy, brown sugar, dan lingering sweet finish.',
    ingredients: '100% Biji Kopi Arabika Gayo Pilihan',
    origin: 'Takengon, Aceh Tengah',
    shelfLife: '18 Bulan dalam kemasan one-way valve',
    netWeight: '250 gram',
    processStandard: 'Dry/Wet Milling Halal, Roasting Bersertifikat Halal',
  },
  {
    id: '3',
    name: 'Madu Hutan Sumbawa Murni 500ml',
    category: 'Suplemen',
    price: 125000,
    supplier: 'CV Alam Lestari Nusantara',
    supplierId: 6,
    rating: 4.8,
    reviewsCount: 215,
    halalCert: true,
    halalNumber: 'ID52010000432190922',
    halalValidUntil: '2027-11-10',
    stockStatus: 'green',
    stock: 65,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    barcode: '8993214560789',
    description: 'Madu murni hasil panen lebah Apis Dorsata dari hutan lindung Pulau Sumbawa. Kadar air terkontrol di bawah 20% secara higienis tanpa pasteurisasi berlebih untuk menjaga enzim diastase.',
    ingredients: '100% Madu Hutan Liar Murni',
    origin: 'Sumbawa, Nusa Tenggara Barat',
    shelfLife: '24 Bulan',
    netWeight: '500 ml / 650 gram',
    processStandard: 'Cold Filtration, Bebas Aditif & Uji Lab SNI Halal',
  },
  {
    id: '4',
    name: 'Susu Pasteurisasi Lembang Murni 1 Liter',
    category: 'Dairy',
    price: 24000,
    supplier: 'KPBS Pangalengan Dairy Hub',
    supplierId: 5,
    rating: 4.7,
    reviewsCount: 410,
    halalCert: true,
    halalNumber: 'ID32040000998810623',
    halalValidUntil: '2026-10-18',
    stockStatus: 'yellow',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    barcode: '8994567890123',
    description: 'Susu sapi segar langsung dari peternak sapi perah Pangalengan Bandung Selatan. Diproses High Temperature Short Time (HTST) menjaga kesegaran gizi kalsium dan protein tanpa pengawet.',
    ingredients: '100% Susu Sapi Segar Homogenisasi',
    origin: 'Pangalengan, Jawa Barat',
    shelfLife: '14 Hari (Wajib Cold Chain 2°C - 4°C)',
    netWeight: '1.000 ml',
    processStandard: 'Pasteurisasi HTST, Cold Chain Logistik IoT Terpantau',
  },
  {
    id: '5',
    name: 'Bumbu Racik Nasi Goreng Kampung Halal',
    category: 'Bumbu',
    price: 8500,
    supplier: 'CV Rempah Alam Nusantara',
    supplierId: 4,
    rating: 4.9,
    reviewsCount: 680,
    halalCert: true,
    halalNumber: 'ID34020000778891223',
    halalValidUntil: '2027-05-14',
    stockStatus: 'green',
    stock: 280,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    barcode: '8992109876543',
    description: 'Bumbu pasta basah siap pakai diracik dari bawang merah Brebes, terasi udang halal Cirebon, dan kemiri sangrai asli tanpa MSG berlebih.',
    ingredients: 'Bawang Merah (45%), Bawang Putih, Cabai Merah, Terasi Udang Halal, Garam, Minyak Nabati Kelapa Sawit Halal.',
    origin: 'Kulon Progo, D.I. Yogyakarta',
    shelfLife: '6 Bulan',
    netWeight: '75 gram',
    processStandard: 'Thermal Processing & Vacuum Pouching SJPH',
  },
  {
    id: '6',
    name: 'Hydrating Facial Serum Natural Halal',
    category: 'Kosmetik',
    price: 135000,
    supplier: 'PT Halal Beauty Organika',
    supplierId: 7,
    rating: 4.8,
    reviewsCount: 190,
    halalCert: true,
    halalNumber: 'ID31210000667780323',
    halalValidUntil: '2028-01-30',
    stockStatus: 'green',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    barcode: '8996543210987',
    description: 'Serum perawatan kulit wajah berbasis tanaman dengan Hyaluronic Acid nabati, ekstrak Centella Asiatica, dan Niacinamide bebas alkohol serta bebas bahan hewani najis.',
    ingredients: 'Aqua, Centella Asiatica Leaf Extract, Niacinamide, Sodium Hyaluronate (Fermentasi Nabati), Glycerin Nabati, Xanthan Gum.',
    origin: 'Bogor, Jawa Barat',
    shelfLife: '24 Bulan',
    netWeight: '30 ml',
    processStandard: 'CPKB (Cara Pembuatan Kosmetika yang Baik) & Halal MUI/BPJPH',
  },
  {
    id: '7',
    name: 'Keripik Tempe Sagu Oven Gurih',
    category: 'Makanan',
    price: 16000,
    supplier: 'PT Bunda Halal Foods Nusantara',
    supplierId: 1,
    rating: 4.4,
    reviewsCount: 88,
    halalCert: false,
    halalNumber: 'ID3211000012399-DALAM PROSES',
    halalValidUntil: 'Menunggu Audit LP3H',
    stockStatus: 'red',
    stock: 0,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    barcode: '8997234120098',
    description: 'Keripik tempe kedelai non-GMO dipanggang oven dengan tepung sagu berkualitas dan bumbu daun jeruk nipis renyah.',
    ingredients: 'Tempe Kedelai Segar, Tepung Sagu Aren, Bawang Putih, Ketumbar, Daun Jeruk, Minyak Goreng Sawit Halal, Garam.',
    origin: 'Bandung Barat, Jawa Barat',
    shelfLife: '4 Bulan',
    netWeight: '150 gram',
    processStandard: 'Sedang Verifikasi Ulang Audit Lapangan BPJPH',
  },
  {
    id: '8',
    name: 'Daging Sapi Sirloin Cut Halal (Fresh Frozen)',
    category: 'Makanan',
    price: 145000,
    supplier: 'PT Malindo RPH Halal Modern',
    supplierId: 2,
    rating: 5.0,
    reviewsCount: 310,
    halalCert: true,
    halalNumber: 'ID32160000881230422',
    halalValidUntil: '2027-04-12',
    stockStatus: 'green',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80',
    barcode: '8995432109876',
    description: 'Potongan daging has luar (Sirloin) sapi Brahman Cross, disembelih oleh Juleha (Juru Sembelih Halal) berlisensi BNSP sesuai syariat Islam dan didinginkan cepat via blast freezing -40°C.',
    ingredients: '100% Daging Sapi Murni Potong Halal',
    origin: 'Cikarang Barat, Bekasi',
    shelfLife: '12 Bulan dalam freezer -18°C',
    netWeight: '1.000 gram (1 Kg)',
    processStandard: 'Juleha BNSP, RPH Modern ber-NKV & Sertifikat Halal BPJPH',
  },
];

export const REAL_SUPPLIERS: HalalSupplier[] = [
  {
    id: 1,
    name: 'PT Bunda Halal Foods Nusantara',
    legalName: 'PT Bunda Halal Foods Nusantara',
    nib: '9120005432190',
    region: 'Jawa Barat',
    city: 'Bandung Barat',
    address: 'Kawasan Industri Halal Mandiri Kav. 12, Padalarang, Bandung Barat',
    categories: 'Makanan Olahan, Rendang Pouch, Bumbu Masak',
    verified: true,
    halalCertNumber: 'ID32110000123450223',
    halalSupervisor: 'Ir. Ahmad Zarkasih, M.Si',
    supervisorCert: 'Sertifikasi BNSP Juleha & Penyelia Halal No. 19283-BNSP-2022',
    omax: 94,
    rating: 4.9,
    reviews: 320,
    productsCount: 18,
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    avatar: '🍲',
    phone: '+62 812-3456-7890',
    email: 'kemitraan@bundahalalfoods.co.id',
    description: 'Produsen olahan daging dan bumbu Nusantara berbasis sterilisasi retort modern. Memiliki sertifikasi SJPH A (Sangat Baik) dari BPJPH dan memasok lebih dari 200 jaringan supermarket serta horeka halal di Jabodetabek & Jawa Barat.',
    establishedYear: 2016,
  },
  {
    id: 2,
    name: 'PT Malindo RPH Halal Modern',
    legalName: 'PT Malindo Feed & Slaughterhouse Tbk Unit Halal',
    nib: '8120004321098',
    region: 'Jawa Barat',
    city: 'Bekasi',
    address: 'Jl. Raya Industri Cikarang Barat No. 88, Cikarang, Bekasi',
    categories: 'Daging Sapi Segar, Daging Ayam Broiler Halal, Karkas',
    verified: true,
    halalCertNumber: 'ID32160000881230422',
    halalSupervisor: 'Dr. H. Muhammad Rasyid, DVM',
    supervisorCert: 'Penyelia Halal BPJPH & Dokter Hewan Berwenang RPH',
    omax: 98,
    rating: 5.0,
    reviews: 412,
    productsCount: 24,
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
    avatar: '🐄',
    phone: '+62 811-9876-5432',
    email: 'rph-cikarang@malindohalal.co.id',
    description: 'Rumah Potong Hewan (RPH) berstandar internasional dengan Nomor Kontrol Veteriner (NKV) Level 1 dan sertifikat halal BPJPH. Seluruh pemotongan dilakukan manual oleh Juleha bersertifikasi dengan sistem traceability batch QR code.',
    establishedYear: 2012,
  },
  {
    id: 3,
    name: 'Koperasi Kopi Barokah Takengon',
    legalName: 'Koperasi Produsen Kopi Barokah Gayo Lestari',
    nib: '9120003210987',
    region: 'Aceh',
    city: 'Aceh Tengah',
    address: 'Desa Bebesen, Takengon, Kabupaten Aceh Tengah, Nanggroe Aceh Darussalam',
    categories: 'Green Beans Arabika, Roasted Coffee, Cascara',
    verified: true,
    halalCertNumber: 'ID11210000876540122',
    halalSupervisor: 'Teuku Iskandar Syah, S.Pt',
    supervisorCert: 'Penyelia Halal BPJPH Aceh No. AC-089-2022',
    omax: 91,
    rating: 4.9,
    reviews: 280,
    productsCount: 12,
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    avatar: '☕',
    phone: '+62 852-6789-0123',
    email: 'export@barokahgayo.id',
    description: 'Wadah lebih dari 350 petani kopi lereng Gunung Burni Telong. Menghasilkan specialty Arabika Gayo bersertifikat Indikasi Geografis (IG), Organik, dan Halal 100% tanpa kontaminasi zat perasa kimiawi.',
    establishedYear: 2014,
  },
  {
    id: 4,
    name: 'CV Rempah Alam Nusantara',
    legalName: 'CV Rempah Alam Nusantara Mandiri',
    nib: '9120008765432',
    region: 'D.I. Yogyakarta',
    city: 'Kulon Progo',
    address: 'Sentolo Agro-Industrial Park No. 45, Kulon Progo, Yogyakarta',
    categories: 'Bumbu Basah, Rempah Bubuk Kering, Ekstrak Jahe & Temulawak',
    verified: true,
    halalCertNumber: 'ID34020000778891223',
    halalSupervisor: 'Siti Nurjanah, S.T.P',
    supervisorCert: 'Penyelia Halal BPJPH DIY No. YK-044-2023',
    omax: 92,
    rating: 4.8,
    reviews: 195,
    productsCount: 30,
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    avatar: '🌿',
    phone: '+62 813-2890-1234',
    email: 'sales@rempahalam.co.id',
    description: 'Penyedia bahan baku rempah dan bumbu masak segar maupun simplisia kering higienis untuk kebutuhan industri bumbu halal dan produsen makanan siap saji nusantara.',
    establishedYear: 2018,
  },
  {
    id: 5,
    name: 'KPBS Pangalengan Dairy Hub',
    legalName: 'Koperasi Peternak Sapi Bandung Selatan (KPBS)',
    nib: '9120006543210',
    region: 'Jawa Barat',
    city: 'Kabupaten Bandung',
    address: 'Jl. Raya Pangalengan No. 340, Pangalengan, Bandung',
    categories: 'Susu Sapi Segar, Susu Pasteurisasi, Mentega Halal, Keju Mozzarella',
    verified: true,
    halalCertNumber: 'ID32040000998810623',
    halalSupervisor: 'Drs. H. Dadang Mulyana',
    supervisorCert: 'Sertifikasi Auditor & Penyelia Halal LPPOM-BPJPH',
    omax: 96,
    rating: 4.8,
    reviews: 430,
    productsCount: 15,
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    avatar: '🥛',
    phone: '+62 821-1234-5678',
    email: 'info@kpbspangalengan.co.id',
    description: 'Salah satu sentra produksi susu sapi terbesar di Pulau Jawa. Mengelola peternakan sapi modern dengan uji TPC (Total Plate Count) ketat dan rantai pendingin cold chain dari ambing sapi hingga ke pabrik olahan.',
    establishedYear: 1969,
  },
  {
    id: 6,
    name: 'CV Alam Lestari Nusantara',
    legalName: 'CV Alam Lestari NTB',
    nib: '9120007654321',
    region: 'Nusa Tenggara Barat',
    city: 'Sumbawa Besar',
    address: 'Kawasan Hutan Lindung Batulanteh, Sumbawa, NTB',
    categories: 'Madu Hutan Sumbawa, Propolis, Bee Pollen',
    verified: true,
    halalCertNumber: 'ID52010000432190922',
    halalSupervisor: 'Lalu Muhammad Ridwan',
    supervisorCert: 'Penyelia Halal BPJPH NTB',
    omax: 89,
    rating: 4.7,
    reviews: 140,
    productsCount: 8,
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    avatar: '🍯',
    phone: '+62 878-6543-2109',
    email: 'madu@alamlestarisumbawa.com',
    description: 'Pemanen dan pembina kelompok tani hutan lebah madu alam Sumbawa. Seluruh proses penyaringan dilakukan secara mekanis higienis tanpa fermentasi tambahan maupun pemanis buatan.',
    establishedYear: 2017,
  }
];

export const REAL_DISTRIBUTOR_FLEETS: DistributorFleet[] = [
  {
    id: 'FLEET-001',
    vehiclePlate: 'B 9482 PXZ',
    fleetType: 'Truk Refrigerator Box (Thermo King V-500)',
    operator: 'PT Pos Logistik Halal Cold Chain',
    driverName: 'Pak Joko Sudarmo',
    driverPhone: '0812-8877-6655',
    route: 'Jakarta Hub (Cakung) ➔ Bandung Distribution Center',
    currentLocation: 'Tol Cipularang KM 88 (Arah Bandung)',
    temperature: -18.4,
    humidity: 62,
    targetTemp: '-18°C s/d -20°C (Frozen Food)',
    sealStatus: 'Aman (Terkunci)',
    sealCode: 'RFID-SH-99214',
    gpsStatus: 'Online',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'FLEET-002',
    vehiclePlate: 'D 8812 AB',
    fleetType: 'Chilled Box Isuzu Giga (Carrier Transicold)',
    operator: 'PT Kamadjaja Logistics Halal Division',
    driverName: 'Kang Asep Ridwan',
    driverPhone: '0813-9988-7766',
    route: 'Pangalengan Dairy ➔ Ritel Modern Jabodetabek',
    currentLocation: 'Rest Area KM 57 Tol Japek',
    temperature: 3.2,
    humidity: 78,
    targetTemp: '2°C s/d 4°C (Fresh Milk & Dairy)',
    sealStatus: 'Aman (Terkunci)',
    sealCode: 'RFID-SH-88412',
    gpsStatus: 'Online',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'FLEET-003',
    vehiclePlate: 'L 9210 UK',
    fleetType: 'Heavy Cold Storage Container 40ft',
    operator: 'Samudera Cold Chain Indonesia',
    driverName: 'Pak Bambang Santoso',
    driverPhone: '0811-2233-4455',
    route: 'Pelabuhan Tanjung Perak ➔ Pelabuhan Tanjung Priok',
    currentLocation: 'Tol Trans Jawa KM 320 Pemalang',
    temperature: -20.1,
    humidity: 58,
    targetTemp: '-20°C (Daging & Seafood Halal)',
    sealStatus: 'Aman (Terkunci)',
    sealCode: 'RFID-SH-77109',
    gpsStatus: 'Online',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80',
  },
];
