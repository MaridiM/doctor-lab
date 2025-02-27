'use client'

import {
    CalendarClock,
    CalendarPlus2,
    Check,
    Clock3,
    Clock4,
    Clock6,
    Clock8,
    Clock12,
    ListTodo,
    Settings
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    Input,
    ScrollArea,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    Switch
} from '@/shared/components'
import { PATHS } from '@/shared/config'
import { cn } from '@/shared/utils'

export function Schedule() {
    const t = useTranslations('dashboard')
    const MAX_SLOT_HEIGHT = 160

    const [isOpenScheduleSettings, setIsOpenScheduleSettings] = useState(false)
    const [operatingHours, setOperatingHours] = useState<6 | 8 | 12 | 16 | 24>(12)
    const [operatingHoursStart, setOperatingHoursStart] = useState<number>(8)
    const [operatingHoursMeridiemStart, setOperatingHoursMeridiemStart] = useState<'AM' | 'PM'>('AM')
    const [timeStep, setTimeStep] = useState<15 | 20 | 30 | 60>(15)
    const [slotHeight, setSlotHeight] = useState<number>(MAX_SLOT_HEIGHT)
    const [isTime24Format, setIsTime24Format] = useState<boolean>(true)

    const stepsPerHour = 60 / timeStep

    useEffect(() => {
        setOperatingHoursStart(operatingHours === 24 ? 0 : 8)
    }, [operatingHours])

    useEffect(() => {
        setSlotHeight(MAX_SLOT_HEIGHT / stepsPerHour)
    }, [stepsPerHour])

    const calculateTime = (idx: number) => {
        const startHour = getStartHour24()

        const baseHour = startHour - 1
        const hour = baseHour + Math.floor(idx / stepsPerHour)
        const adjustedHour = (hour + 24) % 24
        const minute = (idx % stepsPerHour) * timeStep

        return { adjustedHour, minute }
    }

    const getStartHour24 = () => {
        if (isTime24Format) return operatingHoursStart
        return operatingHoursMeridiemStart === 'AM' ? operatingHoursStart % 12 : (operatingHoursStart % 12) + 12
    }
    const generateHours = () => {
        return Array.from({ length: isTime24Format ? 24 : 12 }, (_, i) => {
            const value = isTime24Format ? i : i % 12 || 12
            return {
                value: value,
                label: `${value}:00`
            }
        })
    }

    const operatingHoursIcon = {
        6: <Clock6 />,
        8: <Clock8 />,
        12: <Clock12 />,
        16: <Clock4 />,
        24: <Clock12 />
    }
    const stepTimeIcon = {
        15: <Clock3 />,
        20: <Clock4 />,
        30: <Clock6 />,
        60: <Clock12 />
    }
    return (
        <section className='w-full overflow-hidden rounded-lg bg-card border-20'>
            <header className='flex h-14 items-center justify-between px-4 py-2 border-b-20'>
                <div className='flex items-center gap-2'>
                    <span className='rounded-md bg-primary p-1.5'>
                        <ListTodo className='size-5 stroke-text-foreground' />
                    </span>
                    <span className='text-h4 font-normal text-text'>{t('schedule.title')}</span>
                </div>

                <div className='flex items-center gap-2'>
                    <Button variant='outline' size='sm' className='pt-px'>
                        <Link href={PATHS.appointments}>{t('schedule.header.all')}</Link>
                    </Button>

                    <Button
                        size='icon'
                        icon='sm'
                        variant='primary'
                        tooltip={{
                            children: t('schedule.header.addNewAppointment'),
                            align: 'center',
                            side: 'bottom'
                        }}
                        onClick={() => console.log('Add appointment')}
                    >
                        <CalendarPlus2 className='stroke-text-foreground' />
                    </Button>

                    <DropdownMenu
                        open={isOpenScheduleSettings}
                        onOpenChange={() => setIsOpenScheduleSettings(!isOpenScheduleSettings)}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' size='icon' icon='sm'>
                                <Settings className='stroke-[1.5px]' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='min-w-[280px]'>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <CalendarClock />
                                <span className='w-full text-p-sm text-text'>
                                    {t(`schedule.header.timeFormat.${isTime24Format ? '24' : '12'}`)}
                                </span>
                                <Switch
                                    className='border-25'
                                    checked={isTime24Format}
                                    onCheckedChange={() => setIsTime24Format(!isTime24Format)}
                                />
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className='gap-2'>
                                    {operatingHoursIcon[operatingHours]}
                                    <span className='w-full text-p-sm text-text'>
                                        Operating hours - {operatingHours} hours
                                    </span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className='ml-2.5 min-w-[200px]'>
                                    <DropdownMenuItem className='flex flex-col' onSelect={e => e.preventDefault()}>
                                        <span className='w-full text-p-sm font-medium tracking-wider text-text-secondary'>
                                            Start operating hours:
                                        </span>
                                        <div className='flex w-full items-center gap-1'>
                                            <Select
                                                onValueChange={value =>
                                                    setOperatingHoursStart(value === 'auto' ? 8 : Number(value))
                                                }
                                            >
                                                <SelectTrigger className='w-full bg-card'>
                                                    <SelectValue placeholder='Auto' className='border-none bg-card' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <ScrollArea className='max-h-48'>
                                                        <div className='max-h-48'>
                                                            <SelectItem value={'auto'}>Auto</SelectItem>
                                                            {generateHours().map((_, i) => (
                                                                <SelectItem key={i} value={i.toString()}>
                                                                    {`${i}:00`}
                                                                </SelectItem>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>
                                            {!isTime24Format && (
                                                <Select
                                                    onValueChange={(value: 'AM' | 'PM') =>
                                                        setOperatingHoursMeridiemStart(value)
                                                    }
                                                >
                                                    <SelectTrigger className='w-16 bg-card'>
                                                        <SelectValue placeholder='AM' className='border-none bg-card' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {['AM', 'PM'].map(meridiem => (
                                                                <SelectItem key={meridiem} value={meridiem}>
                                                                    {meridiem}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOperatingHours(6)}>
                                        <Clock6 />
                                        <span className='w-full text-p-sm text-text'>6 hours</span>
                                        {operatingHours === 6 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOperatingHours(8)}>
                                        <Clock8 />
                                        <span className='w-full text-p-sm text-text'>8 hours</span>
                                        {operatingHours === 8 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOperatingHours(12)}>
                                        <Clock12 />
                                        <span className='w-full text-p-sm text-text'>12 hours</span>
                                        {operatingHours === 12 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOperatingHours(16)}>
                                        <Clock4 />
                                        <span className='w-full text-p-sm text-text'>16 hours</span>
                                        {operatingHours === 16 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOperatingHours(24)}>
                                        <Clock12 />
                                        <span className='w-full text-p-sm text-text'>24 hours</span>
                                        {operatingHours === 24 && <Check />}
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className='gap-2'>
                                    {stepTimeIcon[timeStep]}
                                    <span>
                                        {t(`schedule.header.stepTime.title`)}{' '}
                                        {t(`schedule.header.stepTime.${timeStep}`)}
                                    </span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className='ml-2.5 min-w-[200px]'>
                                    <DropdownMenuItem onClick={() => setTimeStep(15)}>
                                        <Clock3 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.stepTime.15')}
                                        </span>
                                        {timeStep === 15 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeStep(20)}>
                                        <Clock4 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.stepTime.20')}
                                        </span>
                                        {timeStep === 20 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeStep(30)}>
                                        <Clock6 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.stepTime.30')}
                                        </span>
                                        {timeStep === 30 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeStep(60)}>
                                        <Clock12 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.stepTime.60')}
                                        </span>
                                        {timeStep === 60 && <Check />}
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <ScrollArea className='flex h-full max-h-[calc(100vh-138px)] w-full bg-background' type='auto'>
                <div className='flex'>
                    {/* Левая колонка с временной шкалой */}
                    <ul className='gap flex w-16 flex-col bg-card border-r-20'>
                        {Array((operatingHours + 2) * stepsPerHour + 1)
                            .fill(null)
                            .map((_, idx) => {
                                const { adjustedHour, minute } = calculateTime(idx)
                                const isMinuteZero = minute === 0
                                const displayHour = isTime24Format ? adjustedHour : adjustedHour % 12 || 12
                                const timeMeridiem = adjustedHour < 12 ? 'AM' : 'PM'

                                return (
                                    <li
                                        key={idx}
                                        className='flex w-full items-center justify-end'
                                        style={{ height: slotHeight }}
                                    >
                                        <div className={cn('flex h-6 items-start px-0.5')}>
                                            {isMinuteZero && (
                                                <span className='text-h4 leading-[20px] text-text-secondary'>
                                                    {displayHour}
                                                </span>
                                            )}
                                            <div
                                                className={cn('flex h-full w-4 flex-col items-center', {
                                                    'justify-center': !isMinuteZero
                                                })}
                                            >
                                                <span
                                                    className={cn(
                                                        'flex w-full justify-center !text-label-md leading-[10px] text-text-secondary'
                                                    )}
                                                >
                                                    {minute.toString().padStart(2, '0')}
                                                </span>
                                                {!isTime24Format && isMinuteZero && (
                                                    <span className='flex w-full justify-center !text-label-md uppercase leading-[10px] text-text-secondary'>
                                                        {timeMeridiem}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                    </ul>
                    {/* Правая колонка (сетка расписания) */}
                    <ul className='flex w-full flex-col'>
                        {Array((operatingHours + 2) * stepsPerHour + 1)
                            .fill(null)
                            .map((_, idx) => {
                                const { minute } = calculateTime(idx)
                                const isMinuteZero = minute === 0
                                const lastItem = idx === (operatingHours + 2) * stepsPerHour + 1
                                return (
                                    <li
                                        key={idx}
                                        className={cn('flex items-center border-b-20', {
                                            'border-b-none': lastItem,
                                            '!border-dashed': !isMinuteZero
                                        })}
                                        style={{
                                            height: lastItem || idx === 0 ? slotHeight / 2 : slotHeight
                                        }}
                                    ></li>
                                )
                            })}
                    </ul>
                </div>
                <Button className='group mt-auto h-14 w-full gap-2 rounded-none bg-background border-y-20 hover:bg-hover'>
                    <CalendarClock className='size-5 stroke-text' />
                    <span className='pt-[2px] text-p-md text-text'>{t('schedule.addASlot')}</span>
                </Button>
            </ScrollArea>
        </section>
    )
}
