import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

export default function ThreadPage(){
  const router = useRouter();
  const { threadId } = router.query;
  const [thread, setThread] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState('');

  useEffect(()=>{ if(threadId) load(); }, [threadId]);

  async function load(){
    const { data: t } = await supabase.from('forum_threads').select('*').eq('id', threadId).single();
    const { data: p } = await supabase.from('forum_posts').select('*').eq('thread_id', threadId).order('created_at');
    setThread(t); setPosts(p||[]);
  }

  async function post(){
    await fetch('/api/forum/post', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ thread_id: threadId, content })});
    setContent(''); load();
  }

  if(!thread) return <div style={{padding:24}}>Cargando hilo...</div>;
  return (
    <div style={{padding:24}}>
      <h2>{thread.title}</h2>
      <div>
        {posts.map(p => (<div key={p.id} style={{padding:8,background:'#fff',marginBottom:8}}>{p.content}</div>))}
      </div>
      <div style={{marginTop:12}}>
        <textarea value={content} onChange={e=>setContent(e.target.value)} style={{width:'100%',height:80}} />
        <button onClick={post} style={{marginTop:8}}>Publicar</button>
      </div>
    </div>
  )
}
