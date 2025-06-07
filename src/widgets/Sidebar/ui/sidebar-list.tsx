import Link from 'next/link'
import React, { FC } from 'react'

import { cn } from '@/shared/utils'

import { ISidebarItem } from '../types'

import { SidebarItem } from './sidebar-item'

interface IProps {
    className?: string
    pathname?: string
    items: ISidebarItem[]
    isSidebarOpen: boolean
    t: any
}

export const SidebarList: FC<IProps> = ({ items, pathname, isSidebarOpen, t, className }) => {
    return (
        <ul className={cn('flex w-full flex-col', className)}>
            {items.map((item, idx) => {
                const isActive = pathname === item.url
                return (
                    <SidebarItem
                        key={idx}
                        item={item}
                        title={t(`sidebar.${item.title.toLowerCase()}`)}
                        isActive={isActive}
                        isSidebarOpen={isSidebarOpen}
                    />
                )
            })}
        </ul>
    )
}
