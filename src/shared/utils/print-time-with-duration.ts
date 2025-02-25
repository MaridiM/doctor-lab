import { addMinutes } from 'date-fns'

export function printTimeWithDuration(time: string, duration: string) {
    // Преобразуем строку времени в объект Date
    const startTime = new Date(time)

    // Допустим, у вас в appointment.service.duration
    // хранится число минут (например, '30' как строка).
    const durationInMinutes = parseInt(duration, 10)

    // Прибавляем к исходному времени нужное количество минут
    const endTime = addMinutes(startTime, durationInMinutes)

    // Возвращаем результат в ISO-формате
    return endTime.toISOString()
}
