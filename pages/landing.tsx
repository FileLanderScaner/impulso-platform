import React from "react";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-700">Impulso Platform</h1>
        <p className="mb-6 text-lg text-gray-700">
          Plataforma multitenant de capacitación y onboarding para empresas y organizaciones.
        </p>
        <ul className="text-left mb-6 text-gray-600">
          <li>✅ SSO Google Workspace</li>
          <li>✅ Multitenancy: Tenant → Marca → Sede</li>
          <li>✅ Catálogo de cursos y lecciones</li>
          <li>✅ Progreso, evaluaciones y certificados PDF</li>
          <li>✅ Foros y comunidad</li>
        </ul>
        <a href="/login" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Probar demo</a>
        <div className="mt-8 text-sm text-gray-400">Powered by Next.js & Supabase</div>
      </div>
    </main>
  );
}
