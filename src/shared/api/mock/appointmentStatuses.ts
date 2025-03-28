import { Status } from "./patients.mock"

export const APPOINTMENT_STATUSES: Status[] = [
    {
        id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
        key: 'SCHEDULED',
        name: 'Scheduled',
        description: 'The appointment is scheduled and confirmed.',
        backgroundColor: '#D32F2F',
        textColor: '#FFFFFF'
    },
    {
        id: '45fe64d7-39b2-49e1-9c65-07c07b804768',
        key: 'CONFIRMED',
        name: 'Confirmed',
        description: 'The appointment has been confirmed.',
        backgroundColor: '#4CAF50',
        textColor: '#FFFFFF'
    },
    {
        id: '619ab33b-3b2f-475a-bc74-2faf2d529d23',
        key: 'UPDATED',
        name: 'Updated',
        description: 'The appointment details have been updated.',
        backgroundColor: '#673AB7',
        textColor: '#FFFFFF'
    },
    {
        id: 'd872c318-c16d-4b04-b370-be32cedcaeb1',
        key: 'MISSED',
        name: 'Missed',
        description: 'The appointment was missed.',
        backgroundColor: '#FFA000',
        textColor: '#000000'
    },
    {
        id: '47536f08-b0bb-49ce-adef-1f2c38a3cce6',
        key: 'RESCHEDULED',
        name: 'Rescheduled',
        description: 'The appointment has been rescheduled.',
        backgroundColor: '#B71C1C',
        textColor: '#FFFFFF'
    },
    {
        id: 'a5e6b42c-3f45-4f32-a1d5-3f6c7d2b5e11',
        key: 'UNABLE_TO_REACH',
        name: 'Unable to reach via phone',
        description: 'The patient could not be reached via phone.',
        backgroundColor: '#E64A19',
        textColor: '#FFFFFF'
    },
    {
        id: 'b5a4c6d8-7f98-4b11-a23d-5c6b7f8d9e12',
        key: 'RUNNING_LATE',
        name: 'Running late',
        description: 'The patient is running late for the appointment.',
        backgroundColor: '#1A237E',
        textColor: '#FFFFFF'
    },
    {
        id: 'c6d7e8f9-4a56-4b12-b34d-6e7f8g9h0i13',
        key: 'IN_MEDICAL_APPOINTMENT',
        name: 'In a medical appointment',
        description: 'The patient is currently in a medical appointment.',
        backgroundColor: '#0288D1',
        textColor: '#FFFFFF'
    },
    {
        id: 'd8e9f0a1-5b67-4c23-c45d-7f8g9h0i1j14',
        key: 'CANCELED',
        name: 'Canceled',
        description: 'The appointment has been canceled.',
        backgroundColor: '#004D40',
        textColor: '#FFFFFF'
    }
]
