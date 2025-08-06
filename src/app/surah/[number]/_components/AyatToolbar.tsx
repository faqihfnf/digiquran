"use client";

import { useState } from "react";
import {
  BookmarkIcon,
  BookOpen,
  Play,
  StopCircle,
  Copy,
  Check,
} from "lucide-react";

interface AyatToolbarProps {
  isBookmarked: boolean;
  currentlyPlaying: boolean;
  onTafsirClick: () => void;
  onBookmarkClick: () => void;
  onPlayClick: () => void;
  onCopyClick: () => void;
}

export default function AyatToolbar({
  isBookmarked,
  currentlyPlaying,
  onTafsirClick,
  onBookmarkClick,
  onPlayClick,
  onCopyClick,
}: AyatToolbarProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Fungsi untuk menangani feedback visual dan memanggil fungsi dari parent
  const handleCopy = () => {
    onCopyClick(); // Menjalankan logika copy yang ada di page.tsx
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Mengembalikan ikon ke semula setelah 2 detik
  };

  return (
    <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-800 pt-5">
      {/* Tombol Copy */}
      <button
        onClick={handleCopy}
        title="Salin Teks Ayat"
        className={`flex items-center gap-2 rounded-lg p-2 text-sm transition-colors duration-300 hover:bg-slate-800 cursor-pointer ${
          isCopied ? "text-pink-400" : "text-slate-400 hover:text-pink-400"
        }`}>
        {isCopied ? (
          <Check className="h-5 w-5" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
      </button>

      {/* Tombol Tafsir */}
      <button
        onClick={onTafsirClick}
        title="Lihat Tafsir"
        className="flex items-center gap-2 rounded-lg p-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-400 cursor-pointer">
        <BookOpen className="h-5 w-5" />
      </button>

      {/* Tombol Bookmark */}
      <button
        onClick={onBookmarkClick}
        title={isBookmarked ? "Hapus Bookmark" : "Tandai Ayat"}
        className="flex items-center gap-2 rounded-lg p-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-lime-400 cursor-pointer">
        <BookmarkIcon
          className={`h-5 w-5 ${
            isBookmarked ? "fill-lime-400 text-lime-400" : ""
          }`}
        />
      </button>

      {/* Tombol Play/Stop Audio */}
      <button
        onClick={onPlayClick}
        title={currentlyPlaying ? "Hentikan" : "Putar Audio"}
        className={`flex w-24 items-center justify-center gap-2 rounded-lg p-2 text-sm transition-colors cursor-pointer ${
          currentlyPlaying
            ? "bg-red-500 text-white animate-pulse"
            : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-green-400"
        }`}>
        {currentlyPlaying ? (
          <>
            <StopCircle className="h-5 w-5" /> Stop
          </>
        ) : (
          <>
            <Play className="h-5 w-5" /> Play
          </>
        )}
      </button>
    </div>
  );
}
