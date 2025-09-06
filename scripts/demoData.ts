// Datos de ejemplo para la demo pública

export const tenants = [
  { id: 1, name: "Acme Corp", domain: "acme.com" },
  { id: 2, name: "Globex", domain: "globex.com" }
];

export const brands = [
  { id: 1, tenant_id: 1, name: "Acme Training" },
  { id: 2, tenant_id: 2, name: "Globex Academy" }
];

export const sites = [
  { id: 1, brand_id: 1, name: "Acme Madrid" },
  { id: 2, brand_id: 2, name: "Globex Barcelona" }
];

export const courses = [
  { id: 1, brand_id: 1, title: "Onboarding Acme", category: "Onboarding", level: "Básico" },
  { id: 2, brand_id: 2, title: "Compliance Globex", category: "Legal", level: "Intermedio" }
];

export const users = [
  { id: 1, email: "ana@acme.com", tenant_id: 1, brand_id: 1, site_id: 1, name: "Ana Acme" },
  { id: 2, email: "luis@globex.com", tenant_id: 2, brand_id: 2, site_id: 2, name: "Luis Globex" }
];
