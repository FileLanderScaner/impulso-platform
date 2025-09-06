# Impulso - Plataforma de capacitación (Scaffold)

Esta es una entrega automática con los artefactos listos para pegar en tu repositorio.
Incluye:
- Next.js scaffold con NextAuth (Google SSO)
- Integración con Supabase (esquema SQL + RLS)
- GitHub Actions workflow para CI/CD (deploy a Vercel)
- Middleware para ruta de bienvenida obligatoria
- Generador de certificados (Puppeteer + plantilla HTML)
- Tests ejemplo (Jest + Playwright)
- README de despliegue (DEPLOY.md)

**IMPORTANTE**: Debes configurar secrets en Vercel y GitHub antes de desplegar.

---

## Requisitos
- Node.js >= 18
- Yarn o npm
- Acceso a Supabase (ver `.env.local`)

## Instalación

```bash
npm install
# o
yarn install
```

## Variables de entorno

Copia el archivo `.env.local` y completa las variables necesarias para conectar con Supabase y otros servicios.

## Scripts principales

```bash
npm run dev      # Inicia el entorno de desarrollo
npm run build    # Compila la app para producción
npm run start    # Inicia la app en modo producción
npm run test     # Ejecuta los tests unitarios
```

## Estructura principal
- `/pages` — Rutas y vistas principales
- `/components` — Componentes reutilizables
- `/supabase` — Configuración y scripts de base de datos
- `/styles` — Estilos globales
- `/templates` — Plantillas HTML para certificados
- `/tests` — Pruebas unitarias y e2e

## Documentación
Consulta `PROPUESTA.md` para la propuesta técnica y alcance funcional.

---

## Despliegue
Consulta el archivo `DEPLOY.md` para instrucciones detalladas de despliegue en Vercel y configuración de secrets.

---

## Créditos y contacto
Desarrollado por FileLanderScaner. Para soporte o dudas, consulta la documentación o abre un issue.
