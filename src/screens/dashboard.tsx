'use client'

import { format } from 'date-fns'
import {
    BellRing,
    CalendarClock,
    CalendarDays,
    CalendarPlus2,
    CalendarSync,
    CalendarX2,
    ChevronLeft,
    ChevronRight,
    Ellipsis,
    FilePenLine,
    IdCard,
    MessageSquare,
    Phone,
    Plus,
    Settings
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC, useEffect, useMemo, useState } from 'react'

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

export type TTimeStep = 15 | 20 | 30 | 60

const SLOT_COUNT = 24
const SLOT_HEIGHT = 56
const MAX_SLOT_HEIGHT = SLOT_HEIGHT * 4
const DEFAULT_TIME_STEP: TTimeStep = 15

const Dashboard: FC = () => {
    const t = useTranslations('dashboard')

    const stepsPerHour = useMemo(() => 60 / DEFAULT_TIME_STEP, [DEFAULT_TIME_STEP])
    const slotHeight = useMemo(() => MAX_SLOT_HEIGHT / stepsPerHour, [stepsPerHour])

    const [isSlotHover, setIsSlotHover] = useState<number | null>(null)
    const [isCardHover, setIsCardHover] = useState<number | null>(null)
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

    const menuAppointmentItems = useMemo(
        () => [
            { icon: IdCard, label: 'Appointment chart' },
            { icon: BellRing, label: 'Notify patient of appointment' },
            { icon: FilePenLine, label: 'Edit appointment' },
            { icon: CalendarClock, label: 'Reschedule appointment' },
            { icon: CalendarX2, label: 'Cancel appointment' }
        ],
        []
    )
    const menuReservedItems = useMemo(
        () => [
            { icon: FilePenLine, label: 'Edit reserved' },
            { icon: CalendarX2, label: 'Cancel reserved' }
        ],
        []
    )

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
                    <section className='border-border/10 relative flex max-h-[calc(100vh-124px)] flex-1 overflow-scroll border-t'>
                        <ul className='relative flex max-w-14 min-w-14 flex-1 flex-col overflow-hidden pl-2'>
                            <li
                                className='flex w-full items-center justify-end pr-1.5'
                                style={{ minHeight: slotHeight, maxHeight: slotHeight }}
                            >
                                <span className='text-text-secondary text-label-lg text-right font-semibold text-nowrap'>
                                    09:00
                                </span>
                            </li>
                            <li
                                className='flex w-full items-center justify-end pr-1.5'
                                style={{ minHeight: slotHeight, maxHeight: slotHeight }}
                            >
                                <span className='text-text-tertiary text-label-md text-right font-semibold text-nowrap'>
                                    15
                                </span>
                            </li>
                            <li
                                className='flex w-full items-center justify-end pr-1.5'
                                style={{ minHeight: slotHeight, maxHeight: slotHeight }}
                            >
                                <span className='text-text-tertiary text-label-md text-right font-semibold text-nowrap'>
                                    30
                                </span>
                            </li>
                            <li
                                className='flex w-full items-center justify-end pr-1.5'
                                style={{ minHeight: slotHeight, maxHeight: slotHeight }}
                            >
                                <span className='text-text-tertiary text-label-md text-right font-semibold text-nowrap'>
                                    45
                                </span>
                            </li>
                            <li
                                className='flex w-full items-center justify-end pr-1.5'
                                style={{ minHeight: slotHeight, maxHeight: slotHeight }}
                            >
                                <span className='text-text-secondary text-label-lg text-right font-semibold text-nowrap'>
                                    10:00
                                </span>
                            </li>
                            <li
                                className='flex w-full items-center justify-end pr-1.5'
                                style={{ minHeight: slotHeight, maxHeight: slotHeight }}
                            >
                                <span className='text-text-tertiary text-label-md text-right font-semibold text-nowrap'>
                                    15
                                </span>
                            </li>
                            <li
                                className='flex w-full items-center justify-end pr-1.5'
                                style={{ minHeight: slotHeight, maxHeight: slotHeight }}
                            >
                                <span className='text-text-tertiary text-label-md text-right font-semibold text-nowrap'>
                                    30
                                </span>
                            </li>
                            <li
                                className='flex w-full items-center justify-end pr-1.5'
                                style={{ minHeight: slotHeight, maxHeight: slotHeight }}
                            >
                                <span className='text-text-tertiary text-label-md text-right font-semibold text-nowrap'>
                                    45
                                </span>
                            </li>
                        </ul>
                        <ul className='relative flex flex-1 flex-col'>
                            <li
                                className='border-border/20 flex flex-1 items-center justify-center border-b'
                                style={{
                                    minHeight: slotHeight / 2,
                                    maxHeight: slotHeight / 2
                                }}
                                onMouseEnter={() => (isSlotHover === 0 ? undefined : setIsSlotHover(0))}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => (isSlotHover === 0 ? undefined : setSelectedSlot(0))}
                            />
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 1 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(1)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(1)}
                            >
                                {isSlotHover === 1 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary pt-0.5'>Add new schedule - 09:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 2 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(2)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(2)}
                            >
                                {isSlotHover === 2 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 09:15</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 3 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(3)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(3)}
                            >
                                {isSlotHover === 3 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 09:30</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn('border-border/10 flex flex-1 items-center justify-center border-b', {
                                    'bg-hover': isSlotHover === 4
                                })}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(4)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(4)}
                            >
                                {isSlotHover === 4 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 09:45</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 6 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(6)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(6)}
                            >
                                {isSlotHover === 6 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 7 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(7)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(7)}
                            >
                                {isSlotHover === 7 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 7 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(7)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(7)}
                            >
                                {isSlotHover === 5 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 8 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(8)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(8)}
                            >
                                {isSlotHover === 8 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 9 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(9)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(9)}
                            >
                                {isSlotHover === 9 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 10 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(10)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(10)}
                            >
                                {isSlotHover === 10 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 11 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(11)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(11)}
                            >
                                {isSlotHover === 11 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 12 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(12)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(12)}
                            >
                                {isSlotHover === 12 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 13 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(13)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(13)}
                            >
                                {isSlotHover === 13 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 13 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(13)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(13)}
                            >
                                {isSlotHover === 13 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 14 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(14)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(14)}
                            >
                                {isSlotHover === 14 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 15 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(15)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(15)}
                            >
                                {isSlotHover === 15 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 16 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(16)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(16)}
                            >
                                {isSlotHover === 16 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 17 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(17)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(17)}
                            >
                                {isSlotHover === 17 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 18 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(18)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(18)}
                            >
                                {isSlotHover === 18 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 19 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(19)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(19)}
                            >
                                {isSlotHover === 19 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 20 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(20)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(20)}
                            >
                                {isSlotHover === 20 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 21 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(21)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(21)}
                            >
                                {isSlotHover === 21 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 22 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(22)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(22)}
                            >
                                {isSlotHover === 22 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 23 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(23)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(23)}
                            >
                                {isSlotHover === 23 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 24 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(24)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(24)}
                            >
                                {isSlotHover === 5 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>
                            <li
                                className={cn(
                                    'border-border/10 flex flex-1 items-center justify-center border-b border-dashed',
                                    { 'bg-hover': isSlotHover === 5 }
                                )}
                                style={{
                                    minHeight: slotHeight,
                                    maxHeight: slotHeight
                                }}
                                onMouseEnter={() => setIsSlotHover(5)}
                                onMouseLeave={() => setIsSlotHover(null)}
                                onClick={() => setSelectedSlot(5)}
                            >
                                {isSlotHover === 5 && (
                                    <div className='flex h-full flex-1 items-center justify-center gap-2'>
                                        <Plus className='stroke-text-secondary size-4' />
                                        <span className='text-text-secondary'>Add new schedule - 10:00</span>
                                    </div>
                                )}
                            </li>

                            <li
                                className='absolute w-full p-0.5'
                                style={{
                                    top: SLOT_HEIGHT / 2, // 9:00, first time slot
                                    height: '100%',
                                    minHeight: SLOT_HEIGHT,
                                    maxHeight: 3 * SLOT_HEIGHT // 45 min
                                }}
                            >
                                <div className='flex h-full overflow-hidden rounded border border-blue-200 bg-blue-50 transition-[border] duration-300 ease-in-out hover:border-blue-400'>
                                    <UserAvatar
                                        src='https://randomuser.me/api/portraits/women/44.jpg'
                                        username='Emma Thomson'
                                        className='size-6 min-w-6'
                                        radius='rounded'
                                    />
                                    <div className='flex flex-1 flex-col gap-0.5'>
                                        <header className='flex max-h-6 flex-1 items-center justify-between gap-1'>
                                            <span className='text-text line-clamp-1 px-1 font-semibold'>
                                                Emma Thomson
                                            </span>
                                            <div className='flex items-center gap-1'>
                                                <span className='text-text text-p-xs px-1 font-semibold'>
                                                    9:00 - 9:45
                                                </span>
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
                                                        {menuAppointmentItems.map((item, idx) => (
                                                            <DropdownMenuItem
                                                                key={idx}
                                                                onSelect={() =>
                                                                    console.log('Appointment action:', item.label)
                                                                }
                                                                onPointerDown={e => e.stopPropagation()}
                                                            >
                                                                <item.icon className='size-4' />
                                                                <span className='text-p-sm text-text w-full'>
                                                                    {item.label}
                                                                </span>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </header>
                                        <div className='flex flex-col gap-2'>
                                            <span className='text-text-secondary text-p-xs min-h-6 px-1'>
                                                Emergency appointment
                                            </span>
                                            <div className='flex gap-1 px-1'>
                                                <span className='text-text text-p-xs font-semibold'>Note:</span>
                                                <span className='text-text-secondary text-p-xs'>
                                                    Some note for breack Some description for breack
                                                </span>
                                            </div>
                                        </div>
                                        <Separator className='mt-auto bg-blue-100' />
                                        <footer className='flex h-8 items-center justify-between px-1'>
                                            <span className='text-text-tertiary text-p-xs font-semibold uppercase'>
                                                TO PAY: $120
                                            </span>
                                            <div className='flex gap-1'>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='size-6 hover:bg-blue-100'
                                                    tooltip='Send message'
                                                >
                                                    <MessageSquare className='size-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='size-6 hover:bg-blue-100'
                                                    tooltip='Call patient'
                                                >
                                                    <Phone className='size-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='size-6 hover:bg-blue-100'
                                                    tooltip='View patient card'
                                                >
                                                    <IdCard className='size-4' />
                                                </Button>
                                            </div>
                                        </footer>
                                    </div>
                                </div>
                            </li>
                            <li
                                className='absolute w-full p-0.5'
                                style={{
                                    top: SLOT_HEIGHT * 3 + SLOT_HEIGHT / 2, // 9:45,
                                    height: '100%',
                                    minHeight: SLOT_HEIGHT,
                                    maxHeight: 1 * SLOT_HEIGHT // 15 min
                                }}
                                onMouseEnter={() => setIsCardHover(1)}
                                onMouseLeave={() => setIsCardHover(null)}
                            >
                                <div className='flex h-full gap-1 overflow-hidden rounded border border-red-200 bg-red-50 transition-[border] duration-300 ease-in-out hover:border-red-400'>
                                    <UserAvatar
                                        src='https://randomuser.me/api/portraits/women/44.jpg'
                                        username='Emma Thomson'
                                        className='size-6 min-w-6'
                                        radius='rounded'
                                    />
                                    <div className='flex flex-1 flex-col gap-0.5'>
                                        <header className='flex max-h-6 flex-1 items-center justify-between'>
                                            <span className='text-text line-clamp-1 px-1 font-semibold'>
                                                Emma Thomson
                                            </span>
                                            <div className='flex items-center gap-1'>
                                                <span className='text-text text-p-xs px-1 font-semibold'>
                                                    9:00 - 9:30
                                                </span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant='ghost'
                                                            size='icon'
                                                            className='size-6 hover:bg-red-100'
                                                        >
                                                            <Ellipsis />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align='end' className='min-w-[280px]'>
                                                        {menuAppointmentItems.map((item, idx) => (
                                                            <DropdownMenuItem
                                                                key={idx}
                                                                onSelect={() =>
                                                                    console.log('Appointment action:', item.label)
                                                                }
                                                                onPointerDown={e => e.stopPropagation()}
                                                            >
                                                                <item.icon className='size-4' />
                                                                <span className='text-p-sm text-text w-full'>
                                                                    {item.label}
                                                                </span>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </header>

                                        <div
                                            className={cn(
                                                'flex min-h-6 flex-col transition-transform duration-300 ease-in-out',
                                                {
                                                    'translate-y-6': isCardHover === 1
                                                }
                                            )}
                                        >
                                            <span className='text-text-secondary text-p-xs line-clamp-1 px-1'>
                                                Emergency appointment
                                            </span>
                                            {/* <div className='flex gap-1 px-1'>
                                                <span className='text-text text-p-xs font-semibold'>Note:</span>
                                                <span className='text-text-secondary text-p-xs'>
                                                    Some note for breack Some description for breack
                                                </span>
                                            </div> */}
                                        </div>
                                        <footer
                                            className={cn(
                                                'flex h-6 items-center justify-between bg-red-50 px-1 transition-transform duration-300 ease-in-out',
                                                {
                                                    '-translate-y-7': isCardHover === 1
                                                }
                                            )}
                                        >
                                            <span className='text-text-tertiary text-p-xs font-semibold uppercase'>
                                                TO PAY: $120
                                            </span>
                                            <div className='flex gap-1'>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='size-6 hover:bg-red-100'
                                                    tooltip='Send message'
                                                >
                                                    <MessageSquare className='size-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='size-6 hover:bg-red-100'
                                                    tooltip='Call patient'
                                                >
                                                    <Phone className='size-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='size-6 hover:bg-red-100'
                                                    tooltip='View patient card'
                                                >
                                                    <IdCard className='size-4' />
                                                </Button>
                                            </div>
                                        </footer>
                                    </div>
                                </div>
                            </li>
                            <li
                                className='absolute w-full p-0.5'
                                style={{
                                    top: SLOT_HEIGHT * 4 + SLOT_HEIGHT / 2, // 9:45, // 9:00, first time slot
                                    height: '100%',
                                    minHeight: SLOT_HEIGHT,
                                    maxHeight: 3 * SLOT_HEIGHT // 45 min
                                }}
                            >
                                <div
                                    className='border-border/20 bg-background hover:border-border/40 flex h-full overflow-hidden rounded border transition-[border] duration-300 ease-in-out'
                                    style={{
                                        backgroundImage:
                                            'repeating-linear-gradient(45deg, #DEDFE1 0px, #DEDFE1 1px, transparent 1px, transparent 8px)'
                                    }}
                                >
                                    <div className='flex flex-1 flex-col gap-0.5'>
                                        <header className='flex max-h-6 flex-1 items-center justify-between gap-1'>
                                            <span className='text-text line-clamp-1 px-1 font-semibold'>
                                                Lunch break
                                            </span>
                                            <div className='flex items-center gap-1'>
                                                <span className='text-text text-p-xs px-1 font-semibold'>
                                                    10:00 - 10:45
                                                </span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant='ghost'
                                                            size='icon'
                                                            className='hover:bg-hover size-6'
                                                        >
                                                            <Ellipsis />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align='end' className='min-w-[280px]'>
                                                        {menuReservedItems.map((item, idx) => (
                                                            <DropdownMenuItem
                                                                key={idx}
                                                                onSelect={() =>
                                                                    console.log('Appointment action:', item.label)
                                                                }
                                                                onPointerDown={e => e.stopPropagation()}
                                                            >
                                                                <item.icon className='size-4' />
                                                                <span className='text-p-sm text-text w-full'>
                                                                    {item.label}
                                                                </span>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </header>
                                        <div className='flex min-h-6 flex-col'>
                                            <span className='text-text-secondary text-p-xs line-clamp-1 px-1'>
                                                Some description for breack Some description for breack
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li
                                className='absolute w-full p-0.5'
                                style={{
                                    top: SLOT_HEIGHT * 7 + SLOT_HEIGHT / 2, // 9:45, // 9:00, first time slot
                                    height: '100%',
                                    minHeight: SLOT_HEIGHT,
                                    maxHeight: 1 * SLOT_HEIGHT // 15 min
                                }}
                            >
                                <div
                                    className='border-border/20 bg-background hover:border-border/40 flex h-full overflow-hidden rounded border transition-[border] duration-300 ease-in-out'
                                    style={{
                                        backgroundImage:
                                            'repeating-linear-gradient(45deg, #DEDFE1 0px, #DEDFE1 1px, transparent 1px, transparent 8px)'
                                    }}
                                >
                                    <div className='flex flex-1 flex-col gap-0.5'>
                                        <header className='flex max-h-6 flex-1 items-center justify-between gap-1'>
                                            <span className='text-text line-clamp-1 px-1 font-semibold'>
                                                Lunch break
                                            </span>
                                            <div className='flex items-center gap-1'>
                                                <span className='text-text text-p-xs px-1 font-semibold'>
                                                    10:00 - 10:45
                                                </span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant='ghost'
                                                            size='icon'
                                                            className='hover:bg-hover size-6'
                                                        >
                                                            <Ellipsis />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align='end' className='min-w-[280px]'>
                                                        {menuReservedItems.map((item, idx) => (
                                                            <DropdownMenuItem
                                                                key={idx}
                                                                onSelect={() =>
                                                                    console.log('Appointment action:', item.label)
                                                                }
                                                                onPointerDown={e => e.stopPropagation()}
                                                            >
                                                                <item.icon className='size-4' />
                                                                <span className='text-p-sm text-text w-full'>
                                                                    {item.label}
                                                                </span>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </header>
                                        <div className='flex min-h-6 flex-col'>
                                            <span className='text-text-secondary text-p-xs line-clamp-1 px-1'>
                                                Some description for breack Some description for breack
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
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
