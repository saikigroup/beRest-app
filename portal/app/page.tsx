"use client";

import { useState } from "react";

/* ─── Flat Vector SVG Icons ─── */

function IconLapak({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Shop awning */}
      <rect x="8" y="20" width="48" height="6" rx="3" fill="#10B981" />
      <path d="M8 26 L8 20 Q8 14 14 14 L50 14 Q56 14 56 20 L56 26" stroke="#059669" strokeWidth="2" fill="none" />
      {/* Scalloped awning bottom */}
      <path d="M8 26 Q14 32 20 26 Q26 32 32 26 Q38 32 44 26 Q50 32 56 26" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
      {/* Shop body */}
      <rect x="12" y="30" width="40" height="22" rx="2" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
      {/* Door */}
      <rect x="26" y="38" width="12" height="14" rx="1" fill="#10B981" />
      <circle cx="35" cy="46" r="1.5" fill="#059669" />
      {/* Window */}
      <rect x="16" y="34" width="8" height="8" rx="1" fill="#ECFDF5" stroke="#10B981" strokeWidth="1" />
      <line x1="20" y1="34" x2="20" y2="42" stroke="#10B981" strokeWidth="0.8" />
      <line x1="16" y1="38" x2="24" y2="38" stroke="#10B981" strokeWidth="0.8" />
    </svg>
  );
}

function IconSewa({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Roof */}
      <path d="M10 28 L32 10 L54 28" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" strokeLinejoin="round" />
      {/* House body */}
      <rect x="14" y="28" width="36" height="24" rx="2" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
      {/* Key icon overlay */}
      <circle cx="32" cy="37" r="5" fill="#3B82F6" />
      <circle cx="32" cy="37" r="2.5" fill="#EFF6FF" />
      <rect x="31" y="42" width="2" height="7" rx="1" fill="#3B82F6" />
      <rect x="33" y="45" width="3" height="1.5" rx="0.5" fill="#3B82F6" />
      <rect x="33" y="47" width="2" height="1.5" rx="0.5" fill="#3B82F6" />
      {/* Windows */}
      <rect x="18" y="32" width="6" height="6" rx="1" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="0.8" />
      <rect x="40" y="32" width="6" height="6" rx="1" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="0.8" />
    </svg>
  );
}

function IconWarga({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Center person */}
      <circle cx="32" cy="20" r="7" fill="#8B5CF6" />
      <path d="M20 44 Q20 33 32 33 Q44 33 44 44" fill="#C4B5FD" stroke="#8B5CF6" strokeWidth="1.5" />
      {/* Left person */}
      <circle cx="16" cy="24" r="5" fill="#A78BFA" />
      <path d="M8 42 Q8 34 16 34 Q22 34 23 38" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1" />
      {/* Right person */}
      <circle cx="48" cy="24" r="5" fill="#A78BFA" />
      <path d="M56 42 Q56 34 48 34 Q42 34 41 38" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1" />
      {/* Connection lines */}
      <path d="M22 26 L27 22" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M42 26 L37 22" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
      {/* Checkmark badge */}
      <circle cx="44" cy="44" r="6" fill="#8B5CF6" />
      <path d="M41 44 L43.5 46.5 L47 41.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHajat({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Envelope base */}
      <rect x="8" y="18" width="48" height="32" rx="4" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.5" />
      {/* Envelope flap */}
      <path d="M8 22 L32 38 L56 22" fill="#FBCFE8" stroke="#EC4899" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Heart */}
      <path d="M27 28 Q27 24 31 24 Q33 24 33 27 Q33 24 35 24 Q39 24 39 28 Q39 33 33 37 Q27 33 27 28Z" fill="#EC4899" />
      {/* Sparkles */}
      <circle cx="18" cy="14" r="1.5" fill="#F9A8D4" />
      <circle cx="48" cy="12" r="2" fill="#FBCFE8" />
      <circle cx="52" cy="18" r="1" fill="#F9A8D4" />
      <path d="M14 10 L15 8 L16 10 L18 11 L16 12 L15 14 L14 12 L12 11Z" fill="#EC4899" />
    </svg>
  );
}

