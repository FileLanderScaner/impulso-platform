import React from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Props = {
  users: User[];
};

export default function UserTable({ users }: Props) {
  return (
    <table className="w-full bg-white rounded shadow mt-4">
      <thead>
        <tr className="bg-indigo-100 text-indigo-700">
          <th className="p-2 text-left">Nombre</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Rol</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="border-b last:border-0">
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
