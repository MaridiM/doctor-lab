import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SidebarGroup, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from '@/shared/components'
import { cn } from '@/shared/utils'

import { INavItem } from '../Sidebar.types'

interface IProps {
    items: INavItem[]
}

export function NavMain({ items }: IProps) {
    const t = useTranslations('core')
    const currentPath = usePathname()

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map(item => {
                    const isActive = currentPath === item.url
                    return (
                        <SidebarMenuItem
                            key={item.title}
                            className='flex items-center group-data-[collapsible=icon]:pl-[5px]'
                        >
                            <SidebarMenuButton
                                asChild
                                tooltip={t(`sidebar.${item.title.toLowerCase()}`)}
                                className={cn(
                                    'h-full gap-2 px-4 py-3 transition-all duration-150 ease-in-out hover:pl-5',
                                    {
                                        'bg-primary text-text-foreground hover:bg-primary hover:pl-4': isActive
                                    }
                                )}
                            >
                                <Link href={item.url} className='flex gap-2 group-data-[collapsible=icon]:!pl-2.5'>
                                    <item.icon
                                        className={cn('stroke-text !text-p-md group-data-[collapsible=icon]:size-4', {
                                            'stroke-text-foreground': isActive
                                        })}
                                    />
                                    <span
                                        className={cn('text-p-md text-text', {
                                            'text-text-foreground': isActive
                                        })}
                                    >
                                        {t(`sidebar.${item.title.toLowerCase()}`)}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                            {item.badge && (
                                <SidebarMenuBadge
                                    className={cn('!text-p-xs font-normal text-text group-hover:text-text', {
                                        'bg-card': isActive
                                    })}
                                >
                                    {item.badge}
                                </SidebarMenuBadge>
                            )}
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
