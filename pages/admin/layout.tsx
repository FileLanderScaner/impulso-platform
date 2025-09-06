import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <aside style={{width:240,background:'#0f172a',color:'#fff',padding:20}}>
        <h2 style={{marginTop:0}}>Admin</h2>
        <nav>
          <ul style={{listStyle:'none',padding:0}}>
            <li><Link href="/admin"><a style={{color:'#cbd5e1'}}>Inicio</a></Link></li>
            <li><Link href="/admin/users"><a style={{color:'#cbd5e1'}}>Usuarios</a></Link></li>
            <li><Link href="/admin/courses"><a style={{color:'#cbd5e1'}}>Cursos</a></Link></li>
            <li><Link href="/admin/brands"><a style={{color:'#cbd5e1'}}>Marcas & Sedes</a></Link></li>
            <li><Link href="/admin/metrics"><a style={{color:'#cbd5e1'}}>Métricas</a></Link></li>
          </ul>
        </nav>
      </aside>
      <main style={{flex:1,padding:24,background:'#f8fafc'}}>{children}</main>
    </div>
  )
}
