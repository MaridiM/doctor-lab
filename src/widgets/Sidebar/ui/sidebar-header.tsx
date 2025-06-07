import { PanelRightOpen, X } from 'lucide-react'
import { FC } from 'react'

import { Button, LogoIcon } from '@/shared/components'
import { cn } from '@/shared/utils'

interface IProps {
    isSidebarOpen: boolean
    setIsSidebarOpen: (bool: boolean) => void
}

export const SidebarHeader: FC<IProps> = ({ setIsSidebarOpen, isSidebarOpen }) => {
    return (
        <header className='border-border/20 relative flex h-14 min-h-14 w-full items-center justify-between gap-1 border-b pr-2 pl-3'>
            <span className='flex items-center'>
                <LogoIcon className='size-8' />
                <LogoIcon
                    className={cn('h-6 transition-opacity duration-300 ease-in-out', {
                        'opacity-0': isSidebarOpen
                    })}
                    onlyText
                />
            </span>

            <Button
                variant='ghost'
                size='icon'
                className={cn('transition-opacity duration-300 ease-in-out', {
                    'opacity-0': isSidebarOpen
                })}
                onClick={() => setIsSidebarOpen(true)}
            >
                <PanelRightOpen className='hidden md:block' />
                <X className='md:hidden' />
            </Button>
        </header>
    )
}
