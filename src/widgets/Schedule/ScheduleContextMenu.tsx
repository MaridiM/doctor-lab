import { CalendarCog, CalendarMinus2, CalendarPlus2, CalendarX } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { PropsWithChildren, useMemo } from 'react'

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, Icon } from '@/shared/components'

export enum EStateType {
    ADDED_SLOT = 'ADDED_SLOT',
    APPOINTMENT = 'APPOINTMENT',
    RESERVED = 'RESERVED',
    SLOT = 'SLOT'
}
interface IProps {
    isOpen?: (open: boolean) => void
    type?: EStateType
}

export function ScheduleContextMenu({ children, isOpen, type }: PropsWithChildren<IProps>) {
    const t = useTranslations('dashboard.schedule.contextMenu')

    const iconStyle = {
        custom: 'size-5 stroke-text fill-text stroke-[3px]',
        lucide: 'size-[18px] stroke-[1.75px]'
    }

    const contextMenu = useMemo(
        () => [
            {
                types: [EStateType.SLOT, EStateType.ADDED_SLOT],
                label: 'createAppointment',
                icon: <CalendarPlus2 className={iconStyle.lucide} />,
                onSelect: () => console.log('CREATE_APPOINTMENT')
            },
            {
                types: [EStateType.SLOT, EStateType.ADDED_SLOT],
                label: 'createTimeSlot',
                icon: <Icon name='TimerReserve' className={iconStyle.custom} />,
                onSelect: () => console.log('CREATE_TIME_SLOT')
            },
            {
                types: [EStateType.SLOT, EStateType.ADDED_SLOT],
                label: 'createReservedTime',
                icon: <Icon name='TimerAdd' className={iconStyle.custom} />,
                onSelect: () => console.log('CREATE_RESERVED_TIME')
            },

            {
                types: [EStateType.APPOINTMENT],
                label: 'editAppointment',
                icon: <CalendarCog className={iconStyle.lucide} />,
                onSelect: () => console.log('EDIT_APPOINTMENT')
            },
            {
                types: [EStateType.RESERVED],
                label: 'editReserveTime',
                icon: <Icon name='TimerEdit' className={iconStyle.custom} />,
                onSelect: () => console.log('EDIT_RESERVE_TIME')
            },
            {
                types: [EStateType.APPOINTMENT],
                label: 'cancelAppointment',
                icon: <CalendarX className={iconStyle.lucide} />,
                onSelect: () => console.log('CANCEL_APPOINTMENT')
            },
            {
                types: [EStateType.ADDED_SLOT],
                label: 'cancelTimeSlot',
                icon: <CalendarMinus2 className={iconStyle.lucide} />,
                onSelect: () => console.log('CANCEL_TIME_SLOT')
            },
            {
                types: [EStateType.RESERVED],
                label: 'cancelReservedTime',
                icon: <Icon name='TimerClose' className={iconStyle.custom} />,
                onSelect: () => console.log('CANCEL_RESEVED_TIME')
            }
        ],
        []
    )

    return (
        <ContextMenu onOpenChange={isOpen}>
            <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
            <ContextMenuContent className='min-w-[240px]'>
                {contextMenu.map((item, idx) => {
                    if (!item.types.includes(type ?? EStateType.SLOT)) return
                    return (
                        <ContextMenuItem key={idx} className='gap-2' onSelect={item.onSelect}>
                            <span className='flex size-6 min-w-6 items-center justify-center'>{item.icon}</span>
                            <span className='w-full text-p-sm text-text'>{t(item.label)}</span>
                        </ContextMenuItem>
                    )
                })}
            </ContextMenuContent>
        </ContextMenu>
    )
}
