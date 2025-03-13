'use client'

import {
    BookUser,
    Building2,
    Calendar,
    LayoutDashboard,
    LifeBuoy,
    ListTodo,
    MessagesSquare,
    Rss,
    Send,
    Settings2,
    UsersRound
} from 'lucide-react'
import { ComponentProps } from 'react'

import { LogoIcon, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/shared/components'
import { PATHS } from '@/shared/config'

import { BaseHeader, NavMain, NavSecondary, NavUser, OrganizationSwitcher } from './ui'

const data = {
    user: {
        name: 'Dr. Medison',
        email: 'dr.medison@gmail.com',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDKdBKoPukxVfmkSyArwRK6p10AjSyCWaFOg&s'
    },
    organizations: [
        {
            name: 'Doctor Lab',
            logo: LogoIcon,
            plan: 'Enterprise'
        },
        {
            name: 'Organization 1',
            logo: Building2,
            plan: 'Startup'
        },
        {
            name: 'Organization 2',
            logo: Building2,
            plan: 'Free'
        }
    ],
    navMain: [
        {
            title: 'Dashboard',
            url: PATHS.dashboard,
            icon: LayoutDashboard
        },
        {
            title: 'Patients',
            url: PATHS.patients,
            icon: UsersRound
        },
        {
            title: 'Appointments',
            url: PATHS.appointments,
            icon: Calendar,
            badge: 8
        },
        {
            title: 'Tasks',
            url: PATHS.tasks,
            icon: ListTodo,
            badge: 8
        },
        {
            title: 'Staff',
            url: PATHS.staff,
            icon: BookUser
        },
        {
            title: 'Messenger',
            url: PATHS.messenger,
            icon: MessagesSquare,
            badge: 120
        },
        {
            title: 'News',
            url: PATHS.news,
            icon: Rss,
            badge: 24
        },
        {
            title: 'Organizations',
            url: PATHS.organizations,
            icon: Building2
        },
        {
            title: 'Settings',
            url: PATHS.settings,
            icon: Settings2
        }
    ],
    navSecondary: [
        {
            title: 'Support',
            url: PATHS.support,
            icon: LifeBuoy
        },
        {
            title: 'Feedback',
            url: PATHS.feedback,
            icon: Send
        }
    ]
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    const isOrganisation = true

    return (
        <Sidebar collapsible='icon' {...props} className='border-r-20'>
            <SidebarHeader className='h-16 border-b-20'>
                {isOrganisation ? <OrganizationSwitcher organizations={data.organizations} /> : <BaseHeader />}
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className='mt-auto' />
            </SidebarContent>

            <SidebarFooter className='flex h-16 items-center justify-center p-0 border-t-20'>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
