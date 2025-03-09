'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import {
    BellRing,
    CalendarClock,
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
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

    const [isOpenAppointmentSettings, setIsOpenAppointmentSettings] = useState(false)
    const [isOpenStatusMenu, setIsOpenStatusMenu] = useState(false)
    const [appointmentStatus, setAppointmentStatus] = useState(appointment.status)

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

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'absolute left-0 right-0 cursor-grab rounded-md pb-[2px] pl-px pr-1 pt-px transition-transform duration-150 ease-linear',
                { '!cursor-grabbing': !!transform },
                className
            )}
            style={{
                top,
                height: '100%',
                minHeight: 48,
                maxHeight: height,
                transform: CSS.Translate.toString(transform),
                zIndex: transform ? 100 : 'auto',
                willChange: 'transform',
                ...style
            }}
            {...listeners}
            {...attributes}
        >
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
                                    className={cn('w-full text-h5 font-medium tracking-wider text-text', {
                                        'leading-5': height === 48
                                    })}
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
                                    className={cn('line-clamp-2 w-full !text-p-sm !leading-4 text-text-secondary', {
                                        'line-clamp-1': height === 48
                                    })}
                                >
                                    <span className={cn('!text-p-xs font-medium !leading-4 tracking-wider text-text')}>
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
        </div>
    )
}
