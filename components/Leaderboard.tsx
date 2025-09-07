import React from "react";

interface User {
  id: string;
  name: string;
  points: number;
  avatar?: string;
}

interface Props {
  users: User[];
}

export default function Leaderboard({ users }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
      <h2 className="text-xl font-bold text-primary mb-4">Ranking de Usuarios</h2>
      <ol className="space-y-3">
        {users.slice(0, 10).map((u, i) => (
          <li key={u.id} className={`flex items-center gap-3 p-3 rounded-lg ${i === 0 ? 'bg-accent/10' : ''}`}>
            <span className="font-bold text-lg w-6 text-center">{i + 1}</span>
            <img src={u.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${u.id}`} alt={u.name} className="h-8 w-8 rounded-full border border-primary" />
            <span className="flex-1 font-semibold text-gray-800">{u.name}</span>
            <span className="text-primary font-bold">{u.points} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
