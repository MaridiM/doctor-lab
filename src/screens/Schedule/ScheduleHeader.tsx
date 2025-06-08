import { CalendarDays, CalendarPlus2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button, WidgetHeader } from '@/shared/components'
import { PATHS } from '@/shared/config'

import { TOperatingHours, TTimeStep } from './Schedule'
import { ScheduleSettings } from './ScheduleSettings'

interface IProps {
    timeStep: TTimeStep
    operatingHours: TOperatingHours
    isTime24Format: boolean
    isSmartPlacement: boolean
    isVerticalRestriction: boolean
    setTimeStep: (step: TTimeStep) => void
    setOperatingHours: (hours: TOperatingHours) => void
    setIsTime24Format: (value: boolean) => void
    setIsSmartPlacement: (value: boolean) => void
    setIsVerticalRestriction: (value: boolean) => void
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

    return (
        <WidgetHeader title={t('schedule.title')} icon={<CalendarDays className='size-5 stroke-text-foreground' />}>
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

            <ScheduleSettings
                timeStep={timeStep}
                operatingHours={operatingHours}
                isTime24Format={isTime24Format}
                isSmartPlacement={isSmartPlacement}
                isVerticalRestriction={isVerticalRestriction}
                setTimeStep={setTimeStep}
                setOperatingHours={setOperatingHours}
                setIsTime24Format={setIsTime24Format}
                setIsSmartPlacement={setIsSmartPlacement}
                setIsVerticalRestriction={setIsVerticalRestriction}
            />
        </WidgetHeader>
    )
}
