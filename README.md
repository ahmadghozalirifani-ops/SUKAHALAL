# 🌿 SUKAHALAL — Platform Rantai Pasok & Marketplace Halal UMKM

> **SUKAHALAL** adalah platform ekosistem rantai pasok (*supply chain*) dan marketplace halal berbasis digital yang dirancang khusus untuk memfasilitasi UMKM Indonesia dalam mengelola, memverifikasi, dan mendistribusikan produk halal secara transparan dari hulu ke hilir.

---

## 📌 Ringkasan Eksekutif

Di era kesadaran konsumsi produk halal yang kian meningkat, transparansi sumber bahan baku dan keaslian sertifikasi halal menjadi kunci kepercayaan konsumen. **SUKAHALAL** hadir menghubungkan seluruh aktor ekosistem halal—mulai dari petani/supplier bahan baku, produsen/UMKM, pengemas, distributor, hingga konsumen akhir—dalam satu platform terintegrasi yang terhubung dengan standar sertifikasi BPJPH.

---

## ✨ Fitur Utama Platform

### 1. 🔐 Multi-Role Access & Custom Dashboard
Aplikasi menyediakan antarmuka dan pengalaman khusus sesuai peran pengguna:
- **🛒 Penjual / Seller (UMKM)**: Pengelolaan katalog produk, manajemen inventaris stok, kampanye promosi marketing, pengajuan verifikasi BPJPH, dan laporan penjualan.
- **🚛 Distributor**: Pemantauan alur rantai pasok visual, jaringan supplier terhubung, manajemen rute pengiriman, dan integrasi API logistik.
- **👤 Konsumen (Customer)**: Pencarian & filter produk halal tayiban, melihat transparansi jejak rantai pasok produk, keranjang belanja syariah, dan pelacakan pesanan.

### 2. 🔗 Manajemen Rantai Pasok Visual (*Supply Chain Traceability*)
- Visualisasi alur pasok terintegrasi: **Supplier → Manufacturer → Packager → Distributor → Retailer**.
- Penambahan dan verifikasi anggota rantai pasok dengan badge **Halal Tayiban**.
- Detail sertifikasi dan transparansi dokumen bahan baku di setiap node.

### 3. 🛡️ Pusat Verifikasi & Upload Dokumen BPJPH
- Alur verifikasi sertifikat halal 4-tahap (Pengajuan → AI Analysis → Review BPJPH → Sertifikat Diterbitkan).
- AI-Assist Document Extractor untuk memproses dokumen sertifikat halal secara otomatis.
- Manajemen masa berlaku dokumen dan notifikasi kedaluwarsa.

### 4. 🛒 Keranjang & Transaksi Pembayaran Syariah
- Pengelolaan keranjang belanja dengan kalkulasi ongkos kirim berbagai kurir (JNE, J&T, SiCepat, AnterAja, Pos Indonesia).
- Pilihan metode pembayaran berbasis Syariah (Transfer Bank Syariah, QRIS, E-Wallet Syariah, COD).
- Manajemen siklus status pesanan real-time (*Baru → Diproses → Dikirim → Selesai*).

### 5. 📢 Marketing & Promosi Produk Halal
- Peluncuran kampanye promo (Diskon Produk, Flash Sale Jumat Halal, Bundle Ramadan Berkah).
- Analitik jangkauan (*reach*) dan konversi pesanan dari setiap kampanye.

### 6. 📊 Analitik & Laporan Performa
- Grafik grafik pendapatan bulanan, produk terlaris (*Top Products*), dan retensi pelanggan.
- Ekspor data untuk keperluan audit dan pelaporan operasional.

### 7. ⚙️ Pusat Pengaturan & Edukasi
- Pengaturan profil bisnis, keamanan akun (Ubah Password/2FA), dan preferensi bahasa (ID/EN).
- **Pusat Tutorial**: Panduan interaktif visual, modal player video tutorial, dan layanan bantuan Support/WhatsApp.

---

## 🛠️ Arsitektur & Teknologi

- **Frontend Framework**: React 19 & TypeScript 5.7
- **Build Tool**: Vite 8
- **Styling System**: Tailwind CSS v4 (menggunakan `@tailwindcss/vite`)
- **Desain UI/UX**: Clean, Modern, Accessibility-First dengan tema warna Halal-Emerald (`#16a34a`), Warm Amber, dan Trust Blue.
- **Demo Prototype Navigation**: Floating quick-nav widget untuk perpindahan antar-halaman secara cepat saat demonstrasi.

---

## 📁 Struktur Direktori Utama

```
proyek1/
├── src/
│   ├── App.tsx                   # Main Router & Global State Management
│   ├── index.css                 # Global Tailwind v4 CSS imports
│   ├── main.tsx                  # React Entrypoint
│   └── pages/
│       ├── LandingPage.tsx       # Beranda Utama & Quick Access
│       ├── LoginSeller.tsx       # Login khusus Seller/UMKM
│       ├── LoginDistributor.tsx  # Login khusus Distributor
│       ├── LoginCustomer.tsx     # Login khusus Konsumen
│       ├── Register.tsx          # Pendaftaran Multi-Step (Seller/Distributor/Customer)
│       ├── Dashboard.tsx         # Dashboard Role-Based (Seller/Distributor/Customer)
│       ├── ProductCatalog.tsx    # Katalog Produk Halal B2B2C
│       ├── ProductDetail.tsx     # Detail Produk & Transparansi Rantai Pasok
│       ├── SupplierCatalog.tsx   # Katalog Pemasok Bahan Baku Halal
│       ├── SupplierProfile.tsx   # Profil & Sertifikasi Pemasok
│       ├── SupplyChain.tsx       # Visualisasi Rantai Pasok Hulu-Hilir
│       ├── VerificationCenter.tsx# Alur Verifikasi Sertifikat BPJPH
│       ├── UploadDokumen.tsx     # Upload & AI Extractor Dokumen Halal
│       ├── Pesanan.tsx           # Manajemen Pesanan Masuk & Keluar
│       ├── Inventaris.tsx        # Monitoring & Update Stok Produk
│       ├── Keranjang.tsx         # Keranjang & Checkout Pembayaran Syariah
│       ├── Marketing.tsx         # Manajemen Kampanye Diskon & Promo
│       ├── Laporan.tsx           # Laporan Finansial & Analitik Penjualan
│       ├── Notifikasi.tsx        # Pusat Notifikasi Real-time
│       ├── Settings.tsx          # Pengaturan Profil, Keamanan & Preferensi
│       └── Tutorial.tsx          # Pusat Panduan & Dukungan Bantuan
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🚀 Cara Menjalankan Proyek Lokal

1. **Install Dependensi**:
   ```bash
   pnpm install
   # atau npm install
   ```

2. **Jalankan Server Pengembang (Dev Server)**:
   ```bash
   pnpm dev
   # atau npm run dev
   ```

3. Buka browser di alamat `http://localhost:8443` (atau port yang tertera pada terminal).

---

© 2024–2026 **SUKAHALAL Indonesia**. Seluruh hak cipta dilindungi.
