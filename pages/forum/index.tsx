import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default function ForumIndex() {
  const [threads, setThreads] = useState<any[]>([]);
  useEffect(() => { load(); }, []);
  async function load() {
    const { data } = await supabase.from('forum_threads').select('*').order('created_at', { ascending: false }).limit(200);
    setThreads(data || []);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Foro de la comunidad</h1>
        <p className="text-gray-600 mb-8">Comparte tus dudas, experiencias y aprende junto a otros estudiantes.</p>
        <div className="flex flex-col gap-4">
          {threads.length === 0 ? (
            <div className="text-gray-400 text-center py-12">No hay hilos aún.</div>
          ) : (
            threads.map(t => (
              <Link key={t.id} href={`/forum/${t.id}`} className="block bg-white rounded-xl shadow p-6 hover:shadow-lg transition border border-gray-100">
                <div className="font-bold text-lg text-primary mb-1">{t.title}</div>
                <div className="text-gray-500 text-sm">{t.description || 'Sin descripción'}</div>
              </Link>
            ))
          )}
        </div>
        <div className="mt-10 text-center">
          <Link href="/forum/new" className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg shadow transition">Crear nuevo hilo</Link>
        </div>
      </div>
    </div>
  );
}
