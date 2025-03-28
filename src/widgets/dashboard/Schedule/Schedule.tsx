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
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Appointment, PATIENTS, User } from '@/shared/api'
import { IReservedTime, RESERVED_TIME } from '@/shared/api/mock/reservedTime'

import { ScrollArea } from '@/shared/components'
import { adjustTime, cn, parseISOWithDurationNumeric } from '@/shared/utils'

import { AppointmentCard } from './AppointmentCard'
import { DroppableSlot } from './DroppableSlot'
import { ReservedTimeCard } from './ReservedTimeCard'
import { ScheduleGrid } from './ScheduleGrid'
import { ScheduleHeader } from './ScheduleHeader'
import { ScheduleTimeLine } from './ScheduleTimeLine'

export type TOperatingHours = 6 | 8 | 12 | 16 | 24
export type TTimeStep = 15 | 20 | 30 | 60
export type TDragTimeStep = 5 | 10 | TTimeStep | 'auto'

const MAX_SLOT_HEIGHT = 192
const DEFAULT_START_HOUR = 8
const DEFAULT_OPERATING_HOURS: TOperatingHours = 8
const DEFAULT_TIME_STEP: TTimeStep = 15
const DRAG_TIME_STEP: TDragTimeStep = 'auto'
const RESTRICT_TO_VERTICAL_AXIS = true
const SMART_PLACEMENT = true

interface DraggableData {
    type: 'APPOINTMENT' | 'RESERVED_TIME'
    data: Appointment | IReservedTime
    patient?: User
}

type TPeriod = 'AM' | 'PM'

