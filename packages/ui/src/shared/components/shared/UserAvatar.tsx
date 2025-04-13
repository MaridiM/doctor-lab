import { CSSProperties } from 'react'

import { cn, generateAbbreviation } from '@/shared/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui'

interface IProps {
    className?: string
    style?: CSSProperties
    radius?: string
    src?: string
    fullName?: string
}

export function UserAvatar({ className, radius, style, fullName, src }: IProps) {
    return (
        <Avatar className={cn('', className, radius)}>
            <AvatarImage src={src} alt={fullName ?? 'User avatar'} style={style} />
            <AvatarFallback
                className={cn('border-sm-5 pt-px text-p-md uppercase tracking-wider text-text-secondary', radius)}
            >
                {generateAbbreviation(fullName ?? 'US')}
            </AvatarFallback>
        </Avatar>
    )
}
