import { getSession } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL||'', process.env.SUPABASE_SERVICE_ROLE_KEY||'');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if(!session || !session.user?.email) return res.status(401).json({ error: 'Not authenticated' });

  // fetch profile
  const { data } = await supabase.from('user_profiles').select('onboarding_completed').eq('email', session.user.email).single();
  if(req.method === 'GET'){
    return res.status(200).json({ onboarding_completed: data?.onboarding_completed || false });
  }
  if(req.method === 'POST'){
    // set onboarding completed for user
    await supabase.from('user_profiles').update({ onboarding_completed: true }).eq('email', session.user.email);
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
