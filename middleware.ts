import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/api', '/api/auth', '/login', '/welcome', '/static', '/_next'];

export async function middleware(req: NextRequest){
  const pathname = req.nextUrl.pathname;
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) return NextResponse.next();

  const cookie = req.headers.get('cookie') || '';
  // quick check: if no next-auth cookie, redirect to login
  if(!cookie.includes('next-auth.session-token') && !cookie.includes('__Secure-next-auth.session-token')){
    const url = req.nextUrl.clone(); url.pathname = '/login'; return NextResponse.redirect(url);
  }

  try {
    const apiUrl = new URL('/api/me/onboarding', req.nextUrl.origin);
    const resp = await fetch(apiUrl.toString(), { headers: { cookie }});
    if(resp.ok){
      const json = await resp.json();
      if(!json.onboarding_completed && pathname !== '/welcome'){
        const url = req.nextUrl.clone(); url.pathname = '/welcome'; return NextResponse.redirect(url);
      }
    }
  } catch(e){
    // ignore and allow
    console.error(e);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
