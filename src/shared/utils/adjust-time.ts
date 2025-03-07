export const adjustTime = (originalDate: string, hours: number, minutes: number) => {
    const date = new Date(originalDate)
    date.setUTCHours(hours)
    date.setUTCMinutes(minutes)
    return date.toISOString()
}
