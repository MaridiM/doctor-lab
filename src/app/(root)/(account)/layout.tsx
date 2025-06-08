import { Sidebar } from '@/widgets'
import { ReactNode } from 'react'

export default async function AppLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <div className='bg-background flex h-screen w-full overflow-hidden'>
            <Sidebar />
            {children}
        </div>
    )
}
