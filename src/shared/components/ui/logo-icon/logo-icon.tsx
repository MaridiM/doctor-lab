'use client'

import { useTheme } from 'next-themes'

import { DarkLogoFull, DarkLogoMini, DarkLogoText, LogoFull, LogoMini, LogoText } from '@/shared/assets/logo'
import { cn } from '@/shared/utils'

import type { TIconProps } from './types'

export function LogoIcon({ mini = true, onlyText = false, className, ...props }: TIconProps) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const filterStyle = `drop-shadow(0px .5px 1px ${isDark ? '#1e1e1e' : '#999'})`

    const commonProps = {
        className: cn('h-10', className),
        filter: filterStyle,
        ...props
    }

    const Component = (() => {
        if (onlyText) return isDark ? DarkLogoText : LogoText
        if (mini) return isDark ? DarkLogoMini : LogoMini
        return isDark ? DarkLogoFull : LogoFull
    })()

    return <Component {...commonProps} />
}
