export interface IReservedTime {
    id: string
    clinicId: string
    userId: string
    color: string
    date: string
    duration: number
    room: number
    reason: string
    note: string
    type: string
}

export const RESERVED_TIME: IReservedTime[] = [
    {
        id: 'rt-21793f8d-d0ee-4d3b-9766-58e8596f4432',
        clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
        userId: '47536f08-b0bb-49ce-adef-1f2c38a4cce6',
        color: '#FFF2D3',
        date: '2024-03-15T07:00:00Z', // 9:00 AM
        duration: 30,
        reason: 'Technical Maintenance',
        note: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        type: 'maintenance',
        room: 1
    },
    {
        id: 'rt-217935d-d02e-4d6b-9766-58e8588f4432',
        clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
        userId: '47536f08-b0bb-49ce-adef-1f2c38a4cce6',
        color: '#FFF2D3',
        date: '2024-03-15T08:10:00Z', // 9:00 AM
        duration: 15,
        reason: 'Technical Maintenance',
        note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, nihil.',
        type: 'maintenance',
        room: 1
    },
    {
        id: 'rt-21792f8d-d0e2-4d56-9766-58e44596f42e1',
        clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
        userId: '47536f08-b0bb-49ce-adef-1f2c38a4cce6',
        color: '#FFF2D3',
        date: '2024-03-15T14:10:00Z', // 2:30 PM
        duration: 90,
        reason: 'Team Meeting',
        note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam a ipsum rem. Cumque expedita quod assumenda beatae maiores consequatur aut nihil tenetur eveniet nulla ut recusandae quasi nobis, temporibus officiis?',
        type: 'meeting',
        room: 1
    }
]
