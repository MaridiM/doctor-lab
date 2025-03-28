'use client'

import { format } from 'date-fns'
import { CalendarPlus2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/shared/components'
import { cn } from '@/shared/utils'

import { ScheduleContextMenu } from './ScheduleContextMenu'

interface IProps {
    slots: unknown[]
    slotHeight: number
    timeStep: number
    stepsPerHour: number
    operatingHours: number
    calculateTime: (idx: number) => {
        adjustedHour: number
        minute: number
    }
}

export function ScheduleGrid({ slots, operatingHours, timeStep, stepsPerHour, slotHeight, calculateTime }: IProps) {
    const t = useTranslations('dashboard')

    const [isSlotHover, setIsSlotHover] = useState<number | null>(null)
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

    return (
        <>
            {slots.map((_, idx) => {
                const { adjustedHour, minute } = calculateTime(idx)
                const startTime = new Date().setHours(adjustedHour, minute - timeStep)

                const isMinuteZero = minute === 0
                const lastItem = idx === (operatingHours + 2) * stepsPerHour + 1
                const validSlot = isSlotHover !== 0 && !lastItem
                const isHover = isSlotHover === idx || selectedSlot === idx

                return (
                    <ScheduleContextMenu key={idx} isOpen={open => setSelectedSlot(open ? idx : null)}>
                        <li
                            className={cn('flex items-center py-0.5 pl-0.5 pr-1.5 border-b-20', {
                                'hover:bg-hover': validSlot,
                                'border-b-none': lastItem,
                                '!border-dashed': !isMinuteZero
                            })}
                            onMouseEnter={() => setIsSlotHover(idx)}
                            onMouseLeave={() => setIsSlotHover(null)}
                            style={{
                                height: lastItem || idx === 0 ? slotHeight / 2 : slotHeight
                            }}
                        >
                            {isHover && validSlot && (
                                <Button className='h-full w-full !border-dashed border-20'>
                                    <span className='flex size-6 min-w-6 items-center justify-center'>
                                        <CalendarPlus2 className='!size-5 stroke-text-tertiary stroke-[1.5px]' />
                                    </span>
                                    <span className='pt-1 text-p-sm font-normal text-text-tertiary'>
                                        {t('schedule.addAppointment', {
                                            time: format(startTime, 'HH:mm')
                                        })}
                                    </span>
                                </Button>
                            )}
                        </li>
                    </ScheduleContextMenu>
                )
            })}
        </>
    )
}
