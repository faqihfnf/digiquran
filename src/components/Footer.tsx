import { Github, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-6 bg-[rgb(5,10,35)] bottom-0 w-full">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Kiri: Nama */}
          <p className="text-lg text-gray-300 font-semibold text-center sm:text-left">
            Created with ❤️{" "}
            <span className="bg-gradient-to-l from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-md font-extrabold text-transparent">
              Faqih Nur Fahmi
            </span>
          </p>

          {/* Kanan: Icon Sosial Media */}
          <div className="flex justify-center sm:justify-end gap-4">
            <Link
              href="https://github.com/faqihfnf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 rounded-lg bg-black-200 border border-indigo-400 dark:border-slate-700 hover:bg-indigo-600 hover:text-white text-white hover:border-indigo-600">
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/faqih-nur-fahmi-b51bb1ab"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 rounded-lg bg-black-200 border border-indigo-400 dark:border-slate-700 hover:bg-indigo-600 hover:text-white text-white hover:border-indigo-600">
              <Linkedin className="w-5 h-5" />
            </Link>

            <Link
              href="https://youtube.com/@marifahid"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 rounded-lg bg-black-200 border border-indigo-400 dark:border-slate-700 hover:bg-indigo-600 hover:text-white text-white hover:border-indigo-600">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
