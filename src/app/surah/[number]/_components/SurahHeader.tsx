import Link from "next/link";
import { ArrowLeftIcon, BookmarkIcon, Globe, NotebookText } from "lucide-react";
import { SurahDetail } from "@/types/types";

interface SurahHeaderProps {
  data: SurahDetail;
}

export default function SurahHeader({ data }: SurahHeaderProps) {
  return (
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
            className="flex items-center font-semibold gap-2 text-slate-300 transition-colors  hover:text-cyan-400">
            <BookmarkIcon className="h-5 w-5" />
            <span>Bookmark</span>
          </Link>
        </div>
        <div className="text-center">
          <p className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            {data.namaLatin}
          </p>
          <h1 className="my-2 text-5xl font-bold font-mono bg-gradient-to-br from-slate-50 to-slate-300 bg-clip-text text-transparent font-amiri">
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
  );
}
