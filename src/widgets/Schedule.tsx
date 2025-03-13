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
    closestCenter,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { format } from 'date-fns'
import { CalendarClock, CalendarPlus2 } from 'lucide-react'
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
const SMART_PLACEMENT = true

interface DraggableData {
    appointment: Appointment
    patient: User
}

export function Schedule() {
    const t = useTranslations('dashboard')

    const [isSlotHover, setIsSlotHover] = useState<number | null>(null)

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

    const [currentPosition, setCurrentPosition] = useState<Translate>({ x: 0, y: 0 })
    const [currentTime, setCurrentTime] = useState<string>('')

    const [isSmartPlacement, setIsSmartPlacement] = useState(SMART_PLACEMENT)
    const [hasConflict, setHasConflict] = useState(false)

    const mouseSensor = useSensor(MouseSensor)
    const keyboardSensor = useSensor(KeyboardSensor)
    const touchSensor = useSensor(TouchSensor)

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)
    function getStartHour24() {
        if (isTime24Format) return operatingHoursStart
        if (operatingHoursMeridiemStart === 'AM') {
            return operatingHoursStart === 12 ? 0 : operatingHoursStart
        } else {
            return operatingHoursStart === 12 ? 12 : operatingHoursStart + 12
        }
    }

    // Helper function to check time slot availability
    const isTimeSlotAvailable = (start: number, duration: number, appointments: Appointment[]) => {
        const end = start + duration
        return !appointments.some(app => {
            const { startHour, startMinute } = parseISOWithDurationNumeric(app.date, 0)
            const appStart = startHour * 60 + startMinute
            const appEnd = appStart + app.service.duration
            return start < appEnd && end > appStart
        })
    }

    const handleDragStart = useCallback(
        ({ active }: DragStartEvent) => {
            setHasConflict(false)
            const patient = patients.find(p => p.medicalRecord.appointments.some(a => a.id === active.id))
            if (!patient) return
            const appointment = patient.medicalRecord.appointments.find(a => a.id === active.id)
            if (appointment) {
                setDragAppointment({ appointment, patient })
            }
        },
        [patients]
    )

    const handleDragMove = useCallback(
        ({ delta }: DragMoveEvent) => {
            if (!dragAppointment) return

            requestAnimationFrame(() => {
                const startHour24 = getStartHour24()
                const minMinutes = (startHour24 - 1) * 60
                const maxMinutes = minMinutes + (operatingHours + 2) * 60
                const duration = dragAppointment.appointment.service.duration

                const initialTop = calculateAppointmentPosition(dragAppointment.appointment).top
                const maxAllowedTop = ((maxMinutes - minMinutes - duration) / timeStep) * slotHeight

                const newY = Math.max(0, Math.min(initialTop + delta.y, maxAllowedTop))

                // Convert to minutes
                let desiredStart = Math.round(((newY / slotHeight) * timeStep + minMinutes) / timeStep) * timeStep
                let desiredEnd = desiredStart + duration

                // Calculate time
                const hours = Math.floor(desiredStart / 60)
                const minutes = desiredStart % 60
                const date = new Date().setHours(hours, minutes)
                const formattedTime = format(date, isTime24Format ? 'HH:mm' : 'hh:mm a')

                setCurrentTime(formattedTime)

                // Get all other appointments
                const allOtherAppointments = patients.flatMap(patient =>
                    patient.medicalRecord.appointments.filter(a => a.id !== dragAppointment!.appointment.id)
                )
                // Check for conflicts
                const conflictAppointments = allOtherAppointments.filter(app => {
                    const { startHour, startMinute } = parseISOWithDurationNumeric(app.date, 0)
                    const appStart = startHour * 60 + startMinute
                    const appEnd = appStart + app.service.duration
                    return desiredStart < appEnd && desiredEnd > appStart
                })

                setHasConflict(!!conflictAppointments.length)

                setCurrentPosition({ x: 0, y: newY - initialTop })
            })
        },
        [dragAppointment, operatingHours, timeStep, slotHeight]
    )

    const handleDragEnd = useCallback(
        ({ over, delta }: DragEndEvent) => {
            if (!dragAppointment || !over) {
                setDragAppointment(null)
                setHasConflict(false)
                return
            }

            if (!isSmartPlacement && hasConflict) {
                setDragAppointment(null)
                setCurrentTime('')
                setHasConflict(false)
                requestAnimationFrame(() => {
                    setCurrentPosition({ x: 0, y: 0 })
                })
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

            // 3. Convert to minutes
            let desiredStart = Math.round(((newTop / slotHeight) * timeStep + minMinutes) / timeStep) * timeStep
            let desiredEnd = desiredStart + duration

            // 4. Get all other appointments
            const allOtherAppointments = patients.flatMap(patient =>
                patient.medicalRecord.appointments.filter(a => a.id !== dragAppointment!.appointment.id)
            )

            // 5. Check for conflicts
            const conflictAppointments = allOtherAppointments.filter(app => {
                const { startHour, startMinute } = parseISOWithDurationNumeric(app.date, 0)
                const appStart = startHour * 60 + startMinute
                const appEnd = appStart + app.service.duration
                return desiredStart < appEnd && desiredEnd > appStart
            })

            // 6. Find best position
            let bestPosition = desiredStart

            if (isSmartPlacement && conflictAppointments.length > 0) {
                // Sort conflicts by start time
                const sortedConflicts = conflictAppointments
                    .map(app => {
                        const { startHour, startMinute } = parseISOWithDurationNumeric(app.date, 0)
                        return {
                            start: startHour * 60 + startMinute,
                            end: startHour * 60 + startMinute + app.service.duration
                        }
                    })
                    .sort((a, b) => a.start - b.start)

                // Check each conflict
                for (const conflict of sortedConflicts) {
                    const conflictMid = conflict.start + (conflict.end - conflict.start) / 2

                    // Determine preferred direction
                    if (desiredStart + duration / 2 < conflictMid) {
                        // Try to place before conflict
                        const candidate = conflict.start - duration
                        if (candidate >= minMinutes && isTimeSlotAvailable(candidate, duration, allOtherAppointments)) {
                            bestPosition = candidate
                            break
                        }
                    } else {
                        // Try to place after conflict
                        const candidate = conflict.end
                        if (
                            candidate + duration <= maxMinutes &&
                            isTimeSlotAvailable(candidate, duration, allOtherAppointments)
                        ) {
                            bestPosition = candidate
                            break
                        }
                    }

                    // If direct placement failed, search nearby
                    let searchDirection = 0
                    let searchStep = timeStep
                    let found = false

                    while (!found && searchStep <= 60 * 4) {
                        // Search up to 4 hours
                        // Search before
                        const beforeCandidate = conflict.start - duration - searchDirection * searchStep
                        if (
                            beforeCandidate >= minMinutes &&
                            isTimeSlotAvailable(beforeCandidate, duration, allOtherAppointments)
                        ) {
                            bestPosition = beforeCandidate
                            found = true
                            break
                        }

                        // Search after
                        const afterCandidate = conflict.end + searchDirection * searchStep
                        if (
                            afterCandidate + duration <= maxMinutes &&
                            isTimeSlotAvailable(afterCandidate, duration, allOtherAppointments)
                        ) {
                            bestPosition = afterCandidate
                            found = true
                            break
                        }

                        // Expand search area
                        searchDirection++
                        if (searchDirection % 2 === 0) searchStep += timeStep
                    }

                    if (found) break
                }
            }

            // 7. Ensure position is within bounds
            bestPosition = Math.max(minMinutes, Math.min(bestPosition, maxMinutes - duration))

            // 8. Update appointment time
            const hours = Math.floor(bestPosition / 60)
            const minutes = bestPosition % 60

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
            setCurrentTime('')
            requestAnimationFrame(() => {
                setCurrentPosition({ x: 0, y: 0 })
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
                    isSmartPlacement={isSmartPlacement}
                    setIsSmartPlacement={() => setIsSmartPlacement(!isSmartPlacement)}
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
                                const { adjustedHour, minute } = calculateTime(idx)
                                const startTime = new Date().setHours(adjustedHour, minute - timeStep)

                                const isMinuteZero = minute === 0
                                const lastItem = idx === (operatingHours + 2) * stepsPerHour + 1
                                const validSlot = isSlotHover !== 0 && !lastItem
                                const isHover = isSlotHover === idx

                                return (
                                    <li
                                        key={idx}
                                        className={cn('flex items-center py-0.5 pl-0.5 pr-1 border-b-20', {
                                            'hover:bg-hover': validSlot,
                                            'border-b-none': lastItem,
                                            '!border-dashed': !isMinuteZero
                                        })}
                                        onMouseEnter={() => setIsSlotHover(idx)}
                                        onMouseLeave={() => setIsSlotHover(null)}
                                        style={{
                                            height: lastItem || idx === 0 ? slotHeight / 2 : slotHeight
                                        }}
                                    >
                                        {isHover && validSlot && (
                                            <Button className='h-full w-full !border-dashed border-20'>
                                                <CalendarPlus2 className='!size-5 stroke-text-tertiary stroke-[1.5px]' />
                                                <span className='pt-1 text-p-sm font-normal text-text-tertiary'>
                                                    {t('schedule.addAppointment', {
                                                        time: format(startTime, 'HH:mm')
                                                    })}
                                                </span>
                                            </Button>
                                        )}
                                    </li>
                                )
                            })}

                            {dragAppointment && (
                                <DroppableSlot
                                    id='active-slot'
                                    top={calculateAppointmentPosition(dragAppointment.appointment).top + slotHeight / 2}
                                    height={calculateAppointmentPosition(dragAppointment.appointment).height}
                                    translate={currentPosition}
                                    isVerticalRestriction={isVerticalRestriction}
                                    hasConflict={hasConflict}
                                    label={
                                        !hasConflict
                                            ? t('schedule.dropSlot', {
                                                  time: currentTime,
                                                  duration: dragAppointment.appointment.service.duration
                                              })
                                            : t('schedule.slotConflict', {
                                                  time: currentTime
                                              })
                                    }
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
                                className={cn('cursor-grabbing', { 'cursor-not-allowed': hasConflict })}
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
