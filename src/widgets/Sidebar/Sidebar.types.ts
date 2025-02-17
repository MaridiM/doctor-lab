import { type LucideIcon } from 'lucide-react'

export interface INavItem {
    title: string
    url: string
    icon: LucideIcon
    badge?: number
}
