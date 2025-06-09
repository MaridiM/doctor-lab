export interface IAppointment {
    id: string
    date: string
    startMiridiem: 'AM' | 'PM' | null
    room: string | number
    color: string
    patient: {
        firstName: string
        lastName: string
        middleName: string
        fullName: string
        avatar: string
        contacts: {
            phone: string
            email: string
            telegramId: string
        }
    }
    doctors: [
        {
            id: string
            appointmentId: string
            name: string
            specialties: {
                id: string
                doctorId: string
                name: string
                description: string
            }
        }
    ]
    service: {
        clinicId: string
        serviceId: string
        name: string
        description: string
        price: {
            amount: number
            currency: string
            symbol: string
        }
        duration: number
    }
    notes: string
}

export const APPOINTMENTS: IAppointment[] = [
    {
        id: 'c0dbda3e-6f81-454b-b562-4d29fd9dea88',
        date: '2025-06-06T08:30:00.000Z',
        startMiridiem: null,
        room: 1,
        color: '#4CAF50',
        patient: {
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
            duration: 30,
            price: {
                amount: 50.0,
                currency: 'USD',
                symbol: '$'
            }
        },
        notes: 'Initial consultation for general check-up.'
    },
    {
        id: 'c1dbda3e-6f81-454b-b592-4d29fd9dea55',
        date: '2025-06-06T09:00:00.000Z',
        startMiridiem: null,
        room: 1,
        color: '#4CAF50',
        patient: {
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
            duration: 90,
            price: {
                amount: 50.0,
                currency: 'USD',
                symbol: '$'
            }
        },
        notes: 'Initial consultation for general check-up.'
    },
    {
        id: 'c2dbda3e-6f81-454b-b592-4d29fd9dea56',
        date: '2025-06-06T11:00:00.000Z',
        startMiridiem: null,
        room: 1,
        color: '#4CAF50',
        patient: {
            firstName: 'Emma',
            lastName: 'Stone',
            middleName: 'Grace',
            fullName: 'Emma Stone',
            avatar: 'https://i.pinimg.com/736x/b9/64/45/b96445118da9f45f16345b3218342aae.jpg',
            contacts: {
                phone: '+1-555-1000002',
                email: 'emma.stone@example.com',
                telegramId: '32345678'
            }
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
            duration: 45,
            price: {
                amount: 50.0,
                currency: 'USD',
                symbol: '$'
            }
        },
        notes: 'Initial consultation for general check-up.'
    },
    {
        id: 'c3dbda3e-6f81-454b-b592-4d29fd9dea57',
        date: '2025-06-06T12:00:00.000Z',
        startMiridiem: null,
        room: 1,
        color: '#4CAF50',
        patient: {
            firstName: 'Liam',
            lastName: 'Neeson',
            middleName: 'Patrick',
            fullName: 'Liam Neeson',
            avatar: 'https://i.pinimg.com/736x/94/f4/7d/94f47d0e4d938b79a1436bdc08f088f4.jpg',
            contacts: {
                phone: '+1-555-1000003',
                email: 'liam.neeson@example.com',
                telegramId: '42345678'
            }
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
            duration: 15,
            price: {
                amount: 50.0,
                currency: 'USD',
                symbol: '$'
            }
        },
        notes: 'Initial consultation for general check-up.'
    },
    {
        id: 'c4dbda3e-6f81-454b-b592-4d29fd9dea58',
        date: '2025-06-06T12:30:00.000Z',
        startMiridiem: null,
        room: 1,
        color: '#4CAF50',
        patient: {
            firstName: 'Ava',
            lastName: 'Green',
            middleName: 'Marie',
            fullName: 'Ava Green',
            avatar: 'https://i.pinimg.com/736x/f2/75/21/f2752143d53dfa7e80e785b069734539.jpg',
            contacts: {
                phone: '+1-555-1000004',
                email: 'ava.green@example.com',
                telegramId: '52345678'
            }
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
            duration: 30,
            price: {
                amount: 50.0,
                currency: 'USD',
                symbol: '$'
            }
        },
        notes: 'Initial consultation for general check-up.'
    }
]