'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Columns3, MoreVertical, Plus, Rows3, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Header } from '@/widgets/Header'

import { Button, EditableTitle } from '@/shared/components'
import { TEditableTitle, editableTitleSchema } from '@/shared/schemas'

export default function Tasks() {
    const t = useTranslations('tasks')

    return (
        <>
            <Header title={t('title')} />
            <div className='flex flex-1 flex-col gap-2 overflow-hidden p-2'>
                <TasksHeader />

                <div className='flex flex-1'>
                    <div className='flex flex-1 flex-col gap-2 border-x-10'>
                        <header className='flex flex-col items-center px-1'>
                            <div className='flex h-8 min-h-8 w-full items-center justify-between gap-2'>
                                <span className='text-h5 font-medium'>Backlog</span>
                                <Button variant='ghost' size='icon' icon='xs'>
                                    <MoreVertical className='size-5 stroke-text' />
                                </Button>
                            </div>
                            <Button variant='ghost' size='xs' className='w-full'>
                                <Plus className='size-5 stroke-text' />
                                <span>Add Task</span>
                            </Button>
                        </header>
                    </div>
                    <div className='flex flex-1 flex-col gap-2 px-1 border-r-10'>
                        <header className='flex flex-col items-center px-1'>
                            <div className='flex h-8 min-h-8 w-full items-center justify-between gap-2'>
                                <span className='text-h5 font-medium'>In Progress</span>
                                <Button variant='ghost' size='icon' icon='xs'>
                                    <MoreVertical className='size-5 stroke-text' />
                                </Button>
                            </div>
                            <Button variant='ghost' size='xs' className='w-full'>
                                <Plus className='size-5 stroke-text' />
                                <span>Add Task</span>
                            </Button>
                        </header>
                    </div>
                    <div className='flex flex-1 flex-col gap-2 px-1 border-r-10'>
                        <header className='flex flex-col items-center px-1'>
                            <div className='flex h-8 min-h-8 w-full items-center justify-between gap-2'>
                                <span className='text-h5 font-medium'>In Review</span>
                                <Button variant='ghost' size='icon' icon='xs'>
                                    <MoreVertical className='size-5 stroke-text' />
                                </Button>
                            </div>
                            <Button variant='ghost' size='xs' className='w-full'>
                                <Plus className='size-5 stroke-text' />
                                <span>Add Task</span>
                            </Button>
                        </header>
                    </div>
                    <div className='flex flex-1 flex-col gap-2 px-1 border-r-10'>
                        <header className='flex flex-col items-center px-1'>
                            <div className='flex h-8 min-h-8 w-full items-center justify-between gap-2'>
                                <span className='text-h5 font-medium'>Completed</span>
                                <Button variant='ghost' size='icon' icon='xs'>
                                    <MoreVertical className='size-5 stroke-text' />
                                </Button>
                            </div>
                            <Button variant='ghost' size='xs' className='w-full'>
                                <Plus className='size-5 stroke-text' />
                                <span>Add Task</span>
                            </Button>
                        </header>
                    </div>
                    <div className='flex h-full max-w-16 flex-1 flex-col gap-2 px-1'>
                        <Button variant='ghost' size='icon' icon='sm' className='group h-full w-full'>
                            <Plus className='size-5 stroke-text-tertiary group-hover:stroke-text' />
                        </Button>
                    </div>
                </div>
                {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-4'> */}
                {/* <div className='rounded-lg bg-white p-4 shadow'>
                        <h2 className='mb-2 text-lg font-bold'>Backlog</h2>
                        <div className='space-y-2'>
                            <div className='rounded bg-gray-100 p-2 shadow'>
                                <p className='font-semibold'>Задача 1</p>
                                <p className='text-sm text-gray-600'>Описание задачи</p>
                            </div>
                            <div className='rounded bg-gray-100 p-2 shadow'>
                                <p className='font-semibold'>Задача 2</p>
                                <p className='text-sm text-gray-600'>Описание задачи</p>
                            </div>
                        </div>
                    </div>

                    <div className='rounded-lg bg-white p-4 shadow'>
                        <h2 className='mb-2 text-lg font-bold'>In Progress</h2>
                        <div className='space-y-2'>
                            <div className='rounded bg-gray-100 p-2 shadow'>
                                <p className='font-semibold'>Задача 3</p>
                                <p className='text-sm text-gray-600'>Описание задачи</p>
                            </div>
                        </div>
                    </div>

                    <div className='rounded-lg bg-white p-4 shadow'>
                        <h2 className='mb-2 text-lg font-bold'>In Review</h2>
                        <div className='space-y-2'>
                            <div className='rounded bg-gray-100 p-2 shadow'>
                                <p className='font-semibold'>Задача 4</p>
                                <p className='text-sm text-gray-600'>Описание задачи</p>
                            </div>
                        </div>
                    </div>

                    <div className='rounded-lg bg-white p-4 shadow'>
                        <h2 className='mb-2 text-lg font-bold'>Completed</h2>
                        <div className='space-y-2'>
                            <div className='rounded bg-gray-100 p-2 shadow'>
                                <p className='font-semibold'>Задача 5</p>
                                <p className='text-sm text-gray-600'>Описание задачи</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}
export const TasksHeader = memo(function TasksHeader() {
    const t = useTranslations('tasks')

    const [view, setView] = useState<'kanban' | 'list'>('kanban')

    const form = useForm<TEditableTitle>({
        resolver: zodResolver(editableTitleSchema),
        defaultValues: {
            title: ''
        }
    })

    const { isDirty } = form.formState

    return (
        <header className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => (view === 'kanban' ? setView('list') : setView('kanban'))}
                >
                    {view === 'kanban' && <Columns3 className='size-5 stroke-text stroke-[1.75px]' />}
                    {view === 'list' && <Rows3 className='size-5 stroke-text stroke-[1.75px]' />}
                </Button>

                <EditableTitle initialTitle='Canban' form={form} isDirty={isDirty} />
            </div>

            <div className='flex items-center gap-2'>
                <Button variant='outline' size='icon'>
                    <Plus className='stroke-text' />
                </Button>
                <Button variant='outline' size='icon'>
                    <Settings className='stroke-text' />
                </Button>
            </div>
        </header>
    )
})
