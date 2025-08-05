"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  arti: string;
}

export default function Home() {
  //# State untuk menyimpan input pencarian surah
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery<Surah[]>({
    queryKey: ["list-surah"],
    queryFn: async () => {
      const res = await axios.get("https://equran.id/api/v2/surat");
      return res.data.data;
    },
  });

  //# Filter data berdasarkan searchTerm
  //* Pencarian akan mencocokkan nama Latin, nama Arab, atau arti surah
  const filteredSurah = data?.filter(
    (surah) =>
      surah.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.arti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //# Render ketika data masih loading atau error saat mengambil data dari API
  if (isLoading)
    return (
      <h1 className="text-center mt-20 text-white text-2xl">Loading...</h1>
    );
  if (isError)
    return (
      <h1 className="text-center mt-20 text-white text-2xl">
        Error loading data
      </h1>
    );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <main className="container mx-auto p-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{"Al-Qur'an"}</h1>
          <p className="text-slate-400">
            Daftar Surah {"Al-Qur'an"} dengan Terjemahan Indonesia
          </p>
        </div>

        {/* Input pencarian surah */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative gap-2">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <Search className="text-slate-500 h-5 w-5 mr-5" />
            </span>
            <input
              type="text"
              placeholder="Cari nama surah : e.g. Al-Fatihah, الْفَاتِحَة, Pembukaan"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* Render daftar surah berdasarkan pencarian surah */}
          {filteredSurah && filteredSurah.length > 0 ? (
            filteredSurah.map((surah) => (
              <Link
                key={surah.nomor}
                href={`/surah/${surah.nomor}`}
                className="block py-8 px-4 bg-slate-800 rounded-lg hover:bg-slate-700/70 transition-colors duration-200 border border-slate-700 hover:border-indigo-600 shadow-lg hover:shadow-indigo-500/20">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 bg-slate-700 rounded-full text-sm font-bold">
                      {surah.nomor}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">{surah.namaLatin}</h2>
                      <p className="text-sm text-slate-400">{surah.arti}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {surah.jumlahAyat} ayat
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xl text-slate-300">
                      {surah.nama}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400 py-10">
              {/* Render pesan jika surah tidak ditemukan */}
              <p className="text-lg">Surah tidak ditemukan.</p>
              <p className="text-sm">Silakan coba kata kunci lain.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
