"use client";

import Navbar from "@/components/Navbar";
import { Surah } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookmarkIcon, BookOpen, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery<Surah[]>({
    queryKey: ["list-surah"],
    queryFn: async () => {
      const res = await axios.get("https://equran.id/api/v2/surat");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60, // Cache data selama 1 jam
  });

  const filteredSurah = data?.filter(
    (surah) =>
      surah.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.arti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
      </div>
    );

  if (isError)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950 px-4 text-center">
        <h1 className="text-xl text-red-400">
          Gagal memuat daftar surah. Periksa koneksi internet Anda.
        </h1>
      </div>
    );

  return (
    <main className="container mx-auto px-4 py-6 md:py-10">
      {/* Header Section */}
      <header className="text-center mb-10 md:mb-12">
        <div className="mb-4 flex justify-center items-center gap-3">
          <h1 className="text-4xl h-14 md:text-5xl font-extrabold tracking-tight bg-gradient-to-tl from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            Al-Qur'an Digital
          </h1>
        </div>
        <p className="max-w-xl mx-auto text-slate-400">
          Jelajahi, baca, dan pelajari ayat-ayat suci Al-Qur'an dengan
          terjemahan, tafsir, dan fitur bookmark.
        </p>
      </header>

      {/* Search and Bookmarks Section */}
      <div className="top-4 z-10 mb-8 flex flex-row items-center justify-center gap-2 max-w-2xl mx-auto px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-full">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input
            type="text"
            placeholder="Cari Surah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
        <Link
          href="/bookmarks"
          className="flex sm:w-auto items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20 hover:text-cyan-200 border border-cyan-500/20">
          <BookmarkIcon className="h-4 w-4" />
          <span className="hidden sm:block">Bookmark</span>
        </Link>
      </div>

      {/* Surah List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurah && filteredSurah.length > 0 ? (
          filteredSurah.map((surah) => (
            <Link
              key={surah.nomor}
              href={`/surah/${surah.nomor}`}
              className="group relative block overflow-hidden rounded-xl bg-slate-800/80 p-5 py-10 transition-all duration-300 ease-in-out hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10">
              {/* Decorative Glow Effect */}
              <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-cyan-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-700 text-lg font-bold text-slate-300 transition-colors duration-300 group-hover:bg-cyan-400 group-hover:text-slate-900">
                  {surah.nomor}
                </div>
                <div className="flex-grow">
                  <h2 className="font-bold text-lg text-slate-100">
                    {surah.namaLatin}
                  </h2>
                  <p className="text-sm text-slate-400">{surah.arti}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-amiri text-2xl text-cyan-400/80">
                    {surah.nama}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {surah.jumlahAyat} ayat
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-slate-500">
            <p className="text-2xl font-semibold">Surah tidak ditemukan</p>
            <p className="mt-2">
              Coba gunakan kata kunci lain untuk pencarian.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
