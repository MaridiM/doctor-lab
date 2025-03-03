import { useDraggable } from '@dnd-kit/core'
import { useMemo } from 'react'

import { Appointment, User } from '@/entities/api'

import { Badge, UserAvatar } from '@/shared/components'

interface IProps {
    appointment: Appointment
    patient: User
    slotHeight: number
}

export function DraggableAppointment({ appointment, patient, slotHeight }: IProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: appointment.id,
        data: { appointment, patient }
    })

    const { top, height } = useMemo(() => {
        const startMinutes = appointment.startHour * 60 + appointment.startMinute
        const endMinutes = startMinutes + appointment.service.duration
        return {
            top: (startMinutes / 15) * (slotHeight / 4),
            height: ((endMinutes - startMinutes) / 15) * (slotHeight / 4)
        }
    }, [appointment, slotHeight])

    return (
        <div
            ref={setNodeRef}
            className='absolute left-2 right-2 z-10 cursor-grab rounded-lg bg-card shadow-sm border'
            style={{
                top: top + slotHeight / 2,
                height,
                transform: transform ? `translateY(${transform.y}px)` : undefined
            }}
            {...listeners}
            {...attributes}
        >
            <div className='flex h-full flex-col p-2'>
                <div className='flex items-center gap-2'>
                    <UserAvatar
                        src={patient.personalInfo.avatar}
                        fullName={patient.personalInfo.fullName}
                        className='size-6'
                    />
                    <span className='truncate text-sm font-medium'>{patient.personalInfo.fullName}</span>
                    <Badge
                        className='ml-auto'
                        style={{
                            backgroundColor: appointment.status.backgroundColor,
                            color: appointment.status.textColor
                        }}
                    >
                        {appointment.status.name}
                    </Badge>
                </div>
                <div className='mt-1 truncate text-sm'>
                    {appointment.service.name} ({appointment.service.duration}min)
                </div>
            </div>
        </div>
    )
}
