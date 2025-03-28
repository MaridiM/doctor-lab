export const USER = {
    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
    phone: '+1-555-9876543',
    email: 'alice.brown@example.com',
    password: '1234560',
    verificationEmail: true,
    verificationPhone: true,
    telegramId: '12345678',
    role: ['USER', 'CLINIC'],
    organization: true,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyBnY2OmVc4EJcVSkmvrVZFHgFDVedUQ56GA&s',
    organizations: [
        {
            id: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
            name: 'Doctor Lab',
            type: 'CLINIC',
            userId: '1641b76e-5ed9-4b1a-b558-720f14797cda',
            services: [
                {
                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                    id: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                    name: 'General Consultation',
                    description: 'Basic health consultation and check-up.',
                    price: 50.0,
                    duration: '30 minutes'
                },
                {
                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                    id: 'b1c2d3e4-f5a6-7890-1234-56789abcdef0',
                    name: 'Pediatric Care',
                    description: 'Health care services for children.',
                    price: 70.0,
                    duration: '45 minutes'
                },
                {
                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                    id: 'c2d3e4f5-a6b7-8901-2345-6789abcdef01',
                    name: 'Dental Cleaning',
                    description: 'Professional teeth cleaning service.',
                    price: 80.0,
                    duration: '1 hour'
                },
                {
                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                    id: 'd3e4f5a6-b7c8-9012-3456-789abcdef012',
                    name: 'Eye Examination',
                    description: 'Comprehensive eye exam and vision testing.',
                    price: 60.0,
                    duration: '30 minutes'
                },
                {
                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                    id: 'e4f5a6b7-c8d9-0123-4567-89abcdef0123',
                    name: 'Physical Therapy',
                    description: 'Therapeutic exercises and rehabilitation sessions.',
                    price: 100.0,
                    duration: '1 hour'
                }
            ],
            patients: [
                // Existing patient record
                {
                    id: '205108ef-630a-4bf4-b7d3-89c16ac76b16',
                    patientMedicalRecordId: {
                        id: '90be5aee-7fc8-4a39-a06f-248bde5c50de',
                        patientId: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                        firstName: 'Marlow',
                        lastName: 'Grand',
                        middleName: 'Adolf',
                        fullName: 'Marlow Grand',
                        dob: '1992-04-18T00:00:00.000Z',
                        gender: 'male',
                        phone: '+1-555-2875743',
                        email: 'marlow.grand@example.com',
                        address: '457 Malt St, Springfield, IL, 62704',
                        medicalHistory: [
                            {
                                condition: 'Hypertension',
                                diagnosisDate: '2020-05-10T00:00:00.000Z',
                                notes: 'Under control with medication.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'top-attachment-existing',
                                filename: 'marlow_report.pdf',
                                url: 'https://example.com/marlow_report.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'c0dbda3e-6f81-454b-b592-4d29fd9dea54',
                                date: '2025-03-01T10:00:00.000Z',
                                from: '2025-03-01T10:00:00.000Z',
                                to: '2025-03-01T11:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                        appointmentId: 'c0dbda3e-6f81-454b-b592-4d29fd9dea54',
                                        name: 'Dr. Emily Johnson'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Initial consultation for general check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    firstName: 'Marlow',
                                    lastName: 'Grand',
                                    middleName: 'Adolf',
                                    fullName: 'Marlow Grand',
                                    role: ['USER', 'PATIENT'],
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'aa0f57ac-0b92-4890-a29c-66148268f7f9'
                },
                // 10 new patient records
                {
                    id: 'a1111111-1111-1111-1111-111111111111',
                    patientMedicalRecordId: {
                        id: 'b1111111-1111-1111-1111-111111111111',
                        patientId: 'c1111111-1111-1111-1111-111111111111',
                        firstName: 'Oliver',
                        lastName: 'Twist',
                        middleName: 'James',
                        fullName: 'Oliver Twist',
                        dob: '1980-01-01T00:00:00.000Z',
                        gender: 'male',
                        phone: '+1-555-1000001',
                        email: 'oliver.twist@example.com',
                        address: '101 First St, Springfield, IL, 62704',
                        avatar: 'https://example.com/avatar1.png',
                        medicalHistory: [
                            {
                                condition: 'Hypertension',
                                diagnosisDate: '2020-05-10T00:00:00.000Z',
                                notes: 'Under control with medication.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'd1111111-1111-1111-1111-111111111111',
                                filename: 'report1.pdf',
                                url: 'https://example.com/report1.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'e1111111-1111-1111-1111-111111111111',
                                date: '2025-02-24T09:00:00.000Z',
                                from: '2025-02-24T09:00:00.000Z',
                                to: '2025-02-24T10:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                        appointmentId: 'e1111111-1111-1111-1111-111111111111',
                                        name: 'Dr. Emily Johnson'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Appointment for routine check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    firstName: 'Oliver',
                                    lastName: 'Twist',
                                    middleName: 'James',
                                    fullName: 'Oliver Twist',
                                    role: ['USER', 'PATIENT'],
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'c1111111-1111-1111-1111-111111111111'
                },
                {
                    id: 'a2222222-2222-2222-2222-222222222222',
                    patientMedicalRecordId: {
                        id: 'b2222222-2222-2222-2222-222222222222',
                        patientId: 'c2222222-2222-2222-2222-222222222222',
                        firstName: 'Emma',
                        lastName: 'Stone',
                        middleName: 'Grace',
                        fullName: 'Emma Stone',
                        dob: '1985-02-02T00:00:00.000Z',
                        gender: 'female',
                        phone: '+1-555-1000002',
                        email: 'emma.stone@example.com',
                        address: '102 Second St, Springfield, IL, 62704',
                        avatar: 'https://example.com/avatar2.png',
                        medicalHistory: [
                            {
                                condition: 'Diabetes',
                                diagnosisDate: '2019-03-15T00:00:00.000Z',
                                notes: 'Managed with diet and exercise.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'd2222222-2222-2222-2222-222222222222',
                                filename: 'report2.pdf',
                                url: 'https://example.com/report2.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'e2222222-2222-2222-2222-222222222222',
                                date: '2025-02-24T09:00:00.000Z',
                                from: '2025-02-24T09:00:00.000Z',
                                to: '2025-02-24T10:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'd3e4f5a6-b7c8-9012-3456-789abcdef012',
                                        appointmentId: 'e2222222-2222-2222-2222-222222222222',
                                        name: 'Dr. Michael Lee'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Appointment for routine check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    firstName: 'Emma',
                                    lastName: 'Stone',
                                    middleName: 'Grace',
                                    fullName: 'Emma Stone',
                                    role: ['USER', 'PATIENT'],
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'c2222222-2222-2222-2222-222222222222'
                },
                {
                    id: 'a3333333-3333-3333-3333-333333333333',
                    patientMedicalRecordId: {
                        id: 'b3333333-3333-3333-3333-333333333333',
                        patientId: 'c3333333-3333-3333-3333-333333333333',
                        firstName: 'Liam',
                        lastName: 'Neeson',
                        middleName: 'Patrick',
                        fullName: 'Liam Neeson',
                        dob: '1975-03-03T00:00:00.000Z',
                        gender: 'male',
                        phone: '+1-555-1000003',
                        email: 'liam.neeson@example.com',
                        address: '103 Third St, Springfield, IL, 62704',
                        avatar: 'https://example.com/avatar3.png',
                        medicalHistory: [
                            {
                                condition: 'Asthma',
                                diagnosisDate: '2018-07-20T00:00:00.000Z',
                                notes: 'Uses inhaler as needed.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'd3333333-3333-3333-3333-333333333333',
                                filename: 'report3.pdf',
                                url: 'https://example.com/report3.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'e3333333-3333-3333-3333-333333333333',
                                date: '2025-02-24T09:00:00.000Z',
                                from: '2025-02-24T09:00:00.000Z',
                                to: '2025-02-24T10:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                        appointmentId: 'e3333333-3333-3333-3333-333333333333',
                                        name: 'Dr. Emily Johnson'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Appointment for routine check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    firstName: 'Liam',
                                    lastName: 'Neeson',
                                    middleName: 'Patrick',
                                    fullName: 'Liam Neeson',
                                    role: ['USER', 'PATIENT'],
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'c3333333-3333-3333-3333-333333333333'
                },
                {
                    id: 'a4444444-4444-4444-4444-444444444444',
                    patientMedicalRecordId: {
                        id: 'b4444444-4444-4444-4444-444444444444',
                        patientId: 'c4444444-4444-4444-4444-444444444444',
                        firstName: 'Ava',
                        lastName: 'Green',
                        middleName: 'Marie',
                        fullName: 'Ava Green',
                        dob: '1990-04-04T00:00:00.000Z',
                        gender: 'female',
                        phone: '+1-555-1000004',
                        email: 'ava.green@example.com',
                        address: '104 Fourth St, Springfield, IL, 62704',
                        avatar: 'https://example.com/avatar4.png',
                        medicalHistory: [
                            {
                                condition: 'Flu',
                                diagnosisDate: '2021-11-05T00:00:00.000Z',
                                notes: 'Recovered fully.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'd4444444-4444-4444-4444-444444444444',
                                filename: 'report4.pdf',
                                url: 'https://example.com/report4.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'e4444444-4444-4444-4444-444444444444',
                                date: '2025-02-24T09:00:00.000Z',
                                from: '2025-02-24T09:00:00.000Z',
                                to: '2025-02-24T10:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'd3e4f5a6-b7c8-9012-3456-789abcdef012',
                                        appointmentId: 'e4444444-4444-4444-4444-444444444444',
                                        name: 'Dr. Michael Lee'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Appointment for routine check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    firstName: 'Ava',
                                    lastName: 'Green',
                                    middleName: 'Marie',
                                    fullName: 'Ava Green',
                                    role: ['USER', 'PATIENT'],
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'c4444444-4444-4444-4444-444444444444'
                },
                {
                    id: 'a5555555-5555-5555-5555-555555555555',
                    patientMedicalRecordId: {
                        id: 'b5555555-5555-5555-5555-555555555555',
                        patientId: 'c5555555-5555-5555-5555-555555555555',
                        firstName: 'Noah',
                        lastName: 'Brown',
                        middleName: 'Alexander',
                        fullName: 'Noah Brown',
                        dob: '1988-05-05T00:00:00.000Z',
                        gender: 'male',
                        phone: '+1-555-1000005',
                        email: 'noah.brown@example.com',
                        address: '105 Fifth St, Springfield, IL, 62704',
                        avatar: 'https://example.com/avatar5.png',
                        medicalHistory: [
                            {
                                condition: 'Migraine',
                                diagnosisDate: '2017-08-15T00:00:00.000Z',
                                notes: 'Recurring headaches.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'd5555555-5555-5555-5555-555555555555',
                                filename: 'report5.pdf',
                                url: 'https://example.com/report5.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'e5555555-5555-5555-5555-555555555555',
                                date: new Date(),
                                from: '2025-02-25T09:00:00.000Z',
                                to: '2025-02-25T10:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                        appointmentId: 'e5555555-5555-5555-5555-555555555555',
                                        name: 'Dr. Emily Johnson'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Appointment for routine check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    role: ['USER', 'PATIENT'],
                                    firstName: 'Noah',
                                    lastName: 'Brown',
                                    middleName: 'Alexander',
                                    fullName: 'Noah Brown',
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'c5555555-5555-5555-5555-555555555555'
                },
                {
                    id: 'a6666666-6666-6666-6666-666666666666',
                    patientMedicalRecordId: {
                        id: 'b6666666-6666-6666-6666-666666666666',
                        patientId: 'c6666666-6666-6666-6666-666666666666',
                        firstName: 'Sophia',
                        lastName: 'White',
                        middleName: 'Rose',
                        fullName: 'Sophia White',
                        dob: '1992-06-06T00:00:00.000Z',
                        gender: 'female',
                        phone: '+1-555-1000006',
                        email: 'sophia.white@example.com',
                        address: '106 Sixth St, Springfield, IL, 62704',
                        avatar: 'https://example.com/avatar6.png',
                        medicalHistory: [
                            {
                                condition: 'Arthritis',
                                diagnosisDate: '2016-09-10T00:00:00.000Z',
                                notes: 'Chronic joint pain.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'd6666666-6666-6666-6666-666666666666',
                                filename: 'report6.pdf',
                                url: 'https://example.com/report6.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'e6666666-6666-6666-6666-666666666666',
                                date: new Date(),
                                from: '2025-02-25T09:00:00.000Z',
                                to: '2025-02-25T10:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'd3e4f5a6-b7c8-9012-3456-789abcdef012',
                                        appointmentId: 'e6666666-6666-6666-6666-666666666666',
                                        name: 'Dr. Michael Lee'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Appointment for routine check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    firstName: 'Sophia',
                                    lastName: 'White',
                                    middleName: 'Rose',
                                    fullName: 'Sophia White',
                                    role: ['USER', 'PATIENT'],
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'c6666666-6666-6666-6666-666666666666'
                },
                {
                    id: 'a7777777-7777-7777-7777-777777777777',
                    patientMedicalRecordId: {
                        id: 'b7777777-7777-7777-7777-777777777777',
                        patientId: 'c7777777-7777-7777-7777-777777777777',
                        firstName: 'Mason',
                        lastName: 'Black',
                        middleName: 'Edward',
                        fullName: 'Mason Black',
                        dob: '1983-07-07T00:00:00.000Z',
                        gender: 'male',
                        phone: '+1-555-1000007',
                        email: 'mason.black@example.com',
                        address: '107 Seventh St, Springfield, IL, 62704',
                        avatar: 'https://example.com/avatar7.png',
                        medicalHistory: [
                            {
                                condition: 'Allergy',
                                diagnosisDate: '2021-01-20T00:00:00.000Z',
                                notes: 'Seasonal allergies.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'd7777777-7777-7777-7777-777777777777',
                                filename: 'report7.pdf',
                                url: 'https://example.com/report7.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'e7777777-7777-7777-7777-777777777777',
                                date: new Date(),
                                from: '2025-02-25T09:00:00.000Z',
                                to: '2025-02-25T10:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                        appointmentId: 'e7777777-7777-7777-7777-777777777777',
                                        name: 'Dr. Emily Johnson'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Appointment for routine check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    role: ['USER', 'PATIENT'],
                                    firstName: 'Mason',
                                    lastName: 'Black',
                                    middleName: 'Edward',
                                    fullName: 'Mason Black',
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'c7777777-7777-7777-7777-777777777777'
                },
                {
                    id: 'a8888888-8888-8888-8888-888888888888',
                    patientMedicalRecordId: {
                        id: 'b8888888-8888-8888-8888-888888888888',
                        patientId: 'c8888888-8888-8888-8888-888888888888',
                        firstName: 'Isabella',
                        lastName: 'Gray',
                        middleName: 'Louise',
                        fullName: 'Isabella Gray',
                        dob: '1995-08-08T00:00:00.000Z',
                        gender: 'female',
                        phone: '+1-555-1000008',
                        email: 'isabella.gray@example.com',
                        address: '108 Eighth St, Springfield, IL, 62704',
                        avatar: 'https://example.com/avatar8.png',
                        medicalHistory: [
                            {
                                condition: 'Obesity',
                                diagnosisDate: '2018-12-12T00:00:00.000Z',
                                notes: 'Under dietary supervision.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'd8888888-8888-8888-8888-888888888888',
                                filename: 'report8.pdf',
                                url: 'https://example.com/report8.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'e8888888-8888-8888-8888-888888888888',
                                date: '2025-02-26T09:00:00.000Z',
                                from: '2025-02-26T09:00:00.000Z',
                                to: '2025-02-26T10:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'd3e4f5a6-b7c8-9012-3456-789abcdef012',
                                        appointmentId: 'e8888888-8888-8888-8888-888888888888',
                                        name: 'Dr. Michael Lee'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Appointment for routine check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    role: ['USER', 'PATIENT'],
                                    firstName: 'Isabella',
                                    lastName: 'Gray',
                                    middleName: 'Louise',
                                    fullName: 'Isabella Gray',
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'c8888888-8888-8888-8888-888888888888'
                },
                {
                    id: 'a9999999-9999-9999-9999-999999999999',
                    patientMedicalRecordId: {
                        id: 'b9999999-9999-9999-9999-999999999999',
                        patientId: 'c9999999-9999-9999-9999-999999999999',
                        firstName: 'Ethan',
                        lastName: 'King',
                        middleName: 'Robert',
                        fullName: 'Ethan King',
                        dob: '1978-09-09T00:00:00.000Z',
                        gender: 'male',
                        phone: '+1-555-1000009',
                        email: 'ethan.king@example.com',
                        address: '109 Ninth St, Springfield, IL, 62704',
                        avatar: 'https://example.com/avatar9.png',
                        medicalHistory: [
                            {
                                condition: 'Depression',
                                diagnosisDate: '2022-03-03T00:00:00.000Z',
                                notes: 'Under therapy.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'd9999999-9999-9999-9999-999999999999',
                                filename: 'report9.pdf',
                                url: 'https://example.com/report9.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'e9999999-9999-9999-9999-999999999999',
                                date: '2025-02-26T09:00:00.000Z',
                                from: '2025-02-26T09:00:00.000Z',
                                to: '2025-02-26T10:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'f0e1d2c3-b4a5-6c7d-8e9f-0a1b2c3d4e5f',
                                        appointmentId: 'e9999999-9999-9999-9999-999999999999',
                                        name: 'Dr. Emily Johnson'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Appointment for routine check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    firstName: 'Ethan',
                                    lastName: 'King',
                                    middleName: 'Robert',
                                    fullName: 'Ethan King',
                                    role: ['USER', 'PATIENT'],
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'c9999999-9999-9999-9999-999999999999'
                },
                {
                    id: 'a10101010-1010-1010-1010-101010101010',
                    patientMedicalRecordId: {
                        id: 'b10101010-1010-1010-1010-101010101010',
                        patientId: 'c10101010-1010-1010-1010-101010101010',
                        firstName: 'Mia',
                        lastName: 'Queen',
                        middleName: 'Elizabeth',
                        fullName: 'Mia Queen',
                        dob: '1993-10-10T00:00:00.000Z',
                        gender: 'female',
                        phone: '+1-555-1010101',
                        email: 'mia.queen@example.com',
                        address: '110 Tenth St, Springfield, IL, 62704',
                        avatar: 'https://example.com/avatar10.png',
                        medicalHistory: [
                            {
                                condition: 'Anxiety',
                                diagnosisDate: '2020-10-10T00:00:00.000Z',
                                notes: 'Under treatment with therapy.'
                            }
                        ],
                        attachments: [
                            {
                                attachmentId: 'd10101010-1010-1010-1010-101010101010',
                                filename: 'report10.pdf',
                                url: 'https://example.com/report10.pdf',
                                type: 'pdf'
                            }
                        ],
                        appointments: [
                            {
                                id: 'e10101010-1010-1010-1010-101010101010',
                                date: '2025-02-26T09:00:00.000Z',
                                from: '2025-02-26T09:00:00.000Z',
                                to: '2025-02-26T10:00:00.000Z',
                                doctors: [
                                    {
                                        id: 'd3e4f5a6-b7c8-9012-3456-789abcdef012',
                                        appointmentId: 'e10101010-1010-1010-1010-101010101010',
                                        name: 'Dr. Michael Lee'
                                    }
                                ],
                                service: {
                                    clinicId: '21793f8d-d0ee-4d3b-9766-58e8596f42e1',
                                    serviceId: 'a0c1b2d3-e4f5-6789-0123-456789abcdef',
                                    name: 'General Consultation',
                                    description: 'Basic health consultation and check-up.',
                                    price: 50.0,
                                    duration: '30 minutes'
                                },
                                status: {
                                    id: '46d0aae7-4608-44ea-baa3-1ea4ccae583c',
                                    key: 'SCHEDULED',
                                    name: 'Scheduled',
                                    description: 'The appointment is scheduled and confirmed.'
                                },
                                notes: 'Appointment for routine check-up.',
                                user: {
                                    id: '1641b76e-5ed9-4b1a-b558-720f14797cda',
                                    firstName: 'Mia',
                                    lastName: 'Queen',
                                    middleName: 'Elizabeth',
                                    fullName: 'Mia Queen',
                                    role: ['USER', 'PATIENT'],
                                    avatar: 'https://example.com/user_avatar.png',
                                    phone: '+1-555-9876543',
                                    email: 'alice.brown@example.com',
                                    telegramId: '12345678'
                                }
                            }
                        ]
                    },
                    patientId: 'c10101010-1010-1010-1010-101010101010'
                }
            ]
        }
    ],
    patientMedicalRecord: {
        id: '9338a543-5d4a-4e87-a275-45b7e0883bcb',
        patientId: '1641b76e-5ed9-4b1a-b558-720f14797cda',
        firstName: 'Alice',
        lastName: 'Brown',
        middleName: 'Ralf',
        fullName: 'Alice Brown',
        dob: '1995-06-15T00:00:00.000Z',
        gender: 'female',
        phone: '+1-555-9876543',
        email: 'alice.brown@example.com',
        address: '456 Elm St, Springfield, IL, 62704',
        attachments: [
            {
                attachmentId: 'top-attachment-uuid',
                filename: 'top_report.pdf',
                url: 'https://example.com/top_report.pdf',
                type: 'pdf'
            }
        ],
        medicalHistory: [
            {
                condition: 'Asthma',
                diagnosisDate: '2005-08-20T00:00:00.000Z',
                notes: 'Mild condition, managed with inhaler.'
            }
        ],
        medications: [
            {
                medicationId: 'z1x2c3v4-b5n6-m7l8-k9j0-h1g2f3d4s5a6',
                name: 'Albuterol',
                dosage: '90mcg',
                frequency: 'As needed',
                duration: 'Ongoing'
            }
        ],
        appointments: [],
        prescriptions: [],
        payments: [],
        labResults: [],
        imaging: [],
        notes: 'Regular follow-up recommended annually.'
    }
}
