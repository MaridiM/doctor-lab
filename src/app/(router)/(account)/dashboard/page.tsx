import { Metadata } from 'next'

import { DashboardScreen } from '@/screens'

export const metadata: Metadata = {
    title: 'Dashboard'
}

export default function HomePage() {
    return <DashboardScreen />
}
