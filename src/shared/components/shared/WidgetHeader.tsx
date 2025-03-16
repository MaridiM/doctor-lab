import { ReactNode } from 'react'

import { cn } from '@/shared/utils'

interface IProps {
    title: ReactNode
    icon: ReactNode
    actions?: ReactNode[]
    className?: string
}

export function WidgetHeader({ title, icon, actions, className }: IProps) {
    return (
        <header className={cn('flex h-14 items-center justify-between bg-card px-4 py-2 border-b-20', className)}>
            <div className='flex items-center gap-2'>
                <span className='rounded-md bg-primary p-1.5'>{icon}</span>
                <span className='text-h4 font-normal text-text'>{title}</span>
            </div>

            {actions && <div className='flex items-center gap-2'>{actions}</div>}
        </header>
    )
}
