import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

import { PATHS } from '@/shared/config'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('dashboard')

    return {
        title: t('heading')
    }
}

export default function HomePage() {
    return redirect(PATHS.dashboard)
}
