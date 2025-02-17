import { LogoIcon, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/components'

export function BaseHeader() {
    return (
        <SidebarMenu className='h-full'>
            <SidebarMenuItem className='flex h-full items-center justify-center'>
                <SidebarMenuButton size='lg' className='h-14 cursor-default hover:bg-transparent active:bg-transparent'>
                    <div className='flex aspect-square size-8 items-center justify-center'>
                        <LogoIcon className='size-8' />
                    </div>
                    <div className='grid flex-1 text-left text-p-sm leading-tight'>
                        <LogoIcon onlyText className='h-6' />
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
