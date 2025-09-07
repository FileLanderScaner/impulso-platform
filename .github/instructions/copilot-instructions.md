# Copilot Instructions – Impulso Platform

## Big Picture & Arquitectura

Impulso Platform es una plataforma multitenant de capacitación y onboarding, construida con Next.js 14 (Pages Router), Supabase (PostgreSQL, Auth, Storage, RLS), y desplegada en Vercel. El objetivo es ofrecer una solución SaaS lista para múltiples clientes (Tenant → Marca → Sede), con trazabilidad, onboarding forzado, emisión de certificados PDF y control de acceso por Google Workspace SSO.

### Componentes principales
- **Frontend:** Next.js (TypeScript, React, Tailwind opcional), rutas en `/pages`, componentes en `/components`.
- **Backend/BaaS:** Supabase (tablas, RLS, funciones, storage). Integración vía `@supabase/supabase-js`.
- **Auth:** NextAuth.js (Google SSO, validación de dominios, onboarding forzado).
- **CI/CD:** GitHub Actions (`lint`, `test`, `build`, `deploy` a Vercel).
- **Certificados:** Generación server-side con Puppeteer (`scripts/generateCertificate.js` y `/templates/certificate.html`).
- **Foros:** Tablas y endpoints para hilos y posts por curso/marca.

### Data flow & Multitenancy
- Modelo jerárquico: `tenants` → `brands` → `sites` (ver `/supabase/schema/init_extended.sql`).
- Todas las tablas clave tienen `tenant_id`, `brand_id`, `site_id` y usan RLS para aislamiento.
- El onboarding es obligatorio: los usuarios nuevos son redirigidos a `/welcome` hasta completarlo (ver `middleware.ts`).
- Acceso a cursos, foros y certificados está filtrado por marca/sede y rol.

## Workflows y comandos clave
- **Desarrollo:** `npm run dev` (Next.js local)
- **Tests unitarios:** `npm run test:unit` (Jest + React Testing Library)
- **Tests e2e:** `npm run test:e2e` (Playwright)
- **Generar certificado PDF:** `npm run generate:cert -- --name="Nombre" --course="Curso" ...`
- **Despliegue:** Push a main → GitHub Actions → Vercel (ver `DEPLOY.md`)

## Convenciones y patrones específicos
- **Onboarding forzado:** Middleware (`middleware.ts`) y endpoint `/api/me/onboarding.ts` controlan acceso inicial.
- **SSO Google Workspace:** Solo dominios permitidos (ver `.env.local` y `pages/api/auth/[...nextauth].ts`).
- **RLS:** Políticas estrictas en Supabase, ver ejemplos en `supabase/schema/init_extended.sql`.
- **Estructura de carpetas:**
	- `/pages` (rutas Next.js)
	- `/components` (UI reutilizable)
	- `/supabase/schema` (SQL, RLS)
	- `/scripts` (utilidades, generación de certificados, datos demo)
	- `/templates` (HTML para PDFs)
	- `/tests` (unitarios y e2e)
- **Variables de entorno:** `.env.local` (ver README y ejemplo generado)

## Integraciones y dependencias externas
- **Supabase:** Auth, DB, Storage, RLS, Edge Functions
- **NextAuth.js:** SSO Google, validación de dominio, JWT
- **Vimeo/YouTube:** Solo metadatos y URLs, no se almacena video
- **Puppeteer:** Renderizado de certificados PDF

## Ejemplos clave
- **Política RLS para cursos:**
```sql
create policy "courses_select_by_brand_site" on courses
	for select using (
		published = true and (
			brand_id is null 
			or brand_id = (select brand_id from user_profiles where id = auth.uid())
			or site_id = (select site_id from user_profiles where id = auth.uid())
		)
	);
```
- **Middleware de onboarding:**
Ver `/middleware.ts` para lógica de redirección según estado de onboarding.
- **Upsert de perfil en login:**
Ver `/pages/api/auth/[...nextauth].ts` callback `signIn`.

## Reglas para AI agents
- Mantén la compatibilidad con multitenancy y RLS en cualquier cambio de modelo o endpoint.
- No expongas datos fuera del tenant/brand/site del usuario autenticado.
- Usa los scripts y convenciones existentes para tests, generación de certificados y despliegue.
- Documenta cualquier nuevo flujo o convención en el README o en este archivo.

