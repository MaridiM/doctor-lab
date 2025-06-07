import { CSSProperties, FC } from 'react'

import { cn, generateAbbreviation } from '@/shared/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui'

interface IUsersAvatarData {
    src?: string
    username?: string
}

interface IProps {
    className?: string
    style?: CSSProperties
    radius?: string
    src?: string
    username?: string
    users?: IUsersAvatarData[]
    grayscale?: boolean
}

export const UserAvatar: FC<IProps> = ({
    className,
    radius,
    style,
    username = 'user',
    users,
    src,
    grayscale = false
}) => {
    const getAltText = (name?: string) => `@${(name ?? 'user_avatar').replaceAll(' ', '_')}`

    const renderAvatar = (src?: string, username?: string, key?: number) => (
        <Avatar key={key} className={cn(className, radius)}>
            <AvatarImage src={src} alt={getAltText(username)} style={style} />
            <AvatarFallback
                className={cn(
                    users ? '!text-p-sm' : '!text-p-md',
                    'text-text-secondary pt-px tracking-wider uppercase',
                    radius
                )}
            >
                {generateAbbreviation(username ?? 'US')}
            </AvatarFallback>
        </Avatar>
    )

    return (
        <div
            className={cn('*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2', {
                '*:data-[slot=avatar]:grayscale': grayscale
            })}
        >
            {users?.length
                ? users.slice(0, 3).map((user, idx) => renderAvatar(user.src, user.username, idx))
                : renderAvatar(src, username)}
        </div>
    )
}
