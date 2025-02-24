'use client'

import { UserPlus2, Users2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button, ScrollArea, UserAvatar } from '@/shared/components'
import { PATHS } from '@/shared/config'

export function Patients() {
    const t = useTranslations('dashboard')

    return (
        <section className='flex h-full w-full flex-col gap-2'>
            <section className='flex h-full max-h-[240px] w-full gap-2'>
                <div className='w-full rounded-lg bg-card p-4 border-20'>Widgets 1</div>
                <div className='w-full rounded-lg bg-card p-4 border-20'>Widgets 2</div>
            </section>
            <section className='h-full w-full overflow-hidden rounded-lg bg-card border-20'>
                <header className='flex h-14 items-center justify-between px-4 py-2 border-b-20'>
                    <div className='flex items-center gap-2'>
                        <span className='rounded-md bg-primary p-1.5'>
                            <Users2 className='size-5 stroke-text-foreground' />
                        </span>
                        <span className='text-h4 font-normal text-text'>Schedules</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Button variant='outline' size='sm' className='pt-px'>
                            <Link href={PATHS.appointments}>{t('tasks.header.all')}</Link>
                        </Button>

                        <Button
                            size='icon'
                            icon='sm'
                            variant='primary'
                            tooltip={{
                                children: 'Add new appointment',
                                align: 'center',
                                side: 'bottom'
                            }}
                            onClick={() => console.log('Add appointment')}
                        >
                            <UserPlus2 className='stroke-text-foreground' />
                        </Button>
                    </div>
                </header>
                <ScrollArea className='flex h-full max-h-[calc(100vh-386px)] w-full' type='auto'>
                    <ul className='flex bg-green-500'>
                        <li>
                            <header></header>
                            <div>
                                <div>
                                    <UserAvatar fullName='Robert Traram' />
                                </div>
                            </div>
                            <footer></footer>
                        </li>
                    </ul>
                </ScrollArea>
            </section>
        </section>
    )
}
