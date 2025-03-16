'use client'

import { UserPlus2, Users2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { memo } from 'react'

import { Button } from '@/shared/components'
import { PATHS } from '@/shared/config'

export const PatientsHeader = memo(function PatientsHeader() {
    const t = useTranslations('dashboard')

    return (
        <header className='flex h-14 items-center justify-between bg-card px-4 py-2 border-b-20'>
            <div className='flex items-center gap-2'>
                <span className='rounded-md bg-primary p-1.5'>
                    <Users2 className='size-5 stroke-text-foreground' />
                </span>
                <span className='text-h4 font-normal text-text'>{t('patients.title')}</span>
            </div>

            <div className='flex items-center gap-2'>
                <Button variant='outline' size='sm' className='pt-px' asChild>
                    <Link href={PATHS.patients}>{t('patients.header.all')}</Link>
                </Button>

                <Button
                    size='icon'
                    icon='sm'
                    variant='primary'
                    tooltip={{
                        children: t('patients.header.addPatient'),
                        align: 'center',
                        side: 'bottom'
                    }}
                    onClick={() => console.log('Add New Patient')}
                >
                    <UserPlus2 className='stroke-text-foreground' />
                </Button>
            </div>
        </header>
    )
})
