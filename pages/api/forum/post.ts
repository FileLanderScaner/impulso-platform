import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end();
  const { thread_id, content } = req.body;
  const { data, error } = await supabase.from('forum_posts').insert([{ thread_id, content }]);
  if(error) return res.status(500).json({ error: error.message });
  res.json({ ok:true, post: data?.[0] });
}
