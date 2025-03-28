'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { format } from 'date-fns'
import { CalendarClock, CalendarX2, EllipsisVertical, FilePenLine } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { CSSProperties, useMemo, useState } from 'react'

import { IReservedTime } from '@/entities/api/mock/reservedTime'

import {
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/shared/components'
import { cn } from '@/shared/utils'

import { EStateType, ScheduleContextMenu } from './ScheduleContextMenu'

interface IProps {
    reservedTime: IReservedTime
    top: number
    height: number
    className?: string
    style?: CSSProperties
}

export function ReservedTimeCard({ reservedTime, top, height, className, style }: IProps) {
    const t = useTranslations('dashboard')

    const [isContextMenu, setIsContextMenu] = useState<boolean>(false)
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false)

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: reservedTime.id,
        data: {
            type: 'RESERVED_TIME',
            data: reservedTime
        }
    })

    const menuItems = useMemo(
        () => [
            { icon: <FilePenLine className='size-[18px] stroke-[1.75px]' />, label: 'edit' },
            { icon: <CalendarX2 className='size-[18px] stroke-[1.75px]' />, label: 'cancel' }
        ],
        []
    )

    const dragParams = isContextMenu || isOpenSettings ? {} : { ...listeners, ...attributes }

    return (
        <div
            ref={setNodeRef}
            style={{
                top,
                height: '100%',
                minHeight: 48,
                maxHeight: height,
                transform: CSS.Translate.toString(transform),
                transition: transform ? 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                zIndex: transform ? 100 : 'auto',
                willChange: 'transform',
                ...style
            }}
            className={cn(
                'absolute left-0 right-0 cursor-grab rounded-md pb-[2px] pl-px pr-1.5 pt-px transition-transform duration-150 ease-linear',
                className
            )}
            {...dragParams}
        >
            <ScheduleContextMenu isOpen={open => setIsContextMenu(open)} type={EStateType.RESERVED}>
                <div
                    className='flex h-full w-full flex-col overflow-hidden rounded-md shadow border-20 hover:border-40'
                    style={{ backgroundColor: reservedTime.color }}
                >
                    <header className='flex h-6 min-h-6 items-center gap-1 border-b-20-inset'>
                        <span className='flex size-6 min-w-6 items-center justify-center'>
                            <CalendarClock className='size-4' />
                        </span>
                        <span className='line-clamp-1 w-full pt-[2px] text-p-md font-medium leading-6 text-text'>
                            {reservedTime.reason}
                        </span>
                        <Badge
                            variant='outline'
                            className='border-0 min-w-fit cursor-pointer rounded-md p-0 tracking-wider'
                        >
                            {format(new Date(reservedTime.date), 'HH:mm')} ({reservedTime.duration} {t('time.minutes')})
                        </Badge>

                        <DropdownMenu open={isOpenSettings} onOpenChange={setIsOpenSettings}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size='icon'
                                    icon='xs'
                                    className='min-h-6 min-w-6'
                                    onPointerDown={e => e.stopPropagation()}
                                >
                                    <EllipsisVertical className='stroke-[2px]' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='min-w-[280px]'>
                                {menuItems.map((item, idx) => (
                                    <DropdownMenuItem
                                        key={idx}
                                        onSelect={() => console.log('Appointment action:', item.label)}
                                        onPointerDown={e => e.stopPropagation()}
                                    >
                                        <span className='flex size-6 min-w-6 items-center justify-center'>
                                            {item.icon}
                                        </span>
                                        <span className='w-full text-p-sm text-text'>
                                            {t(`schedule.actions.${item.label}`)}
                                        </span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <div
                        className={cn('flex flex-col px-1 py-1', {
                            'py-0': height === 48
                        })}
                    >
                        {reservedTime.note && (
                            <span
                                className={cn('h-fit !text-p-sm text-text-secondary', {
                                    'line-clamp-2': height <= 96,
                                    'line-clamp-1': height === 48
                                })}
                            >
                                {reservedTime.note}
                            </span>
                        )}
                    </div>
                </div>
            </ScheduleContextMenu>
        </div>
    )
}
