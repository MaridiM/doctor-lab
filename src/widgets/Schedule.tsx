'use client'

import {
    CalendarClock,
    CalendarPlus2,
    Check,
    Clock1,
    Clock2,
    Clock3,
    Clock4,
    Clock6,
    Clock12,
    ListTodo,
    Settings
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    ScrollArea,
    Switch
} from '@/shared/components'
import { PATHS } from '@/shared/config'
import { cn } from '@/shared/utils'

export function Schedule() {
    const t = useTranslations('dashboard')

    const [isHoverTimeSlot, setIsHoverTimeSlot] = useState<number | null>(null)
    const [isOpenScheduleSettings, setIsOpenScheduleSettings] = useState(false)

    const { height } = useWindowSize()
    const [timeStart, setTimeStart] = useState<number>(8 - 1)

    const [timeEnd, setTimeEnd] = useState<number>(17 + 1)

    const [operatingHours, setOperatingHours] = useState<number>(timeEnd - timeStart > 12 ? timeEnd - timeStart : 12)

    const [timeStep, setTimeStep] = useState<5 | 10 | 15 | 20 | 30 | 60>(30)
    const [showHours, setShowHours] = useState<number>(6)

    useEffect(() => {
        let timeSlotCount =
            timeStep === 60
                ? 12
                : timeStep < 30 && timeStep > 10
                  ? 4
                  : timeStep <= 10 && timeStep > 5
                    ? 3
                    : timeStep <= 5
                      ? 2
                      : 6

        setShowHours(timeSlotCount)
    }, [timeStep])

    useEffect(() => {
        const showOperatingHours = timeEnd - timeStart > 12 ? timeEnd - timeStart : 12
        setOperatingHours(showOperatingHours)
    }, [timeEnd, timeStart])

    const [isTime24Format, setIsTime24Format] = useState<boolean>(true)

    const heightCell = (height - 136) / showHours > 24 ? (height - 136) / showHours : 24

    let currentSlotTime: number = timeStart
    const step = 60 / timeStep

    let countStep = 0
    let stepSlotTime = countStep

    const stepTimeIcon = {
        5: <Clock1 />,
        10: <Clock2 />,
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
                            <Button
                                variant='outline'
                                size='icon'
                                icon='sm'
                                tooltip={{
                                    children: t('schedule.header.scheduleSettings'),
                                    align: 'center',
                                    side: 'bottom'
                                }}
                            >
                                <Settings className='stroke-[1.5px]' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='min-w-[280px]'>
                            <DropdownMenuItem onSelect={e => e.preventDefault()} className=''>
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
                                    {stepTimeIcon[timeStep]}
                                    {/* <span>Step time - {timeStep} min</span> */}
                                    <span>
                                        {t(`schedule.header.stepTime.title`)}{' '}
                                        {t(`schedule.header.stepTime.${timeStep}`)}
                                    </span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className='ml-2.5 min-w-[200px]'>
                                    <DropdownMenuItem onClick={() => setTimeStep(5)}>
                                        <Clock1 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.stepTime.5')}
                                        </span>
                                        {timeStep === 5 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeStep(10)}>
                                        <Clock2 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.stepTime.10')}
                                        </span>
                                        {timeStep === 10 && <Check />}
                                    </DropdownMenuItem>
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
            <ScrollArea className='flex h-full max-h-[calc(100vh-138px)] w-full' type='auto'>
                <div className='flex flex-col'>
                    <div className='flex h-full'>
                        <div className='flex w-16 flex-col items-end justify-center bg-card border-r-20'>
                            <ul className='flex h-full w-16 flex-col'>
                                {Array(operatingHours * step + 2)
                                    .fill(null)
                                    .map((_, idx) => {
                                        if (idx === 0) {
                                            return
                                        }
                                        let timeMeridiem = ''
                                        const isEvenNumber = !!(idx % 2)
                                        const isStepHour = timeStep === 60

                                        if (countStep === 0 && idx > 1) {
                                            countStep = step
                                        }
                                        if (countStep > 0) {
                                            countStep = countStep - 1
                                            stepSlotTime = stepSlotTime + timeStep
                                        }
                                        if (stepSlotTime === 60) {
                                            stepSlotTime = 0
                                        }

                                        const currentStepSlotTime = stepSlotTime === 0 ? '00' : stepSlotTime
                                        currentSlotTime =
                                            idx === 1
                                                ? currentSlotTime
                                                : stepSlotTime === 0
                                                  ? currentSlotTime + 1
                                                  : currentSlotTime

                                        if (!isTime24Format) {
                                            timeMeridiem = currentSlotTime < 12 ? 'AM' : 'PM'
                                        }

                                        const currentSlotStepTime = isEvenNumber
                                            ? currentStepSlotTime
                                            : isStepHour
                                              ? '00'
                                              : currentStepSlotTime

                                        return (
                                            <li
                                                key={idx}
                                                className='flex w-full items-center justify-end px-1'
                                                style={{
                                                    minHeight:
                                                        idx === 0
                                                            ? heightCell / (60 / timeStep) / 2
                                                            : heightCell / (60 / timeStep)
                                                }}
                                            >
                                                <div
                                                    className={cn('flex h-6 items-start justify-end gap-[2px]', {
                                                        'items-center': !isTime24Format || !!countStep
                                                    })}
                                                >
                                                    {(isStepHour
                                                        ? isStepHour
                                                        : isEvenNumber
                                                          ? !countStep
                                                          : !countStep) && (
                                                        <span className='bg-red text-p-lg leading-[18px] text-text-secondary'>
                                                            {currentSlotTime}
                                                        </span>
                                                    )}
                                                    <div className='flex flex-col items-center'>
                                                        <span
                                                            className={cn(
                                                                '!text-label-md leading-[10px] text-text-secondary',
                                                                {
                                                                    '!text-label-lg leading-[12px]':
                                                                        !!countStep || !isEvenNumber
                                                                }
                                                            )}
                                                        >
                                                            {currentSlotStepTime}
                                                        </span>
                                                        {!isTime24Format && (
                                                            <span className='!text-label-md uppercase leading-[10px] text-text-secondary'>
                                                                {timeMeridiem}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                        <div className='flex h-full w-full flex-col bg-background'>
                            <ul className='flex flex-1 flex-col'>
                                {Array(operatingHours * step + 2)
                                    .fill(null)
                                    .map((_, idx) => {
                                        if (countStep === 0 && idx > 0) {
                                            countStep = step
                                        }
                                        if (countStep > 0) {
                                            countStep = countStep - 1
                                            stepSlotTime = stepSlotTime + timeStep
                                        }

                                        if (stepSlotTime === 60) {
                                            stepSlotTime = 0
                                        }
                                        const isEvenNumber = !!(idx % 2)
                                        const isStepHour = timeStep === 60
                                        const isDashed = isStepHour
                                            ? !isStepHour
                                            : isEvenNumber
                                              ? !!countStep
                                              : !!countStep

                                        const lastItem =
                                            Array(operatingHours * (60 / timeStep) + 2).fill(null).length - 1 === idx

                                        return (
                                            <li
                                                key={idx}
                                                onMouseEnter={
                                                    idx !== 0 && !lastItem ? () => setIsHoverTimeSlot(idx) : undefined
                                                }
                                                onMouseLeave={
                                                    idx !== 0 && !lastItem ? () => setIsHoverTimeSlot(null) : undefined
                                                }
                                                className={cn(
                                                    'transition-color group bg-transparent p-1 duration-300 ease-in-out border-b-20',
                                                    {
                                                        'hover:bg-hover': idx !== 0 && !lastItem,
                                                        'border-b-none': lastItem,
                                                        'border-dashed': isDashed
                                                    }
                                                )}
                                                style={{
                                                    minHeight:
                                                        idx === 0 || lastItem
                                                            ? heightCell / (60 / timeStep) / 2
                                                            : heightCell / (60 / timeStep)
                                                }}
                                            >
                                                {idx > 0 && !lastItem && isHoverTimeSlot === idx && (
                                                    <div className='flex min-h-[inherit] w-full items-center justify-center gap-2 rounded-md border-20'>
                                                        <CalendarPlus2 className='size-4 stroke-text-tertiary' />
                                                        <span className='pt-[2px] text-p-md text-text-tertiary'>
                                                            {t('schedule.slot.hover')}
                                                        </span>
                                                    </div>
                                                )}
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    </div>
                    <Button className='group mt-auto h-14 w-full gap-2 rounded-none bg-background border-y-20 hover:bg-hover'>
                        <CalendarClock className='size-5 stroke-text' />
                        <span className='pt-[2px] text-p-md text-text'>{t('schedule.addASlot')}</span>
                    </Button>
                </div>
            </ScrollArea>
        </section>
    )
}
