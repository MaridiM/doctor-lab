import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    UserAvatar,
    useSidebar
} from '@/shared/components'

export function NavUser({
    user
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const t = useTranslations('core')
    const { isMobile } = useSidebar()

    return (
        <SidebarMenu className='h-full justify-center px-2'>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='h-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-12'
                        >
                            <UserAvatar
                                src={user.avatar}
                                fullName={user.name}
                                className='h-8 w-8'
                                radius='rounded-lg'
                            />
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-semibold'>{user.name}</span>
                                <span className='truncate text-xs'>{user.email}</span>
                            </div>
                            <ChevronsUpDown className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                        side={isMobile ? 'bottom' : 'right'}
                        align='end'
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='p-0 font-normal'>
                            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                <UserAvatar
                                    src={user.avatar}
                                    fullName={user.name}
                                    className='h-8 w-8'
                                    radius='rounded-lg'
                                />
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-semibold'>{user.name}</span>
                                    <span className='truncate text-xs'>{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                {t('userMenu.upgrade')}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                {t('userMenu.account')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                {t('userMenu.billing')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                {t('userMenu.notifications')}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut />
                            {t('userMenu.logout')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
