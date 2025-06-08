'use client'

import { Bell, Menu, PanelLeftOpen, Settings } from 'lucide-react'
import { FC } from 'react'

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    LogoIcon,
    UserAvatar
} from '@/shared/components'
import { useStore } from '@/shared/libs'
import { cn } from '@/shared/utils'

import { ChangeLanguage, ChangeTheme } from '@/features'

interface HeaderProps {
    heading?: string
    headingCount?: number
}

export const Header: FC<HeaderProps> = ({ heading, headingCount }) => {
    const { isSidebarOpen, setIsSidebarOpen } = useStore()

    return (
        <header className='flex h-14 min-h-14 w-full items-center justify-between gap-4 pr-2 pl-0 md:pl-2'>
            <div className='flex items-center gap-2'>
                <span className='flex size-16 items-center justify-center md:hidden'>
                    <LogoIcon className='size-8' />
                </span>
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn('hidden opacity-0 transition-opacity duration-300 ease-in-out', {
                        'flex opacity-100': isSidebarOpen
                    })}
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <PanelLeftOpen className='stroke-text hidden md:block' />
                    <Menu className='stroke-text md:hidden' />
                </Button>

                <h1 className='text-h4 text-text hidden items-center gap-1 font-medium tracking-wide md:flex'>
                    {heading}
                    {headingCount && <span className='text-text-secondary text-p-md pt-px font-normal'>(10)</span>}
                </h1>
            </div>

            <div className='flex items-center gap-2'>
                <ChangeTheme />
                <ChangeLanguage />
                <Button
                    variant='ghost'
                    size='icon'
                    className='hover:bg-hover cursor-pointer'
                    onClick={() => console.log('Notifications')}
                >
                    <Bell className='stroke-text' />
                </Button>
                <Button
                    variant='ghost'
                    size='icon'
                    className='hover:bg-hover cursor-pointer'
                    onClick={() => console.log('Settings')}
                >
                    <Settings className='stroke-text' />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <UserAvatar
                            className='size-9 min-w-9'
                            username='Marlow Grand'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyBnY2OmVc4EJcVSkmvrVZFHgFDVedUQ56GA&s'
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>
                            <div className='flex flex-col'>
                                <span className='text-text text-p-sm font-semibold'>Marlow Grand</span>
                                <span className='text-text-tertiary text-p-sm'>marlow.grand@gmail.com</span>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
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
