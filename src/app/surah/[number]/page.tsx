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

  const playAudio = (audioUrl: string, ayatNumber: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (currentlyPlaying === ayatNumber) {
        setCurrentlyPlaying(null);
        audioRef.current = null;
        return;
      }
    }
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setCurrentlyPlaying(ayatNumber);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
      setCurrentlyPlaying(null);
    });
    audio.onended = () => setCurrentlyPlaying(null);
    audio.onerror = () => setCurrentlyPlaying(null);
  };

  const handleShowTafsir = (ayatNumber: number) => {
    if (!tafsirData) return;
    const tafsirAyat = tafsirData.tafsir.find((t) => t.ayat === ayatNumber);
    if (tafsirAyat) {
      setSelectedTafsir(tafsirAyat);
    }
  };

  if (isSurahLoading || isTafsirLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (isSurahError || isTafsirError || !data || !tafsirData) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950 px-4 text-center">
        <h1 className="text-xl text-red-400">
          Gagal memuat data. Periksa koneksi internet Anda.
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 text-slate-100">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          {/* Header */}
          <header className="relative mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8">
            <div className="absolute -right-20 -top-20 h-48 w-48 bg-cyan-500/10 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 h-48 w-48 bg-emerald-500/10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center font-semibold gap-2 text-slate-300 transition-colors hover:text-cyan-400">
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span>Daftar Surah</span>
                </Link>
                <Link
                  href="/bookmarks"
                  className="flex items-center font-semibold gap-2 text-slate-300 transition-colors hover:text-cyan-400">
                  <BookmarkIcon className="h-5 w-5" />
                  <span>Bookmark</span>
                </Link>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent ">
                  {data.namaLatin}
                </p>
                <h1 className="my-2 text-5xl font-bold font-mono bg-gradient-to-br from-slate-50 to-slate-300 bg-clip-text text-transparent">
                  {data.nama}
                </h1>
                <p className="text-lg text-slate-400">{data.arti}</p>
                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1">
                    <NotebookText className="h-4 w-4" /> {data.jumlahAyat} Ayat
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1">
                    <Globe className="h-4 w-4" /> {data.tempatTurun}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Ayat List */}
          <div className="flex flex-col divide-y divide-slate-800">
            {data.ayat.map((ayat) => {
              const bookmarked = isBookmarked(data.nomor, ayat.nomorAyat);
              return (
                <div
                  key={ayat.nomorAyat}
                  id={`ayat-${ayat.nomorAyat}`}
                  className="py-5">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-lg font-bold text-cyan-400">
                      {ayat.nomorAyat}
                    </div>
                  </div>

                  <div className="mb-6 text-right">
                    <p
                      className="font-mono text-3xl leading-loose text-slate-100"
                      dir="rtl">
                      {ayat.teksArab}
                    </p>
                  </div>

                  <div className="space-y-4 text-left text-base">
                    <p className="italic text-slate-400">{ayat.teksLatin}</p>
                    <p className="text-slate-300">{ayat.teksIndonesia}</p>
                  </div>

                  {/* Action Toolbar */}
                  <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-800 pt-5">
                    <button
                      onClick={() => handleShowTafsir(ayat.nomorAyat)}
                      title="Lihat Tafsir"
                      className="flex items-center gap-2 rounded-lg p-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-400 cursor-pointer">
                      <BookOpen className="h-5 w-5" />
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
                      title={bookmarked ? "Hapus Bookmark" : "Tandai Ayat"}
                      className="flex items-center gap-2 rounded-lg p-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-yellow-400 cursor-pointer">
                      <BookmarkIcon
                        className={`h-5 w-5 ${
                          bookmarked ? "fill-yellow-400 text-yellow-400" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() =>
                        playAudio(ayat.audio["01"], ayat.nomorAyat)
                      }
                      title={
                        currentlyPlaying === ayat.nomorAyat
                          ? "Hentikan"
                          : "Putar Audio"
                      }
                      className={`flex w-24 items-center justify-center gap-2 rounded-lg p-2 text-sm transition-colors cursor-pointer ${
                        currentlyPlaying === ayat.nomorAyat
                          ? "bg-red-500/20 text-red-400"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                      }`}>
                      {currentlyPlaying === ayat.nomorAyat ? (
                        <>
                          {" "}
                          <StopCircle className="h-5 w-5" /> Stop{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <Play className="h-5 w-5" /> Play{" "}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

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
