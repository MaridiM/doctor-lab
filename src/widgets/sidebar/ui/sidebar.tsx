'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { useStore } from '@/shared/libs'
import { cn } from '@/shared/utils'

import { SIDEBAR } from '../config'

import { SidebarHeader } from './sidebar-header'
import { SidebarList } from './sidebar-list'

export const Sidebar = () => {
    const t = useTranslations('core')
    const { isSidebarOpen, setIsSidebarOpen } = useStore()
    const pathname = usePathname()

    return (
        <aside
            className={cn(
                'bg-card border-border/20 fixed z-1000 flex h-full w-full max-w-0 flex-col items-center overflow-hidden border-r transition-[max-width] duration-300 ease-in-out md:static md:max-w-14',
                {
                    'xs:max-w-64 max-w-full md:max-w-64': !isSidebarOpen
                }
            )}
        >
            <SidebarHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            <div className='flex h-full w-full flex-col overflow-auto'>
                <SidebarList
                    items={SIDEBAR.navMain}
                    pathname={pathname}
                    className='h-full'
                    isSidebarOpen={isSidebarOpen}
                    t={t}
                />
                <SidebarList
                    items={SIDEBAR.navSecondary}
                    pathname={pathname}
                    className='min-h-fit'
                    isSidebarOpen={isSidebarOpen}
                    t={t}
                />
            </div>
        </aside>
    )
}
