import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { DashboardScreen } from '@/screens'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('dashboard')

    return {
        title: t('heading')
    }
}

export default function HomePage() {
    return <DashboardScreen />
}
