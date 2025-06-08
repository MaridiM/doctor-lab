import { CalendarDays, LayoutDashboard, LifeBuoy, ListTodo, Settings, User } from 'lucide-react'

import { PATHS } from '@/shared/config'

import { ISidebar } from '../types'

export const SIDEBAR: ISidebar = {
    navMain: [
        {
            title: 'Dashboard',
            url: PATHS.dashboard,
            icon: LayoutDashboard
        },
        {
            title: 'Patients',
            url: PATHS.patients,
            icon: User
        },
        {
            title: 'Appointments',
            url: PATHS.appointments,
            icon: CalendarDays,
            badge: 8
        },
        {
            title: 'Tasks',
            url: PATHS.tasks,
            icon: ListTodo,
            badge: 8
        },
        {
            title: 'Settings',
            url: PATHS.settings,
            icon: Settings
        }
    ],
    navSecondary: [
        {
            title: 'Support',
            url: PATHS.support,
            icon: LifeBuoy
        }
    ]
}
