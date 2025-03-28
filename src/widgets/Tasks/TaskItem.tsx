import { format } from 'date-fns'
import {
    Check,
    CheckCheck,
    Package,
    PencilLine,
    Pin,
    PinOff,
    SquareCheckBig,
    Star,
    StarOff,
    Trash2
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { RefObject, useCallback, useState } from 'react'

import { TASKS_MOCK } from '@/entities/api'
import { TASK_STATUSES } from '@/entities/api/mock/task_statuses'

import {
    Badge,
    Button,
    Checkbox,
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    UserAvatar
} from '@/shared/components'
import { TIcon } from '@/shared/types'
import { cn } from '@/shared/utils'

import { TaskMenuMore } from './TaskMenuMore'

interface IProps {
    className?: string
    item: (typeof TASKS_MOCK)[0]
    setIsSelectedTask: VoidFunction
    ref: RefObject<null>
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

export function TaskItem({ item, className, setIsSelectedTask, ref }: IProps) {
    const t = useTranslations('dashboard')

    const [currentStatus, setCurrentStatus] = useState(item.status)

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

    const handleChangeCurrentStatus = useCallback(
        (status: any) => {
            setCurrentStatus(status)
        },
        [setCurrentStatus]
    )

    return (
        <li
            key={item.id}
            ref={ref}
            onClick={setIsSelectedTask}
            className={cn('rounded-md bg-card shadow border-20 hover:border-40', className)}
        >
            <ContextMenu>
                <ContextMenuTrigger>
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
                                    <Checkbox />
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

                    <footer className='flex h-7 items-center justify-between px-2 border-t-20'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Badge
                                    variant='outline'
                                    className='!text-label-md'
                                    style={{
                                        backgroundColor: currentStatus.backgroundColor,
                                        color: currentStatus.textColor
                                    }}
                                >
                                    {t(`tasks.status.${currentStatus.key}`)}
                                </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {Object.values(TASK_STATUSES).map(status => {
                                    return (
                                        <DropdownMenuItem
                                            key={status.id}
                                            onSelect={() => handleChangeCurrentStatus(status)}
                                            onPointerDown={e => e.stopPropagation()}
                                        >
                                            <span
                                                className='size-4 min-w-4 rounded-sm'
                                                style={{
                                                    backgroundColor: status.backgroundColor,
                                                    color: status.textColor
                                                }}
                                            />
                                            <span className='w-full text-p-sm text-text'>
                                                {t(`tasks.status.${status.key}`)}
                                            </span>
                                            {currentStatus.key === status.key && <Check className='ml-2' />}
                                        </DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <span className='flex gap-1 text-label-md text-text-secondary'>
                            <UserAvatar
                                className='size-5'
                                fullName='Emma Stone'
                                src='https://i.pinimg.com/736x/b9/64/45/b96445118da9f45f16345b3218342aae.jpg'
                            />
                            <UserAvatar
                                className='size-5'
                                fullName='Oliver Twist'
                                src='https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*'
                            />
                            <UserAvatar
                                className='size-5'
                                fullName='Marlow Grand'
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyBnY2OmVc4EJcVSkmvrVZFHgFDVedUQ56GA&s'
                            />
                        </span>
                    </footer>
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
        </li>
    )
}
