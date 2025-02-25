export const PATIENTS = [
    {
        id: '47536f08-b0bb-49ce-adef-1f2c38a4cce6',
        role: ['USER', 'PATIENT'],
        patientMedicalRecord: {
            id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
            firstName: 'Marlow',
            lastName: 'Grand',
            middleName: 'Adolf',
            fullName: 'Marlow Grand',
            role: ['USER', 'PATIENT'],
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyBnY2OmVc4EJcVSkmvrVZFHgFDVedUQ56GA&s',
            phone: '+1-555-9876543',
            email: 'marlow.grand@example.com',
            telegramId: '12345678',
            clinic: {
                id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                name: 'Doctor Lab'
            },
            appointments: [
                {
                    id: 'c0dbda3e-6f81-454b-b562-4d29fd9dea54',
                    date: '2025-03-01T10:00:00.000Z',
                    clinic: {
                        id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                        name: 'Doctor Lab'
                    },
                    time: '2025-03-01T10:00:00.000Z',
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
                        description: 'The appointment is scheduled and confirmed.'
                    },
                    notes: 'Initial consultation for general check-up.'
                }
            ]
        }
    },
    {
        id: 'a2e4f7e1-1111-1111-1111-111111111111',
        role: ['USER', 'PATIENT'],
        patientMedicalRecord: {
            id: '2741b76e-5ed9-4b1a-b558-720f14797cdb',
            firstName: 'Oliver',
            lastName: 'Twist',
            middleName: 'James',
            fullName: 'Oliver Twist',
            role: ['USER', 'PATIENT'],
            avatar: 'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*',
            phone: '+1-555-1000001',
            email: 'oliver.twist@example.com',
            telegramId: '22345678',
            clinic: {
                id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                name: 'Doctor Lab'
            },
            appointments: [
                {
                    id: 'c1dbda3e-6f81-454b-b592-4d29fd9dea55',
                    date: '2025-03-02T11:00:00.000Z',
                    clinic: {
                        id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                        name: 'Doctor Lab'
                    },
                    time: '2025-03-02T11:00:00.000Z',
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
                        duration: 30
                    },
                    status: {
                        id: '47536f08-b0bb-49ce-adef-1f2c38a3cce6',
                        key: 'NO_SHOW',
                        name: 'No Show',
                        description: 'The patient did not show up for the scheduled appointment.'
                    },
                    notes: 'Initial consultation for general check-up.'
                }
            ]
        }
    },
    {
        id: 'b3f5g8h2-2222-2222-2222-222222222222',
        role: ['USER', 'PATIENT'],
        patientMedicalRecord: {
            id: '3841b76e-5ed9-4b1a-b558-720f14797cdc',
            firstName: 'Emma',
            lastName: 'Stone',
            middleName: 'Grace',
            fullName: 'Emma Stone',
            role: ['USER', 'PATIENT'],
            avatar: 'https://i.pinimg.com/736x/b9/64/45/b96445118da9f45f16345b3218342aae.jpg',
            phone: '+1-555-1000002',
            email: 'emma.stone@example.com',
            telegramId: '32345678',
            clinic: {
                id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                name: 'Doctor Lab'
            },
            appointments: [
                {
                    id: 'c2dbda3e-6f81-454b-b592-4d29fd9dea56',
                    date: '2025-03-03T12:00:00.000Z',
                    clinic: {
                        id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                        name: 'Doctor Lab'
                    },
                    time: '2025-03-03T12:00:00.000Z',
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
                        duration: 30
                    },
                    status: {
                        id: '45fe64d7-39b2-49e1-9c65-07c07b804768',
                        key: 'COMPLETED',
                        name: 'Completed',
                        description: 'The appointment has been successfully completed.'
                    },
                    notes: 'Initial consultation for general check-up.'
                }
            ]
        }
    },
    {
        id: 'c4g6h9i3-3333-3333-3333-333333333333',
        role: ['USER', 'PATIENT'],
        patientMedicalRecord: {
            id: '4941b76e-5ed9-4b1a-b558-720f14797cdd',
            firstName: 'Liam',
            lastName: 'Neeson',
            middleName: 'Patrick',
            fullName: 'Liam Neeson',
            role: ['USER', 'PATIENT'],
            avatar: 'https://i.pinimg.com/736x/94/f4/7d/94f47d0e4d938b79a1436bdc08f088f4.jpg',
            phone: '+1-555-1000003',
            email: 'liam.neeson@example.com',
            telegramId: '42345678',
            clinic: {
                id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                name: 'Doctor Lab'
            },
            appointments: [
                {
                    id: 'c3dbda3e-6f81-454b-b592-4d29fd9dea57',
                    date: '2025-03-04T13:00:00.000Z',
                    time: '2025-03-04T13:00:00.000Z',
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
                        duration: 30
                    },
                    status: {
                        id: '619ab33b-3b2f-475a-bc74-2faf2d529d23',
                        key: 'CANCELLED',
                        name: 'Cancelled',
                        description: 'The appointment has been cancelled by the patient or the clinic.'
                    },
                    notes: 'Initial consultation for general check-up.'
                }
            ]
        }
    },
    {
        id: 'd5h7i0j4-4444-4444-4444-444444444444',
        role: ['USER', 'PATIENT'],
        patientMedicalRecord: {
            id: '5a41b76e-5ed9-4b1a-b558-720f14797cde',
            firstName: 'Ava',
            lastName: 'Green',
            middleName: 'Marie',
            fullName: 'Ava Green',
            role: ['USER', 'PATIENT'],
            avatar: 'https://i.pinimg.com/736x/f2/75/21/f2752143d53dfa7e80e785b069734539.jpg',
            phone: '+1-555-1000004',
            email: 'ava.green@example.com',
            telegramId: '52345678',
            clinic: {
                id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                name: 'Doctor Lab'
            },
            appointments: [
                {
                    id: 'c4dbda3e-6f81-454b-b592-4d29fd9dea58',
                    date: '2025-03-05T14:00:00.000Z',
                    clinic: {
                        id: 'd43aaa98-f878-4a4e-abe1-ebc840e4a813',
                        name: 'Doctor Lab'
                    },
                    time: '2025-03-05T14:00:00.000Z',
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
                        id: 'd872c318-c16d-4b04-b370-be32cedcaeb1',
                        key: 'RESCHEDULED',
                        name: 'Rescheduled',
                        description: 'The appointment has been rescheduled to a new date or time.'
                    },
                    notes: 'Initial consultation for general check-up.'
                }
            ]
        }
    }
]
