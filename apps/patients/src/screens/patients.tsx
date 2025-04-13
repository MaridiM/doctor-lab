import Link from 'next/link'

import { LogoIcon } from '@/shared/components'
import { PATHS } from '@/shared/config'

const Patients = () => {
    return (
        <div className='h-screen w-full'>
            <header className='bg-card flex h-14 min-h-14 items-center gap-4 px-2'>
                <div className='flex size-12 min-w-12 items-center justify-center'>
                    <LogoIcon className='h-8' />
                </div>
                <nav>
                    <ul className='flex gap-2'>
                        <li className='rounded-md px-3 py-1'>
                            <Link href={PATHS.dashboard} className='text-p-sm font-medium'>
                                Dashboard
                            </Link>
                        </li>
                        <li className='rounded-md px-3 py-1'>
                            <Link href={PATHS.patients} className='text-p-sm font-medium'>
                                Patients
                            </Link>
                        </li>
                        <li className='rounded-md px-3 py-1'>
                            <Link href={PATHS.appointments} className='text-p-sm font-medium'>
                                Appointments
                            </Link>
                        </li>
                        <li className='rounded-md px-3 py-1'>
                            <Link href={PATHS.tasks} className='text-p-sm font-medium'>
                                Tasks
                            </Link>
                        </li>
                        <li className='rounded-md px-3 py-1'>
                            <Link href={PATHS.staff} className='text-p-sm font-medium'>
                                Staff
                            </Link>
                        </li>
                        <li className='rounded-md px-3 py-1'>
                            <Link href={PATHS.messenger} className='text-p-sm font-medium'>
                                Messenger
                            </Link>
                        </li>
                        <li className='rounded-md px-3 py-1'>
                            <Link href={PATHS.news} className='text-p-sm font-medium'>
                                News
                            </Link>
                        </li>
                        <li className='rounded-md px-3 py-1'>
                            <Link href={PATHS.organizations} className='text-p-sm font-medium'>
                                Organization
                            </Link>
                        </li>
                        <li className='rounded-md px-3 py-1'>
                            <Link href={PATHS.settings} className='text-p-sm font-medium'>
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    
                </div>
            </header>
            <div>CONTENT</div>
        </div>
    )
}

export default Patients
