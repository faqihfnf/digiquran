"use client";

import { BookmarkItem } from "@/types/types";
import { useState, useEffect } from "react";

//# Key untuk menyimpan data di localStorage
const BOOKMARKS_KEY = "quran_bookmarks";

export const useBookmarks = () => {
  //# State untuk menyimpan daftar bookmarks
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  //* useEffect untuk memuat bookmarks dari localStorage saat komponen pertama kali dirender
  useEffect(() => {
    try {
      const items = window.localStorage.getItem(BOOKMARKS_KEY);
      if (items) {
        setBookmarks(JSON.parse(items));
      }
    } catch (error) {
      console.error("Error reading bookmarks from localStorage", error);
    }
  }, []);

  //# Fungsi untuk menyimpan perubahan ke localStorage dan state
  const saveBookmarks = (newBookmarks: BookmarkItem[]) => {
    try {
      setBookmarks(newBookmarks);
      window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
    } catch (error) {
      console.error("Error saving bookmarks to localStorage", error);
    }
  };

  //# Fungsi untuk menambah atau menghapus bookmark
  const toggleBookmark = (item: BookmarkItem) => {
    const existingIndex = bookmarks.findIndex(
      (b) => b.nomorSurah === item.nomorSurah && b.nomorAyat === item.nomorAyat
    );

    if (existingIndex > -1) {
      //# Jika sudah ada, hapus
      const newBookmarks = bookmarks.filter(
        (_, index) => index !== existingIndex
      );
      saveBookmarks(newBookmarks);
    } else {
      //# Jika belum ada, tambahkan
      const newBookmarks = [...bookmarks, item];
      //# Urutkan berdasarkan nomor surah lalu nomor ayat
      newBookmarks.sort((a, b) => {
        if (a.nomorSurah !== b.nomorSurah) {
          return a.nomorSurah - b.nomorSurah;
        }
        return a.nomorAyat - b.nomorAyat;
      });
      saveBookmarks(newBookmarks);
    }
  };

  //# Fungsi untuk memeriksa apakah sebuah ayat sudah di-bookmark
  const isBookmarked = (nomorSurah: number, nomorAyat: number) => {
    return bookmarks.some(
      (b) => b.nomorSurah === nomorSurah && b.nomorAyat === nomorAyat
    );
  };

  //# Kembalikan state dan fungsi-fungsi yang dibutuhkan
  return { bookmarks, toggleBookmark, isBookmarked };
};
