import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'

import { ThemeProvider } from '@/shared/config'
import { SITE_DESCRIPTION, SITE_NAME } from '@/shared/constants'

import './styles/globals.css'

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900']
})

export const metadata: Metadata = {
    title: {
        absolute: SITE_NAME,
        template: `%s - ${SITE_NAME}`
    },
    description: SITE_DESCRIPTION
}

export default async function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    const locale = await getLocale()
    const messages = await getMessages()

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${roboto.variable} antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
                        <main className='min-h-screen w-full'>{children}</main>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
