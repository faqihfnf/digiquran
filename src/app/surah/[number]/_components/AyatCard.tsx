import AyatToolbar from "./AyatToolbar";
import type { Ayat } from "@/types/types";

interface AyatCardProps {
  ayat: Ayat;
  isBookmarked: boolean;
  currentlyPlaying: boolean;
  onTafsirClick: () => void;
  onBookmarkClick: () => void;
  onPlayClick: () => void;
  onCopyClick: () => void;
}

export default function AyatCard({
  ayat,
  isBookmarked,
  currentlyPlaying,
  onTafsirClick,
  onBookmarkClick,
  onPlayClick,
  onCopyClick,
}: AyatCardProps) {
  return (
    <div id={`ayat-${ayat.nomorAyat}`} className="py-5">
      {/* Nomor Ayat */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-lg font-bold text-cyan-400">
          {ayat.nomorAyat}
        </div>
      </div>

      {/* Teks Arab */}
      <div className="mb-6 text-right">
        <p
          className="text-lg sm:text-2xl font-amiri leading-12 sm:leading-16 text-slate-100 text-justify"
          dir="rtl">
          {ayat.teksArab}
        </p>
      </div>

      {/* Teks Latin & Terjemahan */}
      <div className="space-y-4 text-left text-base">
        <p className="italic text-slate-400 text-justify text-sm sm:text-lg">
          {ayat.teksLatin}
        </p>
        <p className="text-slate-300 text-justify text-sm sm:text-lg">
          {ayat.teksIndonesia}
        </p>
      </div>

      {/* Toolbar Aksi */}
      <AyatToolbar
        isBookmarked={isBookmarked}
        currentlyPlaying={currentlyPlaying}
        onTafsirClick={onTafsirClick}
        onBookmarkClick={onBookmarkClick}
        onPlayClick={onPlayClick}
        onCopyClick={onCopyClick}
      />
    </div>
  );
}
