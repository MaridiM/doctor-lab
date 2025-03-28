import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { SidebarInset, SidebarProvider } from '@/shared/components'
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
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
