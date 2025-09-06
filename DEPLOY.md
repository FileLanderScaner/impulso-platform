# Despliegue rápido

1. Crear proyecto Supabase y ejecutar `supabase/schema/init_extended.sql`.
2. Crear credenciales Google OAuth (Client ID / Secret). Redirect URI:
   - https://TU_DOMINIO/api/auth/callback/google
3. Poner variables en Vercel (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ALLOWED_DOMAINS, VIMEO_TOKEN).
4. Añadir GitHub Secrets (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID, SUPABASE_SERVICE_ROLE_KEY).
5. Push a repo; GitHub Actions ejecutará CI y deploy a Vercel (configura Vercel project id).
