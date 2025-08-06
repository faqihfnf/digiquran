import { BookmarkIcon, BookOpen, Play, StopCircle } from "lucide-react";

interface AyatToolbarProps {
  isBookmarked: boolean;
  currentlyPlaying: boolean;
  onTafsirClick: () => void;
  onBookmarkClick: () => void;
  onPlayClick: () => void;
}

export default function AyatToolbar({
  isBookmarked,
  currentlyPlaying,
  onTafsirClick,
  onBookmarkClick,
  onPlayClick,
}: AyatToolbarProps) {
  return (
    <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-800 pt-5">
      <button
        onClick={onTafsirClick}
        title="Lihat Tafsir"
        className="flex items-center gap-2 rounded-lg p-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-emerald-400 cursor-pointer">
        <BookOpen className="h-5 w-5" />
      </button>
      <button
        onClick={onBookmarkClick}
        title={isBookmarked ? "Hapus Bookmark" : "Tandai Ayat"}
        className="flex items-center gap-2 rounded-lg p-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-lime-400 cursor-pointer">
        <BookmarkIcon
          className={`h-5 w-5 ${
            isBookmarked ? "fill-lime-400 text-lime-400" : ""
          }`}
        />
      </button>
      <button
        onClick={onPlayClick}
        title={currentlyPlaying ? "Hentikan" : "Putar Audio"}
        className={`flex w-24 items-center justify-center gap-2 rounded-lg p-2 text-sm transition-colors cursor-pointer ${
          currentlyPlaying
            ? "bg-red-600 text-white animate-pulse"
            : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-green-400"
        }`}>
        {currentlyPlaying ? (
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
  );
}
