'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useClickAway } from 'react-use'

import { TASKS_MOCK } from '@/shared/api'

import { ScrollArea, SearchInput } from '@/shared/components'
import { TSearch, searchSchema } from '@/shared/schemas'
import { cn } from '@/shared/utils'

import { TaskItem } from './TaskItem'
import { TasksHeader } from './TasksHeader'

export enum EFilterTasks {
    DUE_DATE = 'DUE_DATE',
    CREATED = 'CREATED',
    MODIFIED = 'MODIFIED'
}

export function Tasks() {
    const t = useTranslations('dashboard')
    const [isSelectedTask, setIsSelectedTask] = useState<string | null>(null)

    const [tasks, setTasks] = useState<typeof TASKS_MOCK>(TASKS_MOCK)
    const [isShowCompleted, setIsShowCompleted] = useState(false)
    const [filterTasks, setFilterTasks] = useState<EFilterTasks>(EFilterTasks.CREATED)

    const taskItemRef = useRef(null)
    useClickAway(taskItemRef, () => setIsSelectedTask(null))

    const form = useForm<TSearch>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchTerm: ''
        }
    })

    const { isDirty } = form.formState

    useEffect(() => {
        let filteredTasks = [...TASKS_MOCK]

        // Фильтрация по завершенным задачам
        if (!isShowCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.done)
        }

        // Сортировка отфильтрованных задач
        switch (filterTasks) {
            case EFilterTasks.DUE_DATE:
                filteredTasks.sort((a, b) => new Date(b.due).getTime() - new Date(a.due).getTime())
                break
            case EFilterTasks.CREATED:
                filteredTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                break
            case EFilterTasks.MODIFIED:
                filteredTasks.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                break
        }

        setTasks(filteredTasks)
    }, [isShowCompleted, filterTasks])

    return (
        <section className='bg-baclground w-full overflow-hidden rounded-lg border-20'>
            <TasksHeader
                filterTasks={filterTasks}
                isShowCompleted={isShowCompleted}
                setIsShowCompleted={setIsShowCompleted}
                setFilterTasks={setFilterTasks}
            />

            <SearchInput form={form} isDirty={isDirty} placeholder={t('tasks.search')} />

            <ScrollArea className='h-full max-h-[calc(100vh-194px)] w-full' type='auto'>
                <ul className='flex h-full w-full flex-col gap-1 p-2'>
                    {!!tasks.length &&
                        tasks.map(item => {
                            const isSelect = isSelectedTask === item.id
                            return (
                                <TaskItem
                                    key={item.id}
                                    ref={taskItemRef}
                                    className={cn({
                                        'border-sm-primary hover:border-sm-primary': isSelect
                                    })}
                                    item={item}
                                    setIsSelectedTask={() => setIsSelectedTask(item.id)}
                                />
                            )
                        })}
                </ul>
            </ScrollArea>
        </section>
    )
}
