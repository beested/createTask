'use client'

import dynamic from 'next/dynamic'
import WindelLottie from '../../../../../../public/lotties/audit-empty.json'

const DynamicLottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <p>Carregando animação...</p>
})

export function AuditEmptyLottie() {
  return <DynamicLottie animationData={WindelLottie} loop={true} />
}
