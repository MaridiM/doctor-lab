import { format } from 'date-fns'

import { Appointment, User } from '@/entities/api'

import { UserAvatar } from '@/shared/components'

interface IProps {
    appointment: Appointment
    patient: User
}

export function AppointmentOverlay({ appointment, patient }: IProps) {
    return (
        <div className='w-full max-w-xs rounded-lg bg-card shadow-lg border'>
            <div className='p-4'>
                <div className='flex items-center gap-3'>
                    <UserAvatar
                        src={patient.personalInfo.avatar}
                        fullName={patient.personalInfo.fullName}
                        className='size-10'
                    />
                    <div>
                        <h3 className='font-medium'>{patient.personalInfo.fullName}</h3>
                        <p className='text-sm text-muted-foreground'>{format(new Date(appointment.date), 'HH:mm')}</p>
                    </div>
                </div>
                <div className='mt-4 space-y-2'>
                    <div className='flex items-center justify-between'>
                        <span className='text-sm text-muted-foreground'>Service:</span>
                        <span className='text-sm font-medium'>{appointment.service.name}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                        <span className='text-sm text-muted-foreground'>Duration:</span>
                        <span className='text-sm font-medium'>{appointment.service.duration}min</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
