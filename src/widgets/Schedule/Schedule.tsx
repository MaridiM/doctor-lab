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
import { z } from 'zod'

import { Appointment, PATIENTS, User } from '@/entities/api'
import { IReservedTime, RESERVED_TIME } from '@/entities/api/mock/reservedTime'

import { Button, ScrollArea } from '@/shared/components'
import { adjustTime, cn, parseISOWithDurationNumeric } from '@/shared/utils'

import { AppointmentCard } from './AppointmentCard'
import { DroppableSlot } from './DroppableSlot'
import { ReservedTimeCard } from './ReservedTimeCard'
import { ScheduleContextMenu } from './ScheduleContextMenu'
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
    type: 'APPOINTMENT' | 'RESERVED_TIME'
    data: Appointment | IReservedTime
    patient?: User
}

type TPeriod = 'AM' | 'PM'

export function Schedule() {
    const t = useTranslations('dashboard')

    const [isSlotHover, setIsSlotHover] = useState<number | null>(null)

    //  Schedule
    // ----------------------------------------------------------------------------------------------
    const [operatingHours, setOperatingHours] = useState<TOperatingHours>(DEFAULT_OPERATING_HOURS)
    const [operatingHoursStart, setOperatingHoursStart] = useState<number>(DEFAULT_START_HOUR)
    const [operatingHoursMeridiemStart, setOperatingHoursMeridiemStart] = useState<TPeriod>('AM')
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

    const calculatePosition = useCallback(
        (date: string, duration: number) => {
            const baseMinutes = (startHour24 - 1) * 60

            const { startHour, startMinute } = parseISOWithDurationNumeric(date, duration)

            const start = startHour * 60 + startMinute
            const end = start + duration

            // Проверка на выход за границы
            const isVisible = start >= baseMinutes && end <= baseMinutes + (operatingHours + 2) * 60

            const StartMinutes = startHour * 60 + startMinute
            const offsetMinutes = StartMinutes - baseMinutes
            return {
                top: isVisible ? ((start - baseMinutes) / timeStep) * slotHeight : -1000,
                height: (duration / timeStep) * slotHeight
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
    function getStartHour24() {
        if (isTime24Format) return operatingHoursStart
        if (operatingHoursMeridiemStart === 'AM') {
            return operatingHoursStart === 12 ? 0 : operatingHoursStart
        } else {
            return operatingHoursStart === 12 ? 12 : operatingHoursStart + 12
        }
    }

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
                const maxMinutes = minMinutes + (operatingHours + 2) * 60

                const duration = 'service' in dragItem.data ? dragItem.data.service.duration : dragItem.data.duration

                const initialTop = calculatePosition(
                    dragItem.data.date,
                    'service' in dragItem.data ? dragItem.data.service.duration : dragItem.data.duration
                ).top
                const maxAllowedTop = ((maxMinutes - minMinutes - duration) / timeStep) * slotHeight

                const newY = Math.max(0, Math.min(initialTop + delta.y, maxAllowedTop))

                // Convert to minutes
                const desiredStart = Math.round(((newY / slotHeight) * timeStep + minMinutes) / timeStep) * timeStep
                const desiredEnd = desiredStart + duration

                // Calculate time
                const hours = Math.floor(desiredStart / 60)
                const minutes = desiredStart % 60
                const date = new Date().setHours(hours, minutes)
                const formattedTime = format(date, isTime24Format ? 'HH:mm' : 'hh:mm a')

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
        [dragItem, operatingHours, timeStep, slotHeight, calculatePosition, getStartHour24, isTime24Format, patients]
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
            const endHour24 = startHour24 + operatingHours
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
                Math.min(initialTop + delta.y, ((maxMinutes - minMinutes - duration) * slotHeight) / timeStep)
            )

            // 3. Convert to minutes
            const desiredStart = Math.round(((newTop / slotHeight) * timeStep + minMinutes) / timeStep) * timeStep
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
                    let searchStep = timeStep
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
            dragItem,
            slotHeight,
            timeStep,
            operatingHours,
            patients,
            calculatePosition,
            getStartHour24,
            hasConflict,
            isSmartPlacement
        ]
    )

    // ----------------------------------------------------------------------------------------------

    const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

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
                        {/* Time Line */}
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

                        {/* Schedule Grid */}
                        <ul className='relative flex w-full flex-col'>
                            {SLOT_COUNT.map((_, idx) => {
                                const { adjustedHour, minute } = calculateTime(idx)
                                const startTime = new Date().setHours(adjustedHour, minute - timeStep)

                                const isMinuteZero = minute === 0
                                const lastItem = idx === (operatingHours + 2) * stepsPerHour + 1
                                const validSlot = isSlotHover !== 0 && !lastItem
                                const isHover = isSlotHover === idx || selectedSlot === idx

                                return (
                                    <ScheduleContextMenu key={idx} isOpen={open => setSelectedSlot(open ? idx : null)}>
                                        <li
                                            className={cn('flex items-center py-0.5 pl-0.5 pr-1.5 border-b-20', {
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
                                                    <span className='flex size-6 min-w-6 items-center justify-center'>
                                                        <CalendarPlus2 className='!size-5 stroke-text-tertiary stroke-[1.5px]' />
                                                    </span>
                                                    <span className='pt-1 text-p-sm font-normal text-text-tertiary'>
                                                        {t('schedule.addAppointment', {
                                                            time: format(startTime, 'HH:mm')
                                                        })}
                                                    </span>
                                                </Button>
                                            )}
                                        </li>
                                    </ScheduleContextMenu>
                                )
                            })}

                            {dragItem?.type === 'APPOINTMENT' && (
                                <DroppableSlot
                                    id='active-slot'
                                    top={
                                        calculatePosition(
                                            dragItem.data.date,
                                            (dragItem.data as Appointment).service.duration
                                        ).top +
                                        slotHeight / 2
                                    }
                                    height={
                                        calculatePosition(
                                            dragItem.data.date,
                                            (dragItem.data as Appointment).service.duration
                                        ).height
                                    }
                                    translate={currentPosition}
                                    isVerticalRestriction={isVerticalRestriction}
                                    hasConflict={hasConflict}
                                    label={
                                        !hasConflict
                                            ? t('schedule.dropSlot.appointment', {
                                                  time: currentTime,
                                                  duration: (dragItem.data as Appointment).service.duration
                                              })
                                            : t('schedule.slotConflict', {
                                                  time: currentTime
                                              })
                                    }
                                />
                            )}
                            {dragItem?.type === 'RESERVED_TIME' && (
                                <DroppableSlot
                                    id='active-slot'
                                    top={
                                        calculatePosition(dragItem.data.date, (dragItem.data as IReservedTime).duration)
                                            .top +
                                        slotHeight / 2
                                    }
                                    height={
                                        calculatePosition(dragItem.data.date, (dragItem.data as IReservedTime).duration)
                                            .height
                                    }
                                    translate={currentPosition}
                                    isVerticalRestriction={isVerticalRestriction}
                                    hasConflict={hasConflict}
                                    label={
                                        !hasConflict
                                            ? t('schedule.dropSlot.reservedTime', {
                                                  time: currentTime,
                                                  duration: (dragItem.data as IReservedTime).duration
                                              })
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
