import { Metadata } from 'next'

import { HomeScreen } from '@/screens'

export const metadata: Metadata = {
    title: 'Home'
}

export default function HomePage() {
    return <HomeScreen />
}
