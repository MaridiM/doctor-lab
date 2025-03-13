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
            6: <Clock6 />,
            8: <Clock8 />,
            12: <Clock12 />,
            16: <Clock4 />,
            24: <Clock12 />
        }),
        []
    )

    const stepTimeIcon = useMemo(
        () => ({
            15: <Clock3 />,
            20: <Clock4 />,
            30: <Clock6 />,
            60: <Clock12 />
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
                            <Settings className='stroke-[1.5px]' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='min-w-[280px]'>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='gap-2'>
                                {operatingHoursIcon[operatingHours]}
                                <span className='w-full text-p-sm text-text'>
                                    {t('schedule.header.operatingHours.label')}
                                    {t(`schedule.header.operatingHours.durations.${operatingHours}`)}
                                </span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className='ml-2.5 min-w-[200px]'>
                                {[6, 8, 12, 16, 24].map(hours => (
                                    <DropdownMenuItem key={hours} onSelect={() => setOperatingHours(hours as any)}>
                                        {operatingHoursIcon[hours as keyof typeof operatingHoursIcon]}
                                        <span className='w-full text-p-sm text-text'>
                                            {t(`schedule.header.operatingHours.durations.${hours}`)}
                                        </span>
                                        {operatingHours === hours && <Check />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='gap-2'>
                                {stepTimeIcon[timeStep]}
                                <span>
                                    {t(`schedule.header.stepTime.title`)}
                                    {t(`schedule.header.stepTime.${timeStep}`)}
                                </span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className='ml-2.5 min-w-[200px]'>
                                {[15, 20, 30, 60].map(step => (
                                    <DropdownMenuItem key={step} onClick={() => setTimeStep(step as any)}>
                                        {stepTimeIcon[step as keyof typeof stepTimeIcon]}
                                        <span className='w-full text-p-sm text-text'>
                                            {t(`schedule.header.stepTime.${step}`)}
                                        </span>
                                        {timeStep === step && <Check />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <CalendarClock />
                            <span className='w-full text-p-sm text-text'>
                                {t(`schedule.header.timeFormat.${isTime24Format ? '24' : '12'}`)}
                            </span>
                            <Switch checked={isTime24Format} onCheckedChange={setIsTime24Format} />
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <ChevronsUpDown />
                            <span className='w-full text-p-sm text-text'>
                                {t('schedule.header.verticalRestriction')}
                            </span>
                            <Switch checked={isVerticalRestriction} onCheckedChange={setIsVerticalRestriction} />
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <CalendarSync />
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
