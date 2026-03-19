"use client";

import { useState, useEffect } from "react";

const screens = [
  {
    id: "lapak",
    color: "#10B981",
    colorLight: "#D1FAE5",
    title: "Penjualan Hari Ini",
    stats: [
      { label: "Omzet", value: "Rp 847.000" },
      { label: "Untung", value: "Rp 312.000" },
    ],
    items: ["Nasi Goreng ×12", "Mie Goreng ×8", "Es Teh ×15"],
  },
  {
    id: "sewa",
    color: "#3B82F6",
    colorLight: "#DBEAFE",
    title: "Properti Kos Melati",
    stats: [
      { label: "Terisi", value: "10/12" },
      { label: "Tagihan", value: "Rp 4.2jt" },
    ],
    items: ["Kamar 3A — Lunas", "Kamar 5B — Nunggak 2 bln", "Kamar 7 — Kosong"],
  },
  {
    id: "warga",
    color: "#8B5CF6",
    colorLight: "#EDE9FE",
    title: "Iuran RT 05",
    stats: [
      { label: "Terkumpul", value: "Rp 3.1jt" },
      { label: "Lunas", value: "38/45" },
    ],
    items: ["Pak Ahmad — Lunas", "Bu Sari — Lunas", "Pak Dedi — Belum"],
  },
  {
    id: "hajat",
    color: "#EC4899",
    colorLight: "#FCE7F3",
    title: "Pernikahan Dina & Ari",
    stats: [
      { label: "Hadir", value: "127" },
      { label: "Amplop", value: "Rp 18.5jt" },
    ],
    items: ["Keluarga Besar — 45 hadir", "Teman Kantor — 32 hadir", "Tetangga — 50 hadir"],
  },
];

export function PhoneMockup() {
  const [activeIdx, setActiveIdx] = useState(0);
  const screen = screens[activeIdx];

  // Auto-rotate screens
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % screens.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-float">
      <div className="phone-frame w-[220px] md:w-[260px]">
        <div className="phone-screen">
          <div className="phone-notch" />

          {/* Mini app screen */}
          <div className="p-4 min-h-[340px] md:min-h-[380px]">
            {/* Status bar */}
            <div
              className="text-[10px] font-bold text-white px-3 py-1.5 rounded-lg mb-3 text-center"
              style={{ backgroundColor: screen.color }}
            >
              {screen.title}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {screen.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg p-2 text-center"
                  style={{ backgroundColor: screen.colorLight }}
                >
                  <p
                    className="text-[13px] font-extrabold"
                    style={{ color: screen.color }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[9px] text-[#64748B] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* List items */}
            <div className="space-y-2">
              {screen.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFC] text-[11px] text-[#1E293B]"
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: screen.color }}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom tab dots */}
          <div className="flex justify-center gap-2 pb-4">
            {screens.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveIdx(i)}
                aria-label={`Lihat contoh ${s.id}`}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i === activeIdx ? screen.color : "#E2E8F0",
                  transform: i === activeIdx ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
