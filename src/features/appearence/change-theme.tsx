'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/shared/components'
import { cn } from '@/shared/utils'

interface IProps {
    className?: string
}

export function ChangeTheme({ className }: IProps) {
    const { theme, setTheme } = useTheme()

    const isDark = theme === 'dark'

    return (
        <Button
            variant='ghost'
            size='icon'
            className={cn('border-none bg-transparent transition-all duration-300 ease-in-out', className)}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
            {isDark ? <Sun className='stroke-yellow-500' /> : <Moon />}
        </Button>
    )
}
