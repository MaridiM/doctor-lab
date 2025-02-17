import { Metadata } from 'next'

import Link from 'next/link'
import { PATHS } from '@/shared/config'

export const metadata: Metadata = {
    title: 'Dashboard'
}

export default function HomePage() {
    return <div><Link href={PATHS.dashboard}>Dashboard</Link></div>
}
