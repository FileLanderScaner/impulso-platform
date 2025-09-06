import Link from 'next/link';
export default function Home(){
  return (
    <div style={{padding:40}}>
      <h1>Impulso - Plataforma</h1>
      <p><Link href='/login'>Iniciar sesión</Link></p>
    </div>
  )
}
