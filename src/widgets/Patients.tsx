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
    UserPen,
    UserPlus2,
    Users2
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PATIENTS, User } from '@/entities/api'

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
import { cn } from '@/shared/utils'

export function Patients() {
    const t = useTranslations('dashboard')

    const [isOpenPatientSettings, setIsOpenPaitentSettings] = useState(false)
    const [isTime24Format] = useState<boolean>(true)
    const [patients, setPatients] = useState<User[]>([])

    useEffect(() => {
        const foundPatients: any[] = PATIENTS.filter(patient => {
            const appointments = patient.medicalRecord.appointments.filter(appointment => {
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

    function handlerAddPatient() {
        console.log('Add New Patient')
    }

    return (
        <section className='flex h-full w-full flex-col gap-2'>
            <section className='flex h-full max-h-[240px] w-full gap-2'>
                <div className='w-full rounded-lg bg-card p-4 border-20'>Widgets 1</div>
            </section>
            <section className='h-full w-full overflow-hidden rounded-lg bg-background border-20'>
                <header className='flex h-14 items-center justify-between bg-card px-4 py-2 border-b-20'>
                    <div className='flex items-center gap-2'>
                        <span className='rounded-md bg-primary p-1.5'>
                            <Users2 className='size-5 stroke-text-foreground' />
                        </span>
                        <span className='text-h4 font-normal text-text'>{t('patients.title')}</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Button variant='outline' size='sm' className='pt-px'>
                            <Link href={PATHS.patients}>{t('patients.header.all')}</Link>
                        </Button>

                        <Button
                            size='icon'
                            icon='sm'
                            variant='primary'
                            tooltip={{
                                children: t('patients.header.addPatient'),
                                align: 'center',
                                side: 'bottom'
                            }}
                            onClick={handlerAddPatient}
                        >
                            <UserPlus2 className='stroke-text-foreground' />
                        </Button>
                    </div>
                </header>
                <SearchInput form={form} isDirty={isDirty} placeholder={t('patients.search')} />
                <ScrollArea className='flex h-full max-h-[calc(100vh-442px)] w-full' type='auto'>
                    <ul className='flex flex-col gap-1 p-2'>
                        {patients.map((patient: any) => {
                            const appointment = patient.medicalRecord.appointments[0]

                            return (
                                <li
                                    key={patient.id}
                                    className='min-h-[96px] w-full rounded-md bg-card shadow border-20 hover:border-40'
                                >
                                    <header className='flex h-7 items-center justify-between px-2 border-b-20'>
                                        <div className='flex items-center gap-2'>
                                            <IdCard className='size-5 stroke-text-secondary stroke-[2px]' />
                                            <span className='pt-[2px] text-p-sm font-medium text-text'>
                                                {appointment.clinic.name}
                                            </span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Button
                                                size='icon'
                                                icon='xs'
                                                variant='outline'
                                                tooltip={{
                                                    children: t('patients.actions.call'),
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
                                                    children: t('patients.actions.addAppointment'),
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
                                                            {t('patients.actions.notify')}
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <UserPen />
                                                        <span className='w-full text-p-sm text-text'>
                                                            {t('patients.actions.edit')}
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <CalendarClock />
                                                        <span className='w-full text-p-sm text-text'>
                                                            {t('patients.actions.reschedule')}
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <CalendarX2 />
                                                        <span className='w-full text-p-sm text-text'>
                                                            {t('patients.actions.cancel')}
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <IdCard />
                                                        <span className='w-full text-p-sm text-text'>
                                                            {t('patients.actions.chart')}
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
                                            src={patient.personalInfo.avatar}
                                            fullName='Robert Traram'
                                        />
                                        <div className='flex w-full flex-col'>
                                            <div className='flex gap-2'>
                                                <div className='flex w-full flex-col gap-[2px]'>
                                                    <h4 className='text-p-lg font-medium text-text'>
                                                        {patient.personalInfo.fullName}
                                                    </h4>
                                                    <span className='line-clamp-2 text-p-sm text-text-secondary'>
                                                        {appointment.service.name}
                                                    </span>
                                                </div>
                                                <div className='flex w-full items-start justify-end'>
                                                    <div className='flex w-full max-w-[120px] items-center justify-end gap-2 pt-1'>
                                                        <div className='flex items-start'>
                                                            <span className='text-h3 font-medium leading-[24px] text-text'>
                                                                {appointment.startHour}
                                                            </span>
                                                            <div className='flex flex-col items-center text-text'>
                                                                <span className='text-label-lg font-medium leading-3 text-text'>
                                                                    {appointment.startMinute
                                                                        .toString()
                                                                        .padStart(2, '0')}
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
                                                            <span className='text-h3 font-medium leading-[24px] text-text'>
                                                                {appointment.endHour}
                                                            </span>
                                                            <div className='flex flex-col items-center text-text'>
                                                                <span className='text-label-lg font-medium leading-3 text-text'>
                                                                    {appointment.endMinute.toString().padStart(2, '0')}
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
                                            <div className='flex gap-1'>
                                                <div className='flex gap-1 w-full'>
                                                    <Badge
                                                        variant='outline'
                                                        className='min-w-fit cursor-pointer rounded-md tracking-wider'
                                                    >
                                                        {appointment.service.duration}{' '}
                                                        {t(`patients.labels.time.minutes`)}
                                                    </Badge>
                                                    <Badge
                                                        variant='outline'
                                                        className='min-w-fit cursor-pointer rounded-md tracking-wider'
                                                    >
                                                        {appointment.room} {t(`patients.labels.room`)}
                                                    </Badge>
                                                </div>
                                                <Badge
                                                    variant='outline'
                                                    className='min-w-fit cursor-pointer rounded-md tracking-wider'
                                                    style={{
                                                        backgroundColor: appointment.status.backgroundColor,
                                                        color: appointment.status.textColor
                                                    }}
                                                >
                                                    {t(`status.labels.${appointment.status.key}`)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <footer className='flex h-7 items-center justify-between gap-1 px-2 border-t-20'>
                                        <div className='flex h-full items-center gap-1'>
                                            <span className='text-p-sm text-text-tertiary'>
                                                {t('patients.labels.doctor')}
                                            </span>
                                            <span className='text-p-sm font-medium text-text-secondary'>
                                                {appointment.doctors[0].name}
                                            </span>
                                        </div>
                                        <span className='text-p-xs tracking-wider text-text-secondary'>
                                            {appointment.doctors[0].specialties.name}
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
