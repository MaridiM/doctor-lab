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
    const { height } = useWindowSize()

    const [isOpenScheduleSettings, setIsOpenScheduleSettings] = useState(false)

    const [heightSlots, setHeightSlot] = useState<number>(64)
    const [operatingHours, setOperatingHours] = useState<number>(24)
    const [showHours, setShowHours] = useState<number>(8)

    const [timeStep, setTimeStep] = useState<15 | 20 | 30 | 60>(30)

    const [isTime24Format, setIsTime24Format] = useState<boolean>(true)

    const step = 60 / timeStep

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
                            <Button variant='outline' size='icon' icon='sm'>
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
            <ScrollArea className='flex h-full max-h-[calc(100vh-138px)] w-full bg-background' type='auto'>
                <div className='flex'>
                    <ul className='gap flex w-16 flex-col bg-card border-r-20'>
                        {Array(operatingHours * step)
                            .fill(null)
                            .map((_, idx) => {
                                const lastItem =
                                    Array(operatingHours * (60 / timeStep) + 2).fill(null).length - 1 === idx
                                console.log(lastItem || idx === 0 ? heightSlots / 2 : heightSlots)
                                return (
                                    <li
                                        key={idx}
                                        className='flex w-full items-center justify-end'
                                        style={{ height: heightSlots }}
                                    >
                                        <div className={cn('flex h-6 items-start px-0.5')}>
                                            <span className='text-h4 leading-[20px] text-text'>09</span>
                                            <div className='flex w-4 flex-col items-center'>
                                                <span
                                                    className={cn(
                                                        'flex w-full justify-center !text-label-md leading-[10px] text-text'
                                                    )}
                                                >
                                                    00
                                                </span>
                                                {!isTime24Format && (
                                                    <span className='flex w-full justify-center !text-label-md uppercase leading-[10px] text-text'>
                                                        AM
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                    </ul>
                    <ul className='flex w-full flex-col'>
                        {Array(operatingHours * step)
                            .fill(null)
                            .map((_, idx) => {
                                const lastItem =
                                    Array(operatingHours * (60 / timeStep) + 2).fill(null).length - 1 === idx
                                return (
                                    <li
                                        key={idx}
                                        className={cn('flex items-center', { 'border-b-20': !lastItem })}
                                        style={{ height: lastItem || idx === 0 ? heightSlots / 2 : heightSlots }}
                                    >
                                        {idx}
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            </ScrollArea>
        </section>
    )
}
