import {
    CalendarClock,
    CalendarSync,
    Check,
    ChevronsUpDown,
    Clock3,
    Clock4,
    Clock6,
    Clock8,
    Clock12,
    LucideIcon,
    Settings
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ReactNode, memo, useMemo, useState } from 'react'

import { HoverCardContent, Switch } from '@/shared/components'
import {
    Button,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    HoverCard,
    HoverCardTrigger
} from '@/shared/components'
import { DropdownMenu } from '@/shared/components'

import { TOperatingHours, TTimeStep } from './Schedule'

;('use clieCalendarSync, nt')

interface IMenuSetting {
    label: string
    items: number[]
    icon: LucideIcon
    checked: ReactNode
    isChecked: boolean
    onCheckedChange?: () => void
    onSelect?: (time?: number) => void
}

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

const OPERATING_HOURS_ICON = {
    6: Clock6,
    8: Clock8,
    12: Clock12,
    16: Clock4,
    24: Clock12
}

const STEP_TIME_ICON = {
    15: Clock3,
    20: Clock4,
    30: Clock6,
    60: Clock12
}

const renderSubMenuItem = (
    value: number,
    Icon: LucideIcon,
    label: string,
    isSelected: boolean,
    onSelect: () => void | undefined
) => (
    <DropdownMenuItem key={value} onSelect={onSelect}>
        <span className='flex size-6 min-w-6 items-center justify-center'>
            <Icon className='size-[18px] stroke-[1.75px]' />
        </span>
        <span className='w-full text-p-sm text-text'>{label}</span>
        {isSelected && (
            <span className='flex size-6 min-w-6 items-center justify-center'>
                <Check className='!size-4' />
            </span>
        )}
    </DropdownMenuItem>
)

export const ScheduleSettings = memo(function ScheduleSettings({
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
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const menuItems = useMemo(
        () => ({
            operatingHours: [6, 8, 12, 16, 24] as TOperatingHours[],
            stepTime: [15, 20, 30, 60] as TTimeStep[]
        }),
        []
    )

    const menuSettings: IMenuSetting[] = useMemo(
        () => [
            {
                icon: OPERATING_HOURS_ICON[operatingHours],
                label: t('schedule.header.operatingHours.label', { duration: operatingHours }),
                isChecked: false,
                onCheckedChange: undefined,
                onSelect: (operatingHours?: number) => setOperatingHours(operatingHours as TOperatingHours),
                items: menuItems.operatingHours,
                checked: null
            },
            {
                icon: STEP_TIME_ICON[timeStep],
                label: t('schedule.stepTime.title', { step: timeStep }),
                isChecked: false,
                onCheckedChange: undefined,
                onSelect: (timeStep?: number) => setTimeStep(timeStep as TTimeStep),
                items: menuItems.stepTime,
                checked: null
            },
            {
                icon: CalendarClock,
                label: t('schedule.header.timeFormat', { format: isTime24Format ? '24' : '12' }),
                isChecked: isTime24Format,
                onCheckedChange: () => setIsTime24Format(!isTime24Format),
                onSelect: undefined,
                items: [],
                checked: null
            },
            {
                icon: ChevronsUpDown,
                label: t('schedule.header.verticalRestriction'),
                isChecked: isVerticalRestriction,
                onCheckedChange: () => setIsVerticalRestriction(!isVerticalRestriction),
                onSelect: undefined,
                items: [],
                checked: null
            },
            {
                icon: CalendarSync,
                label: t('schedule.header.smartPlacement'),
                isChecked: isSmartPlacement,
                onCheckedChange: () => setIsSmartPlacement(!isSmartPlacement),
                onSelect: undefined,
                items: [],
                checked: (
                    <HoverCard>
                        <HoverCardTrigger>
                            <Switch checked={isSmartPlacement} onCheckedChange={setIsSmartPlacement} />
                        </HoverCardTrigger>
                        <HoverCardContent className='w-fit max-w-[200px] px-2 py-1'>
                            {t('schedule.header.smartPlacementDescription')}
                        </HoverCardContent>
                    </HoverCard>
                )
            }
        ],
        [t, operatingHours, timeStep, isTime24Format, isVerticalRestriction, isSmartPlacement]
    )
    return (
        <DropdownMenu open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' icon='sm'>
                    <Settings className='!size-[18px] stroke-[1.5px]' />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' className='min-w-[280px]'>
                {menuSettings.map(
                    ({ items, icon: Icon, label, isChecked, onCheckedChange, onSelect, checked }, idx) => {
                        return !!items.length ? (
                            <DropdownMenuSub key={idx}>
                                <DropdownMenuSubTrigger className='gap-2'>
                                    {Icon && (
                                        <span className='flex size-6 min-w-6 items-center justify-center'>
                                            <Icon className='size-[18px] stroke-[1.75px]' />
                                        </span>
                                    )}
                                    <span className='w-full text-p-sm text-text'>{label}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className='ml-1.5 min-w-[200px]'>
                                    {items.map(time =>
                                        renderSubMenuItem(
                                            time,
                                            Icon,
                                            t('schedule.header.operatingHours.durations', { hours: time }),
                                            operatingHours === time,
                                            () => onSelect?.(time)
                                        )
                                    )}
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        ) : (
                            <DropdownMenuItem key={idx} onSelect={e => onSelect?.() ?? e.preventDefault()}>
                                {Icon && (
                                    <span className='flex size-6 min-w-6 items-center justify-center'>
                                        <Icon className='size-[18px] stroke-[1.75px]' />
                                    </span>
                                )}

                                <span className='w-full text-p-sm text-text'>{label}</span>
                                {!checked && onCheckedChange && (
                                    <Switch checked={isChecked} onCheckedChange={onCheckedChange} />
                                )}
                                {checked}
                            </DropdownMenuItem>
                        )
                    }
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
})
