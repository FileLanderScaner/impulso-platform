import { test, expect } from '@playwright/test';

test('flujo onboarding completo (prueba simple)', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  // Este test asume un botón de login de prueba en entorno de staging
  // Implementar en staging un endpoint /api/auth/test-login que cree una sesión de prueba.
  // Para demo local, se puede mockear la sesión.
  await expect(page.locator('text=Iniciar sesión con Google')).toBeVisible();
});
