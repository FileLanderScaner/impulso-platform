import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import AdminLayout from './layout';

export default function Metrics() {
  const [counts, setCounts] = useState({ users: 0, courses: 0, progress: 0 });
  useEffect(() => { load(); }, []);
  async function load() {
    const [{ count: users }] = await supabase.from('user_profiles').select('id', { count: 'exact', head: false }).limit(1);
    const [{ count: courses }] = await supabase.from('courses').select('id', { count: 'exact', head: false }).limit(1);
    const [{ count: progress }] = await supabase.from('user_progress').select('id', { count: 'exact', head: false }).limit(1);
    setCounts({ users: users || 0, courses: courses || 0, progress: progress || 0 });
  }
  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Métricas de la Plataforma</h1>
        <p className="text-gray-600 mb-6">Visualiza el crecimiento y la actividad de la comunidad.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <svg className="h-10 w-10 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5" /></svg>
            <div className="text-2xl font-bold text-gray-900">{counts.users}</div>
            <div className="text-gray-500">Usuarios</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <svg className="h-10 w-10 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 7v-6m0 0l-9-5m9 5l9-5" /></svg>
            <div className="text-2xl font-bold text-gray-900">{counts.courses}</div>
            <div className="text-gray-500">Cursos</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <svg className="h-10 w-10 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2" /></svg>
            <div className="text-2xl font-bold text-gray-900">{counts.progress}</div>
            <div className="text-gray-500">Progresos</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
