'use client'

import { UserPlus2, Users2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { memo } from 'react'

import { Button, WidgetHeader } from '@/shared/components'
import { PATHS } from '@/shared/config'

export const PatientsHeader = memo(function PatientsHeader() {
    const t = useTranslations('dashboard')

    return (
        <WidgetHeader title={t('patients.title')} icon={<Users2 className='size-5 stroke-text-foreground' />}>
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
        </WidgetHeader>
    )
})
