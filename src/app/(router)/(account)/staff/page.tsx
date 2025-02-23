import { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants } from '@/shared/components'
import { PATHS } from '@/shared/config'
import { cn } from '@/shared/utils'

export const metadata: Metadata = {
    title: 'Staff'
}

export default function StaffPage() {
    return (
        <div className='flex min-h-screen flex-1 flex-col items-center justify-center bg-background'>
            <h1 className='mb-4 text-center text-h1 font-bold tracking-wider text-text'>
                Staff page <br /> is under construction
            </h1>
            <Link href={PATHS.dashboard} className={cn(buttonVariants({ variant: 'outline' }), 'border-sm-40')}>
                Go Back to Dashboard
            </Link>
        </div>
    )
}
