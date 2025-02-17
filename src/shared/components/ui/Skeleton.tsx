import { HTMLAttributes } from 'react'

import { cn } from '@/shared/utils'

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
}

export { Skeleton }
