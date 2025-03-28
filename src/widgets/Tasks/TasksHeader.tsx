'use client'

import {
    ArrowDownZA,
    ArrowUpAz,
    ArrowUpDown,
    ArrowUpNarrowWide,
    ArrowUpWideNarrow,
    Check,
    ListChecks,
    ListTodo,
    Plus,
    Settings,
    Sparkles,
    TimerReset
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    Switch
} from '@/shared/components'
import { PATHS } from '@/shared/config'
import { TIcon } from '@/shared/types'

import { EFilterTasks } from './Tasks'

interface ISortOption {
    value: EFilterTasks
    icon: TIcon
    labelKey: string
}

interface IProps {
    isShowCompleted: boolean
    setIsShowCompleted: (isShowCompleted: boolean) => void
    filterTasks: EFilterTasks
    setFilterTasks: (filterTasks: EFilterTasks) => void
}

export function TasksHeader({ isShowCompleted, filterTasks, setFilterTasks, setIsShowCompleted }: IProps) {
    const t = useTranslations('dashboard')
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const SORT_OPTIONS: ISortOption[] = useMemo(
        () => [
            {
                value: EFilterTasks.DUE_DATE,
                icon: TimerReset,
                labelKey: 'tasks.header.dueDate'
            },
            {
                value: EFilterTasks.CREATED,
                icon: ArrowUpNarrowWide,
                labelKey: 'tasks.header.dateCreated'
            },
            {
                value: EFilterTasks.MODIFIED,
                icon: ArrowUpWideNarrow,
                labelKey: 'tasks.header.dateModified'
            }
        ],
        [EFilterTasks]
    )

    const renderSortMenuItem = ({ value, icon: Icon, labelKey }: (typeof SORT_OPTIONS)[number]) => (
        <DropdownMenuItem key={value} onSelect={() => setFilterTasks(value)}>
            <span className='flex size-6 min-w-6 items-center justify-center'>
                <Icon className='size-[18px] stroke-[1.75px]' />
            </span>
            <span className='w-full text-p-sm text-text'>{t(labelKey)}</span>

            {filterTasks === value && (
                <span className='flex size-6 min-w-6 items-center justify-center'>
                    <Check className='!size-4' />
                </span>
            )}
        </DropdownMenuItem>
    )

    return (
        <header className='flex h-14 items-center justify-between bg-card px-4 py-2 border-b-20'>
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
                    tooltip={{
                        children: t('tasks.header.generateTask'),
                        align: 'center',
                        side: 'bottom'
                    }}
                >
                    <Sparkles className='stroke-[1.5px]' />
                </Button>

                <Button
                    variant='primary'
                    size='icon'
                    icon='sm'
                    tooltip={{
                        children: t('tasks.header.addNewTask'),
                        align: 'center',
                        side: 'bottom'
                    }}
                >
                    <Plus className='stroke-text-foreground' />
                </Button>

                <DropdownMenu open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='icon' icon='sm'>
                            <Settings className='stroke-[1.5px]' />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align='end' className='min-w-[280px]'>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='gap-2'>
                                <ArrowUpDown />
                                <span>{t('tasks.header.sortBy')}</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className='mr-1.5 min-w-[200px]'>
                                {SORT_OPTIONS.map(renderSortMenuItem)}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <ListChecks />
                            <span className='w-full text-p-sm text-text'>{t('tasks.header.showCompleted')}</span>
                            <Switch checked={isShowCompleted} onCheckedChange={setIsShowCompleted} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
