'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Columns3, GripVertical, MoreVertical, Plus, Rows3, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useClickAway } from 'react-use'

import { Header } from '@/widgets/Header'

import { Button, EditableTitle, Icon } from '@/shared/components'
import { TEditableTitle, editableTitleSchema } from '@/shared/schemas'
import { cn } from '@/shared/utils'

interface ITaskColumn {
    id: string
    title: string
    tasks: string[]
}

export default function Tasks() {
    const t = useTranslations('tasks')
    const [columns, setColumns] = useState<ITaskColumn[]>([
        {
            id: '1',
            title: 'Backlog',
            tasks: []
        },
        {
            id: '2',
            title: 'In Progress',
            tasks: []
        },
        {
            id: '3',
            title: 'In Review',
            tasks: []
        },
        {
            id: '4',
            title: 'Completed',
            tasks: []
        }
    ])
    const handleAddColumn = useCallback(() => {
        setColumns(prev => [
            ...prev,
            { id: Math.round(Math.random() * 1000000).toString(), title: 'New Column', tasks: [] }
        ])
    }, [setColumns])

    return (
        <>
            <Header title={t('title')} />
            <div className='flex flex-1 flex-col gap-2 overflow-hidden p-2'>
                <TasksHeader />

                <div className='flex flex-1 gap-1 overflow-auto'>
                    {!!columns.length &&
                        columns.map(column => {
                            return (
                                <div
                                    key={column.id}
                                    className='flex w-full min-w-[280px] max-w-[320px] flex-1 flex-col gap-2'
                                >
                                    <TasksColumnHeader column={column} />
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
export const TasksHeader = memo(function TasksHeader() {
    const [view, setView] = useState<'kanban' | 'list'>('kanban')

    const form = useForm<TEditableTitle>({
        resolver: zodResolver(editableTitleSchema),
        defaultValues: {
            title: ''
        }
    })

    return (
        <header className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Button
                    variant='outline'
                    size='icon'
                    icon='sm'
                    onClick={() => (view === 'kanban' ? setView('list') : setView('kanban'))}
                >
                    {view === 'kanban' && <Columns3 className='size-5 stroke-text stroke-[1.75px]' />}
                    {view === 'list' && <Rows3 className='font- size-5 stroke-text stroke-[1.75px]' />}
                </Button>

                <EditableTitle
                    form={form}
                    maxLength={64}
                    initialTitle='Kanban'
                    width='calc(72ch + 32px)'
                    className='!text-h5 font-bold text-text'
                    classNameWrapper='rounded-md border-20 h-8'
                    classNameInput='!text-h5 font-bold text-text placeholder:font-normal placeholder:text-text-tertiary items-center'
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
                    className='rounded-none !border-none !text-p-md font-medium'
                />
                <Button
                    variant='outline'
                    size='icon'
                    icon='xs'
                    onClick={() => handleAddTask(column.id)}
                    className={cn('z-0 size-8 min-w-8 transition-opacity duration-300 ease-in-out', {
                        'opacity-0': !isHover && !isEditTitle
                    })}
                >
                    <MoreVertical className='size-5 stroke-text transition-colors duration-300 ease-in-out group-hover:stroke-text' />
                </Button>
            </div>
            <Button variant='outline' size='xs' className='z-0 h-8 w-full bg-card border-20'>
                <Plus className='size-5 stroke-text' />
                <span>Add Task</span>
            </Button>
        </header>
    )
})