function IconEasy({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="12" y="4" width="24" height="40" rx="4" fill="#F1F5F9" stroke="#1B3A5C" strokeWidth="2" />
      <circle cx="24" cy="38" r="2" fill="#1B3A5C" />
      <rect x="16" y="12" width="16" height="3" rx="1.5" fill="#FF4600" />
      <rect x="16" y="18" width="10" height="2" rx="1" fill="#CBD5E1" />
      <rect x="16" y="23" width="14" height="2" rx="1" fill="#CBD5E1" />
      <path d="M30 28 L33 31 L38 24" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconConnected({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="14" cy="24" r="8" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
      <circle cx="34" cy="24" r="8" fill="#FEE2E2" stroke="#FF4600" strokeWidth="1.5" />
      <path d="M22 24 L26 24" stroke="#1B3A5C" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 21 L22 24 L20 27" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 21 L26 24 L28 27" stroke="#FF4600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bolt */}
      <path d="M23 16 L25 14 L24 19 L26 17" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPortal({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="16" fill="#F0FDF4" stroke="#1B3A5C" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="8" ry="16" fill="none" stroke="#1B3A5C" strokeWidth="1.5" />
      <line x1="8" y1="24" x2="40" y2="24" stroke="#1B3A5C" strokeWidth="1.5" />
      <line x1="10" y1="16" x2="38" y2="16" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="10" y1="32" x2="38" y2="32" stroke="#CBD5E1" strokeWidth="1" />
      <circle cx="36" cy="36" r="6" fill="#FF4600" />
      <path d="M34 36 L36 36 L36 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 36 L39 33" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ApickLogo() {
  return (
    <svg width="180" height="56" viewBox="0 0 180 56" fill="none">
      {/* 'a' shape stylized */}
      <text x="0" y="44" fontFamily="system-ui, -apple-system, sans-serif" fontSize="46" fontWeight="800" fill="white" letterSpacing="-1">
        apick
      </text>
    </svg>
  );
}

/* ─── Module Detail Data ─── */

const modules = [
  {
    id: "lapak",
    name: "apick lapak",
    tagline: "Catat dagangan, fokus jualan.",
    color: "#10B981",
    colorLight: "#D1FAE5",
    icon: IconLapak,
    story: `Bayangin Pak Edi, pedagang nasi goreng di pinggir jalan. Tiap malem jualan, tiap pagi lupa berapa omzet kemarin. Nota kertas hilang kena minyak. Istri nanya "untung berapa bulan ini?" — bingung jawabnya.`,
    solution: `Dengan apick lapak, Pak Edi cuma perlu tap 1 tombol tiap kali ada yang beli. Malam selesai, langsung keliatan: omzet hari ini berapa, untung bersih berapa, trend minggu ini naik atau turun.`,
    features: [
      { title: "1-Tap Catat Jualan", desc: "Ketuk produk → otomatis tercatat. Ga perlu ketik nominal satu-satu. Secepat terima uang, secepat itu juga nyatatnya." },
      { title: "4 Mode Usaha", desc: "Pedagang biasa, laundry (tracking 6 tahap), guru/pelatih (jadwal + absensi + billing murid), jasa antrian (barbershop, servis). Satu app buat semua." },
      { title: "Untung Rugi Otomatis", desc: "Masukin pengeluaran (belanja bahan, gas, dll), apick langsung hitung untung bersih. Harian, mingguan, bulanan. Ada grafiknya." },
      { title: "Scan Nota AI", desc: "Foto struk belanja bahan → Gemini AI langsung baca dan masukin sebagai pengeluaran. Ga perlu ketik manual." },
      { title: "Database Pelanggan", desc: "Otomatis kumpulin data pelanggan dari semua transaksi. Siapa yang paling sering beli, total belanja berapa." },
      { title: "Web Katalog", desc: "Dapat link apick.id/wk/namalapak yang bisa dishare ke pembeli. Mereka bisa lihat menu dan harga tanpa install app." },
    ],
  },
  {
    id: "sewa",
    name: "apick sewa",
    tagline: "Kelola properti, tanpa ribet.",
    color: "#3B82F6",
    colorLight: "#DBEAFE",
    icon: IconSewa,
    story: `Bu Ratna punya 12 kamar kos. Tiap bulan pusing ngingetin anak kos bayar. Ada yang telat 3 bulan, ada yang minta AC dibenerin dari minggu lalu, ada kamar kosong yang belum diiklanin. Catatannya? Buku tulis yang udah kumel.`,
    solution: `apick sewa bikin Bu Ratna bisa lihat semua status kamar dalam 1 layar. Siapa yang udah bayar, siapa yang nunggak, maintenance mana yang belum dikerjain. Reminder otomatis ke anak kos tiap tanggal jatuh tempo.`,
    features: [
      { title: "Dashboard Properti", desc: "Satu layar: berapa kamar terisi, berapa kosong, total pemasukan bulan ini. Mau punya 5 properti berbeda? Tinggal swipe." },
      { title: "Tagihan Otomatis", desc: "Set tanggal jatuh tempo sekali, apick generate tagihan tiap bulan otomatis. Penghuni bisa upload bukti bayar langsung dari app." },
      { title: "Laporan Maintenance", desc: "Penghuni lapor kerusakan dari app (AC bocor, kunci rusak). Masuk ke dashboard pemilik dengan priority level. Track sampai selesai." },
      { title: "Kontrak Digital", desc: "Bikin template kontrak, isi data penghuni, simpan di vault digital. Ga perlu folder fisik lagi." },
      { title: "Rental Barang", desc: "Punya usaha rental kamera, sound system, alat camping? Track stok, siapa yang minjem, kapan deadline balikin, biaya otomatis dihitung." },
      { title: "Share Kamar Kosong", desc: "1 tap share info kamar kosong lengkap (harga, fasilitas, foto) ke WhatsApp. Bisa satu-satu atau semua sekaligus." },
    ],
  },
  {
    id: "warga",
    name: "apick warga",
    tagline: "Iuran transparan, warga tenang.",
    color: "#8B5CF6",
    colorLight: "#EDE9FE",
    icon: IconWarga,
    story: `Pak Bambang jadi bendahara RT udah 3 tahun. Tiap bulan nagih iuran door-to-door. Dicatet di buku. Akhir tahun diminta laporan — harus ngitung ulang dari Januari. Ada warga yang nanya "duit iuran kemarin dipake buat apa?" dan Pak Bambang harus buka-buka buku lagi.`,
    solution: `Sekarang Pak Bambang cuma buka apick warga. Semua iuran tercatat digital. Warga bisa cek status bayar sendiri dari link. Laporan keuangan? Tinggal share link — otomatis update, transparan, ga ada yang curiga.`,
    features: [
      { title: "Organisasi Fleksibel", desc: "Bisa buat RT/RW, pengajian, mesjid, arisan, komunitas hobi — apa aja yang butuh iuran dan anggota. Ga cuma buat warga perumahan." },
      { title: "Catat Iuran 1 Tap", desc: "Checklist siapa yang udah bayar. Otomatis keliatan siapa yang nunggak. Bisa kirim reminder ke WhatsApp langsung dari app." },
      { title: "Laporan Publik", desc: "Link apick.id/rt/laporan bisa dibagikan ke seluruh warga. Mereka lihat pemasukan, pengeluaran, saldo — real-time, tanpa install app." },
      { title: "Mode Mesjid", desc: "Fitur khusus: catat infaq harian (bisa anonim 'Hamba Allah'), fundraising dengan target dan progress bar, laporan infaq publik." },
      { title: "Pengumuman", desc: "Bikin pengumuman, otomatis ke-track siapa yang udah baca, siapa yang belum. Bisa share ke WhatsApp group juga." },
      { title: "Jadwal Piket", desc: "Atur jadwal ronda, piket kebersihan, jadwal imam. Anggota bisa request tukar jadwal. Semua tercatat." },
    ],
  },
  {
    id: "hajat",
    name: "apick hajat",
    tagline: "Undang tamu, tanpa drama.",
    color: "#EC4899",
    colorLight: "#FCE7F3",
    icon: IconHajat,
    story: `Mbak Dina mau nikahan bulan depan. Bikin undangan digital di platform lain — bayar Rp 150.000 cuma buat 1 template. Terus harus input tamu satu-satu, ga bisa tracking siapa yang udah konfirmasi. Pas hari H, ngitung amplop manual sambil senyum-senyum sama tamu.`,
    solution: `Di apick hajat, Mbak Dina bikin undangan gratis — teks dibuatin AI, tinggal edit. Share ke WhatsApp per orang. Tamu RSVP dari link. Hari H tinggal checklist kehadiran. Amplop langsung dicatat, total keliatan real-time.`,
    features: [
      { title: "7 Jenis Acara", desc: "Nikahan, khitanan, aqiqah, tahlilan, syukuran, ulang tahun, dan acara custom. Masing-masing punya template yang sesuai." },
      { title: "AI Bikin Teks Undangan", desc: "Ketik nama acara dan tanggal, Gemini AI langsung buatkan teks undangan yang sopan dan siap share ke WhatsApp. Tinggal edit kalau mau." },
      { title: "RSVP Tracking", desc: "Setiap tamu dapat link personal. Mereka konfirmasi hadir/tidak langsung dari browser, tanpa install app. Status masuk ke dashboard kamu real-time." },
      { title: "Check-in Hari H", desc: "Hari acara, tinggal checklist tamu yang dateng. Keliatan berapa yang confirmed tapi ga dateng, berapa yang dateng tanpa konfirmasi." },
      { title: "Amplop Tracker", desc: "Catat amplop yang masuk saat acara. Dari siapa, berapa. Total langsung keliatan. Ga perlu ngitung ulang di rumah." },
      { title: "Saran Nominal Amplop", desc: "Fitur consumer: mau dateng ke acara temen? apick kasih saran berapa nominal amplop yang wajar berdasarkan jenis acara dan hubungan. Plus history amplop kamu dari acara-acara sebelumnya." },
    ],
  },
];

/* ─── Expandable Module Section ─── */

function ModuleSection({
  mod,
  index,
  isExpanded,
  onToggle,
}: {
  mod: (typeof modules)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isEven = index % 2 === 0;
  const Icon = mod.icon;

  return (
    <section
      id={mod.id}
      className="py-20 px-4"
      style={{ backgroundColor: index % 2 === 0 ? "white" : "#FAFBFC" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header row */}
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}>
          {/* Icon */}
          <div
            className="flex-shrink-0 w-32 h-32 rounded-3xl flex items-center justify-center animate-float"
            style={{ backgroundColor: mod.colorLight }}
          >
            <Icon size={72} />
          </div>

          {/* Story */}
          <div className="flex-1 text-center md:text-left">
            <h2
              className="text-sm font-bold tracking-widest uppercase mb-2"
              style={{ color: mod.color }}
            >
              {mod.name}
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4">
              {mod.tagline}
            </p>
            <p className="text-[#64748B] leading-relaxed mb-4">
              {mod.story}
            </p>
            <p className="text-[#1E293B] leading-relaxed font-medium">
              {mod.solution}
            </p>
          </div>
        </div>

        {/* Learn More Toggle */}
        <div className="mt-10 text-center">
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:shadow-md"
            style={{
              backgroundColor: isExpanded ? mod.color : mod.colorLight,
              color: isExpanded ? "white" : mod.color,
            }}
          >
            {isExpanded ? "Tutup Detail" : "Lihat Semua Fitur"}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Expanded Features */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "mt-10 max-h-[2000px] opacity-100" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          {mod.features.map((f, i) => (
            <div
              key={f.title}
              className="p-5 rounded-2xl border transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: mod.colorLight,
                backgroundColor: "white",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-3"
                style={{ backgroundColor: mod.color }}
              >
                {i + 1}
              </div>
              <h4 className="font-bold text-[#1E293B] mb-2">{f.title}</h4>
              <p className="text-sm text-[#64748B] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */

export default function HomePage() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-[#1B3A5C] text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
          <div className="animate-fade-up">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-3">
              apick
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-80 mb-6">
              Life, well arranged.
            </p>
          </div>

          <p className="animate-fade-up-delay-1 text-lg md:text-xl opacity-70 max-w-2xl mx-auto mb-4 leading-relaxed">
            Kamu pedagang yang tiap hari lupa berapa untungnya?
            <br className="hidden md:block" />
            Ibu kos yang pusing nagih anak kos?
            <br className="hidden md:block" />
            Bendahara RT yang capek ngitung manual?
          </p>

          <p className="animate-fade-up-delay-2 text-base md:text-lg opacity-50 max-w-xl mx-auto mb-10">
            apick bantu kamu kelola semuanya dari 1 app.
            <br />
            Simpel. Ga ribet. Kayak buka WhatsApp aja.
          </p>

          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=id.apick.app"
              className="inline-flex items-center gap-3 bg-[#FF4600] text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-[#E63E00] transition-colors shadow-lg shadow-orange-500/20"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="white" />
                <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="white" opacity="0.8" />
                <path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81Z" fill="white" opacity="0.6" />
                <path d="M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" fill="white" opacity="0.9" />
              </svg>
              Download Gratis
            </a>
            <a
              href="#lapak"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-base"
            >
              Atau scroll dulu
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Quick Module Nav ═══ */}
      <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto">
          {modules.map((m) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all hover:shadow-md"
              style={{
                backgroundColor: m.colorLight,
                color: m.color,
              }}
            >
              <m.icon size={20} />
              <span className="hidden sm:inline">{m.name}</span>
              <span className="sm:hidden">{m.id}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ Modules ═══ */}
      {modules.map((mod, i) => (
        <ModuleSection
          key={mod.id}
          mod={mod}
          index={i}
          isExpanded={expandedModule === mod.id}
          onToggle={() =>
            setExpandedModule(expandedModule === mod.id ? null : mod.id)
          }
        />
      ))}

      {/* ═══ Why apick ═══ */}
      <section className="bg-[#1B3A5C] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Kenapa harus apick?
          </h2>
          <p className="text-center text-white/60 mb-12 max-w-xl mx-auto">
            Dibuat khusus buat orang Indonesia yang butuh app simpel, bukan app yang bikin tambah pusing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                <IconEasy size={40} />
              </div>
              <h3 className="font-bold text-lg mb-2">Gampang Banget</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Kalau kamu bisa buka WhatsApp, kamu bisa pakai apick. Serius. 1 layar 1 tugas, bahasa manusia, tombol gede.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                <IconConnected size={40} />
              </div>
              <h3 className="font-bold text-lg mb-2">Nyambung Real-time</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Kamu catat, pelanggan langsung lihat. Warga bayar iuran, bendahara langsung tau. Ga perlu telepon-teleponan.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                <IconPortal size={40} />
              </div>
              <h3 className="font-bold text-lg mb-2">Bisa Via Browser</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Setiap data bisa di-share via link. Pelanggan, penyewa, warga — mereka cukup buka link, ga perlu install app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
            Mulai dalam 2 menit
          </h2>
          <p className="text-[#64748B] mb-12">
            Ga perlu setting ribet. Ga perlu tutorial panjang.
          </p>

          <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-4">
            {[
              {
                step: "1",
                title: "Download & Login",
                desc: "Login pakai Google atau nomor HP. Selesai.",
              },
              {
                step: "2",
                title: "Pilih Modul",
                desc: "Mau kelola apa? Lapak? Kos-kosan? RT? Hajatan? Pilih yang kamu butuh.",
              },
              {
                step: "3",
                title: "Langsung Pakai",
                desc: "Ikuti panduan pertama. Data langsung bisa diisi. Ga ada trial, ga ada paywall.",
              },
            ].map((s, i) => (
              <div key={s.step} className="flex-1 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#FF4600] text-white flex items-center justify-center text-xl font-bold mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-[#1E293B] mb-2">{s.title}</h3>
                <p className="text-sm text-[#64748B]">{s.desc}</p>
                {i < 2 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mt-4 md:hidden text-gray-300">
                    <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Social Proof / Stats ═══ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "4", label: "Modul lengkap" },
              { value: "Gratis", label: "Tanpa kartu kredit" },
              { value: "< 2 menit", label: "Mulai pakai" },
              { value: "24/7", label: "Data aman di cloud" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-extrabold text-[#1B3A5C]">{s.value}</div>
                <div className="text-sm text-[#64748B] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="py-20 px-4 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
            Udah capek ngitung manual?
          </h2>
          <p className="text-lg text-[#64748B] mb-8">
            Ga ada alasan buat nunda lagi. Download sekarang, gratis, langsung pakai.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=id.apick.app"
            className="inline-flex items-center gap-3 bg-[#FF4600] text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-[#E63E00] transition-colors shadow-lg shadow-orange-500/25"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="white" />
              <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="white" opacity="0.8" />
              <path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81Z" fill="white" opacity="0.6" />
              <path d="M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" fill="white" opacity="0.9" />
            </svg>
            Download apick
          </a>
          <p className="text-xs text-[#94A3B8] mt-4">
            Android. Gratis. Tanpa iklan.
          </p>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-gray-100 bg-[#1B3A5C] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-extrabold">apick</h3>
              <p className="text-white/50 text-sm mt-1">Life, well arranged.</p>
            </div>

            <div className="flex items-center gap-6 text-sm text-white/50">
              {modules.map((m) => (
                <a
                  key={m.id}
                  href={`#${m.id}`}
                  className="hover:text-white transition-colors"
                >
                  {m.id}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/30">
              &copy; 2026 apick. Dibuat dengan cinta di Indonesia.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
