import { useSession } from 'next-auth/react';
export default function Dashboard(){
  const { data: session } = useSession();
  return (
    <div style={{padding:40}}>
      <h1>Dashboard</h1>
      <p>Bienvenido {session?.user?.name}</p>
      <p>Contenido de ejemplo del catálogo estará aquí.</p>
    </div>
  )
}
