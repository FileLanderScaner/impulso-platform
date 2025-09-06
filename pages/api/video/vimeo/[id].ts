import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { id } = req.query;
  const token = process.env.VIMEO_TOKEN;
  if(!token) return res.status(500).json({ error: 'VIMEO_TOKEN not set' });
  try {
    const r = await fetch(`https://api.vimeo.com/videos/${id}`, { headers: { Authorization: `Bearer ${token}` }});
    if(!r.ok) {
      const txt = await r.text();
      return res.status(r.status).json({ error: txt });
    }
    const json = await r.json();
    // return minimal metadata
    const meta = {
      name: json.name,
      description: json.description,
      duration: json.duration,
      pictures: json.pictures,
      privacy: json.privacy
    };
    res.status(200).json(meta);
  } catch(e:any){
    res.status(500).json({ error: e.message || 'error' });
  }
}
