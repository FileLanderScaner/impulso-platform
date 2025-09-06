import React, { useState } from 'react';

export default function AdminCourseEditor({ onSave, initial }: any){
  const [form, setForm] = useState(initial || { title:'', description:'', category:'', level:'', published:false });
  return (
    <div style={{background:'#fff',padding:12,border:'1px solid #eee',borderRadius:6}}>
      <input placeholder="Título" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} style={{width:'100%',padding:8,marginBottom:8}}/>
      <input placeholder="Categoría" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} style={{padding:8,marginRight:8}} />
      <input placeholder="Nivel" value={form.level} onChange={e=>setForm({...form, level:e.target.value})} style={{padding:8}} />
      <textarea placeholder="Descripción" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} style={{width:'100%',padding:8,marginTop:8}} />
      <div style={{marginTop:8}}><label><input type="checkbox" checked={form.published} onChange={e=>setForm({...form, published:e.target.checked})}/> Publicar</label></div>
      <div style={{marginTop:8}}><button onClick={()=>onSave(form)}>Guardar</button></div>
    </div>
  )
}
