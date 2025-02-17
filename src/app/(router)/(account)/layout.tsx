import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components'
import { SITE_DESCRIPTION, SITE_NAME } from '@/shared/constants'

import { AppSidebar } from '@/widgets'

export const metadata: Metadata = {
    title: {
        absolute: SITE_NAME,
        template: `%s - ${SITE_NAME}`
    },
    description: SITE_DESCRIPTION
}

export default async function AccountLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className='border-b-20 flex h-16 shrink-0 items-center gap-2 px-2 transition-[width,height] ease-linear'>
                    <div className='flex items-center gap-2'>
                        <SidebarTrigger className='-ml-1' />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
