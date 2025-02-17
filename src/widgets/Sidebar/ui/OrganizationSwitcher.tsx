'use client'

import { ChevronsUpDown, Plus } from 'lucide-react'
import { ElementType, useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/shared/components'

interface IProps {
    organizations: {
        name: string
        logo: ElementType
        plan: string
    }[]
}

export function OrganizationSwitcher({ organizations }: IProps) {
    const { isMobile } = useSidebar()
    const [activeTeam, setActiveTeam] = useState(organizations[0])

    return (
        <SidebarMenu className='h-full'>
            <SidebarMenuItem className='flex h-full items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='h-full w-full data-[state=open]:bg-accent data-[state=open]:text-text group-data-[collapsible=icon]:!size-10'
                        >
                            <div className='flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground'>
                                <activeTeam.logo className='size-8' />
                            </div>
                            <div className='grid flex-1 text-left text-p-sm leading-tight'>
                                <span className='truncate text-p-md font-medium text-text'>{activeTeam.name}</span>
                                <span className='truncate !text-p-xs text-text-secondary'>{activeTeam.plan}</span>
                            </div>
                            <ChevronsUpDown className='ml-auto' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                        align='start'
                        side={isMobile ? 'bottom' : 'right'}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='text-p-xs font-medium text-text'>Organisations</DropdownMenuLabel>
                        {organizations.map((organization, index) => (
                            <DropdownMenuItem
                                key={index}
                                onClick={() => setActiveTeam(organization)}
                                className='gap-2 p-2 !text-p-sm font-normal'
                            >
                                <div className='border-10 flex size-6 items-center justify-center rounded-sm'>
                                    <organization.logo className='size-4 shrink-0' />
                                </div>
                                {organization.name}
                                <DropdownMenuShortcut className='text-label-md'>
                                    Ctrl/Cmd+{index + 1}
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='group gap-2 p-2'>
                            <div className='border-10 group-hover:border-40 flex size-6 items-center justify-center rounded-md'>
                                <Plus className='size-4 stroke-text' />
                            </div>
                            <div className='!text-p-sm font-normal text-text-secondary shadow-none'>Add team</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
