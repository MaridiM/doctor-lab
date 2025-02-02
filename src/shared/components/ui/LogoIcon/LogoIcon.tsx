'use client'

import { useTheme } from 'next-themes'

import { LogoFullSVG } from './LogoFullSVG'
import { LogoMiniSVG } from './LogoMiniSVG'
import type { TIconProps } from './types'

export function LogoIcon({ mini = true, ...props }: TIconProps) {
    const { theme } = useTheme()

    const isDark = theme === 'dark'

    const shadow = isDark ? '#1e1e1e' : '#999'
    const primary = isDark ? '#2B7AFF' : '#143394'
    const secondary = isDark ? '#EFEFEF' : '#2B7AFF'

    return (
        <>
            {mini ? (
                <LogoMiniSVG shadow={shadow} primary={primary} secondary={secondary} {...props} />
            ) : (
                <LogoFullSVG shadow={shadow} primary={primary} secondary={secondary} {...props} />
            )}
        </>
    )
}
