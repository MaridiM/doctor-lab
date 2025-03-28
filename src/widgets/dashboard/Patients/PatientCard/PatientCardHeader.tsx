'use client'

import {
    BellRing,
    CalendarClock,
    CalendarX2,
    EllipsisVertical,
    IdCard,
    LucideIcon,
    MessagesSquare,
    Phone,
    UserPen
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'

import { Appointment } from '@/shared/api/mock/patients.mock'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components'

type TMenu = 'notify' | 'edit' | 'reschedule' | 'cancel' | 'chart'

interface IMenu {
    icon: LucideIcon
    label: TMenu
}
interface IProps {
    appointment: Appointment
}

export function PatientCardHeader({ appointment }: IProps) {
    const t = useTranslations('dashboard')

    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const menuItems: IMenu[] = useMemo(
        () => [
            { icon: BellRing, label: 'notify' },
            { icon: UserPen, label: 'edit' },
            { icon: CalendarClock, label: 'reschedule' },
            { icon: CalendarX2, label: 'cancel' },
            { icon: IdCard, label: 'chart' }
        ],
        []
    )

    const handleMenu = (menu: TMenu) => {
        console.log('Patient action:', menu)
    }

    return (
        <header className='flex h-7 items-center justify-between px-2 border-b-20'>
            <div className='flex items-center gap-2'>
                <IdCard className='size-5 stroke-text-secondary stroke-[2px]' />
                <span className='pt-[2px] text-p-sm font-medium text-text'>{appointment.clinic.name}</span>
            </div>
            <div className='flex gap-2'>
                <Button
                    size='icon'
                    icon='xs'
                    variant='outline'
                    tooltip={{
                        children: t('patients.actions.call'),
                        align: 'center',
                        side: 'bottom'
                    }}
                    onClick={() => console.log('Call to patient')}
                >
                    <Phone className='stroke-text stroke-[2px]' />
                </Button>
                <Button
                    size='icon'
                    icon='xs'
                    variant='outline'
                    tooltip={{
                        children: t('patients.actions.addAppointment'),
                        align: 'center',
                        side: 'bottom'
                    }}
                    onClick={() => console.log('Add appointment')}
                >
                    <MessagesSquare className='stroke-text stroke-[2px]' />
                </Button>
                <DropdownMenu open={isOpenMenu} onOpenChange={() => setIsOpenMenu(!isOpenMenu)}>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='icon' icon='xs'>
                            <EllipsisVertical className='stroke-[2px]' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='min-w-[280px]'>
                        {menuItems.map(({ icon: Icon, label }, idx) => (
                            <DropdownMenuItem key={idx} onSelect={() => handleMenu(label)}>
                                <span className='flex size-6 min-w-6 items-center justify-center'>
                                    <Icon className='size-[18px] stroke-[1.75px]' />
                                </span>
                                <span className='w-full text-p-sm text-text'>{t(`schedule.actions.${label}`)}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
