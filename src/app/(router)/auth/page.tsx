import { Metadata } from 'next'

import { AuthScreen } from '@/screens/auth'

export const metadata: Metadata = {
    title: 'Auth'
}

export default function HomePage() {
    return <AuthScreen />
}
