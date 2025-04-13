'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ComponentProps, useEffect, useState } from 'react'

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
