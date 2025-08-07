import Link from "next/link";

export default function ErrorState() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-xl text-red-400">Gagal memuat data.</h1>
        <p className="text-slate-400 mt-1">
          Mohon periksa koneksi internet Anda dan coba lagi.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-cyan-500/20 px-6 py-2 font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/30">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
