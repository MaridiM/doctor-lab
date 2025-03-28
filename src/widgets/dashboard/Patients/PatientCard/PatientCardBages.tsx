import { useTranslations } from 'next-intl'

import { Appointment } from '@/shared/api/mock/patients.mock'

import { Badge } from '@/shared/components'
import { StatusBadge } from '@/entities/StatusBadge'
import { APPOINTMENT_STATUSES } from '@/shared/api'

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
