'use client'

import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FC, useEffect, useState } from 'react'

import { Button, Separator } from '@/shared/components'
import { cn } from '@/shared/utils'

import { Header } from '@/widgets'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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

const Dashboard: FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const weekDates = getWeekDays(currentDate)
    const month = currentDate.toLocaleString('en-US', { month: 'long' })
    const year = currentDate.getFullYear()
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
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
        <div className='flex flex-1 flex-col'>
            <Header />
            <div className='flex flex-1 gap-2 px-2 pb-2'>
                <div className='bg-card w-1/3 rounded-md p-2'>
                    <section className='flex flex-col gap-2'>
                        <header className='flex min-h-9 items-center justify-between px-1.5'>
                            <span className='text-h5 text-text font-semibold'>{month}</span>
                            <span className='text-h5 text-text-tertiary font-medium'>{year}</span>
                        </header>
                        <div className='flex items-center justify-between gap-1'>
                            <Button variant='ghost' className='min-h-[72px] w-4' onClick={handlePrevWeek}>
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
                                                'hover:bg-hover flex min-h-20 min-w-11 flex-col overflow-hidden rounded',
                                                {
                                                    'bg-primary-100 hover:bg-primary-100': isToday,
                                                    'bg-secondary-200 hover:bg-secondary-200': isSelected
                                                }
                                            )}
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
                                                    'text-text !text-h3 flex min-h-10 min-w-11 cursor-pointer items-center justify-center font-normal',
                                                    {
                                                        'text-primary font-medium': isToday,
                                                        'text-text font-medium': isSelected
                                                    }
                                                )}
                                                onClick={() => handleSelectDate(date)}
                                            >
                                                {date.getDate().toString().padStart(2, '0')}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                            <Button variant='ghost' className='min-h-[72px] w-4' onClick={handleNextWeek}>
                                <ChevronRight />
                            </Button>
                        </div>
                        <Separator className='bg-border/10 mt-2' />
                        <div className='flex justify-between px-1.5'>
                            <div className='flex gap-2'>
                                <span className='text-p-sm text-text-secondary font-semibold uppercase'>
                                    {format(selectedDate ? selectedDate : currentDate, 'MMM dd,')}
                                </span>
                                <span className='text-p-sm text-text-tertiary font-semibold uppercase'>
                                    {format(selectedDate ? selectedDate : currentDate, 'EEEE')}
                                </span>
                            </div>
                            <span className='text-p-sm text-text-secondary w-fit rounded px-2 font-semibold'>
                                {format(currentTime, 'HH:mm:ss')}
                            </span>
                        </div>
                    </section>
                    <section></section>
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
