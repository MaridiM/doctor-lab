'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
    Bell,
    BellRing,
    CalendarClock,
    CalendarDays,
    Check,
    ChevronDown,
    ChevronUp,
    Columns3,
    Equal,
    LucideIcon,
    MessageSquareText,
    MoreVertical,
    Paperclip,
    Plus,
    Rows3,
    Settings
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ReactNode, memo, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PRIORITY_OPTIONS, TASKS_MOCK } from '@/shared/api'
import {
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    EditableTitle,
    Hint,
} from '@/shared/components'
import { TEditableTitle, editableTitleSchema } from '@/shared/schemas'
import { cn } from '@/shared/utils'

interface ITaskColumn {
    id: string
    title: string
    tasks: (typeof TASKS_MOCK)[0][]
}

type TTaskPriority = (typeof PRIORITY_OPTIONS)[keyof typeof PRIORITY_OPTIONS]

export default function Tasks() {
    const t = useTranslations('tasks')
    const [currentPriority, setCurrentPriority] = useState<TTaskPriority | null>(null)
    const [isHoverTask, setIsHoverTask] = useState<(typeof TASKS_MOCK)[0]['id'] | null>(null)

    const [columns, setColumns] = useState<ITaskColumn[]>([
        {
            id: '1',
            title: 'Backlog',
            tasks: [...TASKS_MOCK.filter(task => task.status.key === 'BACKLOG')]
        },
        {
            id: '2',
            title: 'In Progress',
            tasks: [...TASKS_MOCK.filter(task => task.status.key === 'IN_PROGRESS')]
        },
        {
            id: '3',
            title: 'In Review',
            tasks: [...TASKS_MOCK.filter(task => task.status.key === 'IN_REVIEW')]
        },
        {
            id: '4',
            title: 'Completed',
            tasks: [...TASKS_MOCK.filter(task => task.status.key === 'COMPLETED')]
        }
    ])

    const handleAddColumn = useCallback(() => {
        setColumns(prev => [
            ...prev,
            { id: Math.round(Math.random() * 1000000).toString(), title: 'New Column', tasks: [] }
        ])
    }, [setColumns])

    const handleChangeCurrentPriority = useCallback(
        (priority: TTaskPriority) => {
            setCurrentPriority(priority)
        },
        [setCurrentPriority]
    )

    const priorityIcons: Record<TTaskPriority['key'], ReactNode> = useMemo(() => {
        return {
            LOW: <ChevronDown className='size-[18px] stroke-primary' />,
            MEDIUM: <Equal className='size-[18px] stroke-ettention' />,
            HIGH: <ChevronUp className='size-[18px] stroke-negative' />
        }
    }, [])

    return (
        <>
            {/* <Header title={t('title')} /> */}
            <div className='flex flex-1 flex-col gap-2 overflow-hidden px-2'>
                <TasksHeader />

                <div className='flex flex-1 gap-2 overflow-auto'>
                    {!!columns.length &&
                        columns.map(column => {
                            return (
                                <div
                                    key={column.id}
                                    className='flex w-full min-w-[320px] max-w-[320px] flex-1 flex-col gap-2'
                                >
                                    <TasksColumnHeader column={column} />

                                    <ul className='flex flex-1 flex-col gap-1'>
                                        {column.tasks.map(task => {
                                            const isHover = isHoverTask === task.id
                                            return (
                                                <li
                                                    className='flex flex-col gap-2 rounded-md bg-card p-2 shadow border-20'
                                                    key={task.id}
                                                    onMouseEnter={() => setIsHoverTask(task.id)}
                                                    onMouseLeave={() => setIsHoverTask(null)}
                                                >
                                                    <div className='flex items-start gap-1'>
                                                        <p
                                                            className={cn(
                                                                'w-fullpt-1.5 !text-p-sm tracking-wider text-text',
                                                                {
                                                                    'text-text-tertiary line-through opacity-50':
                                                                        task.done
                                                                }
                                                            )}
                                                        >
                                                            {task.title.slice(0, 255)}
                                                        </p>
                                                        <Button
                                                            variant='outline'
                                                            icon='xs'
                                                            className={cn(
                                                                'size-8 min-w-8 transition-opacity duration-300 ease-in-out',
                                                                {
                                                                    'opacity-0': !isHover
                                                                }
                                                            )}
                                                        >
                                                            <MoreVertical className='size-5 stroke-text transition-colors duration-300 ease-in-out group-hover:stroke-text' />
                                                        </Button>
                                                    </div>

                                                    <div className='flex flex-wrap items-center gap-1'>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <div className='flex min-w-fit cursor-pointer items-center gap-1'>
                                                                    <CalendarClock className='size-[10px] stroke-text-tertiary' />
                                                                    <span className='text-label-lg text-text-secondary'>
                                                                        {format(
                                                                            new Date(task.due),
                                                                            'dd MMM yyyy hh:mm'
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuItem
                                                                    onPointerDown={e => e.stopPropagation()}
                                                                >
                                                                    CALENDAR
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger className='ml-auto'>
                                                                <Hint
                                                                    tooltip={t(
                                                                        `priority.${
                                                                            currentPriority
                                                                                ? currentPriority.key
                                                                                : task.priority.key
                                                                        }`
                                                                    )}
                                                                >
                                                                    <Badge
                                                                        variant='outline'
                                                                        className='rounded-sm !text-label-md'
                                                                    >
                                                                        {
                                                                            priorityIcons[
                                                                                currentPriority
                                                                                    ? currentPriority.key
                                                                                    : task.priority.key
                                                                            ]
                                                                        }
                                                                    </Badge>
                                                                </Hint>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                {Object.values(PRIORITY_OPTIONS).map(priority => {
                                                                    return (
                                                                        <DropdownMenuItem
                                                                            key={priority.id}
                                                                            onSelect={() =>
                                                                                handleChangeCurrentPriority(priority)
                                                                            }
                                                                            onPointerDown={e => e.stopPropagation()}
                                                                        >
                                                                            <span className='flex size-6 min-w-6 items-center justify-center'>
                                                                                {priorityIcons[priority.key]}
                                                                            </span>

                                                                            <span className='w-full text-p-sm text-text'>
                                                                                {t(`priority.${priority.key}`)}
                                                                            </span>
                                                                            {task.priority.key === priority.key && (
                                                                                <Check className='ml-2' />
                                                                            )}
                                                                        </DropdownMenuItem>
                                                                    )
                                                                })}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                    <div className='flex flex-wrap gap-1'>
                                                        {task.tags.map(tag => {
                                                            return (
                                                                <Badge
                                                                    key={tag}
                                                                    variant='outline'
                                                                    className={cn(
                                                                        'min-w-fit rounded-sm !text-label-md text-text-secondary',
                                                                        {
                                                                            'text-text-tertiary line-through opacity-50':
                                                                                task.done
                                                                        }
                                                                    )}
                                                                >
                                                                    {tag}
                                                                </Badge>
                                                            )
                                                        })}
                                                    </div>

                                                    <div className='flex items-center justify-between gap-1'>
                                                        <div className='flex items-center gap-1'>
                                                            <Button
                                                                variant='outline'
                                                                size='icon'
                                                                icon='xs'
                                                                className='size-6 min-w-6'
                                                                tooltip='On notification'
                                                            >
                                                                {!!task.reminders.length ? (
                                                                    <BellRing className='!size-[18px] fill-ettention stroke-ettention stroke-[1.75px]' />
                                                                ) : (
                                                                    <Bell className='!size-[18px] stroke-text' />
                                                                )}
                                                            </Button>
                                                            <Hint tooltip='Attachments'>
                                                                <div className='flex items-center'>
                                                                    <span className='flex size-6 min-w-6 items-center justify-center'>
                                                                        <Paperclip className='size-[14px] stroke-text-tertiary stroke-[1.75px]' />
                                                                    </span>
                                                                    <span className='w-full text-label-lg text-text-tertiary'>
                                                                        0
                                                                    </span>
                                                                </div>
                                                            </Hint>
                                                            <Hint tooltip='Comments'>
                                                                <div className='flex items-center'>
                                                                    <span className='flex size-6 min-w-6 items-center justify-center'>
                                                                        <MessageSquareText className='size-[14px] stroke-text-tertiary stroke-[1.75px]' />
                                                                    </span>
                                                                    <span className='w-full text-label-lg text-text-tertiary'>
                                                                        {task.comments.length}
                                                                    </span>
                                                                </div>
                                                            </Hint>
                                                        </div>

                                                        <div className='flex items-center gap-1'>
                                                            <Button
                                                                variant='outline'
                                                                size='icon'
                                                                icon='sm'
                                                                className='group size-6 min-w-6 rounded-full !border-dashed border-20'
                                                            >
                                                                <Plus className='!size-4 stroke-text-tertiary group-hover:stroke-text' />
                                                            </Button>
                                                            <div className='flex -space-x-1 overflow-hidden'>
                                                                <Hint tooltip='Emma Stone'>
                                                                    <img
                                                                        className='inline-block size-6 rounded-full ring-2 ring-white'
                                                                        src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                                                        alt='Emma Stone'
                                                                    />
                                                                </Hint>

                                                                <Hint tooltip='Oliver Twist'>
                                                                    <img
                                                                        className='inline-block size-6 rounded-full ring-2 ring-white'
                                                                        src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                                                        alt='Oliver Twist'
                                                                    />
                                                                </Hint>
                                                                <Hint tooltip='Marlow Grand'>
                                                                    <img
                                                                        className='inline-block size-6 rounded-full ring-2 ring-white'
                                                                        src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
                                                                        alt='Marlow Grand'
                                                                    />
                                                                </Hint>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}

                    <div className='ml-auto flex size-16 h-full flex-1 flex-col gap-2 px-1'>
                        <Button
                            variant='ghost'
                            size='icon'
                            icon='sm'
                            className='group size-[68px] min-w-[68px]'
                            onClick={handleAddColumn}
                        >
                            <Plus className='size-5 stroke-text-tertiary group-hover:stroke-text' />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

type TView = 'kanban' | 'list' | 'calendar'
interface IViewItem {
    icon: LucideIcon
    key: TView
    label: string
}

export const TasksHeader = memo(function TasksHeader() {
    const [view, setView] = useState<TView>('kanban')

    const form = useForm<TEditableTitle>({
        resolver: zodResolver(editableTitleSchema),
        defaultValues: {
            title: ''
        }
    })

    const viewItems: IViewItem[] = useMemo(
        () => [
            {
                icon: Columns3,
                key: 'kanban',
                label: 'Kanban'
            },
            {
                icon: Rows3,
                key: 'list',
                label: 'List'
            },
            {
                icon: CalendarDays,
                key: 'calendar',
                label: 'Calendar'
            }
        ],
        []
    )

    const handleChangeView = useCallback(
        (view: TView) => {
            setView(view)
        },
        [setView]
    )

    const ViewIcon: LucideIcon = useMemo(() => {
        return viewItems.find(item => item.key === view)?.icon ?? Columns3
    }, [viewItems, view])

    return (
        <header className='flex h-16 min-h-16 items-center justify-between'>
            <div className='flex items-center gap-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='icon' icon='sm'>
                            <ViewIcon className='size-5 stroke-text stroke-[1.75px]' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {viewItems.map(({ icon: Icon, key, label }) => {
                            const isSelected = view === key
                            return (
                                <DropdownMenuItem
                                    key={label}
                                    onSelect={() => handleChangeView(key)}
                                    onPointerDown={e => e.stopPropagation()}
                                >
                                    <span className='flex size-6 min-w-6 items-center justify-center'>
                                        <Icon className='size-[18px] stroke-[1.75px]' />
                                    </span>
                                    <span className='w-full text-p-sm text-text'>{label}</span>
                                    {isSelected && (
                                        <span className='flex size-6 min-w-6 items-center justify-center'>
                                            <Check className='!size-4' />
                                        </span>
                                    )}
                                </DropdownMenuItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <EditableTitle
                    form={form}
                    maxLength={64}
                    initialTitle='Kanban'
                    width='calc(72ch + 32px)'
                    className='!text-h5 font-bold text-text'
                    classNameWrapper='rounded-md border-20 h-8'
                    classNameInput='text-text placeholder:font-normal placeholder:text-text-tertiary items-center'
                />
            </div>

            <div className='flex items-center gap-2'>
                <Button variant='outline' size='icon' icon='sm'>
                    <Plus className='!size-[18px] stroke-[1.5px]' />
                </Button>
                <Button variant='outline' size='icon' icon='sm'>
                    <Settings className='!size-[18px] stroke-[1.5px]' />
                </Button>
            </div>
        </header>
    )
})

interface IProps {
    column: ITaskColumn
}

export const TasksColumnHeader = memo(function TasksColumnHeader({ column }: IProps) {
    const [isEditTitle, setIsEditTitle] = useState<boolean>(false)
    const [isHoverColumn, setIsHoverColumn] = useState<string | null>(null)

    const handleAddTask = useCallback((columnId: string) => {
        console.log('ADD TASK', columnId)
    }, [])

    const form = useForm<TEditableTitle>({
        resolver: zodResolver(editableTitleSchema),
        defaultValues: {
            title: ''
        }
    })

    const isHover = isHoverColumn === column.id

    return (
        <header className='flex flex-col items-center gap-1'>
            <div
                className='flex h-8 min-h-8 w-full items-center justify-between px-1'
                onMouseEnter={() => setIsHoverColumn(column.id)}
                onMouseLeave={() => setIsHoverColumn(null)}
            >
                <EditableTitle
                    form={form}
                    width='full'
                    maxLength={64}
                    setIsEditTitle={setIsEditTitle}
                    initialTitle={column.title}
                    classNameInput='rounded-none !border-none'
                    className='!text-p-md font-medium'
                />
                <Button
                    variant='outline'
                    size='icon'
                    icon='xs'
                    className={cn('z-0 size-7 min-w-7 transition-opacity duration-300 ease-in-out', {
                        'opacity-0': !isHover && !isEditTitle
                    })}
                >
                    <MoreVertical className='size-5 stroke-text transition-colors duration-300 ease-in-out group-hover:stroke-text' />
                </Button>
            </div>
            <Button
                variant='outline'
                size='xs'
                className='z-0 h-8 w-full bg-card shadow border-20'
                onClick={() => handleAddTask(column.id)}
            >
                <Plus className='size-5 stroke-text' />
                <span>Add Task</span>
            </Button>
        </header>
    )
})
