import React, { useEffect, useState } from 'react';
import AdminLayout from './layout';
import { supabase } from '../../lib/supabaseClient';

export default function Metrics(){
  const [counts, setCounts] = useState({ users:0, courses:0, progress:0 });
  useEffect(()=>{ load(); }, []);
  async function load(){
    const [{ count:users }] = await supabase.from('user_profiles').select('id', { count: 'exact', head: false }).limit(1);
    const [{ count:courses }] = await supabase.from('courses').select('id', { count: 'exact', head: false }).limit(1);
    const [{ count:progress }] = await supabase.from('user_progress').select('id', { count: 'exact', head: false }).limit(1);
    setCounts({ users: users || 0, courses: courses || 0, progress: progress || 0 });
  }
  return (
    <AdminLayout>
      <h1>Métricas</h1>
      <div style={{display:'flex',gap:16}}>
        <div style={{padding:20,background:'#fff',border:'1px solid #eee',borderRadius:8}}>Usuarios: <strong>{counts.users}</strong></div>
        <div style={{padding:20,background:'#fff',border:'1px solid #eee',borderRadius:8}}>Cursos: <strong>{counts.courses}</strong></div>
        <div style={{padding:20,background:'#fff',border:'1px solid #eee',borderRadius:8}}>Progresos: <strong>{counts.progress}</strong></div>
      </div>
    </AdminLayout>
  )
}
