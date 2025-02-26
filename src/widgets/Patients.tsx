'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
    BellRing,
    CalendarClock,
    CalendarX2,
    EllipsisVertical,
    IdCard,
    MessagesSquare,
    Phone,
    UserPlus2,
    Users2
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PATIENTS } from '@/entities/api'

import {
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    ScrollArea,
    SearchInput,
    UserAvatar
} from '@/shared/components'
import { PATHS } from '@/shared/config'
import { TSearch, searchSchema } from '@/shared/schemas'
import { cn, printTimeWithDuration } from '@/shared/utils'

export function Patients() {
    const t = useTranslations('dashboard')
    const [isOpenPatientSettings, setIsOpenPaitentSettings] = useState(false)
    const [isTime24Format, setIsTime24Format] = useState<boolean>(true)
    const [patients, setPatients] = useState<any>([])

    useEffect(() => {
        const foundPatients: any[] = PATIENTS.filter(patient => {
            const appointments = patient.patientMedicalRecord.appointments.filter(appointment => {
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
                <div className='w-full rounded-lg bg-card p-4 border-20'>Widgets 2</div>
            </section>
            <section className='h-full w-full overflow-hidden rounded-lg bg-background border-20'>
                <header className='flex h-14 items-center justify-between bg-card px-4 py-2 border-b-20'>
                    <div className='flex items-center gap-2'>
                        <span className='rounded-md bg-primary p-1.5'>
                            <Users2 className='size-5 stroke-text-foreground' />
                        </span>
                        <span className='text-h4 font-normal text-text'>Patients</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Button variant='outline' size='sm' className='pt-px'>
                            <Link href={PATHS.patients}>{t('tasks.header.all')}</Link>
                        </Button>

                        <Button
                            size='icon'
                            icon='sm'
                            variant='primary'
                            tooltip={{
                                children: 'Add new patient',
                                align: 'center',
                                side: 'bottom'
                            }}
                            onClick={() => console.log('Add patient')}
                        >
                            <UserPlus2 className='stroke-text-foreground' />
                        </Button>
                    </div>
                </header>
                <SearchInput form={form} isDirty={isDirty} placeholder='Search patient' />
                <ScrollArea className='flex h-full max-h-[calc(100vh-442px)] w-full' type='auto'>
                    <ul className='flex flex-col gap-1 p-2'>
                        {patients.map((patient: any) => {
                            const statusColorStyle: Record<string, string> = {
                                SCHEDULED: '!border-50-primary bg-primary-50 text-primary',
                                COMPLETED: '!border-50-secondary bg-secondary-50 text-secondary',
                                CANCELLED: '!border-50-negative bg-negative-50 text-negative',
                                RESCHEDULED: '!border-50-ettention bg-ettention-50 text-ettention',
                                NO_SHOW: '!border-50-gray bg-gray-50 text-text-secondary'
                            }

                            return (
                                <li
                                    key={patient.id}
                                    className='min-h-[96px] w-full rounded-md bg-card border-20 hover:border-40'
                                >
                                    <header className='flex h-7 items-center justify-between px-2 border-b-20'>
                                        <div className='flex items-center gap-2'>
                                            <IdCard className='size-5 stroke-text-secondary stroke-[2px]' />
                                            <span className='pt-[2px] text-p-sm font-medium text-text'>
                                                {patient.patientMedicalRecord.appointments[0].clinic.name}
                                            </span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Button
                                                size='icon'
                                                icon='xs'
                                                variant='outline'
                                                tooltip={{
                                                    children: 'Call to patient',
                                                    align: 'center',
                                                    side: 'bottom'
                                                }}
                                                onClick={() => console.log('Call to patient')}
                                            >
                                                <Phone className='stroke-text stroke-[2px]' />
                                            </Button>
                                            <Button
                                                size='icon'
                                                icon='xs'
                                                variant='outline'
                                                tooltip={{
                                                    children: 'Add new appointment',
                                                    align: 'center',
                                                    side: 'bottom'
                                                }}
                                                onClick={() => console.log('Add appointment')}
                                            >
                                                <MessagesSquare className='stroke-text stroke-[2px]' />
                                            </Button>
                                            <DropdownMenu
                                                open={isOpenPatientSettings}
                                                onOpenChange={() => setIsOpenPaitentSettings(!isOpenPatientSettings)}
                                            >
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant='outline' size='icon' icon='xs'>
                                                        <EllipsisVertical className='stroke-[2px]' />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align='end' className='min-w-[280px]'>
                                                    <DropdownMenuItem>
                                                        <BellRing />
                                                        <span className='w-full text-p-sm text-text'>
                                                            Notify patient of appointment
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <CalendarClock />
                                                        <span className='w-full text-p-sm text-text'>
                                                            Reschedule appointment
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <CalendarX2 />
                                                        <span className='w-full text-p-sm text-text'>
                                                            Cancel appointment
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <IdCard />
                                                        <span className='w-full text-p-sm text-text'>
                                                            Patient chart
                                                        </span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </header>
                                    <div className='flex gap-2 px-2 py-1'>
                                        <UserAvatar
                                            className='size-16 border-20'
                                            radius='rounded-md'
                                            src={patient.patientMedicalRecord.avatar}
                                            fullName='Robert Traram'
                                        />
                                        <div className='flex w-full flex-col gap-[2px]'>
                                            <h4 className='text-p-lg font-medium text-text'>
                                                {patient.patientMedicalRecord.fullName}
                                            </h4>
                                            <span className='line-clamp-2 text-p-sm text-text-secondary'>
                                                {patient.patientMedicalRecord.appointments[0].service.name}
                                            </span>
                                        </div>
                                        <div className='flex flex-col items-end justify-between py-1'>
                                            <div className='flex w-full max-w-[120px] items-center gap-2'>
                                                <div className='flex items-start'>
                                                    <span className='text-h3 font-medium leading-[24px] text-text'>
                                                        {format(
                                                            patient.patientMedicalRecord.appointments[0].time,
                                                            isTime24Format ? 'HH' : 'hh'
                                                        )}
                                                    </span>
                                                    <div className='flex flex-col items-center text-text'>
                                                        <span className='text-label-lg font-medium leading-3 text-text'>
                                                            {format(
                                                                patient.patientMedicalRecord.appointments[0].time,
                                                                'mm'
                                                            )}
                                                        </span>
                                                        {!isTime24Format && (
                                                            <span className='text-label-lg font-medium leading-3 text-text'>
                                                                AM
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className='h-[2px] w-3 bg-text-secondary' />
                                                <div className='flex items-start'>
                                                    <span className='text-h3 font-medium leading-[24px] text-text'>
                                                        {format(
                                                            printTimeWithDuration(
                                                                patient.patientMedicalRecord.appointments[0].time,
                                                                patient.patientMedicalRecord.appointments[0].service
                                                                    .duration
                                                            ),
                                                            isTime24Format ? 'HH' : 'hh'
                                                        )}
                                                    </span>
                                                    <div className='flex flex-col items-center text-text'>
                                                        <span className='text-label-lg font-medium leading-3 text-text'>
                                                            {format(
                                                                printTimeWithDuration(
                                                                    patient.patientMedicalRecord.appointments[0].time,
                                                                    patient.patientMedicalRecord.appointments[0].service
                                                                        .duration
                                                                ),
                                                                'mm'
                                                            )}
                                                        </span>
                                                        {!isTime24Format && (
                                                            <span className='text-label-lg font-medium leading-3 text-text'>
                                                                AM
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge
                                                variant='outline'
                                                className={cn(
                                                    'rounded-md tracking-wider',
                                                    statusColorStyle[
                                                        patient.patientMedicalRecord.appointments[0].status.key
                                                    ]
                                                )}
                                            >
                                                {patient.patientMedicalRecord.appointments[0].status.name}
                                            </Badge>
                                        </div>
                                    </div>
                                    <footer className='flex h-7 items-center justify-between gap-1 px-2 border-t-20'>
                                        <div className='flex h-full items-center gap-1'>
                                            <span className='text-p-sm text-text-tertiary'>Doctora:</span>
                                            <span className='text-p-sm font-medium text-text-secondary'>
                                                {patient.patientMedicalRecord.appointments[0].doctors[0].name}
                                            </span>
                                        </div>
                                        <span className='text-label-lg font-medium tracking-wider text-text-tertiary'>
                                            {patient.patientMedicalRecord.appointments[0].doctors[0].specialties.name}
                                        </span>
                                    </footer>
                                </li>
                            )
                        })}
                    </ul>
                </ScrollArea>
            </section>
        </section>
    )
}
