"use client";

// --- IMPORTS ---
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useBookmarks } from "@/hooks/useBookmark";

// Impor semua tipe dari satu file terpusat
import type { Ayat, SurahDetail, Tafsir, TafsirData } from "@/types/types";

// Impor komponen-komponen
import TafsirModal from "@/components/TafsirModal";
import SurahHeader from "./_components/SurahHeader";
import AyatCard from "./_components/AyatCard";
import LoadingState from "./_components/LoadingState";
import ErrorState from "./_components/ErrorState";
import SurahNavigation from "./_components/SurahNavigation";

// --- COMPONENT UTAMA ---
export default function SurahDetailPage() {
  const params = useParams();
  const nomorSurah = params.number as string;

  // --- STATE MANAGEMENT ---
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
      const res = await axios.get(
        `https://equran.id/api/v2/surat/${nomorSurah}`
      );
      return res.data.data;
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
      const res = await axios.get(
        `https://equran.id/api/v2/tafsir/${nomorSurah}`
      );
      return res.data.data;
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

  // --- HANDLER FUNCTIONS ---
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
    audio.play().catch(console.error);
    audio.onended = () => setCurrentlyPlaying(null);
    audio.onerror = () => setCurrentlyPlaying(null);
  };

  const handleShowTafsir = (ayatNumber: number) => {
    const tafsirAyat = tafsirData?.tafsir.find((t) => t.ayat === ayatNumber);
    if (tafsirAyat) setSelectedTafsir(tafsirAyat);
  };

  const handleCopyToClipboard = (ayat: Ayat, surahName: string) => {
    const textToCopy = `
"${ayat.teksArab}"

(${ayat.teksIndonesia})

- QS. ${surahName}: ${ayat.nomorAyat}
    `;
    navigator.clipboard
      .writeText(textToCopy.trim())
      .catch((err) => console.error("Gagal menyalin teks: ", err));
  };

  // --- RENDER LOGIC ---
  if (isSurahLoading || isTafsirLoading) return <LoadingState />;
  if (isSurahError || isTafsirError || !data || !tafsirData)
    return <ErrorState />;

  return (
    <>
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <SurahHeader data={data} />
        <div className="flex flex-col divide-y divide-slate-800">
          {data.ayat.map((ayat) => (
            <AyatCard
              key={ayat.nomorAyat}
              ayat={ayat}
              isBookmarked={isBookmarked(data.nomor, ayat.nomorAyat)}
              currentlyPlaying={currentlyPlaying === ayat.nomorAyat}
              onTafsirClick={() => handleShowTafsir(ayat.nomorAyat)}
              onBookmarkClick={() =>
                toggleBookmark({
                  nomorSurah: data.nomor,
                  namaSurah: data.namaLatin,
                  nomorAyat: ayat.nomorAyat,
                  teksArab: ayat.teksArab,
                })
              }
              onPlayClick={() => playAudio(ayat.audio["01"], ayat.nomorAyat)}
              onCopyClick={() => handleCopyToClipboard(ayat, data.namaLatin)}
            />
          ))}
        </div>

        <SurahNavigation
          prev={data.suratSebelumnya}
          next={data.suratSelanjutnya}
        />
      </main>

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
