import { Check, SquarePlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

import { DropdownMenuItem, DropdownMenuSeparator } from '@/shared/components'
import { Badge, DropdownMenuContent } from '@/shared/components'
import { DropdownMenuTrigger } from '@/shared/components'
import { DropdownMenu } from '@/shared/components'

import { Status } from '../api/mock'

interface IProps {
    initialStatus: Status
    statusList: Status[]
    isOpen?: (open: boolean) => void
    onSelect?: (status: Status) => void
}

export function StatusBadge({ initialStatus, statusList, isOpen, onSelect }: IProps) {
    const t = useTranslations('dashboard')

    const [isOpenStatusMenu, setIsOpenStatusMenu] = useState<boolean>(false)
    const [currentStatus, setCurrentStatus] = useState<Status>(initialStatus)

    const handleChangeCurrentStatus = useCallback((status: Status) => {
        setCurrentStatus(status)
        onSelect?.(status)
    }, [onSelect])

    useEffect(() => {
        isOpen?.(isOpenStatusMenu)
    }, [isOpen, isOpenStatusMenu])

    return (
        <DropdownMenu open={isOpenStatusMenu} onOpenChange={setIsOpenStatusMenu}>
            <DropdownMenuTrigger asChild>
                <Badge
                    variant='outline'
                    className='min-w-fit cursor-pointer rounded-md !text-label-md font-normal tracking-wider'
                    style={{
                        backgroundColor: currentStatus.backgroundColor,
                        color: currentStatus.textColor
                    }}
                    onPointerDown={e => e.stopPropagation()}
                >
                    {t(`status.labels.${currentStatus.key}`)}
                </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                className='min-w-[280px]'
                onInteractOutside={() => setIsOpenStatusMenu(false)}
            >
                <DropdownMenuItem
                    onSelect={() => console.log('Custom status')}
                    onPointerDown={e => e.stopPropagation()}
                >
                    <SquarePlus />
                    <span className='w-full text-p-sm text-text'>{t('status.labels.CUSTOM')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {statusList.map(status => (
                    <DropdownMenuItem
                        key={status.id}
                        onSelect={() => handleChangeCurrentStatus(status)}
                        onPointerDown={e => e.stopPropagation()}
                    >
                        <span
                            className='size-4 min-w-4 rounded-sm'
                            style={{
                                backgroundColor: status.backgroundColor,
                                color: status.textColor
                            }}
                        />
                        <span className='w-full text-p-sm text-text'>{t(`status.labels.${status.key}`)}</span>
                        {currentStatus.key === status.key && <Check className='ml-2' />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
