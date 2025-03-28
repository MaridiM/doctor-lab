export type TStatusKey =
    | 'CUSTOM'
    | 'SCHEDULED'
    | 'CONFIRMED'
    | 'UPDATED'
    | 'MISSED'
    | 'RESCHEDULED'
    | 'UNABLE_TO_REACH'
    | 'RUNNING_LATE'
    | 'IN_MEDICAL_APPOINTMENT'
    | 'CANCELED'

export interface Contacts {
    phone: string
    email: string
    telegramId: string
}

export interface PersonalInfo {
    firstName: string
    lastName: string
    middleName: string
    fullName: string
    avatar: string
    contacts?: Contacts
}

export interface Clinic {
    id: string
    name: string
}

export interface Specialty {
    id: string
    doctorId: string
    name: string
    description: string
}

export interface Doctor {
    id: string
    appointmentId: string
    name: string
    specialties: Specialty
}

export interface Service {
    clinicId: string
    serviceId: string
    name: string
    description: string
    price: number
    duration: number
}

export interface Status {
    id: string
    key: string
    name: string
    description: string
    backgroundColor: string
    textColor: string
}

export interface Appointment {
    id: string
    date: string
    room: number
    color: string
    clinic: Clinic
    doctors: Doctor[]
    service: Service
    status: Status
    notes: string
    startMiridiem: 'AM' | 'PM' | null
}

export interface MedicalRecord {
    id: string
    clinic: Clinic
    appointments: Appointment[]
}

export interface User {
    id: string
    personalInfo: PersonalInfo
    role: string[]
    medicalRecord: MedicalRecord
}

