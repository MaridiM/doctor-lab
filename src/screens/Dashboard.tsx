import { Header } from '@/widgets'
import { Patients, Schedule, Tasks, TodaySummaryWidget } from '@/widgets/dashboard'
import { useTranslations } from 'next-intl'

export default function Dashboard() {
    const t = useTranslations('dashboard')

    return (
        <>
            <Header title={t('title')} />
            <div className='flex flex-1 flex-col gap-2 overflow-hidden p-2'>
                <section className='flex h-full w-full flex-1 gap-2'>
                    <Schedule />
                    <section className='flex h-full w-full flex-col gap-2'>
                        <TodaySummaryWidget />
                        <Patients />
                    </section>
                    <Tasks />
                </section>
            </div>
        </>
    )
}
