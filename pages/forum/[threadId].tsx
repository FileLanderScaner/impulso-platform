import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

export default function ThreadPage() {
  const router = useRouter();
  const { threadId } = router.query;
  const [thread, setThread] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => { if (threadId) load(); }, [threadId]);

  async function load() {
    setLoading(true);
    const { data: t } = await supabase.from('forum_threads').select('*').eq('id', threadId).single();
    const { data: p } = await supabase.from('forum_posts').select('*').eq('thread_id', threadId).order('created_at');
    setThread(t); setPosts(p || []);
    setLoading(false);
  }

  async function post() {
    if (!content.trim()) return;
    setPosting(true);
    await fetch('/api/forum/post', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ thread_id: threadId, content }) });
    setContent('');
    setPosting(false);
    load();
  }

  if (loading || !thread) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-white to-indigo-50">
      <div className="text-gray-400 text-lg">Cargando hilo...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block bg-primary text-white rounded-full px-3 py-1 text-xs font-bold">Hilo</span>
            <span className="text-gray-400 text-xs">ID: {thread.id}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{thread.title}</h2>
          <p className="text-gray-600 mb-2">{thread.description || 'Sin descripción'}</p>
          <div className="text-xs text-gray-400">Creado el {new Date(thread.created_at).toLocaleDateString()}</div>
        </div>
        <div className="mb-10">
          <h3 className="font-bold text-primary mb-4">Respuestas</h3>
          {posts.length === 0 ? (
            <div className="text-gray-400 text-center py-8">Aún no hay respuestas. ¡Sé el primero en participar!</div>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map((p, i) => (
                <div key={p.id} className="bg-white rounded-xl shadow p-4 flex gap-4 items-start animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${p.id}`} alt="avatar" className="h-10 w-10 rounded-full border border-primary" />
                  <div>
                    <div className="text-gray-700 mb-1">{p.content}</div>
                    <div className="text-xs text-gray-400">{new Date(p.created_at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow p-6 animate-fade-in">
          <h4 className="font-bold text-gray-800 mb-2">Responder</h4>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full min-h-[80px] rounded-lg border border-gray-200 p-3 mb-3 focus:ring-2 focus:ring-primary outline-none resize-none"
            placeholder="Escribe tu respuesta..."
            disabled={posting}
          />
          <button
            onClick={post}
            disabled={posting || !content.trim()}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg shadow transition disabled:opacity-50"
          >
            {posting ? 'Publicando...' : 'Publicar respuesta'}
          </button>
        </div>
        <div className="mt-10 text-center text-xs text-gray-400">Participa, ayuda y aprende junto a la comunidad de Impulso.</div>
      </div>
    </div>
  );
}
