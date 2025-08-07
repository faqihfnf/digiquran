"use client";

import Link from "next/link";
import { useBookmarks } from "@/hooks/useBookmark";
import { ArrowLeftIcon, BookmarkIcon, Trash2Icon } from "lucide-react";
import { BookmarkItem } from "@/types/types";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks();

  const handleDelete = (e: React.MouseEvent, item: BookmarkItem) => {
    // Mencegah navigasi saat tombol hapus di-klik
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(item);
  };

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      {/* Header */}
      <header className="relative mb-10 text-center">
        <Link
          href="/"
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-400">
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Kembali</span>
        </Link>
        <div className="inline-flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-tl from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            Ayat Tersimpan
          </h1>
          <p className="mt-1 text-slate-400">
            {bookmarks.length} ayat ditandai
          </p>
        </div>
      </header>

      {/* Daftar Bookmark */}
      <div className="grid grid-cols-1 gap-4">
        {bookmarks.length > 0 ? (
          bookmarks.map((item: BookmarkItem) => (
            <Link
              key={`${item.nomorSurah}-${item.nomorAyat}`}
              href={`/surah/${item.nomorSurah}#ayat-${item.nomorAyat}`}
              className="group relative block overflow-hidden rounded-xl bg-slate-800/80 p-5 transition-all duration-300 ease-in-out hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10">
              {/* Decorative Glow Effect */}
              <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 bg-cyan-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-bold text-slate-100 transition-colors group-hover:text-cyan-400">
                    {item.namaSurah}: Ayat {item.nomorAyat}
                  </h2>
                  <button
                    onClick={(e) => handleDelete(e, item)}
                    title="Hapus Bookmark"
                    className="flex-shrink-0 rounded-full p-2 text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400 cursor-pointer">
                    <Trash2Icon className="h-5 w-5" />
                  </button>
                </div>
                <p
                  className="text-lg sm:text-2xl mt-4 leading-12 sm:leading-16 text-slate-200 font-amiri text-justify"
                  dir="rtl">
                  {item.teksArab}
                </p>
              </div>
            </Link>
          ))
        ) : (
          // Pesan jika tidak ada bookmark
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/50 py-20 text-center">
            <BookmarkIcon className="mx-auto h-16 w-16 text-slate-600" />
            <h2 className="mt-4 text-2xl font-semibold text-slate-300">
              Belum Ada Ayat Tersimpan
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-slate-400">
              Tandai ayat favorit Anda di halaman detail surah untuk
              menyimpannya di sini.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-cyan-500/20 px-6 py-2 font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/30">
              Mulai Membaca
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
