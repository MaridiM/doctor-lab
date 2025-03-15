'use client'

import {
    CalendarClock,
    CalendarPlus2,
    CalendarSync,
    Check,
    ChevronsUpDown,
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
import { useMemo, useState } from 'react'

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    Switch
} from '@/shared/components'
import { PATHS } from '@/shared/config'

import { TOperatingHours, TTimeStep } from './Schedule'

interface IProps {
    timeStep: TTimeStep
    isTime24Format: boolean
    isSmartPlacement: boolean
    isVerticalRestriction: boolean
    operatingHours: TOperatingHours
    setIsTime24Format: VoidFunction
    setIsSmartPlacement: VoidFunction
    setIsVerticalRestriction: VoidFunction
    setTimeStep: (time: TTimeStep) => void
    setOperatingHours: (hour: TOperatingHours) => void
}

export function ScheduleHeader({
    timeStep,
    operatingHours,
    isTime24Format,
    isSmartPlacement,
    isVerticalRestriction,
    setTimeStep,
    setOperatingHours,
    setIsTime24Format,
    setIsSmartPlacement,
    setIsVerticalRestriction
}: IProps) {
    const t = useTranslations('dashboard')

    const [isOpenScheduleSettings, setIsOpenScheduleSettings] = useState(false)

    const operatingHoursIcon = useMemo(
        () => ({
            6: <Clock6 className='size-[18px] stroke-[1.75px]' />,
            8: <Clock8 className='size-[18px] stroke-[1.75px]' />,
            12: <Clock12 className='size-[18px] stroke-[1.75px]' />,
            16: <Clock4 className='size-[18px] stroke-[1.75px]' />,
            24: <Clock12 className='size-[18px] stroke-[1.75px]' />
        }),
        []
    )

    const stepTimeIcon = useMemo(
        () => ({
            15: <Clock3 className='size-[18px] stroke-[1.75px]' />,
            20: <Clock4 className='size-[18px] stroke-[1.75px]' />,
            30: <Clock6 className='size-[18px] stroke-[1.75px]' />,
            60: <Clock12 className='size-[18px] stroke-[1.75px]' />
        }),
        []
    )

    return (
        <header className='z-20 flex h-14 items-center justify-between px-4 py-2 border-b-20'>
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
                    onClick={() => console.log('Add new Appointment')}
                >
                    <CalendarPlus2 className='stroke-text-foreground' />
                </Button>

                <DropdownMenu
                    open={isOpenScheduleSettings}
                    onOpenChange={() => setIsOpenScheduleSettings(!isOpenScheduleSettings)}
                >
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='icon' icon='sm'>
                            <Settings className='!size-[18px] stroke-[1.5px]' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='min-w-[280px]'>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='gap-2'>
                                <span className='flex size-6 min-w-6 items-center justify-center'>
                                    {operatingHoursIcon[operatingHours]}
                                </span>
                                <span className='w-full text-p-sm text-text'>
                                    {t('schedule.header.operatingHours.label', { duration: operatingHours })}
                                </span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className='ml-2.5 min-w-[200px]'>
                                {[6, 8, 12, 16, 24].map(hours => (
                                    <DropdownMenuItem key={hours} onSelect={() => setOperatingHours(hours as any)}>
                                        <span className='flex size-6 min-w-6 items-center justify-center'>
                                            {operatingHoursIcon[hours as keyof typeof operatingHoursIcon]}
                                        </span>
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.operatingHours.durations', { hours })}
                                        </span>

                                        {operatingHours === hours && <Check className='size-4' />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='gap-2'>
                                <span className='flex size-6 min-w-6 items-center justify-center'>
                                    {stepTimeIcon[timeStep]}
                                </span>
                                <span>{t('schedule.stepTime.title', { step: timeStep })}</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className='ml-2.5 min-w-[200px]'>
                                {[15, 20, 30, 60].map(step => (
                                    <DropdownMenuItem key={step} onSelect={() => setTimeStep(step as any)}>
                                        <span className='flex size-6 min-w-6 items-center justify-center'>
                                            {stepTimeIcon[step as keyof typeof stepTimeIcon]}
                                        </span>
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.stepTime.step', { step })}
                                        </span>
                                        <span className='flex size-6 min-w-6 items-center justify-center'>
                                            {timeStep === step && <Check className='size-4' />}
                                        </span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <span className='flex size-6 min-w-6 items-center justify-center'>
                                <CalendarClock className='size-[18px] stroke-[1.75px]' />
                            </span>
                            <span className='w-full text-p-sm text-text'>
                                {t('schedule.header.timeFormat', { format: isTime24Format ? '24' : '12' })}
                            </span>
                            <Switch checked={isTime24Format} onCheckedChange={setIsTime24Format} />
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <span className='flex size-6 min-w-6 items-center justify-center'>
                                <ChevronsUpDown className='size-[18px] stroke-[1.75px]' />
                            </span>
                            <span className='w-full text-p-sm text-text'>
                                {t('schedule.header.verticalRestriction')}
                            </span>
                            <Switch checked={isVerticalRestriction} onCheckedChange={setIsVerticalRestriction} />
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <span className='flex size-6 min-w-6 items-center justify-center'>
                                <CalendarSync className='size-[18px] stroke-[1.75px]' />
                            </span>
                            <span className='w-full text-p-sm text-text'>{t('schedule.header.smartPlacement')}</span>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Switch checked={isSmartPlacement} onCheckedChange={setIsSmartPlacement} />
                                </HoverCardTrigger>
                                <HoverCardContent className='w-fit max-w-[200px] px-2 py-1'>
                                    {t('schedule.header.smartPlacementDescription')}
                                </HoverCardContent>
                            </HoverCard>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
