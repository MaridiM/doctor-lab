'use client'

import {
    BellRing,
    CalendarClock,
    CalendarX2,
    Ellipsis,
    FilePenLine,
    IdCard,
    MessageSquare,
    Phone,
    Plus,
    Settings
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC, useMemo, useState } from 'react'

import '@/shared/components'
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Separator,
    UserAvatar
} from '@/shared/components'
import { cn } from '@/shared/utils'

import { Header } from '@/widgets'

interface IScheduleSlot {
    adjustedHour: number
    minute: number
}

// const lightColors = [
//     'bg-blue-50',
//     'bg-red-50',
//     'bg-green-50',
//     'bg-yellow-50',
//     'bg-purple-50',
//     'bg-pink-50',
//     'bg-indigo-50',
//     'bg-teal-50',
//     'bg-orange-50',
//   ]

export type TTimeStep = 15 | 20 | 30 | 60

const SLOT_HEIGHT = 56
const MAX_SLOT_HEIGHT = SLOT_HEIGHT * 4
const DEFAULT_TIME_STEP: TTimeStep = 15

const DEFAULT_START_HOUR = 8
const DEFAULT_OPERATING_HOURS = 8

const Dashboard: FC = () => {
    const t = useTranslations('dashboard')

    const [isTime24Format, setIsTime24Format] = useState(true)
    const operatingHours = DEFAULT_OPERATING_HOURS
    const startHour24 = DEFAULT_START_HOUR

    // Новый диапазон: от (startHour24 - 1) до (startHour24 - 1 + operatingHours + 1)
    const totalHours = operatingHours + 2 // +1 до и +1 после
    const stepsPerHour = useMemo(() => 60 / DEFAULT_TIME_STEP, [DEFAULT_TIME_STEP])
    const slotHeight = useMemo(() => MAX_SLOT_HEIGHT / stepsPerHour, [stepsPerHour])

    const slots: IScheduleSlot[] = useMemo(() => {
        return Array.from({ length: totalHours * stepsPerHour + 1 }, (_, idx) => {
            const baseHour = startHour24 - 1
            const hour = baseHour + Math.floor(idx / stepsPerHour)
            const adjustedHour = (hour + 24) % 24
            const minute = (idx % stepsPerHour) * DEFAULT_TIME_STEP
            return { adjustedHour, minute }
        })
    }, [totalHours, stepsPerHour, startHour24])

    return (
        <div className='flex flex-1 flex-col'>
            <Header />
            <div className='flex flex-1 gap-2 px-2 pb-2'>
                <div className='bg-card border-border/20 flex w-full max-w-[480px] min-w-[400px] flex-col gap-2 overflow-hidden rounded-md border py-2'>
                    <header className='flex h-8 w-full items-center justify-between px-2'>
                        <h3 className='text-p-md font-semibold'>Schedules</h3>
                        <div className='flex items-center gap-2'>
                            <Button variant='ghost' className='h-8'>
                                All
                            </Button>
                            <Button variant='ghost' size='icon' tooltip='Add to Schedule' className='size-8'>
                                <Plus />
                            </Button>
                            <Button variant='ghost' size='icon' className='size-8'>
                                <Settings />
                            </Button>
                        </div>
                    </header>
                    <section className='border-border/10 relative flex max-h-[calc(100vh-122px)] flex-1 overflow-scroll border-t'>
                        <ScheduleTimeLine slots={slots} isTime24Format={isTime24Format} slotHeight={slotHeight} />
                        {/* Schedule Slots */}
                        <ul className='relative flex flex-1 flex-col'>
                            {/* Slots */}
                            <ScheduleSlots slots={slots} isTime24Format={isTime24Format} slotHeight={slotHeight} />
                            <ScheduleAppointmentCard
                                top={SLOT_HEIGHT * 0 + SLOT_HEIGHT / 2}
                                height={1 * SLOT_HEIGHT}
                                slotHeight={SLOT_HEIGHT}
                                timeRange='10:00 - 10-45'
                                service='Emergency appointment'
                                amount={65}
                                user={{
                                    username: 'Emma Thomson',
                                    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
                                }}
                            />
                            <ScheduleAppointmentCard
                                top={SLOT_HEIGHT * 1 + SLOT_HEIGHT / 2}
                                height={2 * SLOT_HEIGHT}
                                slotHeight={SLOT_HEIGHT}
                                timeRange='10:00 - 10-45'
                                service='Emergency appointment'
                                amount={120}
                                user={{
                                    username: 'Emma Thomson',
                                    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
                                }}
                            />
                            <ScheduleAppointmentCard
                                top={SLOT_HEIGHT * 3 + SLOT_HEIGHT / 2}
                                height={3 * SLOT_HEIGHT}
                                slotHeight={SLOT_HEIGHT}
                                timeRange='10:00 - 10-45'
                                service='Emergency appointment'
                                note='Some note for breack Some description for breack'
                                amount={300}
                                user={{
                                    username: 'Emma Thomson',
                                    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
                                }}
                            />

                            <ScheduleReservedCard
                                top={SLOT_HEIGHT * 6 + SLOT_HEIGHT / 2}
                                height={3 * SLOT_HEIGHT}
                                slotHeight={SLOT_HEIGHT}
                                timeRange='10:00 - 10-45'
                                title='Lunch break'
                                note='Some description for breack Some description for breack'
                            />
                            <ScheduleReservedCard
                                top={SLOT_HEIGHT * 10 + SLOT_HEIGHT / 2}
                                height={1 * SLOT_HEIGHT}
                                slotHeight={SLOT_HEIGHT}
                                timeRange='10:00 - 10-45'
                                title='Lunch break'
                                note='Some description for breack Some description for breack'
                            />
                        </ul>
                    </section>
                </div>

                <div className='flex w-1/3 flex-col gap-2'>
                    <div className='bg-card h-2/3 rounded-md p-2'>APPOINTMENTS</div>
                    <div className='bg-card h-1/3 rounded-md p-2'>MESSAGES</div>
                </div>

                <div className='flex w-1/3 flex-col gap-2'>
                    <div className='bg-card h-1/3 rounded-md p-2'>RECENT PAYMENTS</div>
                    <div className='bg-card h-1/3 rounded-md p-2'>POPULAR TYPES</div>
                    <div className='bg-card h-1/3 rounded-md p-2'>TASKS</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

interface IScheduleTimeLineProps {
    slotHeight: number
    isTime24Format: boolean
    slots: IScheduleSlot[]
    className?: string
}

const ScheduleTimeLine: FC<IScheduleTimeLineProps> = ({ slots, isTime24Format, slotHeight, className }) => {
    return (
        <ul
            className={cn(
                'border-border/10 relative flex h-fit max-w-12 min-w-12 flex-1 flex-col overflow-hidden border-r pl-2',
                className
            )}
        >
            {slots.map(({ adjustedHour, minute }, idx) => {
                const isMinuteZero = minute === 0
                const displayHour = isTime24Format ? adjustedHour : adjustedHour % 12 || 12
                const timeMeridiem = adjustedHour < 12 ? 'AM' : 'PM'
                return (
                    <li
                        key={idx}
                        className='flex w-full items-center justify-end pr-1'
                        style={{ minHeight: slotHeight, maxHeight: slotHeight }}
                    >
                        <span
                            className={cn('text-text-secondary text-label-md text-right text-nowrap', {
                                'text-text-tertiary !text-label-md': !isMinuteZero
                            })}
                        >
                            {isMinuteZero
                                ? `${displayHour}:${minute.toString().padStart(2, '0')}`
                                : minute.toString().padStart(2, '0')}

                            {!isTime24Format && isMinuteZero && timeMeridiem}
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}

interface IScheduleSlotsProps {
    slotHeight: number
    isTime24Format: boolean
    slots: IScheduleSlot[]
    className?: string
}

const ScheduleSlots: FC<IScheduleSlotsProps> = ({ slots, isTime24Format, slotHeight, className }) => {
    const [isSlotHover, setIsSlotHover] = useState<number | null>(null)
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

    return (
        <>
            {slots.map(({ adjustedHour, minute }, idx) => {
                const isFirst = idx === 0
                const isLast = idx === slots.length
                const isMinuteZero = minute === 0

                const isHover = isSlotHover === idx && !isFirst && !isLast

                const height = isFirst || isLast ? slotHeight / 2 : slotHeight
                const displayHour = isTime24Format ? adjustedHour : adjustedHour % 12 || 12

                const time = `${displayHour}:${minute.toString().padStart(2, '0')}`
                return (
                    <li
                        key={idx}
                        className={cn(
                            'flex flex-1 items-center justify-center border-b',
                            isMinuteZero ? 'border-border/20' : 'border-border/10 border-dashed',
                            { 'bg-hover': isHover },
                            className
                        )}
                        style={{ minHeight: height, maxHeight: height }}
                        onMouseEnter={() => setIsSlotHover(idx)}
                        onMouseLeave={() => setIsSlotHover(null)}
                        onClick={() => setSelectedSlot(idx)}
                    >
                        {isHover && (
                            <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                <Plus className='stroke-text-secondary size-4' />
                                <span className='text-text-secondary pt-0.5'>Add new schedule - {time}</span>
                            </div>
                        )}
                    </li>
                )
            })}
        </>
    )
}

interface IScheduleAppointmentCardProps {
    top: number
    height: number
    slotHeight: number
    timeRange: string
    service: string
    note?: string
    amount: number
    user: {
        username: string
        avatarUrl: string
    }
}

const ScheduleAppointmentCard: FC<IScheduleAppointmentCardProps> = ({
    top,
    height,
    slotHeight,
    timeRange,
    service,
    note,
    amount,
    user
}) => {
    const [isHover, setIsHover] = useState(false)

    const menuItems = useMemo(
        () => [
            { icon: IdCard, label: 'Appointment chart' },
            { icon: BellRing, label: 'Notify patient of appointment' },
            { icon: FilePenLine, label: 'Edit appointment' },
            { icon: CalendarClock, label: 'Reschedule appointment' },
            { icon: CalendarX2, label: 'Cancel appointment' }
        ],
        []
    )

    // Determine display tiers based on height
    const isSingle = height <= slotHeight
    const isDouble = height > slotHeight && height <= 2 * slotHeight
    const isMulti = height > 2 * slotHeight

    return (
        <li
            className='absolute w-full p-0.5'
            style={{ top, height: '100%', minHeight: slotHeight, maxHeight: height }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div
                className={cn('flex h-full overflow-hidden rounded border transition-colors duration-300 ease-in-out', {
                    'border-blue-200 bg-blue-50 hover:border-blue-400': true
                })}
            >
                <UserAvatar src={user.avatarUrl} username={user.username} className='size-6 min-w-6' radius='rounded' />

                <div className='flex flex-1 flex-col gap-0.5'>
                    {/* Header */}
                    <header className='flex max-h-6 flex-1 items-center justify-between gap-1'>
                        <span className='text-text line-clamp-1 px-1 font-semibold'>{user.username}</span>
                        <div className='flex items-center gap-1'>
                            <span className='text-text text-p-xs px-1 font-semibold'>{timeRange}</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='size-6 hover:bg-blue-100'
                                        onPointerDown={e => e.stopPropagation()}
                                    >
                                        <Ellipsis />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end' className='min-w-[280px]'>
                                    {menuItems.map((item, idx) => (
                                        <DropdownMenuItem
                                            key={idx}
                                            onSelect={() => console.log(item.label)}
                                            onPointerDown={e => e.stopPropagation()}
                                        >
                                            <item.icon className='size-4' />
                                            <span className='text-p-sm text-text w-full'>{item.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    {/* Body */}
                    <div
                        className={cn('flex flex-col gap-1 px-1 transition-transform duration-300 ease-in-out', {
                            'translate-y-6': isSingle && isHover
                        })}
                    >
                        <span
                            className={cn('text-text-secondary text-p-xs', {
                                'line-clamp-1': isSingle,
                                'line-clamp-2': isDouble,
                                'line-clamp-none': isMulti
                            })}
                        >
                            {service}
                        </span>

                        {isMulti && note && (
                            <div className='flex gap-1'>
                                <span className='text-text text-p-xs font-semibold'>Note:</span>
                                <span className='text-text-secondary text-p-xs'>{note}</span>
                            </div>
                        )}
                    </div>

                    {/* Separator & Footer */}
                    {height > slotHeight && <Separator className='mt-auto bg-blue-100' />}

                    <footer
                        className={cn(
                            'flex items-center justify-between px-1 transition-transform duration-300 ease-in-out',
                            {
                                'h-6 translate-y-0 bg-blue-50': isSingle || isDouble,
                                '-translate-y-[21px]': isSingle && isHover,
                                'h-8': isMulti
                            }
                        )}
                    >
                        <span className='text-text-tertiary text-p-xs font-semibold uppercase'>TO PAY: {amount}</span>
                        <div className='flex gap-1'>
                            {[
                                { icon: MessageSquare, tooltip: 'Send message' },
                                { icon: Phone, tooltip: 'Call patient' },
                                { icon: IdCard, tooltip: 'View patient card' }
                            ].map((btn, i) => (
                                <Button
                                    key={i}
                                    variant='ghost'
                                    size='icon'
                                    className='size-6 hover:bg-blue-100'
                                    tooltip={btn.tooltip}
                                >
                                    <btn.icon className='size-4' />
                                </Button>
                            ))}
                        </div>
                    </footer>
                </div>
            </div>
        </li>
    )
}

interface IScheduleReservedCardProps {
    top: number
    height: number
    slotHeight: number
    timeRange: string
    title: string
    note?: string
}

const ScheduleReservedCard: FC<IScheduleReservedCardProps> = ({ top, height, slotHeight, timeRange, title, note }) => {
    const menuItems = useMemo(
        () => [
            { icon: FilePenLine, label: 'Edit reserved' },
            { icon: CalendarX2, label: 'Cancel reserved' }
        ],
        []
    )

    const isSingle = height <= slotHeight
    return (
        <li className='absolute w-full p-0.5' style={{ top, height: '100%', minHeight: slotHeight, maxHeight: height }}>
            <div
                className='border-border/20 bg-background hover:border-border/40 flex h-full overflow-hidden rounded border transition-[border] duration-300 ease-in-out'
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(45deg, #DEDFE1 0px, #DEDFE1 1px, transparent 1px, transparent 8px)'
                }}
            >
                <div className='flex flex-1 flex-col gap-0.5'>
                    <header className='flex max-h-6 flex-1 items-center justify-between gap-1'>
                        <span className='text-text line-clamp-1 px-1 font-semibold'>{title}</span>
                        <div className='flex items-center gap-1'>
                            <span className='text-text text-p-xs px-1 font-semibold'>{timeRange}</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='ghost' size='icon' className='hover:bg-hover size-6'>
                                        <Ellipsis />
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
                                            <span className='text-p-sm text-text w-full'>{item.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <div className='flex min-h-6 flex-col'>
                        {note && (
                            <span
                                className={cn('text-text-secondary text-p-xs px-1', {
                                    'line-clamp-1': isSingle
                                })}
                            >
                                {note}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </li>
    )
}
