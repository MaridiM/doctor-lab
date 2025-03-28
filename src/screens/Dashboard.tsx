import { Patients, Schedule, Tasks, TodaySummaryWidget } from '@/widgets'

export default function Dashboard() {
    return (
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
    )
}
