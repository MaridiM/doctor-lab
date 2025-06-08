import React, { useState } from 'react'

import { Button } from '@/shared/components'

export const calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const weekDates = getWeekDays(currentDate)
    const month = currentDate.toLocaleString('en-US', { month: 'long' })
    const year = currentDate.getFullYear()
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isClient, setIsClient] = useState(false)

    // Переносим weekDays внутрь компонента, чтобы использовать t
    const weekDays = t.raw('widgets.schedules.calendar.weekdays.short')
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

    function getStartOfWeek(date: Date) {
        const d = new Date(date)
        const day = d.getDay()
        // В JS неделя начинается с воскресенья (0), нам нужно с понедельника (1)
        const diff = d.getDate() - ((day === 0 ? 7 : day) - 1)
        return new Date(d.setDate(diff))
    }

    function getWeekDays(date: Date) {
        const start = getStartOfWeek(date)
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start)
            d.setDate(start.getDate() + i)
            return d
        })
    }

    useEffect(() => {
        setIsClient(true)
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const handlePrevWeek = () => {
        const prev = new Date(currentDate)
        prev.setDate(currentDate.getDate() - 7)
        setCurrentDate(prev)
    }
    const handleNextWeek = () => {
        const next = new Date(currentDate)
        next.setDate(currentDate.getDate() + 7)
        setCurrentDate(next)
    }
    const handleSelectDate = (date: Date) => {
        setSelectedDate(date)
    }
    return (
        <section className='flex flex-col gap-2 px-2'>
            <header className='flex min-h-9 items-center justify-between px-1.5'>
                <span className='text-h5 text-text font-semibold'>
                    {t(`widgets.schedules.calendar.months.full.${currentDate.getMonth()}`)}
                </span>
                <span className='text-h5 text-text-tertiary font-medium'>{year}</span>
            </header>
            <div className='flex items-center justify-between gap-1'>
                <Button
                    variant='ghost'
                    className='min-h-[72px] w-4'
                    onClick={handlePrevWeek}
                    tooltip={t('widgets.schedules.calendar.tooltip.backToCurrent')}
                >
                    <ChevronLeft />
                </Button>
                <ul className='flex justify-between gap-1'>
                    {weekDates.map((date, idx) => {
                        const isToday = (() => {
                            const now = new Date()
                            return (
                                date.getDate() === now.getDate() &&
                                date.getMonth() === now.getMonth() &&
                                date.getFullYear() === now.getFullYear()
                            )
                        })()
                        const isSelected =
                            selectedDate &&
                            date.getDate() === selectedDate.getDate() &&
                            date.getMonth() === selectedDate.getMonth() &&
                            date.getFullYear() === selectedDate.getFullYear()
                        return (
                            <li
                                key={date.toDateString()}
                                className={cn(
                                    'hover:bg-hover flex min-h-20 min-w-11 cursor-pointer flex-col overflow-hidden rounded',
                                    {
                                        'bg-primary-100 hover:bg-primary-100': isToday,
                                        'bg-secondary-200 hover:bg-secondary-200': isSelected
                                    }
                                )}
                                onClick={() => handleSelectDate(date)}
                            >
                                <span
                                    className={cn(
                                        '!text-text-tertiary text-p-sm flex min-h-10 min-w-11 items-center justify-center',
                                        {
                                            'text-primary !text-p-md !font-medium': isToday,
                                            'text-text !text-p-md font-medium': isSelected
                                        }
                                    )}
                                >
                                    {weekDays[idx]}
                                </span>
                                <span
                                    className={cn(
                                        'text-text-tertiary !text-h3 flex min-h-10 min-w-11 items-center justify-center',
                                        {
                                            'text-primary font-medium': isToday,
                                            'text-text font-medium': isSelected
                                        }
                                    )}
                                >
                                    {date.getDate().toString().padStart(2, '0')}
                                </span>
                            </li>
                        )
                    })}
                </ul>
                <Button
                    variant='ghost'
                    className='min-h-[72px] w-4'
                    onClick={handleNextWeek}
                    tooltip={t('widgets.schedules.calendar.tooltip.backToCurrent')}
                >
                    <ChevronRight />
                </Button>
            </div>
            <Separator className='bg-border/10 mt-2' />
            <div className='flex h-6 items-center justify-between px-1.5'>
                <div className='flex min-w-36 items-center gap-2'>
                    {(() => {
                        const date = selectedDate ? selectedDate : new Date()
                        const monthShort = t.raw('widgets.schedules.calendar.months.short')[date.getMonth()]
                        const day = date.getDate().toString().padStart(2, '0')
                        const weekday = t.raw('widgets.schedules.calendar.weekdays.full')[date.getDay()]
                        return (
                            <>
                                <span className='text-p-sm text-text-secondary font-semibold uppercase'>
                                    {monthShort} {day},
                                </span>
                                <span className='text-p-sm text-text-tertiary font-semibold uppercase'>{weekday}</span>
                            </>
                        )
                    })()}
                </div>
                <div>
                    {selectedDate !== null && (
                        <Button
                            variant='ghost'
                            size='icon'
                            tooltip={t('widgets.schedules.calendar.tooltip.resetDate')}
                            onClick={() => setSelectedDate(null)}
                        >
                            <CalendarSync />
                        </Button>
                    )}
                    {(currentDate.getDate() !== new Date().getDate() ||
                        currentDate.getMonth() !== new Date().getMonth() ||
                        currentDate.getFullYear() !== new Date().getFullYear()) && (
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => {
                                setCurrentDate(new Date())
                            }}
                            tooltip={t('widgets.schedules.calendar.tooltip.backToCurrent')}
                        >
                            <CalendarDays />
                        </Button>
                    )}
                </div>
                {isClient && (
                    <span className='text-p-lg text-text-secondary w-fit min-w-36 rounded px-2 text-right font-medium'>
                        {format(currentTime, 'HH:mm:ss')}
                    </span>
                )}
            </div>
        </section>
    )
}
