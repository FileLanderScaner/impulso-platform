# Propuesta técnica — Plataforma de capacitación (Next.js + Supabase)

## Resumen ejecutivo

Entrego una plataforma multitenant de capacitación y onboarding construida sobre Next.js (React) desplegada en Vercel y con Supabase como backend (auth, base de datos PostgreSQL, storage y funciones). La plataforma estará pensada para reutilizarse por múltiples clientes dentro de la red (estructura Tenant → Marca → Sede), con trazabilidad completa del progreso, emisión de certificaciones/insignias en PDF y control de acceso exclusivo por Google Workspace SSO.

---

## Alcance funcional (lo que entrego)

### Autenticación / SSO
- Integración SSO exclusiva con Google Workspace (OAuth2/OpenID Connect) y validación de dominios autorizados.
- Onboarding forzado: ruta de bienvenida obligatoria para usuarios nuevos (no pueden acceder al catálogo hasta completarla).
- Asociación automática de usuario a Tenant/Marca/Sede al primer login (según dominio, join code o mapeo admin).

### Multitenancy
- Modelo jerárquico: Tenant → Marca → Sede.
- Visibilidad de contenido filtrada por marca/sede en el momento de publicación.
- Uso de row-level security en Supabase (políticas RLS) para aislar datos por tenant_id/brand_id/site_id.

### Catálogo de cursos
- Listado, filtros por categoría, nivel y etiquetas.
- Páginas de curso (lecciones, módulos, recursos).
- Reproducción de vídeo vía integración externa (YouTube / Vimeo Pro) — no se almacenan vídeos en la DB ni en Supabase Storage.
- Lecciones con progreso individual (por usuario + por intento).

### Ruta de bienvenida
- Módulo obligatorio para nuevos usuarios con seguimiento de progreso porcentual.
- Recordatorios automáticos (notificaciones in-app y envío de correo) si no completan la ruta.

### Evaluaciones y badges
- Múltiples tipos de evaluación: quizzes (auto-corregibles), ejercicios con revisión manual (opcional).
- Emisión de insignias/certificados en PDF que incluyen: nombre, curso, fecha, firma digital/texto y código único verificable.
- Generación PDF server-side (HTML → PDF) y almacenamiento/descarga segura.

### Foros / Comunidad
- Foros por curso y por marca/sede (hilos, respuestas, menciones).
- Sistema de notificaciones para novedades y respuestas en el dashboard personal.

### Admin UI
- Alta/baja/edición de usuarios, marcas, sedes, cursos y contenido.
- Paneles de métricas: consumo de contenido, avance por usuario, reportes por marca/sede.
- Control de roles y permisos (Admin global, Admin marca, Admin sede, Instructor, Usuario).

### Integración de video
- Conector API para YouTube/Vimeo: metadatos, listas privadas (Vimeo Pro), embedding seguro.
- Repositorio en DB solo con metadatos y URLs/IDs; player embebido en frontend.

### Calidad y despliegue
- CI/CD con GitHub Actions: lint → test → build → deploy a entornos (preprod/staging/prod).
- Entornos separados en Vercel (branch-based deployments + previews).
- Tests unitarios (Jest + React Testing Library) y e2e (Playwright o Cypress).

### Documentación & handover
- Documentación técnica (arquitectura, runbook, políticas RLS).
- Guía de despliegue y de configuración de Google Workspace SSO.
- Manual de uso admin + onboarding para formadores.

---

## Decisiones técnicas clave / arquitectura propuesta

### Stack principal
- **Frontend:** Next.js (App Router o Pages según repo actual), TypeScript, React, Tailwind CSS (si el diseño ya existe lo adapto).
- **Backend / BaaS:** Supabase (Auth, PostgreSQL, RLS, Storage, Edge Functions para lógica server-side).
- **Auth / SSO:** NextAuth.js (Google provider) o Supabase Auth con OAuth Google — validación de hd (hosted domain) + comprobación adicional en backend para dominios permitidos.
- **Testing:** Jest + React Testing Library; Playwright para e2e.
- **CI/CD:** GitHub Actions (workflows separados para pull requests y merge a main/production).
- **PDF / Certificados:** Renderizado server-side de plantillas HTML a PDF → Puppeteer/Playwright/Headless Chromium en una función serverless (o Supabase Edge Function).
- **Videos:** YouTube/Vimeo API usage — tokens en secret manager de Vercel/Supabase.
- **Logs / Observabilidad:** Integración básica con Sentry (errores) y métricas via Supabase + Google Analytics / Posthog si se requiere.

