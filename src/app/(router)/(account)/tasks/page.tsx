import { Metadata } from 'next'

import { TasksScreen } from '@/screens'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('tasks')

    return {
        title: t('heading')
    }
}

export default function TasksPage() {
    return <TasksScreen  />
}
