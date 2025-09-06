import React, { useEffect, useState } from 'react';
import AdminLayout from './layout';
import { supabase } from '../../lib/supabaseClient';

export default function Brands(){
  const [brands, setBrands] = useState<any[]>([]);
  const [name, setName] = useState('');
  useEffect(()=>{ load(); }, []);
  async function load(){
    const { data } = await supabase.from('brands').select('*').limit(200);
    setBrands(data || []);
  }
  async function create(){
    await fetch('/api/admin/create-brand', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ name })});
    setName(''); load();
  }
  return (
    <AdminLayout>
      <h1>Marcas & Sedes</h1>
      <div style={{marginBottom:16}}>
        <input placeholder="Nombre marca" value={name} onChange={e=>setName(e.target.value)} />
        <button onClick={create} style={{marginLeft:8}}>Crear</button>
      </div>
      <div>
        {brands.map(b => (<div key={b.id} style={{padding:8,border:'1px solid #eee',marginBottom:8}}>{b.name}</div>))}
      </div>
    </AdminLayout>
  )
}
