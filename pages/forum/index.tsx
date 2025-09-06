import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default function ForumIndex(){
  const [threads, setThreads] = useState<any[]>([]);
  useEffect(()=>{ load(); }, []);
  async function load(){
    const { data } = await supabase.from('forum_threads').select('*').order('created_at', { ascending:false }).limit(200);
    setThreads(data||[]);
  }
  return (
    <div style={{padding:24}}>
      <h1>Foro</h1>
      <div>
        {threads.map(t => (<div key={t.id} style={{padding:8,border:'1px solid #eee',marginBottom:8}}><Link href={`/forum/${t.id}`}><a>{t.title}</a></Link></div>))}
      </div>
    </div>
  )
}
