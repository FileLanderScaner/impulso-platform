import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import CourseCard from "../../components/CourseCard";

const mockCourses = [
  { id: 1, title: "Onboarding Acme", description: "Bienvenida y cultura de la empresa.", category: "Onboarding", level: "Básico", featured: true, progress: 80 },
  { id: 2, title: "Compliance Globex", description: "Normativas y buenas prácticas.", category: "Legal", level: "Intermedio", featured: false, progress: 40 }
];

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>(mockCourses);
  const [search, setSearch] = useState("");
  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    (c.description || "").toLowerCase().includes(search.toLowerCase())
  );
  return (
    <AdminLayout>
      <div className="mb-10">
        <div className="bg-gradient-to-r from-primary-light to-indigo-100 rounded-xl p-6 mb-8 flex items-center gap-4 animate-fade-in">
          <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-4.41 0-8-1.79-8-4V6c0-2.21 3.59-4 8-4s8 1.79 8 4v8c0 2.21-3.59 4-8 4z" /></svg>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Gestión de Cursos</h1>
            <p className="text-gray-600">Administra, edita y destaca los cursos de la plataforma. ¡Motiva a los usuarios con cursos destacados y progreso visible!</p>
          </div>
        </div>
        <input
          type="text"
          placeholder="Buscar curso..."
          className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none mb-6"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">No se encontraron cursos.</div>
          ) : (
            filtered.map((c, i) => (
              <div key={c.id} className={`relative bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 hover:scale-[1.03] transition-transform animate-fade-in`} style={{ animationDelay: `${i * 60}ms` }}>
                {c.featured && <span className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow animate-bounce">Destacado</span>}
                <h3 className="font-bold text-lg text-primary mb-1">{c.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{c.description}</p>
                <div className="flex gap-2 mb-2">
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">{c.category}</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{c.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div className="bg-primary h-3 rounded-full transition-all" style={{ width: `${c.progress || 0}%` }}></div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition">Editar</button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg transition">Ver</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

