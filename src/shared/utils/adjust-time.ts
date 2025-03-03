export function adjustTime(newHours: number, newMinutes: number) {
    const date = new Date()

    // Устанавливаем новое время в UTC
    date.setUTCHours(newHours)
    date.setUTCMinutes(newMinutes)
    date.setUTCSeconds(0)
    date.setUTCMilliseconds(0)

    return date.toISOString()
}
