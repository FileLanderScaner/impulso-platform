import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import AdminLayout from './layout';

export default function Brands() {
  const [brands, setBrands] = useState<any[]>([]);
  const [name, setName] = useState('');
  useEffect(() => { load(); }, []);
  async function load() {
    const { data } = await supabase.from('brands').select('*').limit(200);
    setBrands(data || []);
  }
  async function create() {
    if (!name.trim()) return;
    await fetch('/api/admin/create-brand', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name }) });
    setName(''); load();
  }
  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Gestión de Marcas</h1>
        <p className="text-gray-600 mb-6">Administra las marcas y sedes asociadas a la plataforma.</p>
        <div className="flex gap-2 mb-6">
          <input
            placeholder="Nombre de la marca"
            value={name}
            onChange={e => setName(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
          />
          <button
            onClick={create}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg shadow transition"
          >Crear</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brands.map(b => (
            <div key={b.id} className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
              <span className="font-bold text-gray-800">{b.name}</span>
              <span className="text-xs text-gray-400">ID: {b.id}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
