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
                            <SidebarMenuItem key={item.title} className='group-data-[collapsible=icon]:pl-[5px]'>
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
                                    <Link
                                        href={item.url}
                                        className='group-data-[collapsible=icon]:size-4 group-data-[collapsible=icon]:!pl-2.5'
                                    >
                                        <item.icon
                                            className={cn('stroke-text', {
                                                'stroke-text-foreground': isActive
                                            })}
                                        />
                                        <span
                                            className={cn('text-p-sm !text-text', {
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
