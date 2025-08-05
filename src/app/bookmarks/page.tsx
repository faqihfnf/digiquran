"use client";

import Link from "next/link";
import { useBookmarks, BookmarkItem } from "@/hooks/useBookmark"; // Impor hook dan interface
import { ArrowLeftIcon, BookmarkIcon, Trash2Icon } from "lucide-react";

export default function BookmarksPage() {
  //# Menggunakan hook useBookmarks
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <main className="container mx-auto p-4 py-8 max-w-4xl">
        <div className="text-center flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookmarkIcon className="w-8 h-8 text-yellow-400" />
            Ayat Tersimpan
          </h1>
          <p className="text-slate-400 mt-1">Daftar bookmark ayat</p>
        </div>
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Kembali
          </Link>
          <span className="text-slate-400">
            Total Bookmark : <strong>{bookmarks.length}</strong> Ayat
          </span>
        </div>

        {/* Daftar Bookmark */}
        <div className="space-y-4">
          {bookmarks.length > 0 ? (
            bookmarks.map((item: BookmarkItem) => (
              <div
                key={`${item.nomorSurah}-${item.nomorAyat}`}
                className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    {/* Link ke Surah dan Ayat yang spesifik */}
                    <Link
                      href={`/surah/${item.nomorSurah}#ayat-${item.nomorAyat}`}
                      className="text-lg font-bold hover:text-sky-400 transition-colors">
                      {item.namaSurah} : {item.nomorAyat}
                    </Link>
                    {/* Tombol Hapus Bookmark */}
                    <button
                      onClick={() => toggleBookmark(item)}
                      title="Hapus Bookmark"
                      className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-700 transition-colors">
                      <Trash2Icon className="w-5 h-5" />
                    </button>
                  </div>
                  <p
                    className="text-xl leading-loose font-mono text-slate-200 text-right"
                    dir="rtl">
                    {item.teksArab}
                  </p>
                </div>
              </div>
            ))
          ) : (
            //# Pesan jika tidak ada bookmark
            <div className="text-center py-20 bg-slate-800 rounded-lg border border-slate-700">
              <BookmarkIcon className="w-16 h-16 mx-auto text-slate-600 mb-4" />
              <h2 className="text-xl font-semibold text-slate-300">
                Belum Ada Ayat Tersimpan
              </h2>
              <p className="text-slate-400 mt-2">
                Anda bisa menandai ayat dengan menekan ikon bookmark di halaman
                detail surah.
              </p>
              <Link
                href="/"
                className="inline-block mt-6 px-5 py-2 bg-sky-600 rounded-lg hover:bg-sky-500 transition-colors">
                Cari Surah
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
