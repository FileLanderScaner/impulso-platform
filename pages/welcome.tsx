import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Welcome() {
  const { data: session } = useSession();
  const [completed, setCompleted] = useState(false);
  async function markDone() {
    await fetch('/api/me/onboarding', { method: 'POST' });
    setCompleted(true);
    window.location.href = '/dashboard';
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-white to-indigo-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full flex flex-col items-center">
        <img src="/onboarding-illustration.svg" alt="Onboarding" className="w-32 mb-6" />
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">¡Bienvenido{session?.user?.name ? `, ${session.user.name}` : ''}!</h1>
        <p className="text-gray-600 mb-6 text-center">Completa los pasos de bienvenida para comenzar a aprender y obtener tus certificados.</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div className="bg-primary h-4 rounded-full transition-all" style={{ width: completed ? '100%' : '60%' }}></div>
        </div>
        <button
          onClick={markDone}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg shadow transition mt-4"
        >
          {completed ? '¡Listo! Ir al dashboard' : 'Marcar como completado'}
        </button>
      </div>
    </div>
  );
}
