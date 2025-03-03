'use client'

import { DndContext, type DragEndEvent, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { format } from 'date-fns'
import {
    BellRing,
    CalendarClock,
    CalendarPlus2,
    CalendarX2,
    Check,
    Clock3,
    Clock4,
    Clock6,
    Clock8,
    Clock12,
    EllipsisVertical,
    FilePenLine,
    IdCard,
    ListTodo,
    Settings,
    SquarePlus
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { APPOINTMENT_STATUSES, Appointment, IAppointmentStatus, PATIENTS, User } from '@/entities/api'

import {
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    ScrollArea,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
    UserAvatar
} from '@/shared/components'
import { PATHS } from '@/shared/config'
import { cn } from '@/shared/utils'

import { AppointmentOverlay } from './AppointmentOverlay'
import { DraggableAppointment } from './DraggableAppointment'
import { DroppableSlot } from './DroppableSlot'

interface DraggableData {
    appointment: Appointment
    patient: User
}

const MAX_SLOT_HEIGHT = 192
const DEFAULT_OPERATING_HOURS = 8
const DEFAULT_OPERATING_HOURS_START = 8
const DEFAULT_TIME_STEP = 15

export function Schedule() {
    const t = useTranslations('dashboard')

    const [isOpenAppointmentSettings, setIsOpenAppointmentSettings] = useState(false)
    const [isOpenStatusMenu, setIsOpenStatusMenu] = useState(false)
    const [appointmentStatus, setAppointmentStatus] = useState<IAppointmentStatus | null>(null)

    //  Base configuration for schedule
    // ----------------------------------------------------------------------------------------------
    const [activeAppointment, setActiveAppointment] = useState<DraggableData | null>(null)

    const handleDragStart = ({ active }: any) => {
        const patient = patients.find(p => p.medicalRecord.appointments.some(a => a.id === active.id))
        if (!patient) return

        const appointment = patient.medicalRecord.appointments.find(a => a.id === active.id)!
        setActiveAppointment({ appointment, patient })
    }

    const handleDragEnd = ({ over }: DragEndEvent) => {
        if (!over || !activeAppointment) return

        const slotIndex = Number(over.id)
        const startHour24 = getStartHour24()
        const totalMinutes = (startHour24 - 1) * 60 + slotIndex * timeStep

        const newAppointment = {
            ...activeAppointment.appointment,
            startHour: Math.floor(totalMinutes / 60) % 24,
            startMinute: totalMinutes % 60
        }

        setPatients(prev =>
            prev.map(patient =>
                patient.id === activeAppointment.patient.id
                    ? {
                          ...patient,
                          medicalRecord: {
                              ...patient.medicalRecord,
                              appointments: patient.medicalRecord.appointments.map(a =>
                                  a.id === newAppointment.id ? newAppointment : a
                              )
                          }
                      }
                    : patient
            )
        )
        setActiveAppointment(null)
    }
    // ----------------------------------------------------------------------------------------------

    //  Base configuration for schedule
    // ----------------------------------------------------------------------------------------------
    const [isOpenScheduleSettings, setIsOpenScheduleSettings] = useState(false)
    const [operatingHours, setOperatingHours] = useState<6 | 8 | 12 | 16 | 24>(DEFAULT_OPERATING_HOURS)
    const [operatingHoursStart, setOperatingHoursStart] = useState<number>(DEFAULT_OPERATING_HOURS_START)
    const [operatingHoursMeridiemStart, setOperatingHoursMeridiemStart] = useState<'AM' | 'PM'>('AM')
    const [timeStep, setTimeStep] = useState<15 | 20 | 30 | 60>(DEFAULT_TIME_STEP)
    const [isTime24Format, setIsTime24Format] = useState<boolean>(true)

    const stepsPerHour = useMemo(() => 60 / timeStep, [timeStep])
    const slotHeight = useMemo(() => MAX_SLOT_HEIGHT / stepsPerHour, [stepsPerHour])

    useEffect(() => {
        setOperatingHoursStart(operatingHours === 24 ? 0 : 8)
    }, [operatingHours])

    function calculateTime(idx: number) {
        const startHour = getStartHour24()

        const baseHour = startHour - 1
        const hour = baseHour + Math.floor(idx / stepsPerHour)
        const adjustedHour = (hour + 24) % 24
        const minute = (idx % stepsPerHour) * timeStep

        return { adjustedHour, minute }
    }

    function getStartHour24() {
        if (isTime24Format) return operatingHoursStart
        if (operatingHoursMeridiemStart === 'AM') {
            return operatingHoursStart === 12 ? 0 : operatingHoursStart
        } else {
            return operatingHoursStart === 12 ? 12 : operatingHoursStart + 12
        }
    }

    const calculateTimePosition = (time: number) => {
        const startHour24 = getStartHour24()
        const baseMinutes = (startHour24 - 1) * 60
        const appointmentMinutes = time
        const offsetMinutes = appointmentMinutes - baseMinutes
        return (offsetMinutes / timeStep) * slotHeight
    }

    function generateHours() {
        return Array.from({ length: isTime24Format ? 24 : 12 }, (_, i) => {
            const value = isTime24Format ? i : i % 12 || 12
            return {
                value: value,
                label: `${value}:00`
            }
        })
    }

    const operatingHoursIcon = {
        6: <Clock6 />,
        8: <Clock8 />,
        12: <Clock12 />,
        16: <Clock4 />,
        24: <Clock12 />
    }
    const stepTimeIcon = {
        15: <Clock3 />,
        20: <Clock4 />,
        30: <Clock6 />,
        60: <Clock12 />
    }

    const SLOT_COUNT = Array((operatingHours + 2) * stepsPerHour + 1).fill(null)

    // ----------------------------------------------------------------------------------------------

    //  Base configuration for schedule
    // ----------------------------------------------------------------------------------------------
    const [patients, setPatients] = useState<User[]>([])

    const calculateAppointmentPosition = (appointment: Appointment) => {
        const startMinutes = appointment.startHour * 60 + appointment.startMinute
        const duration = appointment.service.duration

        const top = calculateTimePosition(startMinutes)
        const height = calculateTimePosition(startMinutes + duration) - top

        return { top, height }
    }
    function handleAddSlot() {
        console.log('Add Slot')
    }
    function handleAddAppointment() {
        console.log('Add new Appointment')
    }

    useEffect(() => {
        const today = format(new Date(), 'yyyy-MM-dd')
        const foundPatients: any[] = PATIENTS.filter(patient => {
            const appointments = patient.medicalRecord.appointments.filter(_ => {
                return format('2025-03-02T11:00:00.000Z', 'dd-MM-yyyy') === today
            })
            return appointments
        })

        setPatients(foundPatients)
    }, [])

    // ----------------------------------------------------------------------------------------------

    return (
        <section className='w-full overflow-hidden rounded-lg bg-card border-20'>
            <header className='flex h-14 items-center justify-between px-4 py-2 border-b-20'>
                <div className='flex items-center gap-2'>
                    <span className='rounded-md bg-primary p-1.5'>
                        <ListTodo className='size-5 stroke-text-foreground' />
                    </span>
                    <span className='text-h4 font-normal text-text'>{t('schedule.title')}</span>
                </div>

                <div className='flex items-center gap-2'>
                    <Button variant='outline' size='sm' className='pt-px'>
                        <Link href={PATHS.appointments}>{t('schedule.header.all')}</Link>
                    </Button>

                    <Button
                        size='icon'
                        icon='sm'
                        variant='primary'
                        tooltip={{
                            children: t('schedule.header.addNewAppointment'),
                            align: 'center',
                            side: 'bottom'
                        }}
                        onClick={handleAddAppointment}
                    >
                        <CalendarPlus2 className='stroke-text-foreground' />
                    </Button>

                    <DropdownMenu
                        open={isOpenScheduleSettings}
                        onOpenChange={() => setIsOpenScheduleSettings(!isOpenScheduleSettings)}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' size='icon' icon='sm'>
                                <Settings className='stroke-[1.5px]' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='min-w-[280px]'>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <CalendarClock />
                                <span className='w-full text-p-sm text-text'>
                                    {t(`schedule.header.timeFormat.${isTime24Format ? '24' : '12'}`)}
                                </span>
                                <Switch
                                    className='border-25'
                                    checked={isTime24Format}
                                    onCheckedChange={() => setIsTime24Format(!isTime24Format)}
                                />
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className='gap-2'>
                                    {operatingHoursIcon[operatingHours]}
                                    <span className='w-full text-p-sm text-text'>
                                        {t('schedule.header.operatingHours.label')}
                                        {t(`schedule.header.operatingHours.durations.${operatingHours}`)}
                                    </span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className='ml-2.5 min-w-[200px]'>
                                    <DropdownMenuItem className='flex flex-col' onSelect={e => e.preventDefault()}>
                                        <span className='w-full text-p-sm font-medium tracking-wider text-text-secondary'>
                                            {t('schedule.header.operatingHours.startLabel')}
                                        </span>
                                        <div className='flex w-full items-center gap-1'>
                                            <Select
                                                onValueChange={value =>
                                                    setOperatingHoursStart(value === 'auto' ? 8 : Number(value))
                                                }
                                            >
                                                <SelectTrigger className='w-full bg-card'>
                                                    <SelectValue
                                                        placeholder={t('schedule.header.operatingHours.auto')}
                                                        className='border-none bg-card'
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <ScrollArea className='max-h-48'>
                                                        <div className='max-h-48'>
                                                            <SelectItem value='auto'>
                                                                {t('schedule.header.operatingHours.auto')}
                                                            </SelectItem>
                                                            {generateHours().map((_, i) => (
                                                                <SelectItem key={i} value={i.toString()}>
                                                                    {`${i}:00`}
                                                                </SelectItem>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>
                                            {!isTime24Format && (
                                                <Select
                                                    onValueChange={(value: 'AM' | 'PM') =>
                                                        setOperatingHoursMeridiemStart(value)
                                                    }
                                                >
                                                    <SelectTrigger className='w-16 bg-card'>
                                                        <SelectValue placeholder='AM' className='border-none bg-card' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {['AM', 'PM'].map(meridiem => (
                                                                <SelectItem key={meridiem} value={meridiem}>
                                                                    {meridiem}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOperatingHours(6)}>
                                        <Clock6 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t(`schedule.header.operatingHours.durations.6`)}
                                        </span>
                                        {operatingHours === 6 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOperatingHours(8)}>
                                        <Clock8 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t(`schedule.header.operatingHours.durations.8`)}
                                        </span>
                                        {operatingHours === 8 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOperatingHours(12)}>
                                        <Clock12 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t(`schedule.header.operatingHours.durations.12`)}
                                        </span>
                                        {operatingHours === 12 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOperatingHours(16)}>
                                        <Clock4 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t(`schedule.header.operatingHours.durations.16`)}
                                        </span>
                                        {operatingHours === 16 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOperatingHours(24)}>
                                        <Clock12 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t(`schedule.header.operatingHours.durations.24`)}
                                        </span>
                                        {operatingHours === 24 && <Check />}
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className='gap-2'>
                                    {stepTimeIcon[timeStep]}
                                    <span>
                                        {t(`schedule.header.stepTime.title`)}
                                        {t(`schedule.header.stepTime.${timeStep}`)}
                                    </span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className='ml-2.5 min-w-[200px]'>
                                    <DropdownMenuItem onClick={() => setTimeStep(15)}>
                                        <Clock3 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.stepTime.15')}
                                        </span>
                                        {timeStep === 15 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeStep(20)}>
                                        <Clock4 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.stepTime.20')}
                                        </span>
                                        {timeStep === 20 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeStep(30)}>
                                        <Clock6 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.stepTime.30')}
                                        </span>
                                        {timeStep === 30 && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeStep(60)}>
                                        <Clock12 />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('schedule.header.stepTime.60')}
                                        </span>
                                        {timeStep === 60 && <Check />}
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <DndContext modifiers={[restrictToVerticalAxis]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <ScrollArea className='flex h-full max-h-[calc(100vh-138px)] w-full bg-background' type='auto'>
                    <div className='flex'>
                        {/* Time Column */}
                        <ul className='gap relative flex w-16 flex-col bg-card border-r-20'>
                            {SLOT_COUNT.map((_, idx) => {
                                const { adjustedHour, minute } = calculateTime(idx)
                                const isMinuteZero = minute === 0
                                const displayHour = isTime24Format ? adjustedHour : adjustedHour % 12 || 12
                                const timeMeridiem = adjustedHour < 12 ? 'AM' : 'PM'

                                return (
                                    <li
                                        key={idx}
                                        className='flex w-full items-center justify-end pr-1'
                                        style={{ height: slotHeight }}
                                    >
                                        <div className={cn('flex h-6 items-start')}>
                                            {isMinuteZero && (
                                                <span className='text-h4 leading-[20px] text-text-secondary'>
                                                    {displayHour}
                                                </span>
                                            )}
                                            <div
                                                className={cn('flex h-full w-4 flex-col items-center', {
                                                    'justify-center': !isMinuteZero
                                                })}
                                            >
                                                <span
                                                    className={cn(
                                                        'flex w-full justify-center !text-label-md leading-[10px] text-text-secondary'
                                                    )}
                                                >
                                                    {minute.toString().padStart(2, '0')}
                                                </span>
                                                {!isTime24Format && isMinuteZero && (
                                                    <span className='flex w-full justify-center !text-label-md uppercase leading-[10px] text-text-secondary'>
                                                        {timeMeridiem}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        {/* Schedule Grid */}
                        <ul className='relative flex w-full flex-col'>
                            {SLOT_COUNT.map((_, idx) => {
                                const { minute } = calculateTime(idx)
                                const isMinuteZero = minute === 0
                                const lastItem = idx === (operatingHours + 2) * stepsPerHour + 1
                                return (
                                    <li
                                        key={idx}
                                        className={cn('flex items-center border-b-20', {
                                            'border-b-none': lastItem,
                                            '!border-dashed': !isMinuteZero
                                        })}
                                        style={{
                                            height: lastItem || idx === 0 ? slotHeight / 2 : slotHeight
                                        }}
                                    ></li>
                                )
                            })}

                            {/* Droppable Areas */}
                            {SLOT_COUNT.map((_, idx) => (
                                <DroppableSlot key={idx} id={idx.toString()} />
                            ))}

                            {/* Appointments */}
                            {patients.map(patient =>
                                patient.medicalRecord.appointments.map(appointment => (
                                    <DraggableAppointment
                                        key={appointment.id}
                                        appointment={appointment}
                                        patient={patient}
                                        slotHeight={slotHeight}
                                    />
                                ))
                            )}
                            {/* {patients.map(patient => {
                                const appointment = patient.medicalRecord.appointments[0]
                                const currentStatus = appointment.status.id === appointmentStatus?.id
                                const { top, height } = calculateAppointmentPosition(appointment)

                                return (
                                    <div
                                        key={appointment.id}
                                        className='absolute left-0 right-0 cursor-grab rounded-md pb-[2px] pl-px pr-1 pt-px'
                                        style={{
                                            top: slotHeight / 2 + top,
                                            height: '100%',
                                            minHeight: 48,
                                            maxHeight: height
                                        }}
                                        draggable
                                    >
                                        <div
                                            className='flex h-full w-full flex-col gap-1 overflow-hidden rounded-md bg-card shadow border hover:border-40'
                                            style={{
                                                borderColor: currentStatus
                                                    ? appointmentStatus?.backgroundColor
                                                    : appointment.status.backgroundColor,
                                                borderLeftWidth: 4
                                            }}
                                        >
                                            <div className='flex w-full gap-2 pb-1 border-b-20'>
                                                {height >= 48 && (
                                                    <UserAvatar
                                                        className={cn('size-16', { 'size-[45px]': height === 48 })}
                                                        radius={cn('rounded-none rounded-br-md border-br-20', {
                                                            'border-b-none rounded-none': height === 48
                                                        })}
                                                        src={patient.personalInfo.avatar}
                                                        fullName={patient.personalInfo.fullName}
                                                    />
                                                )}
                                                <div className='flex h-full flex-1 gap-1'>
                                                    <div
                                                        className={cn('flex flex-1 flex-col gap-1', {
                                                            'gap-0': height === 48
                                                        })}
                                                    >
                                                        <div className='flex w-full items-center gap-1'>
                                                            <span
                                                                className={cn(
                                                                    'w-full text-h5 font-medium tracking-wider text-text',
                                                                    {
                                                                        'leading-5': height === 48
                                                                    }
                                                                )}
                                                            >
                                                                {patient.personalInfo.fullName}
                                                            </span>

                                                            <DropdownMenu
                                                                open={isOpenStatusMenu}
                                                                onOpenChange={() =>
                                                                    setIsOpenStatusMenu(!isOpenStatusMenu)
                                                                }
                                                            >
                                                                <DropdownMenuTrigger asChild>
                                                                    <Badge
                                                                        variant='outline'
                                                                        className='min-w-fit cursor-pointer rounded-md !text-label-md font-normal tracking-wider'
                                                                        style={{
                                                                            backgroundColor: currentStatus
                                                                                ? appointmentStatus?.backgroundColor
                                                                                : appointment.status.backgroundColor,
                                                                            color: currentStatus
                                                                                ? appointmentStatus?.textColor
                                                                                : appointment.status.textColor
                                                                        }}
                                                                    >
                                                                        {t(
                                                                            `status.labels.${currentStatus ? appointmentStatus?.key : appointment.status.key}`
                                                                        )}
                                                                    </Badge>
                                                                </DropdownMenuTrigger>

                                                                <DropdownMenuContent
                                                                    align='end'
                                                                    className='min-w-[280px]'
                                                                >
                                                                    <DropdownMenuItem>
                                                                        <SquarePlus />
                                                                        <span className='w-full text-p-sm text-text'>
                                                                            {t('status.labels.CUSTOM')}
                                                                        </span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    {APPOINTMENT_STATUSES.map(status => {
                                                                        return (
                                                                            <DropdownMenuItem
                                                                                key={status.id}
                                                                                onClick={() =>
                                                                                    setAppointmentStatus(status)
                                                                                }
                                                                            >
                                                                                <span
                                                                                    className='size-4'
                                                                                    style={{
                                                                                        backgroundColor:
                                                                                            status.backgroundColor,
                                                                                        color: status.textColor
                                                                                    }}
                                                                                />
                                                                                <span className='w-full text-p-sm text-text'>
                                                                                    {t(`status.labels.${status.key}`)}
                                                                                </span>
                                                                            </DropdownMenuItem>
                                                                        )
                                                                    })}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>

                                                            <DropdownMenu
                                                                open={isOpenAppointmentSettings}
                                                                onOpenChange={() =>
                                                                    setIsOpenAppointmentSettings(
                                                                        !isOpenAppointmentSettings
                                                                    )
                                                                }
                                                            >
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button
                                                                        variant='outline'
                                                                        size='icon'
                                                                        icon='xs'
                                                                        className='min-h-6 min-w-6'
                                                                    >
                                                                        <EllipsisVertical className='stroke-[2px]' />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent
                                                                    align='end'
                                                                    className='min-w-[280px]'
                                                                >
                                                                    <DropdownMenuItem>
                                                                        <IdCard />
                                                                        <span className='w-full text-p-sm text-text'>
                                                                            {t('schedule.actions.chart')}
                                                                        </span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <BellRing />
                                                                        <span className='w-full text-p-sm text-text'>
                                                                            {t('schedule.actions.notify')}
                                                                        </span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <FilePenLine />
                                                                        <span className='w-full text-p-sm text-text'>
                                                                            {t('schedule.actions.edit')}
                                                                        </span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <CalendarClock />
                                                                        <span className='w-full text-p-sm text-text'>
                                                                            {t('schedule.actions.reschedule')}
                                                                        </span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <CalendarX2 />
                                                                        <span className='w-full text-p-sm text-text'>
                                                                            {t('schedule.actions.cancel')}
                                                                        </span>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                        <div className='flex w-full gap-1 pr-2'>
                                                            <p
                                                                className={cn(
                                                                    'line-clamp-2 w-full !text-p-sm !leading-4 text-text-secondary',
                                                                    { 'line-clamp-1': height === 48 }
                                                                )}
                                                            >
                                                                <span
                                                                    className={cn(
                                                                        '!text-p-xs font-medium !leading-4 tracking-wider text-text'
                                                                    )}
                                                                >
                                                                    {t('patients.labels.service')}
                                                                </span>{' '}
                                                                {appointment.service.name}
                                                            </p>
                                                            <Badge
                                                                variant='outline'
                                                                className='border-0 min-w-fit cursor-pointer rounded-md p-0 tracking-wider'
                                                            >
                                                                {appointment.service.duration}{' '}
                                                                {t(`patients.labels.time.minutes`)}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {height > 48 && (
                                                <div className='w-full px-1 pb-1'>
                                                    <span
                                                        className={cn(
                                                            'line-clamp-2 !text-p-xs font-normal text-text-secondary',
                                                            { 'line-clamp-1': height <= 96 }
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                '!text-p-xs font-medium tracking-wider text-text'
                                                            )}
                                                        >
                                                            {t('patients.labels.notes')}
                                                        </span>{' '}
                                                        {appointment.notes}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })} */}
                        </ul>
                    </div>
                    <DragOverlay>
                        {activeAppointment && (
                            <AppointmentOverlay
                                appointment={activeAppointment.appointment}
                                patient={activeAppointment.patient}
                            />
                        )}
                    </DragOverlay>
                    <Button
                        className='group mt-auto h-14 w-full gap-2 rounded-none bg-background border-y-20 hover:bg-hover'
                        onClick={handleAddSlot}
                    >
                        <CalendarClock className='size-5 stroke-text' />
                        <span className='pt-[2px] text-p-md text-text'>{t('schedule.addASlot')}</span>
                    </Button>
                </ScrollArea>
            </DndContext>
        </section>
    )
}
