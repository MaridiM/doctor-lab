'use client'

import { format } from 'date-fns'
import {
    CalendarDays,
    CalendarSync,
    ChevronLeft,
    ChevronRight,
    Ellipsis,
    IdCard,
    MessageSquare,
    Phone
} from 'lucide-react'
import { FC, useEffect, useState } from 'react'

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

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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

const Dashboard: FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const weekDates = getWeekDays(currentDate)
    const month = currentDate.toLocaleString('en-US', { month: 'long' })
    const year = currentDate.getFullYear()
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isClient, setIsClient] = useState(false)

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
        <div className='flex flex-1 flex-col'>
            <Header />
            <div className='flex flex-1 gap-2 px-2 pb-2'>
                <div className='bg-card flex w-1/3 flex-col gap-8 overflow-hidden rounded-md py-2'>
                    <section className='flex flex-col gap-2 px-2'>
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
                            <Button variant='ghost' className='min-h-[72px] w-4' onClick={handleNextWeek}>
                                <ChevronRight />
                            </Button>
                        </div>
                        <Separator className='bg-border/10 mt-2' />
                        <div className='flex h-6 items-center justify-between px-1.5'>
                            <div className='flex min-w-36 items-center gap-2'>
                                <span className='text-p-sm text-text-secondary font-semibold uppercase'>
                                    {format(selectedDate ? selectedDate : new Date(), 'MMM dd,')}
                                </span>
                                <span className='text-p-sm text-text-tertiary font-semibold uppercase'>
                                    {format(selectedDate ? selectedDate : new Date(), 'EEEE')}
                                </span>
                            </div>
                            <div>
                                {selectedDate !== null && (
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        tooltip='Reset selected date'
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
                                            setSelectedDate(null)
                                            setCurrentDate(new Date())
                                        }}
                                        tooltip='Back to current week'
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

                    <ul className='max-h-[calc(100vh-278px)] overflow-auto px-3.5'>
                        <li className='flex gap-4'>
                            <span className='text-text text-p-x font-semibold'>9:00</span>
                            <article className='mt-1.5 flex min-h-[138] w-full flex-col gap-1 rounded border border-blue-200 bg-blue-50 px-2 py-1 shadow-lg transition-[border] duration-300 ease-in-out hover:border-blue-400'>
                                <header className='flex h-8 items-center justify-between pl-2'>
                                    <span className='text-text text-p-xs font-semibold'>9:00 - 9:30</span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant='ghost' size='icon' className='size-8 hover:bg-blue-100'>
                                                <Ellipsis />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                            <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                                            <DropdownMenuItem>Add Note</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </header>

                                <div className='flex items-center gap-2 pl-2'>
                                    <UserAvatar
                                        src='https://randomuser.me/api/portraits/women/44.jpg'
                                        username='Emma Thomson'
                                        className='h-8 w-8'
                                    />
                                    <ul className=''>
                                        <li className='text-text font-semibold'>Emma Thomson</li>
                                        <li className='text-text-secondary'>Emergency appointment</li>
                                    </ul>
                                </div>
                                <Separator className='mt-2 bg-blue-100' />
                                <footer className='flex h-8 items-center justify-between pl-2'>
                                    <span className='text-text-tertiary text-p-xs font-semibold uppercase'>
                                        TO PAY: $ 120
                                    </span>
                                    <div className='flex gap-2'>
                                        <Button variant='ghost' size='icon' className='size-8 hover:bg-blue-100'>
                                            <MessageSquare />
                                        </Button>
                                        <Button variant='ghost' size='icon' className='size-8 hover:bg-blue-100'>
                                            <Phone />
                                        </Button>
                                        <Button variant='ghost' size='icon' className='size-8 hover:bg-blue-100'>
                                            <IdCard />
                                        </Button>
                                    </div>
                                </footer>
                            </article>
                        </li>
                        <li className='flex gap-4'>
                            <span className='text-text text-p-x font-semibold'>9:30</span>
                            <article
                                className='border-border/20 bg-background hover:border-border/40 mt-1.5 flex min-h-[138] w-full flex-col gap-1 rounded border px-2 py-1 shadow-lg transition-[border] duration-300 ease-in-out'
                                style={{
                                    backgroundImage:
                                        'repeating-linear-gradient(45deg, #DEDFE1  0px, #DEDFE1  1px, transparent 1px, transparent 8px);'
                                }}
                            >
                                <header className='flex h-8 items-center justify-between pl-2'>
                                    <li className='text-text text-p-xs font-semibold'>9:00 - 9:30</li>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant='ghost' size='icon' className='size-8'>
                                                <Ellipsis />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuItem>Edit Break</DropdownMenuItem>
                                            <DropdownMenuItem>Extend Time</DropdownMenuItem>
                                            <DropdownMenuItem>Remove Break</DropdownMenuItem>
                                            <DropdownMenuItem>Add Note</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </header>

                                <div className='flex items-center gap-2 pb-2 pl-2'>
                                    <ul>
                                        <li className='text-text font-semibold'>Lunch break</li>
                                        <li className='text-text-secondary'>
                                            Some description for breack Some description for breack
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </li>
                    </ul>
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
