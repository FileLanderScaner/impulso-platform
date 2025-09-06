import { signIn } from 'next-auth/react';
export default function Login(){
  return (
    <div style={{padding:40}}>
      <h2>Login</h2>
      <button onClick={()=> signIn('google')}>Iniciar sesión con Google</button>
      <p>Si estás en staging, usa el botón de prueba en /api/auth/test-login</p>
    </div>
  )
}
