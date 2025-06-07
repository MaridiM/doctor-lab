import { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants } from '@/shared/components'
import { PATHS } from '@/shared/config'
import { cn } from '@/shared/utils'

export const metadata: Metadata = {
    title: 'Tasks'
}

export default function TasksPage() {
    return (
        <div className='bg-background flex min-h-screen flex-1 flex-col items-center justify-center'>
            <h1 className='text-h1 text-text mb-4 text-center font-bold tracking-wider'>
                Tasks page <br /> is under construction
            </h1>
            <Link href={PATHS.dashboard} className={cn(buttonVariants({ variant: 'outline' }), 'border-sm-40')}>
                Go Back to Dashboard
            </Link>
        </div>
    )
}
