"use client";

import { BookOpen, X } from "lucide-react";

interface TafsirModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahName: string;
  ayatNumber: number;
  tafsirText: string;
}

export default function TafsirModal({
  isOpen,
  onClose,
  surahName,
  ayatNumber,
  tafsirText,
}: TafsirModalProps) {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300">
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat mengklik di dalam konten
        className="relative w-11/12 max-w-2xl transform rounded-lg bg-slate-800 p-6 text-white shadow-xl transition-all duration-300 border border-slate-700">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-sky-400" />
            <div>
              <h3 className="text-xl font-bold">Tafsir {surahName}</h3>
              <p className="text-sm text-slate-400">Ayat {ayatNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            title="Tutup">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          <p className="text-base leading-relaxed text-slate-300 whitespace-pre-wrap">
            {tafsirText}
          </p>
        </div>
      </div>
    </div>
  );
}
