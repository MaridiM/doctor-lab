import { cn, generateAbbreviation } from '@/shared/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui'

interface IProps {
    className?: string
    radius?: string
    src?: string
    fullName?: string
}

export function UserAvatar({ className, radius, fullName, src }: IProps) {
    return (
        <Avatar className={cn('', className, radius)}>
            <AvatarImage src={src} alt={fullName ?? 'User avatar'} />
            <AvatarFallback
                className={cn('pt-px text-p-md uppercase tracking-wider text-text-secondary border-sm-5', radius)}
            >
                {generateAbbreviation(fullName ?? 'US')}
            </AvatarFallback>
        </Avatar>
    )
}
