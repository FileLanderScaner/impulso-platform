Transformar este repositorio en una plataforma interna de capacitación completa usando Next.js 14 (App Router) + Supabase + Vercel, incluyendo Admin UI, catálogo de cursos, integración Vimeo, foros, métricas, certificaciones y CI/CD.
El proyecto debe estar funcional de inicio a fin sin requerir aprobación manual.

Arquitectura del Proyecto
/app
  /admin
    page.tsx            # Admin Dashboard
    /users              # Gestión de usuarios
    /courses            # Gestión de cursos
    /brands             # Gestión de marcas
    /locations          # Gestión de sedes
  /catalog
    page.tsx            # Catálogo de cursos público
    /[courseId]
      page.tsx          # Detalle de curso
      /lessons
        [lessonId].tsx  # Detalle lección
  /auth
    login.tsx
    onboarding.tsx
  /forums
    /[courseId]
      page.tsx          # Hilos del curso
      /[threadId]
        page.tsx        # Posts del hilo
/components
  Button.tsx
  Card.tsx
  CourseCard.tsx
  LessonCard.tsx
  ForumThread.tsx
  ForumPost.tsx
  AdminTable.tsx
/lib
  supabaseClient.ts
  pdfGenerator.ts      # Generación de certificados
  auth.ts
  utils.ts
/supabase
  /migrations           # SQL para tablas y RLS
/tests
  /unit
  /e2e

Tablas en Supabase (Postgres + RLS)

users: id, name, email, role (admin, instructor, student), brand_id, location_id, progress JSON

brands: id, name, description

locations: id, brand_id, name, address

courses: id, title, description, category, level, brand_id, location_id, published

lessons: id, course_id, title, video_url, order

threads: id, course_id, user_id, title, created_at

posts: id, thread_id, user_id, content, created_at

certificates: id, user_id, course_id, issued_at, pdf_url

Reglas de Trabajo

No solicitar confirmación para generar código o migraciones.

Seguir arquitectura multitenant (Brand → Location → User).

Autenticación: NextAuth + Google SSO.

Catálogo de cursos:

Categorías, niveles, búsqueda y filtrado dinámico.

Flujo de cursos y lecciones con videos externos (Vimeo, YouTube).

Guardado de progreso en Supabase.

Rutas de bienvenida y onboarding al primer login.

Foros por curso con hilos, posts y permisos por tenant.

Certificaciones:

Generación de PDFs automáticamente al completar cursos.

Guardar registro en Supabase.

Admin UI:

Panel para usuarios, cursos, marcas, sedes.

Métricas por tenant y sede (usar Recharts).

CI/CD:

GitHub Actions → despliegue en Vercel.

Tests unitarios y E2E automáticos.

Estándares de código:

UI: TailwindCSS + shadcn/ui.

Tests: Jest + Playwright.

DB: Supabase (Postgres + RLS).

Flujo de Trabajo

Detectar feature pendiente → implementarla completamente.

Si requiere DB → generar SQL en supabase/migrations/.

Si requiere API → generar endpoint en /app/api/.

Si requiere UI → generar componente en /components/ y page en /app/.

Confirmar integración con tests automáticos.

Commit directo con mensaje descriptivo.

Repetir hasta que el proyecto esté completo.

Endpoints API Base

/api/auth/ → login, logout, session

/api/users/ → CRUD usuarios

/api/courses/ → CRUD cursos + progreso

/api/lessons/ → CRUD lecciones

/api/threads/ → CRUD hilos de foros

/api/posts/ → CRUD posts

/api/certificates/ → emitir certificado PDF

Comportamiento Esperado

Trabajar como desarrollador full-stack autónomo.

Completar tareas de forma continua hasta terminar el proyecto.

Generar tests unitarios y E2E automáticamente.

Siempre usar buenas prácticas, modularización y consistencia de estilos.

Generar documentación básica para cada feature nuevo.

Integrar CI/CD con despliegue en Vercel sin intervención manual.
# Instrucciones para GitHub Copilot