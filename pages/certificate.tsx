import React from "react";
import MainLayout from "../layouts/MainLayout";
import CertificatePreview from "../components/CertificatePreview";

export default function CertificatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-indigo-50 flex flex-col items-center justify-center py-16 px-4">
      <MainLayout>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">¡Felicidades! Has obtenido tu certificado</h1>
          <CertificatePreview
            name="Ana Acme"
            course="Onboarding Acme"
            issuedAt="2025-09-07"
            verifCode="ABC123XYZ"
          />
          <div className="mt-8 text-center text-gray-500 text-sm max-w-lg">
            Comparte tu logro en redes sociales y sigue aprendiendo con Impulso.
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
