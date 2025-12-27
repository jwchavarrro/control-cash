import { redirect } from 'next/navigation'

export default function Home() {
  // Redirigir al login (en un proyecto real, verificarías si el usuario está autenticado)
  redirect('/login')
}
