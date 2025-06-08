import Link from 'next/link'
import React, { FC } from 'react'

import { cn } from '@/shared/utils'

import { ISidebarItem } from '../types'

interface IProps {
    title: string
    item: ISidebarItem
    isActive: boolean
    isSidebarOpen: boolean
}

export const SidebarItem: FC<IProps> = ({ item, isActive, isSidebarOpen, title }) => {
    return (
        <li
            className={cn('hover:bg-hover flex h-10 min-h-10 w-full overflow-hidden px-3', {
                'bg-primary hover:bg-primary': isActive
            })}
        >
            <Link href={item.url} className='flex w-full items-center gap-1'>
                <span className='flex size-8 min-w-8 items-center justify-center'>
                    <item.icon
                        className={cn('stroke-text size-4', {
                            'stroke-text-foreground': isActive
                        })}
                    />
                </span>
                <span
                    className={cn(
                        '!text-p-sm text-text text-nowrap nowrap overflow-hidden pt-[1px] transition-opacity duration-300 ease-in-out',
                        {
                            'opacity-0': isSidebarOpen,
                            'text-text-foreground': isActive
                        }
                    )}
                >
                    {title}
                </span>
            </Link>
        </li>
    )
}
