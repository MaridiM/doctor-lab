'use client'

import {
    DndContext,
    type DragEndEvent,
    DragMoveEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    Translate,
    UniqueIdentifier,
    closestCenter,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { format } from 'date-fns'
import { CalendarClock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Appointment, PATIENTS, User } from '@/entities/api'

import { Button, ScrollArea } from '@/shared/components'
import { adjustTime, cn, parseISOWithDurationNumeric } from '@/shared/utils'

import { AppointmentCard } from './AppointmentCard'
import { DroppableSlot } from './DroppableSlot'
import { ScheduleHeader } from './ScheduleHeader'

export type TOperatingHours = 6 | 8 | 12 | 16 | 24
export type TTimeStep = 15 | 20 | 30 | 60

const MAX_SLOT_HEIGHT = 192
const DEFAULT_START_HOUR = 8
const DEFAULT_OPERATING_HOURS = 8
const DEFAULT_TIME_STEP = 15
const RESTRICT_TO_VERTICAL_AXIS = true

interface DraggableData {
    appointment: Appointment
    patient: User
}

export function Schedule() {
    const t = useTranslations('dashboard')

    //  Schedule
    // ----------------------------------------------------------------------------------------------
    const [operatingHours, setOperatingHours] = useState<TOperatingHours>(DEFAULT_OPERATING_HOURS)
    const [operatingHoursStart, setOperatingHoursStart] = useState<number>(DEFAULT_START_HOUR)
    const [operatingHoursMeridiemStart, setOperatingHoursMeridiemStart] = useState<'AM' | 'PM'>('AM')
    const [timeStep, setTimeStep] = useState<TTimeStep>(DEFAULT_TIME_STEP)
    const [isTime24Format, setIsTime24Format] = useState<boolean>(true)

    const stepsPerHour = useMemo(() => 60 / timeStep, [timeStep])
    const slotHeight = useMemo(() => MAX_SLOT_HEIGHT / stepsPerHour, [stepsPerHour])

    const startHour24 = useMemo(() => {
        if (isTime24Format) return operatingHoursStart

        return operatingHoursMeridiemStart === 'AM'
            ? operatingHoursStart === 12
                ? 0
                : operatingHoursStart
            : operatingHoursStart === 12
              ? 12
              : operatingHoursStart + 12
    }, [isTime24Format, operatingHoursMeridiemStart, operatingHoursStart])

    useEffect(() => {
        setOperatingHoursStart(operatingHours === 24 ? 0 : 8)
    }, [operatingHours])

    const calculateTime = useCallback(
        (idx: number) => {
            const baseHour = startHour24 - 1
            const hour = baseHour + Math.floor(idx / stepsPerHour)
            const adjustedHour = (hour + 24) % 24
            const minute = (idx % stepsPerHour) * timeStep

            return { adjustedHour, minute }
        },
        [startHour24, stepsPerHour, timeStep]
    )

    const SLOT_COUNT = useMemo(
        () => Array((operatingHours + 2) * stepsPerHour + 1).fill(null),
        [operatingHours, stepsPerHour]
    )
    // ----------------------------------------------------------------------------------------------

    //  Appointment Card
    // ----------------------------------------------------------------------------------------------
    const [patients, setPatients] = useState<User[]>([])

    const calculateAppointmentPosition = useCallback(
        (appointment: Appointment) => {
            const baseMinutes = (startHour24 - 1) * 60

            const { startHour, startMinute } = parseISOWithDurationNumeric(
                appointment.date,
                appointment.service.duration
            )

            const appointmentStart = startHour * 60 + startMinute
            const appointmentEnd = appointmentStart + appointment.service.duration

            // Проверка на выход за границы
            const isVisible =
                appointmentStart >= baseMinutes && appointmentEnd <= baseMinutes + (operatingHours + 2) * 60

            const appointmentStartMinutes = startHour * 60 + startMinute
            const offsetMinutes = appointmentStartMinutes - baseMinutes
            return {
                top: isVisible ? ((appointmentStart - baseMinutes) / timeStep) * slotHeight : -1000,
                height: (appointment.service.duration / timeStep) * slotHeight
            }
        },
        [startHour24, operatingHours, timeStep, slotHeight]
    )

    useEffect(() => {
        const foundPatients = PATIENTS.filter(patient =>
            patient.medicalRecord.appointments.some(
                appointment =>
                    format(appointment.date, 'dd-MM-yyyy') === format('2025-03-02T11:00:00.000Z', 'dd-MM-yyyy')
            )
        )
        setPatients(foundPatients)
    }, [])

    // ----------------------------------------------------------------------------------------------

    //  Drag&Drop
    // ----------------------------------------------------------------------------------------------

    const [dragAppointment, setDragAppointment] = useState<DraggableData | null>(null)
    const [isVerticalRestriction, setIsVerticalRestriction] = useState<boolean>(RESTRICT_TO_VERTICAL_AXIS)

    const [currentPosition, setCurrentPosition] = useState<{
        activeId: UniqueIdentifier | null
        translate: Translate | null
    }>({ activeId: null, translate: { x: 0, y: 0 } })

    const mouseSensor = useSensor(MouseSensor)
    const touchSensor = useSensor(TouchSensor)
    const keyboardSensor = useSensor(KeyboardSensor)

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

    function getStartHour24() {
        if (isTime24Format) return operatingHoursStart
        if (operatingHoursMeridiemStart === 'AM') {
            return operatingHoursStart === 12 ? 0 : operatingHoursStart
        } else {
            return operatingHoursStart === 12 ? 12 : operatingHoursStart + 12
        }
    }

    const handleDragMove = useCallback(
        ({ active, delta }: DragMoveEvent) => {
            if (!dragAppointment) return

            requestAnimationFrame(() => {
                const startHour24 = getStartHour24()
                const minMinutes = (startHour24 - 1) * 60
                const maxMinutes = minMinutes + (operatingHours + 2) * 60
                const duration = dragAppointment.appointment.service.duration

                const initialTop = calculateAppointmentPosition(dragAppointment.appointment).top
                const maxAllowedTop = ((maxMinutes - minMinutes - duration) / timeStep) * slotHeight

                const newY = Math.max(0, Math.min(initialTop + delta.y, maxAllowedTop))

                setCurrentPosition({
                    activeId: active.id,
                    translate: { x: 0, y: newY - initialTop }
                })
            })
        },
        [dragAppointment, operatingHours, timeStep, slotHeight]
    )
    const handleDragStart = useCallback(
        ({ active }: DragStartEvent) => {
            const patient = patients.find(p => p.medicalRecord.appointments.some(a => a.id === active.id))
            if (!patient) return
            const appointment = patient.medicalRecord.appointments.find(a => a.id === active.id)
            if (appointment) {
                setDragAppointment({ appointment, patient })
            }
        },
        [patients]
    )

    const handleDragEnd = useCallback(
        ({ over, delta }: DragEndEvent) => {
            if (!dragAppointment || !over) {
                setDragAppointment(null)
                return
            }

            // 1. Get base parameters
            const startHour24 = getStartHour24()
            const endHour24 = startHour24 + operatingHours
            const minMinutes = (startHour24 - 1) * 60
            const maxMinutes = (endHour24 + 1) * 60
            const duration = dragAppointment.appointment.service.duration

            // 2. Calculate new position
            const initialTop = calculateAppointmentPosition(dragAppointment.appointment).top
            const newTop = Math.max(
                0,
                Math.min(initialTop + delta.y, ((maxMinutes - minMinutes - duration) * slotHeight) / timeStep)
            )

            // 3. Calculate new time
            const totalMinutes = (newTop / slotHeight) * timeStep
            const adjustedMinutes = Math.round((minMinutes + totalMinutes) / timeStep) * timeStep

            const newStart = adjustedMinutes
            const newEnd = newStart + duration

            // 4. Check for conflicts with other appointments
            const allOtherAppointments = patients.flatMap(patient =>
                patient.medicalRecord.appointments.filter(a => a.id !== dragAppointment.appointment.id)
            )

            const hasConflict = allOtherAppointments.some(app => {
                const { startHour, startMinute } = parseISOWithDurationNumeric(app.date, 0)
                const appStart = startHour * 60 + startMinute
                const appEnd = appStart + app.service.duration
                return newStart < appEnd && newEnd > appStart
            })

            if (hasConflict) {
                setDragAppointment(null)
                return
            }

            // 5. Update state if no conflicts
            const hours = Math.floor(adjustedMinutes / 60)
            const minutes = adjustedMinutes % 60

            setPatients(prevPatients =>
                prevPatients.map(patient => {
                    const appointmentIndex = patient.medicalRecord.appointments.findIndex(
                        a => a.id === dragAppointment.appointment.id
                    )

                    if (appointmentIndex === -1) return patient

                    const updatedAppointment = {
                        ...dragAppointment.appointment,
                        date: adjustTime(dragAppointment.appointment.date, hours, minutes)
                    }

                    return {
                        ...patient,
                        medicalRecord: {
                            ...patient.medicalRecord,
                            appointments: [
                                ...patient.medicalRecord.appointments.slice(0, appointmentIndex),
                                updatedAppointment,
                                ...patient.medicalRecord.appointments.slice(appointmentIndex + 1)
                            ]
                        }
                    }
                })
            )

            setDragAppointment(null)
            requestAnimationFrame(() => {
                setCurrentPosition({ activeId: null, translate: null })
            })
        },
        [dragAppointment, slotHeight, timeStep, operatingHours, patients, calculateAppointmentPosition, getStartHour24]
    )

    return (
        <section className='w-full overflow-hidden rounded-lg bg-card border-20'>
            <DndContext
                modifiers={isVerticalRestriction ? [restrictToVerticalAxis] : []}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <ScheduleHeader
                    isTime24Format={isTime24Format}
                    setIsTime24Format={() => setIsTime24Format(!isTime24Format)}
                    isVerticalRestriction={isVerticalRestriction}
                    setIsVerticalRestriction={() => setIsVerticalRestriction(!isVerticalRestriction)}
                    operatingHours={operatingHours}
                    setOperatingHours={setOperatingHours}
                    timeStep={timeStep}
                    setTimeStep={setTimeStep}
                />

                <ScrollArea className='flex h-full max-h-[calc(100vh-138px)] w-full bg-background' type='auto'>
                    <div className='flex overflow-hidden'>
                        {/* Левая колонка с временной шкалой */}
                        <ul className='gap relative flex w-16 flex-col overflow-hidden bg-card border-r-20'>
                            {SLOT_COUNT.map((_, idx) => {
                                const { adjustedHour, minute } = calculateTime(idx)
                                const isMinuteZero = minute === 0
                                const displayHour = isTime24Format ? adjustedHour : adjustedHour % 12 || 0
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
                        {/* Правая колонка (сетка расписания) */}
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
                                    />
                                )
                            })}

                            {dragAppointment && (
                                <DroppableSlot
                                    key='active-slot'
                                    id='active-slot'
                                    top={calculateAppointmentPosition(dragAppointment.appointment).top + slotHeight / 2}
                                    height={calculateAppointmentPosition(dragAppointment.appointment).height}
                                    translate={currentPosition}
                                    isVerticalRestriction={isVerticalRestriction}
                                />
                            )}

                            {/* Рендерим плашки событий */}
                            {patients.map(patient => {
                                const appointment = patient.medicalRecord.appointments[0]
                                const { top, height } = calculateAppointmentPosition(appointment)
                                const isDragged = dragAppointment?.appointment.id === appointment.id

                                return (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        top={slotHeight / 2 + top}
                                        height={height}
                                        timeStep={timeStep}
                                        slotHeight={slotHeight}
                                        patient={patient}
                                        className={isDragged ? 'opacity-0' : ''}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                    <DragOverlay
                        zIndex={1000}
                        dropAnimation={{ duration: 150, easing: 'ease-out' }}
                        modifiers={isVerticalRestriction ? [restrictToParentElement] : []}
                    >
                        {dragAppointment && (
                            <AppointmentCard
                                appointment={dragAppointment.appointment}
                                top={0}
                                height={calculateAppointmentPosition(dragAppointment.appointment).height}
                                timeStep={timeStep}
                                slotHeight={slotHeight}
                                patient={dragAppointment.patient}
                                className='cursor-grabbing transition-transform'
                            />
                        )}
                    </DragOverlay>
                    <Button
                        className='group mt-auto h-14 w-full gap-2 rounded-none bg-background border-y-20 hover:bg-hover'
                        onClick={() => console.log('Add Slot')}
                    >
                        <CalendarClock className='size-5 stroke-text' />
                        <span className='pt-[2px] text-p-md text-text'>{t('schedule.addASlot')}</span>
                    </Button>
                </ScrollArea>
            </DndContext>
        </section>
    )
}
