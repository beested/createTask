'use client'

import dynamic from 'next/dynamic'
import WindelLottie from '../../../../../../public/lotties/audit-empty.json'

// Carrega Lottie dinamicamente, desativando SSR
const DynamicLottie = dynamic(() => import('lottie-react'), {
  ssr: false, // Garante que o componente não seja renderizado no servidor
  loading: () => <p>Carregando animação...</p> // Opcional: exibe um placeholder enquanto carrega
})

export function AuditEmptyLottie() {
  return <DynamicLottie animationData={WindelLottie} loop={true} />
}
