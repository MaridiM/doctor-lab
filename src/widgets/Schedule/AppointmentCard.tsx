'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import {
    BellRing,
    CalendarClock,
    CalendarCog,
    CalendarMinus2,
    CalendarPlus2,
    CalendarX,
    CalendarX2,
    Check,
    EllipsisVertical,
    FilePenLine,
    IdCard,
    SquarePlus
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { CSSProperties, memo, useCallback, useMemo, useState } from 'react'

import { APPOINTMENT_STATUSES, Appointment, Status, User } from '@/entities/api'

import {
    Badge,
    Button,
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Icon,
    UserAvatar
} from '@/shared/components'
import { cn } from '@/shared/utils'

interface IProps {
    appointment: Appointment
    top: number
    height: number
    timeStep: 15 | 20 | 30 | 60
    slotHeight: number
    patient: User
    className?: string
    style?: CSSProperties
}

export function AppointmentCard({ appointment, top, height, patient, className, style }: IProps) {
    const t = useTranslations('dashboard')

    const [isContextMenu, setIsContextMenu] = useState<boolean>(false)
    const [isOpenAppointmentSettings, setIsOpenAppointmentSettings] = useState<boolean>(false)
    const [isOpenStatusMenu, setIsOpenStatusMenu] = useState<boolean>(false)
    const [appointmentStatus, setAppointmentStatus] = useState<Status>(appointment.status)

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: appointment.id,
        data: {
            patient,
            appointment
        }
    })

    const handleChangeAppointmentStatus = useCallback((status: Status) => {
        setAppointmentStatus(status)
        setIsOpenStatusMenu(false)
    }, [])

    const appointmentMenuItems = useMemo(
        () => [
            { id: 1, icon: IdCard, label: 'chart' },
            { id: 2, icon: BellRing, label: 'notify' },
            { id: 3, icon: FilePenLine, label: 'edit' },
            { id: 4, icon: CalendarClock, label: 'reschedule' },
            { id: 5, icon: CalendarX2, label: 'cancel' }
        ],
        []
    )

    const statusItems = useMemo(
        () =>
            APPOINTMENT_STATUSES.map(status => (
                <DropdownMenuItem
                    key={status.id}
                    onSelect={() => handleChangeAppointmentStatus(status)}
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
                    {appointmentStatus.key === status.key && <Check className='ml-2' />}
                </DropdownMenuItem>
            )),
        [handleChangeAppointmentStatus, t, appointmentStatus.key]
    )

    const dragParams =
        isContextMenu || isOpenStatusMenu || isOpenAppointmentSettings ? {} : { ...listeners, ...attributes }
    return (
        <div
            ref={setNodeRef}
            className={cn(
                'absolute left-0 right-0 cursor-grab rounded-md pb-[2px] pl-px pr-1.5 pt-px transition-transform duration-150 ease-linear',
                className
            )}
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
            {...dragParams}
        >
            <ContextMenu
                key={appointment.id} // Лучше использовать уникальный ID
                onOpenChange={open => setIsContextMenu(open)}
            >
                <ContextMenuTrigger asChild>
                    <div
                        className='flex h-full w-full flex-col gap-1 overflow-hidden rounded-md bg-card shadow border hover:border-40'
                        style={{
                            borderColor: appointmentStatus.backgroundColor,
                            borderLeftWidth: 4
                        }}
                    >
                        <div className='flex w-full gap-2 pb-1 border-b-20'>
                            {height >= 48 && (
                                <UserAvatar
                                    className={cn('size-16', {
                                        'size-[45px]': height === 48
                                    })}
                                    radius={cn('rounded-none rounded-br-md border-br-20', {
                                        'border-b-none rounded-none': height === 48
                                    })}
                                    src={patient.personalInfo.avatar}
                                    fullName={patient.personalInfo.fullName}
                                />
                            )}
                            <div className='flex h-full flex-1 gap-1'>
                                <div
                                    className={cn('flex flex-1 flex-col', {
                                        'gap-1': height > 48,
                                        'gap-0.5': height === 48
                                    })}
                                >
                                    <div className='flex w-full items-center gap-1'>
                                        <span
                                            className={cn(
                                                '!line-clamp-1 w-full text-h5 font-medium tracking-wider text-text',
                                                {
                                                    'leading-5': height === 48
                                                }
                                            )}
                                        >
                                            {patient.personalInfo.fullName}
                                        </span>

                                        <DropdownMenu open={isOpenStatusMenu} onOpenChange={setIsOpenStatusMenu}>
                                            <DropdownMenuTrigger asChild>
                                                <Badge
                                                    variant='outline'
                                                    className='min-w-fit cursor-pointer rounded-md !text-label-md font-normal tracking-wider'
                                                    style={{
                                                        backgroundColor: appointmentStatus.backgroundColor,
                                                        color: appointmentStatus.textColor
                                                    }}
                                                    onPointerDown={e => e.stopPropagation()}
                                                >
                                                    {t(`status.labels.${appointmentStatus.key}`)}
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
                                                    <span className='w-full text-p-sm text-text'>
                                                        {t('status.labels.CUSTOM')}
                                                    </span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {statusItems}
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <DropdownMenu
                                            open={isOpenAppointmentSettings}
                                            onOpenChange={setIsOpenAppointmentSettings}
                                        >
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant='outline'
                                                    size='icon'
                                                    icon='xs'
                                                    className='min-h-6 min-w-6'
                                                    onPointerDown={e => e.stopPropagation()}
                                                >
                                                    <EllipsisVertical className='stroke-[2px]' />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end' className='min-w-[280px]'>
                                                {appointmentMenuItems.map(item => (
                                                    <DropdownMenuItem
                                                        key={item.id}
                                                        onSelect={() => console.log('Appointment action:', item.label)}
                                                        onPointerDown={e => e.stopPropagation()}
                                                    >
                                                        <item.icon className='size-4' />
                                                        <span className='w-full text-p-sm text-text'>
                                                            {t(`schedule.actions.${item.label}`)}
                                                        </span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className='flex w-full gap-1 pr-2'>
                                        <p
                                            className={cn(
                                                'line-clamp-2 w-full !text-p-sm !leading-4 text-text-secondary',
                                                {
                                                    'line-clamp-1': height === 48
                                                }
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    '!text-p-xs font-medium !leading-4 tracking-wider text-text'
                                                )}
                                            >
                                                {t('patients.labels.service')}
                                            </span>{' '}
                                            {appointment.service.name}
                                        </p>
                                        <Badge
                                            variant='outline'
                                            className='border-0 min-w-fit cursor-pointer rounded-md p-0 tracking-wider'
                                        >
                                            {appointment.service.duration} {t('patients.labels.time.minutes')}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {height > 48 && (
                            <div className='w-full px-1 pb-1'>
                                <span
                                    className={cn('line-clamp-2 !text-p-xs font-normal text-text-secondary', {
                                        'line-clamp-1': height <= 96
                                    })}
                                >
                                    <span className={cn('!text-p-xs font-medium tracking-wider text-text')}>
                                        {t('patients.labels.notes')}
                                    </span>{' '}
                                    {appointment.notes}
                                </span>
                            </div>
                        )}
                    </div>
                </ContextMenuTrigger>

                <ContextMenuContent className='min-w-[240px]'>
                    {/* <ContextMenuItem className='gap-2' onSelect={() => console.log('CREATE_APPOINTMENT')}>
                        <span className='flex size-6 min-w-6 items-center justify-center'>
                            <CalendarPlus2 className='size-[18px] stroke-[1.75px]' />
                        </span>

                        <span className='w-full text-p-sm text-text'>Create appointment</span>
                    </ContextMenuItem> */}
                    {/* <ContextMenuItem className='gap-2' onSelect={() => console.log('CREATE_TIME_SLOT')}>
                        <span className='flex size-6 min-w-6 items-center justify-center'>
                            <Icon name='TimerReserve' className='size-5 stroke-text stroke-[0.5px]' />
                        </span>
                        <span className='w-full text-p-sm text-text'>Create time slot</span>
                    </ContextMenuItem> */}
                    {/* <ContextMenuItem className='gap-2' onSelect={() => console.log('CREATE_TIME_SLOT')}>
                        <span className='flex size-6 min-w-6 items-center justify-center'>
                            <Icon name='TimerAdd' className='size-5 stroke-text stroke-[0.5px]' />
                        </span>
                        <span className='w-full text-p-sm text-text'>Create reserved time</span>
                    </ContextMenuItem> */}
                    <ContextMenuItem className='gap-2' onSelect={() => console.log('EDIT_APPOINTMENT')}>
                        <span className='flex size-6 min-w-6 items-center justify-center'>
                            <CalendarCog className='size-[18px] stroke-[1.75px]' />
                        </span>
                        <span className='w-full text-p-sm text-text'>Edit appointment</span>
                    </ContextMenuItem>
                    {/* <ContextMenuItem className='gap-2' onSelect={() => console.log('EDIT_RESERVE_TIME')}>
                        <span className='flex size-6 min-w-6 items-center justify-center'>
                            <Icon name='TimerEdit' className='size-5 stroke-text stroke-[0.5px]' />
                        </span>
                        <span className='w-full text-p-sm text-text'>Edit reserved time</span>
                    </ContextMenuItem> */}
                    <ContextMenuItem className='gap-2' onSelect={() => console.log('CANCEL_APPOINTMENT')}>
                        <span className='flex size-6 min-w-6 items-center justify-center'>
                            <CalendarX className='size-[18px] stroke-[1.75px]' />
                        </span>
                        <span className='w-full text-p-sm text-text'>Cancel appointment</span>
                    </ContextMenuItem>
                    {/* <ContextMenuItem className='gap-2' onSelect={() => console.log('CANCEL_TIME_SLOT')}>
                        <span className='flex size-6 min-w-6 items-center justify-center'>
                            <CalendarMinus2 className='size-[18px] stroke-[1.75px]' />
                        </span>
                        <span className='w-full text-p-sm text-text'>Cancel time slot</span>
                    </ContextMenuItem> */}
                    {/* <ContextMenuItem className='gap-2' onSelect={() => console.log('CANCEL_RESEVED_TIME')}>
                        <span className='flex size-6 min-w-6 items-center justify-center'>
                            <Icon name='TimerClose' className='size-5 stroke-text stroke-[0.5px]' />
                        </span>
                        <span className='w-full text-p-sm text-text'>Cancel reserved time</span>
                    </ContextMenuItem> */}
                </ContextMenuContent>
            </ContextMenu>
        </div>
    )
}
