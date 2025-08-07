# Quran App

A modern digital Al-Qur'an web application built with Next.js, React, and Tailwind CSS. This app allows you to browse, search, and read surahs, view tafsir (interpretations), and bookmark your favorite ayat for easy access.

## Features

- 📖 **Browse & Read Surahs**: Explore all surahs of the Al-Qur'an with translation and ayat count.
- 🔍 **Search**: Instantly search surahs by name (Latin/Arabic) or meaning.
- 📝 **Tafsir**: View tafsir for each ayat to deepen your understanding.
- ⭐ **Bookmarks**: Save and manage your favorite ayat for quick reference.
- 🔊 **Audio Playback**: Listen to the recitation of each ayat.
- 🌙 **Modern UI**: Responsive, accessible, and visually appealing interface.

## Technology Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest) for data fetching and caching
- [Axios](https://axios-http.com/) for HTTP requests
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd quran-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

- **Home Page**: Browse all surahs, use the search bar to filter by name or meaning.
- **Surah Detail**: Click a surah to view its ayat, translation, and play audio. Click the "Tafsir" button on any ayat to view its interpretation.
- **Bookmarking**: Click the bookmark icon on any ayat to save it. Access all bookmarks from the "Bookmark" button on the home page.
- **Remove Bookmarks**: Go to the bookmarks page and click the trash icon to remove a saved ayat.

## Data Source

- All surah, ayat, and tafsir data are fetched from [equran.id API](https://equran.id/apidev).

## Folder Structure

- `src/app/` - Main app pages (home, surah detail, bookmarks)
- `src/components/` - Reusable UI components (e.g., TafsirModal)
- `src/hooks/` - Custom React hooks (e.g., for bookmarks)
- `src/types/` - TypeScript type definitions
- `public/` - Static assets

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

> Built with ❤️ Faqih Nur Fahmi.
