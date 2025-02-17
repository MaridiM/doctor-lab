'use client'

import {
    AudioWaveform,
    BookOpen,
    BookUser,
    Bot,
    Building2,
    Calendar,
    Command,
    Frame,
    GalleryVerticalEnd,
    LayoutDashboard,
    MessagesSquare,
    PieChart,
    Plus,
    Rss,
    Settings,
    Settings2,
    SquareTerminal,
    UsersRound
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
    LogoIcon,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/shared/components'
import { PATHS } from '@/shared/config'
import { cn } from '@/shared/utils'

const items = [
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
        icon: Calendar
    },
    {
        title: 'Staff',
        url: PATHS.staff,
        icon: BookUser
    },
    {
        title: 'Messenger',
        url: PATHS.messenger,
        icon: MessagesSquare
    },
    {
        title: 'News',
        url: PATHS.news,
        icon: Rss
    },
    {
        title: 'Оrganization',
        url: PATHS.organization,
        icon: Building2
    },
    {
        title: 'Settings',
        url: PATHS.settings,
        icon: Settings
    }
]

export function AppSidebar() {
    const currentPath = usePathname()
    return (
        <Sidebar>
            <SidebarHeader className='flex max-h-16 min-h-16 items-center justify-center px-4'>
                <LogoIcon className='h-6' onlyText />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className='gap-0'>
                    {items.map(item => {
                        const isActive = currentPath === item.url
                        return (
                            <SidebarMenuItem
                                className={cn(
                                    'group bg-transparent transition-all duration-150 ease-in-out hover:bg-hover',
                                    {
                                        'bg-primary hover:bg-primary': isActive
                                    }
                                )}
                            >
                                <SidebarMenuButton tooltip={item.title}>
                                    <Link
                                        href={item.url}
                                        className={cn(
                                            'flex h-full w-full items-center gap-2 px-4 py-3 transition-all duration-300 ease-in-out group-hover:pl-6',
                                            { 'group-hover:pl-4': isActive }
                                        )}
                                    >
                                        <item.icon
                                            size={20}
                                            className={cn('stroke-current', {
                                                'stroke-text-foreground': isActive
                                            })}
                                        />
                                        <span
                                            className={cn('text-p-md transition-none', {
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
            </SidebarContent>
            <SidebarFooter>FOOTER</SidebarFooter>
        </Sidebar>
        //

        //     <nav className='flex flex-1 flex-col'>
        //         <ul className='flex flex-col'>
        //             {items.map((item, idx) => {
        //                 const isActive = currentPath === item.url
        //                 return (
        //                     <li
        //                         key={idx}
        //                         className={cn(
        //                             'group bg-transparent transition-all duration-150 ease-in-out hover:bg-hover',
        //                             {
        //                                 'bg-primary hover:bg-primary': isActive
        //                             }
        //                         )}
        //                     >
        //                         <Link
        //                             href={item.url}
        //                             className={cn(
        //                                 'flex h-full w-full items-center gap-2 px-4 py-3 transition-all duration-300 ease-in-out group-hover:pl-6',
        //                                 { 'group-hover:pl-4': isActive }
        //                             )}
        //                         >
        //                             <item.icon
        //                                 size={20}
        //                                 className={cn('stroke-current', {
        //                                     'stroke-text-foreground': isActive
        //                                 })}
        //                             />
        //                             <span
        //                                 className={cn('text-p-md transition-none', {
        //                                     'text-text-foreground': isActive
        //                                 })}
        //                             >
        //                                 {item.title}
        //                             </span>
        //                         </Link>
        //                     </li>
        //                 )
        //             })}
        //         </ul>
        //     </nav>
        //     <Separator orientation='horizontal' />
        //     <footer className='flex max-h-16 min-h-16 items-center justify-between gap-2 px-4'>
        //         <UserAvatar />
        //         <Button size='icon' variant='outline' onClick={() => console.log('OPEN USER MENU')}>
        //             <EllipsisVertical className='stroke-text' />
        //         </Button>
        //     </footer>
        // </aside>
    )
}
