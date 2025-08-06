import { Ayat } from "@/types/types";
import AyatToolbar from "./AyatToolbar";

interface AyatCardProps {
  ayat: Ayat;
  surahNumber: number;
  surahName: string;
  isBookmarked: boolean;
  currentlyPlaying: boolean;
  onTafsirClick: () => void;
  onBookmarkClick: () => void;
  onPlayClick: () => void;
}

export default function AyatCard({
  ayat,
  isBookmarked,
  currentlyPlaying,
  onTafsirClick,
  onBookmarkClick,
  onPlayClick,
}: AyatCardProps) {
  return (
    <div id={`ayat-${ayat.nomorAyat}`} className="py-5">
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
      <AyatToolbar
        isBookmarked={isBookmarked}
        currentlyPlaying={currentlyPlaying}
        onTafsirClick={onTafsirClick}
        onBookmarkClick={onBookmarkClick}
        onPlayClick={onPlayClick}
      />
    </div>
  );
}
