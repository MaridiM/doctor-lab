import { cn, generateAbbreviation } from '@/shared/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui'

interface IProps {
    className?: string
    src?: string
    fullName?: string
}

export function UserAvatar({ className, fullName, src }: IProps) {
         
    return (
        <Avatar className={cn('', className)}>
            {src && <AvatarImage src={src} alt={fullName ?? 'User avatar'} />}
            {!src && (
                <AvatarFallback
                    className='border-sm-5 pt-px text-p-md uppercase tracking-wider text-text-secondary'
                >
                    {generateAbbreviation(fullName ?? 'US')}
                </AvatarFallback>
            )}
        </Avatar>
    )
}
