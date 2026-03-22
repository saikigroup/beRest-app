"use client";

import { useState } from "react";

export function SmartBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  function handleInstall() {
    // Try native app first via apick:// scheme, fall back to Play Store
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.apick.app";
    const appSchemeUrl = "apick://home";

    // Try opening native app, fall back to Play Store after timeout
    const fallbackTimer = setTimeout(() => {
      window.location.href = playStoreUrl;
    }, 1500);

    window.location.href = appSchemeUrl;

    // If the app opens, clear the fallback
    window.addEventListener(
      "blur",
      () => {
        clearTimeout(fallbackTimer);
      },
      { once: true }
    );
  }

  return (
    <div className="bg-[#2C7695] text-white flex items-center px-4 py-3 sticky top-0 z-50">
      <img src="/logos/apick-logo-white.svg" alt="apick" className="h-6 mr-3" />
      <div className="flex-1">
        <div className="font-bold text-sm">Download apick</div>
        <div className="text-white/70 text-xs">
          Notifikasi real-time &amp; semua status di 1 tempat
        </div>
      </div>
      <button
        onClick={handleInstall}
        className="bg-[#156064] text-white text-xs font-bold px-4 py-2 rounded-lg mr-2 hover:opacity-90"
      >
        Install
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="text-white/50 text-lg hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}
