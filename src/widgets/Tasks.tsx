'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
    ArrowDownZA,
    ArrowUpAZ,
    ArrowUpDown,
    ArrowUpNarrowWide,
    ArrowUpWideNarrow,
    Check,
    CheckCheck,
    EllipsisVertical,
    Link,
    ListChecks,
    ListTodo,
    Package,
    PencilLine,
    Pin,
    PinOff,
    Plus,
    Settings,
    Sparkles,
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
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    ScrollArea,
    SearchInput,
    Switch
} from '@/shared/components'
import { PATHS } from '@/shared/config'
import { TSearch, searchSchema } from '@/shared/schemas'
import { cn } from '@/shared/utils'

export function Tasks() {
    const t = useTranslations('dashboard')
    const [isOpenTaskSettings, setIsOpenTaskSettings] = useState(false)
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
        <section className='w-full overflow-hidden rounded-lg bg-card border-20'>
            <header className='flex h-14 items-center justify-between px-4 py-2 border-b-20'>
                <div className='flex items-center gap-2'>
                    <span className='rounded-md bg-primary p-1.5'>
                        <ListTodo className='size-5 stroke-text-foreground' />
                    </span>
                    <span className='text-h4 font-normal text-text'>{t('tasks.title')}</span>
                </div>

                <div className='flex items-center gap-2'>
                    <Button variant='outline' size='sm' className='pt-px'>
                        <Link href={PATHS.tasks}>{t('tasks.header.all')}</Link>
                    </Button>
                    <Button
                        variant='outline'
                        size='icon'
                        icon='sm'
                        tooltip={{ children: t('tasks.header.generateTask'), align: 'center', side: 'bottom' }}
                    >
                        <Sparkles className='stroke-[1.5px]' />
                    </Button>
                    <Button
                        variant='primary'
                        size='icon'
                        icon='sm'
                        tooltip={{ children: t('tasks.header.addNewTask'), align: 'center', side: 'bottom' }}
                    >
                        <Plus className='stroke-text-foreground' />
                    </Button>

                    <DropdownMenu
                        open={isOpenTaskSettings}
                        onOpenChange={() => setIsOpenTaskSettings(!isOpenTaskSettings)}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='outline'
                                size='icon'
                                icon='sm'
                                tooltip={{
                                    children: t('tasks.header.taskSettings'),
                                    align: 'center',
                                    side: 'bottom'
                                }}
                            >
                                <Settings className='stroke-[1.5px]' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='min-w-[280px]'>
                            {/* Вложенное подменю для сортировки */}
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className='gap-2'>
                                    <ArrowUpDown />
                                    <span>{t('tasks.header.sortBy')}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className='mr-1.5 min-w-[200px]'>
                                    <DropdownMenuItem>
                                        <ArrowUpAZ />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('tasks.header.newestOnTop')}
                                        </span>
                                        <Check />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ArrowDownZA />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('tasks.header.newestOnBottom')}
                                        </span>
                                        <Check />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ArrowUpNarrowWide />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('tasks.header.dateCreated')}
                                        </span>
                                        <Check />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ArrowUpWideNarrow />
                                        <span className='w-full text-p-sm text-text'>
                                            {t('tasks.header.dateModified')}
                                        </span>
                                        <Check />
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>

                            {/* Остальные пункты меню */}
                            <DropdownMenuItem onSelect={e => e.preventDefault()} className=''>
                                <ListChecks />
                                <span className='w-full text-p-sm text-text'>{t('tasks.header.showCompleted')}</span>
                                <Switch className='border-25' />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <SearchInput form={form} isDirty={isDirty} placeholder={t('tasks.searchPlaceholder')} />
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
                                className={cn('rounded-md bg-transparent border-20 hover:bg-hover', {
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
                                                    children: 'Mark as incomplete',
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
                                                    ? 'Remove from important'
                                                    : 'Mark as important',
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
                                                    children: 'Unpin',
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

                                <p className='line-clamp-3 px-2 py-1 text-p-sm text-text'>{item.text}</p>
                            </li>
                        )
                    })}
                </ul>
            </ScrollArea>
        </section>
    )
}
