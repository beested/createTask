// app/layout.tsx
import { ThemeRegistry } from '@/context/theme-context'
import { SnackbarProvider } from '@/context/useSnackBar'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Seu Projeto',
  description: 'Descrição do projeto'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeRegistry>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeRegistry>
  )
}
