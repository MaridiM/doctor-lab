import { LucideIcon } from 'lucide-react'

export interface ISidebarItem {
    title: string
    icon: LucideIcon
    url: string
    badge?: number
}
export interface ISidebar {
    navMain: ISidebarItem[]
    navSecondary: ISidebarItem[]
}
