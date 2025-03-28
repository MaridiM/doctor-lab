'use client'

import { useTranslations } from 'next-intl'
import { RefObject, useState } from 'react'

import { Appointment, User } from '@/entities/api/mock/patients.mock'

import { UserAvatar } from '@/shared/components'
import { cn, parseISOWithDurationNumeric } from '@/shared/utils'

import { PatientCardBages } from './PatientCardBages'
import { PatientCardHeader } from './PatientCardHeader'

interface IProps {
    ref: RefObject<null>
    patient: User
    setSelectedPatient: VoidFunction
    className?: string
}

export function PatientCard({ patient, ref, setSelectedPatient, className }: IProps) {
    const t = useTranslations('dashboard')

    const appointment: Appointment = patient.medicalRecord.appointments[0]
    const { startHour, startMinute, endHour, endMinute } = parseISOWithDurationNumeric(
        appointment.date,
        appointment.service.duration
    )

    const [isTime24Format] = useState<boolean>(true)

    return (
        <li
            key={patient.id}
            ref={ref}
            onClick={setSelectedPatient}
            className={cn('min-h-[96px] w-full rounded-md bg-card shadow border-20 hover:border-40', className)}
        >
            <PatientCardHeader appointment={appointment} />

            <div className='flex gap-2 px-2 py-1'>
                <UserAvatar
                    className='size-16 border-20'
                    radius='rounded-md'
                    src={patient.personalInfo.avatar}
                    fullName={patient.personalInfo.fullName}
                />
                <div className='flex w-full flex-col'>
                    <div className='flex gap-2'>
                        <div className='flex w-full flex-col gap-[2px]'>
                            <h4 className='text-p-lg font-medium text-text'>{patient.personalInfo.fullName}</h4>
                            <span className='line-clamp-2 text-p-sm text-text-secondary'>
                                {appointment.service.name}
                            </span>
                        </div>
                        <div className='flex w-full items-start justify-end'>
                            <div className='flex w-full max-w-[120px] items-center justify-end gap-2 pt-1'>
                                <div className='flex items-start'>
                                    <span className='text-h3 font-medium leading-[24px] text-text'>{startHour}</span>
                                    <div className='flex flex-col items-center text-text'>
                                        <span className='text-label-lg font-medium leading-3 text-text'>
                                            {startMinute.toString().padStart(2, '0')}
                                        </span>
                                        {!isTime24Format && (
                                            <span className='text-label-lg font-medium leading-3 text-text'>
                                                {appointment.startMiridiem}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className='h-[2px] w-3 bg-text-secondary' />
                                <div className='flex items-start'>
                                    <span className='text-h3 font-medium leading-[24px] text-text'>{endHour}</span>
                                    <div className='flex flex-col items-center text-text'>
                                        <span className='text-label-lg font-medium leading-3 text-text'>
                                            {endMinute.toString().padStart(2, '0')}
                                        </span>
                                        {!isTime24Format && (
                                            <span className='text-label-lg font-medium leading-3 text-text'>
                                                {appointment.startMiridiem}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PatientCardBages appointment={appointment} />
                </div>
            </div>

            <footer className='flex h-7 items-center justify-between gap-1 px-2 border-t-20'>
                <div className='flex h-full items-center gap-1'>
                    <span className='text-p-xs font-medium tracking-wider text-text'>
                        {t('patients.labels.doctor')}
                    </span>
                    <span className='text-p-xs text-text-secondary'>{appointment.doctors[0].name}</span>
                </div>
                <span className='text-p-xs font-medium tracking-wider text-text-secondary'>
                    {appointment.doctors[0].specialties.name}
                </span>
            </footer>
        </li>
    )
}