### Multitenancy
- Modelo elegido: Single schema multitenancy con tenant_id, brand_id, site_id en tablas clave combinado con RLS (es el más flexible para compartir recursos y mantener un solo código).
- Alternativa: Schemas por tenant si se requiere aislamiento físico (puedo detallar si el equipo lo prefiere).

### Seguridad
- RLS estricto en Postgres; tokens JWT firmados.
- Validación de hd de Google o lista blanca de dominios antes de permitir registro.
- Protección de endpoints admin via claims y roles.
- Backups periódicos de DB y snapshots antes de migraciones.

---

## Flujo de trabajo propuesto (cómo trabajo)
- Acceso inicial: acceso al repositorio privado, proyecto Vercel, proyecto Supabase, y cuenta Google Workspace admin (para configurar OAuth).
- Revisión del código base existente: auditoría rápida (arquitectura, dependencias, deuda técnica).
- Plan de migración / branching: crear una rama feature/multitenancy que implementa la base sin romper producción.
- Iteraciones por hitos: desarrollo en sprints (entregables por hitos; ver sección de hitos abajo).
- QA y pruebas: tests unitarios y e2e, revisión manual por stakeholders.
- Despliegue: deploy a staging para usuario-test, feedback, luego production.
- Transferencia & docs: entregar documentación y entrenamiento al equipo admin.

---

## Hitos / Entregables (sin fechas, listados para aprobación)

### Hito 1 — Setup & auditoría
- Accesos, auditoría de repo, propuesta final de arquitectura.
- **Entregable:** documento de arquitectura + plan detallado (RLS, tablas nuevas).

### Hito 2 — Auth, Multitenancy básica y Onboarding
- Implementación SSO Google con validación de dominios.
- Estructura de tenants, mapeo inicial y ruta de bienvenida obligatoria.
- **Entregable:** login SSO funcionando en entorno de staging; admin puede mapear dominios a tenant/marca.

### Hito 3 — Catálogo de cursos y reproducción de vídeo
- CRUD cursos, filtros, páginas de lección y embedding de YouTube/Vimeo.
- **Entregable:** catálogo en staging con lecciones de prueba.

### Hito 4 — Evaluaciones, progreso y badges PDF
- Quizzes, tracking de progreso, generación de PDF para insignias y certificados.
- **Entregable:** ejemplo de certificado PDF emitido desde staging.

### Hito 5 — Foros, notificaciones y dashboards
- Foros por curso, alertas/novedades en dashboard, paneles analíticos básicos por marca/sede.
- **Entregable:** panel admin con métricas y foros en staging.

### Hito 6 — Calidad, Tests y CI/CD
- Implementación completa de GitHub Actions, tests, y estrategias de branching.
- **Entregable:** workflows que corren en cada PR y despliegue a Vercel.

### Hito 7 — Hardening, documentación y producción
- Revisión de seguridad, pruebas finales, deploy a producción, entrega de documentación y training.

---

## Criterios de aceptación (para cada hito)
- Endpoints protegidos con roles y RLS.
- Usuarios solo pueden ver contenido de su marca/sede según publicación.
- Google SSO únicamente para dominios autorizados.
- Generación de PDF con datos correctos y enlace verificable.
- Workflows CI/CD que pasan lint/tests en PRs.
- Tests unitarios con cobertura mínima aceptable (definida con el cliente).
- E2E que validen flujos críticos (login, completar bienvenida, tomar un curso y generar certificado).

---

## Requerimientos al cliente / acceso necesario
- Acceso al repositorio privado de GitHub (permiso de colaborador).
- Acceso a cuenta Vercel (o invitación al proyecto).
- Proyecto Supabase o permisos para crear uno (URL, anon/key, service_role si aplica).
- Admin de Google Workspace para configurar OAuth credentials (Client ID/Secret) y white-listing de dominios.
- Claves API para Vimeo Pro o acceso a canal de YouTube.
- Assets de diseño (ya mencionaste que diseño está aprobado — necesito los tokens/archivos Figma/Zeplin y guidelines).

---

## Calidad del código y mantenimiento
- Código en TypeScript, modular y testeable.
- PRs con revisión y changelog.
- Repositorio con README para setup dev, comandos, variables de entorno.
- Opción de contrato de soporte/maintenance post-lanzamiento (bugfixes, upgrades de dependencias, soporte de 3 o 6 meses) — lo detallamos si interesa.

---

## Opcionales / mejoras futuras (recomendadas)
- Verificación de certificados vía QR + endpoint público de verificación.
- Integración SCORM/xAPI para compatibilidad con estándares eLearing.
- Analytics avanzado (retención, cohortes).
- Localización / soporte i18n.
- Integración con LMS externos si algún cliente lo solicita.
