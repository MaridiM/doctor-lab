import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { PATHS } from '@/shared/config'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('dashboard')

    return {
        title: t('heading')
    }
}

export default function HomePage() {
    return (
        <div>
            <Link href={PATHS.dashboard}>Dashboard</Link>
        </div>
    )
}
