import React from "react";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-indigo-50 flex flex-col">
      <header className="sticky top-0 z-30 shadow bg-white/90 backdrop-blur">
        <Navbar />
      </header>
      <main className="flex-1 max-w-5xl mx-auto py-10 px-4 w-full">{children}</main>
      <footer className="text-center text-xs text-gray-400 py-6">© {new Date().getFullYear()} Impulso. Plataforma educativa.</footer>
    </div>
  );
}
