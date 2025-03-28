import { format } from 'date-fns'
import { CheckCheck, Package, PencilLine, Pin, PinOff, SquareCheckBig, Star, StarOff, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { TASKS_MOCK } from '@/entities/api'

import {
    Button,
    Checkbox,
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger
} from '@/shared/components'
import { TIcon } from '@/shared/types'
import { cn } from '@/shared/utils'

import { TaskMenuMore } from './TaskMenuMore'

interface IProps {
    className?: string
    item: (typeof TASKS_MOCK)[0]
    setIsSelectedTask: (id: string) => void
}

enum EMenu {
    COMPLETE = 'COMPLETE',
    EDIT = 'EDIT',
    PIN = 'PIN',
    UNPIN = 'UNPIN',
    IMPORTANT = 'IMPORTANT',
    UNIMPORTANT = 'UNIMPORTANT',
    ARCHIVE = 'ARCHIVE',
    DELETE = 'DELETE'
}
export interface IMenu {
    icon: TIcon
    label: string
    onSelect: () => void
}

export function TaskItem({ item, className, setIsSelectedTask }: IProps) {
    const t = useTranslations('dashboard')

    const handleMenuSelect = (menu: EMenu) => {
        switch (menu) {
            case EMenu.COMPLETE:
                console.log(menu)
                break
            case EMenu.EDIT:
                console.log(menu)
                break
            case EMenu.PIN:
                console.log(menu)
                break
            case EMenu.UNPIN:
                console.log(menu)
                break
            case EMenu.IMPORTANT:
                console.log(menu)
                break
            case EMenu.UNIMPORTANT:
                console.log(menu)
                break
            case EMenu.ARCHIVE:
                console.log(menu)
                break
            case EMenu.DELETE:
                console.log(menu)
        }
    }

    const menuItems: IMenu[] = [
        {
            icon: SquareCheckBig,
            label: t('tasks.task.complete'),
            onSelect: () => handleMenuSelect(EMenu.COMPLETE)
        },
        {
            icon: PencilLine,
            label: t('tasks.task.edit'),
            onSelect: () => handleMenuSelect(EMenu.EDIT)
        },
        {
            icon: item.pinned ? PinOff : Pin,
            label: item.pinned ? t('tasks.task.unpin') : t('tasks.task.pin'),
            onSelect: () => handleMenuSelect(EMenu.PIN)
        },
        {
            icon: item.important ? StarOff : Star,
            label: item.important ? t('tasks.task.unimportant') : t('tasks.task.important'),
            onSelect: () => handleMenuSelect(EMenu.IMPORTANT)
        },
        {
            icon: Package,
            label: t('tasks.task.archive'),
            onSelect: () => handleMenuSelect(EMenu.ARCHIVE)
        },
        {
            icon: Trash2,
            label: t('tasks.task.delete'),
            onSelect: () => handleMenuSelect(EMenu.DELETE)
        }
    ]

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <li
                    key={item.id}
                    onClick={() => setIsSelectedTask(item.id)}
                    className={cn('rounded-md bg-card shadow border-20 hover:border-40', className)}
                >
                    <header className='flex h-7 justify-between px-2 border-b-20'>
                        <div className='flex h-full items-center gap-1'>
                            {item.done ? (
                                <Button
                                    variant='outline'
                                    size='icon'
                                    icon='xs'
                                    tooltip={{
                                        children: t('tasks.task.incomplete'),
                                        align: 'center',
                                        side: 'bottom'
                                    }}
                                >
                                    <CheckCheck />
                                </Button>
                            ) : (
                                <div className='flex size-6 items-center justify-center'>
                                    <Checkbox  />
                                </div>
                            )}
                            <Button
                                variant='outline'
                                size='icon'
                                icon='xs'
                                tooltip={{
                                    children: item.important ? t('tasks.task.unimportant') : t('tasks.task.important'),
                                    align: 'center',
                                    side: 'bottom'
                                }}
                            >
                                <Star
                                    className={cn({
                                        'fill-ettention stroke-ettention': item.important
                                    })}
                                />
                            </Button>
                            {item.pinned && (
                                <Button
                                    variant='outline'
                                    size='icon'
                                    icon='xs'
                                    className='pt-px'
                                    tooltip={{
                                        children: t('tasks.task.unpin'),
                                        align: 'center',
                                        side: 'bottom'
                                    }}
                                >
                                    <Pin className='!size-[14px]' />
                                </Button>
                            )}
                        </div>
                        <div className='flex h-full items-center gap-2'>
                            <span className='pt-px text-label-md text-text-secondary'>
                                {format(item.due, 'MM.dd.yyyy hh:mm')}
                            </span>
                            <TaskMenuMore items={menuItems} />
                        </div>
                    </header>

                    <p
                        className={cn('line-clamp-3 px-2 py-1 !text-p-sm text-text', {
                            'text-text-tertiary line-through': item.done
                        })}
                    >
                        {item.text}
                    </p>
                </li>
            </ContextMenuTrigger>
            <ContextMenuContent>
                {menuItems.map(({ icon: Icon, label, onSelect }, idx) => {
                    return (
                        <ContextMenuItem key={idx} className='gap-2' onSelect={onSelect}>
                            <span className='flex size-6 min-w-6 items-center justify-center'>
                                <Icon className='size-[18px] stroke-[1.75px]' />
                            </span>
                            <span className='w-full pt-px text-p-sm text-text'>{label}</span>
                        </ContextMenuItem>
                    )
                })}
            </ContextMenuContent>
        </ContextMenu>
    )
}
