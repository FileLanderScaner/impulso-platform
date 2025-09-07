import React from "react";

interface Props {
  points: number;
  level: number;
  achievements: { icon: string; label: string }[];
}

export default function UserGamification({ points, level, achievements }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-4">
        <span className="bg-primary text-white rounded-full px-4 py-2 text-lg font-bold shadow">Nivel {level}</span>
        <span className="text-gray-500 text-sm">{points} puntos</span>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        {achievements.map((a, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-2xl mb-1" role="img" aria-label={a.label}>{a.icon}</span>
            <span className="text-xs text-gray-500">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
