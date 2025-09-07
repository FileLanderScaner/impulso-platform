import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import UserTable from "../../components/UserTable";

const mockUsers = [
  { id: "1", name: "Ana Acme", email: "ana@acme.com", role: "admin" },
  { id: "2", name: "Luis Globex", email: "luis@globex.com", role: "user" }
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const filtered = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Gestión de Usuarios</h1>
        <p className="text-gray-600 mb-6">Administra los usuarios registrados en la plataforma.</p>
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none mb-6"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <UserTable users={filtered} />
        </div>
      </div>
    </AdminLayout>
  );
}
