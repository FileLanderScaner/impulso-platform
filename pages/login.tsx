import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';

const testimonios = [
  {
    nombre: 'Ana Acme',
    texto: 'Gracias a Impulso conseguí mi primer empleo en tecnología. ¡La experiencia fue increíble!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    nombre: 'Luis Globex',
    texto: 'Los cursos y la comunidad me ayudaron a crecer profesionalmente. Recomiendo Impulso a todos.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    nombre: 'María Tech',
    texto: 'La plataforma es intuitiva y los certificados me abrieron puertas en el mercado laboral.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

export default function Login() {
  const [testimonioIdx, setTestimonioIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonioIdx((i) => (i + 1) % testimonios.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonio = testimonios[testimonioIdx];

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-primary-light via-white to-indigo-100">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.svg" alt="Impulso Logo" className="h-10 w-10" />
            <span className="font-extrabold text-2xl text-primary">Impulso</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Bienvenido de nuevo</h2>
          <p className="mb-6 text-gray-500">Accede a cursos certificados y una comunidad activa para impulsar tu carrera.</p>
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg shadow transition mb-4"
          >
            <svg className="h-5 w-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.13 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9.04h12.42c-.54 2.9-2.18 5.36-4.65 7.04l7.18 5.59C43.98 37.13 46.1 31.3 46.1 24.5z"/><path fill="#FBBC05" d="M10.67 28.04c-1.13-3.36-1.13-6.98 0-10.34l-7.98-6.2C.7 15.82 0 19.78 0 24c0 4.22.7 8.18 2.69 12.5l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.13 0 11.64-2.03 15.53-5.53l-7.18-5.59c-2.01 1.35-4.58 2.13-7.35 2.13-6.38 0-11.87-3.63-14.33-8.87l-7.98 6.2C6.73 42.52 14.82 48 24 48z"/></g></svg>
            Iniciar sesión con Google
          </button>
          <p className="text-xs text-gray-400 text-center">Si estás en staging, usa el botón de prueba en <span className="font-mono">/api/auth/test-login</span></p>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-white/80 rounded-2xl shadow-lg p-8 max-w-md w-full animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <img src={testimonio.avatar} alt={testimonio.nombre} className="h-12 w-12 rounded-full border-2 border-primary" />
            <div>
              <div className="font-bold text-gray-700">{testimonio.nombre}</div>
              <div className="text-sm text-gray-500">Usuario verificado</div>
            </div>
          </div>
          <blockquote className="italic text-gray-600">“{testimonio.texto}”</blockquote>
        </div>
        <div className="mt-8 text-center text-gray-400 text-xs">© {new Date().getFullYear()} Impulso. Todos los derechos reservados.</div>
      </div>
    </div>
  );
}
