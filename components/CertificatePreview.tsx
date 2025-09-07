import React from "react";

type Props = {
  name: string;
  course: string;
  issuedAt: string;
  verifCode: string;
};

export default function CertificatePreview({ name, course, issuedAt, verifCode }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-2">Certificado de finalización</h2>
      <p className="mb-4">Otorgado a <span className="font-semibold">{name}</span> por completar el curso <span className="font-semibold">{course}</span>.</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Emitido: {issuedAt}</span>
        <span>Código: {verifCode}</span>
      </div>
    </div>
  );
}
