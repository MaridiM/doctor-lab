import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithoutRef } from 'react'

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/components'
import { cn } from '@/shared/utils'

import { INavItem } from '../Sidebar.types'

interface IProps extends ComponentPropsWithoutRef<typeof SidebarGroup> {
    items: INavItem[]
}
export function NavSecondary({ items, ...props }: IProps) {
    const currentPath = usePathname()
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map(item => {
                        const isActive = currentPath === item.url
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    size='sm'
                                    className={cn(
                                        'h-full gap-2 px-4 py-3 transition-all duration-150 ease-in-out hover:pl-5',
                                        {
                                            'bg-primary text-text-foreground hover:bg-primary hover:pl-4': isActive
                                        }
                                    )}
                                >
                                    <Link href={item.url}>
                                        <item.icon
                                            className={cn('stroke-text text-p-md', {
                                                'stroke-text-foreground': isActive
                                            })}
                                        />
                                        <span
                                            className={cn('text-p-md text-text', {
                                                'text-text-foreground': isActive
                                            })}
                                        >
                                            {item.title}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
