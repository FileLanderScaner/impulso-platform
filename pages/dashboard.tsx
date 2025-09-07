import React from "react";
import MainLayout from "../layouts/MainLayout";
import CourseCard from "../components/CourseCard";
import UserGamification from "../components/UserGamification";
import Leaderboard from "../components/Leaderboard";

const mockCourses = [
  { title: "Onboarding Acme", description: "Bienvenida y cultura de la empresa.", category: "Onboarding", level: "Básico" },
  { title: "Compliance Globex", description: "Normativas y buenas prácticas.", category: "Legal", level: "Intermedio" }
];

export default function Dashboard() {
  // Datos de gamificación de ejemplo
  const userGamification = {
    points: 1250,
    level: 4,
    achievements: [
      { icon: "🏅", label: "Primer curso completado" },
      { icon: "🔥", label: "Racha de 7 días" },
      { icon: "💬", label: "Primer post en foro" },
    ],
  };
  // Ranking de usuarios de ejemplo
  const leaderboardUsers = [
    { id: "1", name: "Ana Acme", points: 1800 },
    { id: "2", name: "Luis Globex", points: 1500 },
    { id: "3", name: "María Tech", points: 1400 },
    { id: "4", name: "Carlos Dev", points: 1200 },
    { id: "5", name: "Sofía UX", points: 1100 },
    { id: "6", name: "Pedro QA", points: 900 },
    { id: "7", name: "Lucía Data", points: 850 },
    { id: "8", name: "Miguel AI", points: 800 },
    { id: "9", name: "Elena PM", points: 700 },
    { id: "10", name: "Jorge Cloud", points: 650 },
  ];

  return (
    <MainLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">¡Bienvenido a tu panel de aprendizaje!</h1>
        <p className="text-gray-600">Aquí puedes ver tu progreso, cursos activos y recomendaciones personalizadas.</p>
      </div>
      <UserGamification {...userGamification} />
      <Leaderboard users={leaderboardUsers} />
      <section className="mb-12">
        <h2 className="text-xl font-bold text-primary mb-4">Tus cursos activos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockCourses.map((c, i) => (
            <CourseCard key={i} {...c} />
          ))}
        </div>
      </section>
      <section className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2 text-gray-800">Progreso general</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div className="bg-primary h-4 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-500">Has completado el 60% de tus cursos. ¡Sigue así!</p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <img src="/dashboard-illustration.svg" alt="Progreso" className="w-40 mb-2" />
          <span className="text-xs text-gray-400">Aprende a tu ritmo, desde cualquier lugar.</span>
        </div>
      </section>
    </MainLayout>
  );
}
