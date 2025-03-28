import { useTranslations } from 'next-intl'

import { APPOINTMENT_STATUSES } from '@/entities/api'
import { Appointment } from '@/entities/api/mock/patients.mock'
import { StatusBadge } from '@/entities/api/ui'

import { Badge } from '@/shared/components'

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
