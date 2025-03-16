'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
    CheckCheck,
    EllipsisVertical,
    Package,
    PencilLine,
    Pin,
    PinOff,
    SquareCheckBig,
    Star,
    Trash2
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { TASKS_MOCK } from '@/entities/api'

import {
    Button,
    Checkbox,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    ScrollArea,
    SearchInput
} from '@/shared/components'
import { TSearch, searchSchema } from '@/shared/schemas'
import { cn } from '@/shared/utils'

import { TasksHeader } from './TasksHeader'

export function Tasks() {
    const t = useTranslations('dashboard')
    const [isOpenTaskMenu, setIsOpenTaskMenu] = useState(false)
    const [isHoverTask, setIsHoverTask] = useState<string | null>(null)
    const [isSelectedTask, setIsSelectedTask] = useState<string | null>(null)

    const form = useForm<TSearch>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchTerm: ''
        }
    })

    const { isDirty } = form.formState
    return (
        <section className='bg-baclground w-full overflow-hidden rounded-lg border-20'>
            {/* <WidgetHeader
                title={t('tasks.title')}
                icon={<ListTodo className='size-5 stroke-text-foreground' />}
            ></WidgetHeader> */}

            <TasksHeader />

            <SearchInput form={form} isDirty={isDirty} placeholder={t('tasks.search')} />
            <ScrollArea className='h-full max-h-[calc(100vh-194px)] w-full' type='auto'>
                <ul className='flex h-full w-full flex-col gap-1 p-2'>
                    {TASKS_MOCK.map(item => {
                        const isSelect = isSelectedTask === item.id
                        return (
                            <li
                                key={item.id}
                                onMouseEnter={() => setIsHoverTask(item.id)}
                                onMouseLeave={() => setIsHoverTask(null)}
                                onClick={() => setIsSelectedTask(item.id)}
                                className={cn('rounded-md bg-card shadow border-20 hover:border-40', {
                                    'bg-primary-50 border-sm-primary hover:border-sm-primary': isSelect
                                })}
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
                                                <Checkbox />
                                            </div>
                                        )}
                                        <Button
                                            variant='outline'
                                            size='icon'
                                            icon='xs'
                                            tooltip={{
                                                children: item.important
                                                    ? t('tasks.task.unimportant')
                                                    : t('tasks.task.important'),
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
                                        <DropdownMenu
                                            open={isOpenTaskMenu}
                                            onOpenChange={() => setIsOpenTaskMenu(!isOpenTaskMenu)}
                                        >
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant='outline'
                                                    size='icon'
                                                    icon='xs'
                                                    tooltip={{
                                                        children: t('tasks.task.menu'),
                                                        align: 'center',
                                                        side: 'left'
                                                    }}
                                                >
                                                    <EllipsisVertical />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end' className='min-w-[280px]'>
                                                <DropdownMenuItem>
                                                    <SquareCheckBig />
                                                    <span className='w-full text-p-sm text-text'>
                                                        {t('tasks.task.complete')}
                                                    </span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <PencilLine />
                                                    <span className='w-full text-p-sm text-text'>
                                                        {t('tasks.task.edit')}
                                                    </span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    {item.pinned ? <PinOff /> : <Pin />}
                                                    <span className='w-full text-p-sm text-text'>
                                                        {item.pinned ? t('tasks.task.unpin') : t('tasks.task.pin')}
                                                    </span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Star
                                                        className={cn({
                                                            'fill-ettention stroke-ettention': !item.important
                                                        })}
                                                    />
                                                    <span className='w-full text-p-sm text-text'>
                                                        {item.important
                                                            ? t('tasks.task.unimportant')
                                                            : t('tasks.task.important')}
                                                    </span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Package />
                                                    <span className='w-full text-p-sm text-text'>
                                                        {t('tasks.task.archive')}
                                                    </span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Trash2 />
                                                    <span className='w-full text-p-sm text-text'>
                                                        {t('tasks.task.delete')}
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
                        )
                    })}
                </ul>
            </ScrollArea>
        </section>
    )
}
