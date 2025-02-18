'use client'

import {
    BookUser,
    Building2,
    Calendar,
    LayoutDashboard,
    LifeBuoy,
    MessagesSquare,
    Rss,
    Send,
    Settings2,
    UsersRound
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ComponentProps } from 'react'

import { LogoIcon, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/shared/components'
import { PATHS } from '@/shared/config'

import { BaseHeader, NavMain, NavSecondary, NavUser, OrganizationSwitcher } from './ui'

const data = {
    user: {
        name: 'Dr. Medison',
        email: 'dr.medison@gmail.com',
        avatar: ''
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
            url: '#',
            icon: LifeBuoy
        },
        {
            title: 'Feedback',
            url: '#',
            icon: Send
        }
    ]
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    const isOrganisation = true

    return (
        <Sidebar collapsible='icon' {...props} className='border-r-20'>
            <SidebarHeader className='border-b-20 h-16'>
                {isOrganisation ? <OrganizationSwitcher organizations={data.organizations} /> : <BaseHeader />}
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className='mt-auto' />
            </SidebarContent>

            <SidebarFooter className='border-t-20 flex h-16 items-center justify-center p-0'>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
