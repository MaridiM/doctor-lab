'use client'

import { Check, SquarePlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo, useState } from 'react'

import { APPOINTMENT_STATUSES } from '@/entities/api'
import { Appointment, Status } from '@/entities/api/mock/patients.mock'
import { StatusBadge } from '@/entities/api/ui'

import {
    Badge,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/shared/components'

interface IProps {
    appointment: Appointment
}

export function PatientCardBages({ appointment }: IProps) {
    const t = useTranslations('dashboard')

    return (
        <div className='flex gap-1'>
            <div className='flex w-full gap-1'>
                <Badge
                    variant='outline'
                    className='min-w-fit cursor-pointer rounded-md !text-label-md font-normal tracking-wider'
                >
                    {appointment.service.duration} {t(`time.minutes`)}
                </Badge>
                <Badge
                    variant='outline'
                    className='min-w-fit cursor-pointer rounded-md !text-label-md font-normal tracking-wider'
                >
                    {appointment.room} {t(`patients.labels.room`)}
                </Badge>
            </div>

            <StatusBadge
                initialStatus={appointment.status}
                statusList={APPOINTMENT_STATUSES}
                onSelect={status => console.log('Selected Status', status.key)}
            />
        </div>
    )
}
