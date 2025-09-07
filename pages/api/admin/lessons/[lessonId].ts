import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lessonId } = req.query;

  if (req.method === 'PUT') {
    const { title, content, type } = req.body;
    const updateData: { title?: string; content?: string; type?: 'text' | 'video' | 'quiz', updated_at: string } = { updated_at: new Date().toISOString() };

    if (title) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (type) updateData.type = type;

    const { data, error } = await supabase
      .from('lessons')
      .update(updateData)
      .eq('id', lessonId as string)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ lesson: data });
  }

  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

