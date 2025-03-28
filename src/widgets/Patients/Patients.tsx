'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Appointment, PATIENTS, User } from '@/entities/api'

import { ScrollArea, SearchInput } from '@/shared/components'
import { TSearch, searchSchema } from '@/shared/schemas'

import { PatientCard } from './PatientCard'
import { PatientsHeader } from './PatientsHeader'

export function Patients() {
    const t = useTranslations('dashboard')

    const [patients, setPatients] = useState<User[]>([])

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
        <section className='flex h-full w-full flex-col gap-2'>
            <section className='flex h-full max-h-[240px] w-full gap-2'>
                <div className='w-full rounded-lg bg-card p-4 border-20'>Widgets 1</div>
            </section>
            <section className='h-full w-full overflow-hidden rounded-lg bg-background border-20'>
                <PatientsHeader />
                <SearchInput form={form} isDirty={isDirty} placeholder={t('patients.search')} />

                <ScrollArea className='flex h-full max-h-[calc(100vh-442px)] w-full' type='auto'>
                    <ul className='flex flex-col gap-1 p-2'>
                        {patients.map((patient: any) => {
                            return <PatientCard key={patient.id} patient={patient} />
                        })}
                    </ul>
                </ScrollArea>
            </section>
        </section>
    )
}
