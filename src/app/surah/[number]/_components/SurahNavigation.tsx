import Link from "next/link";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import type { SurahNavigationLink } from "@/types/types";

interface SurahNavigationProps {
  prev: SurahNavigationLink | false;
  next: SurahNavigationLink | false;
}

export default function SurahNavigation({ prev, next }: SurahNavigationProps) {
  return (
    <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-800 pt-8">
      {/* Tombol Surah Sebelumnya */}
      {prev ? (
        <Link
          href={`/surah/${prev.nomor}`}
          className="group flex items-center gap-4 rounded-xl border border-slate-800 p-4 transition-colors hover:border-cyan-500/50 hover:bg-slate-800/50">
          <ArrowLeftCircle className="h-8 w-8 flex-shrink-0 text-slate-600 transition-colors group-hover:text-cyan-400" />
          <div className="text-right">
            <p className="font-bold text-slate-100">{prev.namaLatin}</p>
          </div>
        </Link>
      ) : (
        // Placeholder jika tidak ada surah sebelumnya
        <div></div>
      )}

      {/* Tombol Surah Selanjutnya */}
      {next ? (
        <Link
          href={`/surah/${next.nomor}`}
          className="group flex items-center justify-end gap-4 rounded-xl border border-slate-800 p-4 text-right transition-colors hover:border-cyan-500/50 hover:bg-slate-800/50">
          <div>
            <p className="font-bold text-slate-100">{next.namaLatin}</p>
          </div>
          <ArrowRightCircle className="h-8 w-8 flex-shrink-0 text-slate-600 transition-colors group-hover:text-cyan-400" />
        </Link>
      ) : (
        // Placeholder jika tidak ada surah selanjutnya
        <div></div>
      )}
    </div>
  );
}
