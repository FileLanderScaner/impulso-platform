import { useSession } from 'next-auth/react';
import { useState } from 'react';
export default function Welcome(){
  const { data: session } = useSession();
  const [completed,setCompleted] = useState(false);
  async function markDone(){
    // call API to update onboarding_completed
    await fetch('/api/me/onboarding', { method: 'POST' });
    setCompleted(true);
    window.location.href = '/dashboard';
  }
  return (
    <div style={{padding:40}}>
      <h1>Bienvenido{session?.user?.name ? `, ${session.user.name}` : ''}</h1>
      <p>Por favor completa los pasos de bienvenida.</p>
      <button onClick={markDone}>Marcar como completado</button>
    </div>
  )
}
