import { CSSProperties } from 'react'


import { Avatar, AvatarFallback, AvatarImage } from '../ui'
import { generateAbbreviation } from '../../utils'
import { cn } from '../../utils'

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
                className={cn('border-sm-5 text-p-md text-text-secondary pt-px tracking-wider uppercase', radius)}
            >
                {generateAbbreviation(fullName ?? 'US')}
            </AvatarFallback>
        </Avatar>
    )
}
