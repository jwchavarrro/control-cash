/**
 * @file page.tsx
 * @description Página de inicio
 * @module app/page
 */
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/login')
}
