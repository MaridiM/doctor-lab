'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useClickAway } from 'react-use'

import { Appointment, PATIENTS, User } from '@/shared/api'

import { ScrollArea, SearchInput } from '@/shared/components'
import { TSearch, searchSchema } from '@/shared/schemas'
import { cn } from '@/shared/utils'

import { PatientCard } from './PatientCard'
import { PatientsHeader } from './PatientsHeader'

export function Patients() {
    const t = useTranslations('dashboard')

    const [patients, setPatients] = useState<User[]>([])
    const [selectedPatient, setSelectedPatient] = useState<User | null>(null)

    const patientCardRef = useRef(null)
    useClickAway(patientCardRef, () => setSelectedPatient(null))

    useEffect(() => {
        const foundPatients: any[] = PATIENTS.filter(patient => {
            const appointments: Appointment[] = patient.medicalRecord.appointments.filter(appointment => {
                return format('2025-03-02T11:00:00.000Z', 'dd-MM-yyyy') === format(appointment.date, 'dd-MM-yyyy')
            })
            return appointments
        })

        setPatients(foundPatients)
    }, [])

    const form = useForm<TSearch>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchTerm: ''
        }
    })

    const { isDirty } = form.formState

    return (
        <section className='h-full w-full overflow-hidden rounded-lg bg-background border-20'>
            <PatientsHeader />
            <SearchInput form={form} isDirty={isDirty} placeholder={t('patients.search')} />

            <ScrollArea className='flex h-full max-h-[calc(100vh-442px)] w-full' type='auto'>
                <ul className='flex flex-col gap-1 p-2'>
                    {!!patients.length &&
                        patients.map((patient: any) => {
                            // const isSelect = selectedPatient?.id === patient.id
                            return (
                                <PatientCard
                                    ref={patientCardRef}
                                    key={patient.id}
                                    patient={patient}
                                    setSelectedPatient={() => setSelectedPatient(patient)}
                                    // className={cn({
                                    //     'border-sm-primary hover:border-sm-primary': isSelect
                                    // })}
                                />
                            )
                        })}
                </ul>
            </ScrollArea>
        </section>
    )
}
