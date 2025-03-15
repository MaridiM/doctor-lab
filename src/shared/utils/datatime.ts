import { parseISO } from 'date-fns'

interface TimeResult {
    startHour: string
    startMinute: string
    endHour: string
    endMinute: string
}

interface NumericTimeResult {
    startHour: number
    startMinute: number
    endHour: number
    endMinute: number
}

export function parseISOWithDuration(isoString: string, durationMinutes: number): TimeResult {
    // 1. Парсим дату как UTC
    const date = parseISO(isoString)

    // 2. Получаем часы и минуты в UTC
    const startHour = String(date.getUTCHours()).padStart(2, '0')
    const startMinute = String(date.getUTCMinutes()).padStart(2, '0')

    // 3. Вычисляем конечное время в UTC
    const endDate = new Date(date.getTime() + durationMinutes * 60 * 1000)
    const endHour = String(endDate.getUTCHours()).padStart(2, '0')
    const endMinute = String(endDate.getUTCMinutes()).padStart(2, '0')

    return {
        startHour,
        startMinute,
        endHour,
        endMinute
    }
}

export function parseISOWithDurationNumeric(isoString: string, duration: number): NumericTimeResult {
    const { startHour, startMinute, endHour, endMinute } = parseISOWithDuration(isoString, duration)
    return {
        startHour: parseInt(startHour),
        startMinute: parseInt(startMinute),
        endHour: parseInt(endHour),
        endMinute: parseInt(endMinute)
    }
}

export const adjustTime = (originalDate: string, hours: number, minutes: number) => {
    const date = new Date(originalDate)
    date.setUTCHours(hours)
    date.setUTCMinutes(minutes)
    return date.toISOString()
}


