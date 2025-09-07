import React from "react";

const links = [
  { href: "/admin/users", label: "Usuarios" },
  { href: "/admin/brands", label: "Marcas" },
  { href: "/admin/courses", label: "Cursos" },
  { href: "/admin/metrics", label: "Métricas" },
];

export default function Sidebar() {
  return (
    <aside className="h-full w-60 bg-indigo-50 border-r flex flex-col py-6 px-4">
      <div className="mb-8">
        <img src="/logo.svg" alt="Logo" className="h-10 w-10 mx-auto" />
        <h2 className="text-center font-bold text-lg text-indigo-700 mt-2">Admin</h2>
      </div>
      <nav className="flex flex-col gap-3">
        {links.map(link => (
          <a key={link.href} href={link.href} className="text-gray-700 hover:bg-indigo-100 rounded px-3 py-2 transition">
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
