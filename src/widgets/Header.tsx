'use client'

import { Bell, CalendarPlus2, Menu, UserPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    SidebarTrigger
} from '@/shared/components'

export function Header() {
    const tDashboard = useTranslations('dashboard')
    const t = useTranslations('core')

    return (
        <header className='border-b-20 flex h-16 shrink-0 items-center justify-between gap-2 bg-card px-4 transition-[width,height] ease-linear'>
            <div className='flex items-center gap-4'>
                <SidebarTrigger className='-ml-1' />
                <span className='text-h4 !text-text drop-shadow-sm'>{tDashboard('title')}</span>
            </div>
            <div className='flex items-center gap-4'>
                {/* <ChangeTheme /> */}
                <Button
                    size='icon'
                    variant='primary'
                    tooltip={t('addNewPatient')}
                    onClick={() => console.log('Add patient')}
                >
                    <UserPlus className='stroke-text-foreground' />
                </Button>
                <Button
                    size='icon'
                    variant='primary'
                    tooltip={t('addNewAppointment')}
                    onClick={() => console.log('Add appointment')}
                >
                    <CalendarPlus2 className='stroke-text-foreground' />
                </Button>

                <Button
                    size='icon'
                    variant='outline'
                    tooltip={t('notifications')}
                    onClick={() => console.log('Add patient')}
                >
                    <Bell className='!stroke-text' />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            icon='sm'
                            tooltip={{ children: 'Menu', align: 'center', side: 'bottom' }}
                        >
                            <Menu />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