export function Schedule() {
    const t = useTranslations('dashboard')

    //  Schedule
    // ----------------------------------------------------------------------------------------------
    const [scheduleState, setScheduleState] = useState({
        operatingHours: DEFAULT_OPERATING_HOURS,
        operatingHoursStart: DEFAULT_START_HOUR,
        operatingHoursMeridiemStart: 'AM' as TPeriod,
        timeStep: DEFAULT_TIME_STEP,
        isTime24Format: true
    })

    const stepsPerHour = useMemo(() => 60 / scheduleState.timeStep, [scheduleState.timeStep])
    const slotHeight = useMemo(() => MAX_SLOT_HEIGHT / stepsPerHour, [stepsPerHour])

    const startHour24 = useMemo(() => {
        if (scheduleState.isTime24Format) return scheduleState.operatingHoursStart

        return scheduleState.operatingHoursMeridiemStart === 'AM'
            ? scheduleState.operatingHoursStart === 12
                ? 0
                : scheduleState.operatingHoursStart
            : scheduleState.operatingHoursStart === 12
              ? 12
              : scheduleState.operatingHoursStart + 12
    }, [scheduleState.isTime24Format, scheduleState.operatingHoursMeridiemStart, scheduleState.operatingHoursStart])

    useEffect(() => {
        setScheduleState(prev => ({ ...prev, operatingHoursStart: scheduleState.operatingHours === 24 ? 0 : 8 }))
    }, [scheduleState.operatingHours])

    const calculateTime = useCallback(
        (idx: number) => {
            const baseHour = startHour24 - 1
            const hour = baseHour + Math.floor(idx / stepsPerHour)
            const adjustedHour = (hour + 24) % 24
            const minute = (idx % stepsPerHour) * scheduleState.timeStep

            return { adjustedHour, minute }
        },
        [startHour24, stepsPerHour, scheduleState.timeStep]
    )

    const SLOT_COUNT = useMemo(
        () => Array((scheduleState.operatingHours + 2) * stepsPerHour + 1).fill(null),
        [scheduleState.operatingHours, stepsPerHour]
    )
    // ----------------------------------------------------------------------------------------------

    //  Appointment Card
    // ----------------------------------------------------------------------------------------------
    const [patients, setPatients] = useState<User[]>([])

    const calculatePosition = useCallback(
        (date: string, duration: number) => {
            const baseMinutes = (startHour24 - 1) * 60

            const { startHour, startMinute } = parseISOWithDurationNumeric(date, duration)

            const start = startHour * 60 + startMinute
            const end = start + duration

            // Проверка на выход за границы
            const isVisible = start >= baseMinutes && end <= baseMinutes + (scheduleState.operatingHours + 2) * 60

            // const StartMinutes = startHour * 60 + startMinute
            // const offsetMinutes = StartMinutes - baseMinutes
            return {
                top: isVisible ? ((start - baseMinutes) / scheduleState.timeStep) * slotHeight : -1000,
                height: (duration / scheduleState.timeStep) * slotHeight
            }
        },
        [startHour24, scheduleState.operatingHours, scheduleState.timeStep, slotHeight]
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
    const [reservedTimes, setReservedTimes] = useState<IReservedTime[]>(RESERVED_TIME)

    const [dragItem, setDragItem] = useState<DraggableData | null>(null)
    const [isVerticalRestriction, setIsVerticalRestriction] = useState<boolean>(RESTRICT_TO_VERTICAL_AXIS)

    const [currentPosition, setCurrentPosition] = useState<Translate>({ x: 0, y: 0 })
    const [currentTime, setCurrentTime] = useState<string>('')

    const [isSmartPlacement, setIsSmartPlacement] = useState(SMART_PLACEMENT)
    const [hasConflict, setHasConflict] = useState(false)

    const mouseSensor = useSensor(MouseSensor)
    const keyboardSensor = useSensor(KeyboardSensor)
    const touchSensor = useSensor(TouchSensor)

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)
    const getStartHour24 = useCallback(() => {
        if (scheduleState.isTime24Format) return scheduleState.operatingHoursStart
        if (scheduleState.operatingHoursMeridiemStart === 'AM') {
            return scheduleState.operatingHoursStart === 12 ? 0 : scheduleState.operatingHoursStart
        } else {
            return scheduleState.operatingHoursStart === 12 ? 12 : scheduleState.operatingHoursStart + 12
        }
    }, [scheduleState.isTime24Format, scheduleState.operatingHoursMeridiemStart, scheduleState.operatingHoursStart])

    // Helper function to check time slot availability
    const isTimeSlotAvailable = (start: number, duration: number, items: Array<Appointment | IReservedTime>) => {
        const end = start + duration
        return !items.some(item => {
            const itemDuration = 'service' in item ? item.service.duration : item.duration

            const { startHour, startMinute } = parseISOWithDurationNumeric(item.date, 0)
            const itemStart = startHour * 60 + startMinute
            const itemEnd = itemStart + itemDuration
            return start < itemEnd && end > itemStart
        })
    }

    const handleDragStart = useCallback(
        ({ active }: DragStartEvent) => {
            setHasConflict(false)

            // Поиск среди пациентов
            const patient = patients.find(p => p.medicalRecord.appointments.some(a => a.id === active.id))
            if (patient) {
                const appointment = patient.medicalRecord.appointments.find(a => a.id === active.id)
                if (appointment) {
                    setDragItem({ type: 'APPOINTMENT', data: appointment, patient })
                    return
                }
            }

            // Поиск среди зарезервированных времён
            const reservedTime = reservedTimes.find(rt => rt.id === active.id)
            if (reservedTime) {
                setDragItem({ type: 'RESERVED_TIME', data: reservedTime })
            }
        },
        [patients, reservedTimes]
    )

    const handleDragMove = useCallback(
        ({ delta }: DragMoveEvent) => {
            if (!dragItem) return

            requestAnimationFrame(() => {
                const startHour24 = getStartHour24()
                const minMinutes = (startHour24 - 1) * 60
                const maxMinutes = minMinutes + (scheduleState.operatingHours + 2) * 60

                const duration = 'service' in dragItem.data ? dragItem.data.service.duration : dragItem.data.duration

                const initialTop = calculatePosition(
                    dragItem.data.date,
                    'service' in dragItem.data ? dragItem.data.service.duration : dragItem.data.duration
                ).top
                const maxAllowedTop = ((maxMinutes - minMinutes - duration) / scheduleState.timeStep) * slotHeight

                const newY = Math.max(0, Math.min(initialTop + delta.y, maxAllowedTop))

                // Convert to minutes
                const desiredStart =
                    Math.round(((newY / slotHeight) * scheduleState.timeStep + minMinutes) / scheduleState.timeStep) *
                    scheduleState.timeStep
                const desiredEnd = desiredStart + duration

                // Calculate time
                const hours = Math.floor(desiredStart / 60)
                const minutes = desiredStart % 60
                const date = new Date().setHours(hours, minutes)
                const formattedTime = format(date, scheduleState.isTime24Format ? 'HH:mm' : 'hh:mm a')

                setCurrentTime(formattedTime)

                // Get all other appointments  / reserved times
                const allOtherAppointments = patients.flatMap(patient =>
                    patient.medicalRecord.appointments.filter(a => a.id !== dragItem.data.id)
                )
                const allOtherReservedTimes = reservedTimes.filter(a => a.id !== dragItem.data.id)

                const conflicts = [...allOtherAppointments, ...allOtherReservedTimes]

                // Check for conflicts
                const conflictAppointments = conflicts.filter(item => {
                    const itemDuration = 'service' in item ? item.service.duration : item.duration

                    const { startHour, startMinute } = parseISOWithDurationNumeric(item.date, 0)
                    const itemStart = startHour * 60 + startMinute
                    const itemEnd = itemStart + itemDuration
                    // const itemEnd = itemStart + item.service.duration
                    return desiredStart < itemEnd && desiredEnd > itemStart
                })

                setHasConflict(!!conflictAppointments.length)

                setCurrentPosition({ x: 0, y: newY - initialTop })
            })
        },
        [
            patients,
            dragItem,
            slotHeight,
            reservedTimes,
            getStartHour24,
            calculatePosition,
            scheduleState.timeStep,
            scheduleState.operatingHours,
            scheduleState.isTime24Format
        ]
    )

    const handleDragEnd = useCallback(
        ({ over, delta }: DragEndEvent) => {
            if (!dragItem || !over) {
                setDragItem(null)
                setHasConflict(false)
                return
            }

            if (!isSmartPlacement && hasConflict) {
                setDragItem(null)
                setCurrentTime('')
                setHasConflict(false)
                requestAnimationFrame(() => {
                    setCurrentPosition({ x: 0, y: 0 })
                })
                return
            }

            // 1. Get base parameters
            const startHour24 = getStartHour24()
            const endHour24 = startHour24 + scheduleState.operatingHours
            const minMinutes = (startHour24 - 1) * 60
            const maxMinutes = (endHour24 + 1) * 60
            const duration = 'service' in dragItem.data ? dragItem.data.service.duration : dragItem.data.duration

            // 2. Calculate new position
            const initialTop = calculatePosition(
                dragItem.data.date,
                'service' in dragItem.data ? dragItem.data.service.duration : dragItem.data.duration
            ).top
            const newTop = Math.max(
                0,
                Math.min(
                    initialTop + delta.y,
                    ((maxMinutes - minMinutes - duration) * slotHeight) / scheduleState.timeStep
                )
            )

            // 3. Convert to minutes
            const dragStep = DRAG_TIME_STEP === 'auto' ? scheduleState.timeStep : DRAG_TIME_STEP
            const desiredStart =
                Math.round(((newTop / slotHeight) * scheduleState.timeStep + minMinutes) / dragStep) * dragStep
            const desiredEnd = desiredStart + duration

            // 4. Get all other appointments / reserved times
            const allOtherAppointments = patients.flatMap(patient =>
                patient.medicalRecord.appointments.filter(a => a.id !== dragItem.data.id)
            )
            const allOtherReservedTimes = reservedTimes.filter(a => a.id !== dragItem.data.id)

            const conflicts = [...allOtherAppointments, ...allOtherReservedTimes]
            // 5. Check for conflicts
            const conflictAppointments = conflicts.filter(item => {
                const itemDuration = 'service' in item ? item.service.duration : item.duration

                const { startHour, startMinute } = parseISOWithDurationNumeric(item.date, 0)
                const itemStart = startHour * 60 + startMinute
                const itemEnd = itemStart + itemDuration
                // const itemEnd = itemStart + item.service.duration
                return desiredStart < itemEnd && desiredEnd > itemStart
            })

            // 6. Find best position
            let bestPosition = desiredStart

            if (isSmartPlacement && conflictAppointments.length > 0) {
                // Sort conflicts by start time
                const sortedConflicts = conflictAppointments
                    .map(item => {
                        const { startHour, startMinute } = parseISOWithDurationNumeric(item.date, 0)

                        const itemDuration = 'service' in item ? item.service.duration : item.duration
                        return {
                            start: startHour * 60 + startMinute,
                            end: startHour * 60 + startMinute + itemDuration
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
                        if (candidate >= minMinutes && isTimeSlotAvailable(candidate, duration, conflicts)) {
                            bestPosition = candidate
                            break
                        }
                    } else {
                        // Try to place after conflict
                        const candidate = conflict.end
                        if (candidate + duration <= maxMinutes && isTimeSlotAvailable(candidate, duration, conflicts)) {
                            bestPosition = candidate
                            break
                        }
                    }

                    // If direct placement failed, search nearby
                    let searchDirection = 0
                    let searchStep = scheduleState.timeStep
                    let found = false

                    while (!found && searchStep <= 60 * 4) {
                        // Search up to 4 hours
                        // Search before
                        const beforeCandidate = conflict.start - duration - searchDirection * searchStep
                        if (
                            beforeCandidate >= minMinutes &&
                            isTimeSlotAvailable(beforeCandidate, duration, conflicts)
                        ) {
                            bestPosition = beforeCandidate
                            found = true
                            break
                        }

                        // Search after
                        const afterCandidate = conflict.end + searchDirection * searchStep
                        if (
                            afterCandidate + duration <= maxMinutes &&
                            isTimeSlotAvailable(afterCandidate, duration, conflicts)
                        ) {
                            bestPosition = afterCandidate
                            found = true
                            break
                        }

                        // Expand search area
                        searchDirection++
                        if (searchDirection % 2 === 0) searchStep += scheduleState.timeStep
                    }

                    if (found) break
                }
            }

            // 7. Ensure position is within bounds
            bestPosition = Math.max(minMinutes, Math.min(bestPosition, maxMinutes - duration))

            // 8. Update appointment time
            const hours = Math.floor(bestPosition / 60)
            const minutes = bestPosition % 60

            dragItem.type === 'APPOINTMENT' &&
                setPatients(prevPatients =>
                    prevPatients.map(patient => {
                        const appointmentIndex = patient.medicalRecord.appointments.findIndex(
                            a => a.id === dragItem.data.id
                        )

                        if (appointmentIndex === -1) return patient

                        const updatedAppointment = {
                            ...(dragItem.data as Appointment),
                            date: adjustTime(dragItem.data.date, hours, minutes)
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
            dragItem.type === 'RESERVED_TIME' &&
                setReservedTimes(prev =>
                    prev.map(rt =>
                        rt.id === dragItem.data.id
                            ? { ...rt, date: adjustTime(dragItem.data.date, hours, minutes) }
                            : rt
                    )
                )

            setDragItem(null)
            setCurrentTime('')

            requestAnimationFrame(() => {
                setCurrentPosition({ x: 0, y: 0 })
            })
        },
        [
            patients,
            dragItem,
            slotHeight,
            hasConflict,
            reservedTimes,
            getStartHour24,
            isSmartPlacement,
            calculatePosition,
            scheduleState.timeStep,
            scheduleState.operatingHours
        ]
    )

    // ----------------------------------------------------------------------------------------------

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
                    isTime24Format={scheduleState.isTime24Format}
                    setIsTime24Format={() =>
                        setScheduleState(prev => ({ ...prev, isTime24Format: !prev.isTime24Format }))
                    }
                    isVerticalRestriction={isVerticalRestriction}
                    setIsVerticalRestriction={() => setIsVerticalRestriction(!isVerticalRestriction)}
                    operatingHours={scheduleState.operatingHours}
                    setOperatingHours={newHours => setScheduleState(prev => ({ ...prev, operatingHours: newHours }))}
                    timeStep={scheduleState.timeStep}
                    setTimeStep={newTimeStep => setScheduleState(prev => ({ ...prev, timeStep: newTimeStep }))}
                    isSmartPlacement={isSmartPlacement}
                    setIsSmartPlacement={() => setIsSmartPlacement(!isSmartPlacement)}
                />

                <ScrollArea className='flex h-full max-h-[calc(100vh-138px)] w-full bg-background' type='auto'>
                    <div className='flex overflow-hidden'>
                        {/* Time Line */}
                        <ScheduleTimeLine
                            slots={SLOT_COUNT}
                            isTime24Format={scheduleState.isTime24Format}
                            slotHeight={slotHeight}
                            calculateTime={calculateTime}
                        />

                        {/* Schedule Grid */}
                        <ul className='relative flex w-full flex-col'>
                            <ScheduleGrid
                                slots={SLOT_COUNT}
                                operatingHours={scheduleState.operatingHours}
                                timeStep={scheduleState.timeStep}
                                stepsPerHour={stepsPerHour}
                                slotHeight={slotHeight}
                                calculateTime={calculateTime}
                            />

                            {dragItem && (
                                <DroppableSlot
                                    id='active-slot'
                                    top={
                                        calculatePosition(
                                            dragItem.data.date,
                                            dragItem?.type === 'APPOINTMENT'
                                                ? (dragItem.data as Appointment).service.duration
                                                : (dragItem.data as IReservedTime).duration
                                        ).top +
                                        slotHeight / 2
                                    }
                                    height={
                                        calculatePosition(
                                            dragItem.data.date,
                                            dragItem?.type === 'APPOINTMENT'
                                                ? (dragItem.data as Appointment).service.duration
                                                : (dragItem.data as IReservedTime).duration
                                        ).height
                                    }
                                    translate={currentPosition}
                                    isVerticalRestriction={isVerticalRestriction}
                                    hasConflict={hasConflict}
                                    label={
                                        !hasConflict
                                            ? t(
                                                  `schedule.dropSlot.${
                                                      dragItem?.type === 'APPOINTMENT' ? 'appointment' : 'reservedTime'
                                                  }`,
                                                  {
                                                      time: currentTime,
                                                      duration:
                                                          dragItem?.type === 'APPOINTMENT'
                                                              ? (dragItem.data as Appointment).service.duration
                                                              : (dragItem.data as IReservedTime).duration
                                                  }
                                              )
                                            : t('schedule.slotConflict', {
                                                  time: currentTime
                                              })
                                    }
                                />
                            )}

                            {/* Appointment */}
                            {patients.map(patient => {
                                const appointment = patient.medicalRecord.appointments[0]
                                const { top, height } = calculatePosition(
                                    appointment.date,
                                    appointment.service.duration
                                )
                                const isDragged = dragItem?.data.id === appointment.id

                                return (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        top={slotHeight / 2 + top}
                                        height={height}
                                        patient={patient}
                                        className={isDragged ? 'opacity-0' : ''}
                                    />
                                )
                            })}
                            {reservedTimes.map(reservedTime => {
                                const { top, height } = calculatePosition(reservedTime.date, reservedTime.duration)
                                const isDragged = dragItem?.data.id === reservedTime.id

                                return (
                                    <ReservedTimeCard
                                        key={reservedTime.id}
                                        reservedTime={reservedTime}
                                        top={slotHeight / 2 + top}
                                        height={height}
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
                        {dragItem?.type === 'APPOINTMENT' && (
                            <AppointmentCard
                                appointment={dragItem.data as Appointment}
                                top={0}
                                height={
                                    calculatePosition(
                                        dragItem.data.date,
                                        (dragItem.data as Appointment).service.duration
                                    ).height
                                }
                                className={cn('cursor-grabbing', { 'cursor-not-allowed': hasConflict })}
                            />
                        )}

                        {dragItem?.type === 'RESERVED_TIME' && (
                            <ReservedTimeCard
                                reservedTime={dragItem.data as IReservedTime}
                                top={0}
                                height={
                                    calculatePosition(dragItem.data.date, (dragItem.data as IReservedTime).duration)
                                        .height
                                }
                                className={cn('cursor-grabbing', { 'cursor-not-allowed': hasConflict })}
                            />
                        )}
                    </DragOverlay>
                </ScrollArea>
            </DndContext>
        </section>
    )
}
