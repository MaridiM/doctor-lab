'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { format } from 'date-fns'
import { BellRing, CalendarClock, CalendarX2, EllipsisVertical, FilePenLine, IdCard } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { CSSProperties, useEffect, useMemo, useState } from 'react'

import { APPOINTMENT_STATUSES, Appointment, Status, User } from '@/shared/api'

import {
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    UserAvatar
} from '@/shared/components'
import { cn } from '@/shared/utils'

import { EStateType, ScheduleContextMenu } from './ScheduleContextMenu'
import { StatusBadge } from '@/entities'

interface IProps {
    appointment: Appointment
    top: number
    height: number
    patient?: User
    className?: string
    style?: CSSProperties
}

export function AppointmentCard({ appointment, top, height, patient, className, style }: IProps) {
    const t = useTranslations('dashboard')

    const [isContextMenu, setIsContextMenu] = useState<boolean>(false)
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false)
    const [isOpenStatusMenu, setIsOpenStatusMenu] = useState<boolean>(false)
    const [appointmentStatus, setAppointmentStatus] = useState<Status>(appointment.status)

    useEffect(() => {
        setAppointmentStatus(appointment.status)
    }, [appointment.status])

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: appointment.id,
        data: {
            patient,
            type: 'APPOINTMENT',
            data: appointment
        }
    })

    const menuItems = useMemo(
        () => [
            { icon: IdCard, label: 'chart' },
            { icon: BellRing, label: 'notify' },
            { icon: FilePenLine, label: 'edit' },
            { icon: CalendarClock, label: 'reschedule' },
            { icon: CalendarX2, label: 'cancel' }
        ],
        []
    )

    const dragParams = isContextMenu || isOpenStatusMenu || isOpenSettings ? {} : { ...listeners, ...attributes }
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
                minHeight: 56,
                maxHeight: height,
                transform: CSS.Translate.toString(transform),
                transition: transform ? 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                zIndex: transform ? 100 : 'auto',
                willChange: 'transform',
                ...style
            }}
            {...dragParams}
        >
            <ScheduleContextMenu isOpen={open => setIsContextMenu(open)} type={EStateType.APPOINTMENT}>
                <div
                    className='flex h-full w-full flex-col gap-1 overflow-hidden rounded-md bg-card shadow border'
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
                                src={patient?.personalInfo.avatar}
                                fullName={patient?.personalInfo.fullName}
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
                                        className={cn('!line-clamp-1 w-full text-p-md font-medium text-text', {
                                            'leading-5': height === 48
                                        })}
                                    >
                                        {patient?.personalInfo.fullName}
                                    </span>

                                    <StatusBadge
                                        statusList={APPOINTMENT_STATUSES}
                                        initialStatus={appointment.status}
                                        isOpen={open => setIsOpenStatusMenu(open)}
                                        onSelect={status => setAppointmentStatus(status)}
                                    />

                                    <DropdownMenu open={isOpenSettings} onOpenChange={setIsOpenSettings}>
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
                                            {menuItems.map((item, idx) => (
                                                <DropdownMenuItem
                                                    key={idx}
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
                                        className={cn('line-clamp-2 w-full !text-p-sm !leading-4 text-text-secondary', {
                                            'line-clamp-1': height === 48
                                        })}
                                    >
                                        <span
                                            className={cn('!text-p-xs font-medium !leading-4 tracking-wider text-text')}
                                        >
                                            {t('patients.labels.service')}
                                        </span>{' '}
                                        {appointment.service.name}
                                    </p>
                                    <Badge
                                        variant='outline'
                                        className='border-0 min-w-fit cursor-pointer rounded-md p-0 tracking-wider'
                                    >
                                        {format(new Date(appointment.date), 'HH:mm')} ({appointment.service.duration}{' '}
                                        {t('time.minutes')})
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
            </ScheduleContextMenu>
        </div>
    )
}
