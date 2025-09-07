import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-indigo-700">Impulso</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="/catalog" className="text-gray-700 hover:text-indigo-600">Catálogo</a>
        <a href="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</a>
        <a href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Iniciar sesión</a>
      </div>
    </nav>
  );
}
