export interface IReserved {
    id: string
    date: string
    startMiridiem: 'AM' | 'PM' | null
    room: string | number
    color: string | null
    title: string
    notes: string
    duration: number
}

export const RESERVEDS: IReserved[] = [
    {
        id: 'c0dbda3e-6f81-454b-b562-4d29fd9dea54',
        date: '2025-06-06T15:00:00.000Z',
        startMiridiem: null,
        room: 1,
        color: null,
        title: 'Lunch break',
        notes: 'Some description for breack Some description for breack',
        duration: 30
    }
]
