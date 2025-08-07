import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-1 py-3 flex">
      <Link href="/" className="flex">
        <Image
          src="/logo.png"
          alt="Logo"
          width={65}
          height={65}
          className="bg-transparent"
        />
        <span className="self-center text-2xl mt-5 -ml-4 font-extrabold tracking-tight bg-gradient-to-tl from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
          igiQuran.
        </span>
      </Link>
    </nav>
  );
}
