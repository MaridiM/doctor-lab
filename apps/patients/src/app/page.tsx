import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PatientsScreen } from '@/screens'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('patients')

    return {
        title: t('heading')
    }
}

export default function HomePage() {
    return <PatientsScreen />
}
