import { PropsWithChildren, ReactNode, memo } from 'react'

import { cn } from '@/shared/utils'

interface IProps {
    title: ReactNode
    icon: ReactNode
    className?: string
}

export const WidgetHeader = memo(function WidgetHeader({
    children,
    title,
    icon,
    className
}: PropsWithChildren<IProps>) {
    return (
        <header
            className={cn(
                'flex h-14 items-center justify-start bg-card px-4 py-2 border-b-20',
                { 'justify-between': children },
                className
            )}
        >
            <div className='flex items-center gap-2'>
                <span className='rounded-md bg-primary p-1.5'>{icon}</span>
                <span className='text-h5 font-normal text-text'>{title}</span>
            </div>

            {children && <div className='flex items-center gap-2'>{children}</div>}
        </header>
    )
})
