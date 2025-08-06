"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowLeftIcon,
  BookmarkIcon,
  BookOpen,
  Globe,
  NotebookText,
  Pause,
  Play,
  StopCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useBookmarks } from "@/hooks/useBookmark";
import TafsirModal from "@/components/TafsirModal";

interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    "01": string;
    "02": string;
    "03": string;
    "04": string;
    "05": string;
  };
}

interface SurahDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  deskripsi: string;
  jumlahAyat: number;
  tempatTurun: string;
  ayat: Ayat[];
}

interface Tafsir {
  ayat: number;
  teks: string;
}

interface TafsirData {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tafsir: Tafsir[];
}

export default function SurahDetailPage() {
  const params = useParams();
  const nomorSurah = params.number as string;
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [selectedTafsir, setSelectedTafsir] = useState<Tafsir | null>(null);

  //# Fetching data Surah dan Tafsir menggunakan React Query
  const {
    data,
    isLoading: isSurahLoading,
    isError: isSurahError,
  } = useQuery<SurahDetail>({
    queryKey: ["surah-detail", nomorSurah],
    queryFn: async () => {
      const response = await axios.get(
        `https://equran.id/api/v2/surat/${nomorSurah}`
      );
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: tafsirData,
    isLoading: isTafsirLoading,
    isError: isTafsirError,
  } = useQuery<TafsirData>({
    queryKey: ["tafsir-detail", nomorSurah],
    queryFn: async () => {
      const response = await axios.get(
        `https://equran.id/api/v2/tafsir/${nomorSurah}`
      );
      return response.data.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!nomorSurah,
  });

  //# Scroll ke ayat tertentu jika ada hash di URL
  useEffect(() => {
    if (!isSurahLoading && data) {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [isSurahLoading, data]);

  //# Fungsi untuk memutar audio
  const playAudio = (audioUrl: string, ayatNumber: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (currentlyPlaying === ayatNumber) {
      setCurrentlyPlaying(null);
      return;
    }
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setCurrentlyPlaying(ayatNumber);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
      setCurrentlyPlaying(null);
    });
    audio.onended = () => {
      setCurrentlyPlaying(null);
      audioRef.current = null;
    };
    audio.onerror = () => {
      setCurrentlyPlaying(null);
      audioRef.current = null;
    };
  };

  const handleShowTafsir = (ayatNumber: number) => {
    if (!tafsirData) return;
    const tafsirAyat = tafsirData.tafsir.find((t) => t.ayat === ayatNumber);
    if (tafsirAyat) {
      setSelectedTafsir(tafsirAyat);
    }
  };

  //# Render ketika data masih loading
  if (isSurahLoading || isTafsirLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  if (isSurahError || isTafsirError || !data || !tafsirData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">
            Terjadi kesalahan saat memuat data!
          </p>
          <p className="text-slate-400 mt-2">Silakan coba lagi nanti.</p>
          <Link
            href="/"
            className="inline-block mt-4 px-4 py-2 bg-slate-700 rounded hover:bg-slate-600 transition-colors">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-white">
        <main className="container mx-auto p-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <Link
                href="/"
                className="inline-flex items-center text-slate-100 hover:text-indigo-500 transition-colors">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Kembali
              </Link>
              <Link
                href="/bookmarks"
                className="flex w-full sm:w-auto items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20 hover:text-cyan-200 border border-cyan-500/20">
                <BookmarkIcon className="h-4 w-4" />
                Bookmark
              </Link>
            </div>
            <div className="text-center bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h1 className="text-3xl font-bold mb-2">{data.namaLatin}</h1>
              <p className="text-4xl font-mono mb-2 text-slate-300">
                {data.nama}
              </p>
              <p className="text-slate-400 mb-2">{data.arti}</p>
              <div className="flex justify-center gap-4 text-sm text-slate-500">
                <span className="flex items-center">
                  <NotebookText className="w-4 h-4 mr-1" />
                  {data.jumlahAyat} Ayat
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  {data.tempatTurun}
                </span>
              </div>
              <p
                className="text-slate-400 mt-2 text-justify"
                dangerouslySetInnerHTML={{ __html: data.deskripsi }}></p>
            </div>
          </div>

          {/* Ayat List */}
          <div className="space-y-6">
            {data.ayat.map((ayat) => {
              const bookmarked = isBookmarked(data.nomor, ayat.nomorAyat);
              return (
                <div
                  key={ayat.nomorAyat}
                  id={`ayat-${ayat.nomorAyat}`}
                  className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center h-8 w-8 bg-slate-700 rounded-full text-sm font-bold">
                      {ayat.nomorAyat}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleShowTafsir(ayat.nomorAyat)}
                        title="Lihat Tafsir"
                        className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-600 transition-colors cursor-pointer">
                        <BookOpen className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          toggleBookmark({
                            nomorSurah: data.nomor,
                            namaSurah: data.namaLatin,
                            nomorAyat: ayat.nomorAyat,
                            teksArab: ayat.teksArab,
                          })
                        }
                        title={
                          bookmarked ? "Hapus Bookmark" : "Tambah Bookmark"
                        }
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-600 hover:text-yellow-500 transition-colors cursor-pointer ">
                        <BookmarkIcon
                          className={`w-5 h-5 ${
                            bookmarked
                              ? "fill-yellow-400 text-yellow-400"
                              : "hover:text-yellow-500"
                          }`}
                        />
                      </button>
                      <button
                        onClick={() =>
                          playAudio(ayat.audio["01"], ayat.nomorAyat)
                        }
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          currentlyPlaying === ayat.nomorAyat
                            ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer animate-pulse"
                            : "bg-slate-700 hover:bg-slate-600 text-slate-300 cursor-pointer"
                        }`}
                        title={
                          currentlyPlaying === ayat.nomorAyat
                            ? "Stop Audio"
                            : "Play Audio"
                        }>
                        {currentlyPlaying === ayat.nomorAyat ? (
                          <StopCircle className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {currentlyPlaying === ayat.nomorAyat
                            ? "Stop"
                            : "Play"}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="text-right mb-4">
                    <p
                      className="text-2xl leading-loose font-mono text-slate-200"
                      dir="rtl">
                      {ayat.teksArab}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-slate-400 italic leading-relaxed">
                      {ayat.teksLatin}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-slate-200 leading-relaxed">
                      {ayat.teksIndonesia}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Render Modal */}
      {selectedTafsir && (
        <TafsirModal
          isOpen={!!selectedTafsir}
          onClose={() => setSelectedTafsir(null)}
          surahName={data.namaLatin}
          ayatNumber={selectedTafsir.ayat}
          tafsirText={selectedTafsir.teks}
        />
      )}
    </>
  );
}