export const PATIENTS = [
    {
        id: '47536f08-b0bb-49ce-adef-1f2c38a4cce6',
        personalInfo: {
            firstName: 'Marlow',
            lastName: 'Grand',
            middleName: 'Adolf',
            fullName: 'Marlow Grand',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyBnY2OmVc4EJcVSkmvrVZFHgFDVedUQ56GA&s',
            contacts: {
                phone: '+1-555-9876543',
                email: 'marlow.grand@example.com',
                telegramId: '12345678'
            }
        },
        role: ['USER', 'PATIENT'],
        medicalRecord: {
            id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
            clinic: {
                id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                name: 'Doctor Lab'
            },
            appointments: [
                {
                    id: 'c0dbda3e-6f81-454b-b562-4d29fd9dea54',
                    date: '2025-03-02T08:30:00.000Z',
                    startMiridiem: null,
                    room: 1,
                    color: '#4CAF50',
                    clinic: {
                        id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                        name: 'Doctor Lab'
                    },
                    doctors: [
                        {
                            id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                            appointmentId: 'c0dbda3e-6f81-454b-b592-4d29fd9dea54',
                            name: 'Dr. Emily Johnson',
                            specialties: {
                                id: '1a2b3c4d-0001-0001-0001-000000000001',
                                doctorId: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                name: 'Cardiology',
                                description: 'Diagnosis and treatment of heart and blood vessel disorders.'
                            }
                        }
                    ],
                    service: {
                        clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                        serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                        name: 'General Consultation',
                        description: 'Basic health consultation and check-up.',
                        price: 50.0,
                        duration: 30
                    },
                    status: {
                        id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                        key: 'SCHEDULED',
                        name: 'Scheduled',
                        description: 'The appointment is scheduled and confirmed.',
                        backgroundColor: '#D32F2F',
                        textColor: '#FFFFFF'
                    },
                    notes: 'Initial consultation for general check-up.'
                }
            ]
        }
    },
    {
        id: 'a2e4f7e1-1111-1111-1111-111111111111',
        personalInfo: {
            firstName: 'Oliver',
            lastName: 'Twist',
            middleName: 'James',
            fullName: 'Oliver Twist',
            avatar: 'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*',
            contacts: {
                phone: '+1-555-1000001',
                email: 'oliver.twist@example.com',
                telegramId: '22345678'
            }
        },
        role: ['USER', 'PATIENT'],
        medicalRecord: {
            id: '2741b76e-5ed9-4b1a-b558-720f14797cdb',
            clinic: {
                id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                name: 'Doctor Lab'
            },
            appointments: [
                {
                    id: 'c1dbda3e-6f81-454b-b592-4d29fd9dea55',
                    date: '2025-03-02T09:00:00.000Z',
                    startMiridiem: null,
                    room: 1,
                    color: '#4CAF50',
                    clinic: {
                        id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                        name: 'Doctor Lab'
                    },
                    doctors: [
                        {
                            id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                            appointmentId: 'c1dbda3e-6f81-454b-b592-4d29fd9dea55',
                            name: 'Dr. Emily Johnson',
                            specialties: {
                                id: '1a2b3c4d-0001-0001-0001-000000000001',
                                doctorId: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                name: 'Cardiology',
                                description: 'Diagnosis and treatment of heart and blood vessel disorders.'
                            }
                        }
                    ],
                    service: {
                        clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                        serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                        name: 'General Consultation',
                        description: 'Basic health consultation and check-up.',
                        price: 50.0,
                        duration: 90
                    },
                    status: {
                        id: '45fe64d7-39b2-49e1-9c65-07c07b804768',
                        key: 'CONFIRMED',
                        name: 'Confirmed',
                        description: 'The appointment has been confirmed.',
                        backgroundColor: '#4CAF50',
                        textColor: '#FFFFFF'
                    },
                    notes: 'Initial consultation for general check-up.'
                }
            ]
        }
    },
    {
        id: 'b3f5g8h2-2222-2222-2222-222222222222',
        personalInfo: {
            firstName: 'Emma',
            lastName: 'Stone',
            middleName: 'Grace',
            fullName: 'Emma Stone',
            avatar: 'https://i.pinimg.com/736x/b9/64/45/b96445118da9f45f16345b3218342aae.jpg',
            contact: {
                phone: '+1-555-1000002',
                email: 'emma.stone@example.com',
                telegramId: '32345678'
            }
        },
        role: ['USER', 'PATIENT'],
        medicalRecord: {
            id: '3841b76e-5ed9-4b1a-b558-720f14797cdc',
            clinic: {
                id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                name: 'Doctor Lab'
            },
            appointments: [
                {
                    id: 'c2dbda3e-6f81-454b-b592-4d29fd9dea56',
                    date: '2025-03-02T11:00:00.000Z',
                    startMiridiem: null,
                    room: 1,
                    color: '#4CAF50',
                    clinic: {
                        id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                        name: 'Doctor Lab'
                    },
                    doctors: [
                        {
                            id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                            appointmentId: 'c2dbda3e-6f81-454b-b592-4d29fd9dea56',
                            name: 'Dr. Emily Johnson',
                            specialties: {
                                id: '1a2b3c4d-0001-0001-0001-000000000001',
                                doctorId: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                name: 'Cardiology',
                                description: 'Diagnosis and treatment of heart and blood vessel disorders.'
                            }
                        }
                    ],
                    service: {
                        clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                        serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                        name: 'General Consultation',
                        description: 'Basic health consultation and check-up.',
                        price: 50.0,
                        duration: 45
                    },
                    status: {
                        id: '47536f08-b0bb-49ce-adef-1f2c38a3cce6',
                        key: 'RESCHEDULED',
                        name: 'Rescheduled',
                        description: 'The appointment has been rescheduled.',
                        backgroundColor: '#B71C1C',
                        textColor: '#FFFFFF'
                    },
                    notes: 'Initial consultation for general check-up.'
                }
            ]
        }
    },
    {
        id: 'c4g6h9i3-3333-3333-3333-333333333333',
        personalInfo: {
            firstName: 'Liam',
            lastName: 'Neeson',
            middleName: 'Patrick',
            fullName: 'Liam Neeson',
            avatar: 'https://i.pinimg.com/736x/94/f4/7d/94f47d0e4d938b79a1436bdc08f088f4.jpg',
            contact: {
                phone: '+1-555-1000003',
                email: 'liam.neeson@example.com',
                telegramId: '42345678'
            }
        },
        role: ['USER', 'PATIENT'],
        medicalRecord: {
            id: '4941b76e-5ed9-4b1a-b558-720f14797cdd',
            clinic: {
                id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                name: 'Doctor Lab'
            },
            appointments: [
                {
                    id: 'c3dbda3e-6f81-454b-b592-4d29fd9dea57',
                    date: '2025-03-02T12:00:00.000Z',
                    startMiridiem: null,
                    room: 1,
                    color: '#4CAF50',
                    clinic: {
                        id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                        name: 'Doctor Lab'
                    },
                    doctors: [
                        {
                            id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                            appointmentId: 'c3dbda3e-6f81-454b-b592-4d29fd9dea57',
                            name: 'Dr. Emily Johnson',
                            specialties: {
                                id: '1a2b3c4d-0001-0001-0001-000000000001',
                                doctorId: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                name: 'Cardiology',
                                description: 'Diagnosis and treatment of heart and blood vessel disorders.'
                            }
                        }
                    ],
                    service: {
                        clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                        serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                        name: 'General Consultation',
                        description: 'Basic health consultation and check-up.',
                        price: 50.0,
                        duration: 15
                    },
                    status: {
                        id: 'b5a4c6d8-7f98-4b11-a23d-5c6b7f8d9e12',
                        key: 'RUNNING_LATE',
                        name: 'Running late',
                        description: 'The patient is running late for the appointment.',
                        backgroundColor: '#1A237E',
                        textColor: '#FFFFFF'
                    },
                    notes: 'Initial consultation for general check-up.'
                }
            ]
        }
    },
    {
        id: 'd5h7i0j4-4444-4444-4444-444444444444',
        personalInfo: {
            firstName: 'Ava',
            lastName: 'Green',
            middleName: 'Marie',
            fullName: 'Ava Green',
            avatar: 'https://i.pinimg.com/736x/f2/75/21/f2752143d53dfa7e80e785b069734539.jpg',
            contact: {
                phone: '+1-555-1000004',
                email: 'ava.green@example.com',
                telegramId: '52345678'
            }
        },
        role: ['USER', 'PATIENT'],
        medicalRecord: {
            id: '5a41b76e-5ed9-4b1a-b558-720f14797cde',
            clinic: {
                id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                name: 'Doctor Lab'
            },
            appointments: [
                {
                    id: 'c4dbda3e-6f81-454b-b592-4d29fd9dea58',
                    date: '2025-03-02T12:30:00.000Z',
                    startMiridiem: null,
                    room: 1,
                    color: '#4CAF50',
                    clinic: {
                        id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                        name: 'Doctor Lab'
                    },
                    doctors: [
                        {
                            id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                            appointmentId: 'c4dbda3e-6f81-454b-b592-4d29fd9dea58',
                            name: 'Dr. Emily Johnson',
                            specialties: {
                                id: '1a2b3c4d-0001-0001-0001-000000000001',
                                doctorId: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                name: 'Cardiology',
                                description: 'Diagnosis and treatment of heart and blood vessel disorders.'
                            }
                        }
                    ],
                    service: {
                        clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                        serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                        name: 'General Consultation',
                        description: 'Basic health consultation and check-up.',
                        price: 50.0,
                        duration: 30
                    },
                    status: {
                        id: 'c6d7e8f9-4a56-4b12-b34d-6e7f8g9h0i13',
                        key: 'IN_MEDICAL_APPOINTMENT',
                        name: 'In a medical appointment',
                        description: 'The patient is currently in a medical appointment.',
                        backgroundColor: '#0288D1',
                        textColor: '#FFFFFF'
                    },
                    notes: 'Initial consultation for general check-up.'
                }
            ]
        }
    }
]
