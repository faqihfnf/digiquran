// Tipe untuk daftar surah di halaman utama
export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  arti: string;
}

// Tipe untuk satu ayat
export interface Ayat {
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

// Tipe untuk data detail sebuah surah
export interface SurahDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  deskripsi: string;
  jumlahAyat: number;
  tempatTurun: string;
  ayat: Ayat[];
}

// Tipe untuk satu item tafsir
export interface Tafsir {
  ayat: number;
  teks: string;
}

// Tipe untuk data lengkap tafsir satu surah
export interface TafsirData {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tafsir: Tafsir[];
}

// Tipe untuk satu item di dalam bookmark
export interface BookmarkItem {
  nomorSurah: number;
  namaSurah: string;
  nomorAyat: number;
  teksArab: string;
}
