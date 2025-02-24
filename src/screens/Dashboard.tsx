import { Patients, Schedule, Tasks } from '@/widgets'

export default function Dashboard() {
    return (
        <div className='flex flex-1 flex-col gap-2 overflow-hidden p-2'>
            <section className='flex h-full w-full flex-1 gap-2'>
                <Schedule />
                <Patients />
                <Tasks />
            </section>
        </div>
    )
}
