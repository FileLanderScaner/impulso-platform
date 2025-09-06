import React, { useEffect, useState } from 'react';
import AdminLayout from './layout';
import AdminCourseEditor from '../../components/AdminCourseEditor';
import { supabase } from '../../lib/supabaseClient';

export default function AdminCoursesPage(){
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(()=>{ load(); }, []);
  async function load(){
    const { data } = await supabase.from('courses').select('*').order('created_at',{ascending:false}).limit(200);
    setCourses(data||[]);
  }
  async function save(data:any){
    await fetch('/api/admin/create-course', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(data) });
    load();
  }
  return (
    <AdminLayout>
      <h1>Cursos (Admin)</h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:16}}>
        <div>
          {courses.map(c => (<div key={c.id} style={{padding:12,background:'#fff',border:'1px solid #eee',marginBottom:8}}><strong>{c.title}</strong><div style={{color:'#666'}}>{c.category} • {c.level}</div></div>))}
        </div>
        <div>
          <AdminCourseEditor onSave={save} />
        </div>
      </div>
    </AdminLayout>
  )
}
