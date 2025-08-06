"use client";

import { BookOpenText, X } from "lucide-react";
import { useEffect } from "react";

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
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) {
    // Tidak merender apapun jika tidak terbuka
    return null;
  }

  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-modal-show">
      {/* Konten Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-11/12 max-w-2xl transform overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 text-white shadow-2xl shadow-cyan-500/10 animate-modal-content-show">
        {/* Efek Glow Dekoratif */}
        <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 bg-cyan-400/10 rounded-full blur-3xl -z-10"></div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
                <BookOpenText className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">
                  Tafsir {surahName}
                </h3>
                <p className="text-sm text-slate-400">Ayat {ayatNumber}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
              title="Tutup (Esc)">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Body */}
          <div className="mt-5 max-h-[60vh] overflow-y-auto pr-3">
            <p className="whitespace-pre-wrap text-lg leading-relaxed text-slate-300">
              {tafsirText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
