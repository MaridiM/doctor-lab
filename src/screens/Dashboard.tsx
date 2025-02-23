'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
    ArrowDownZA,
    ArrowUpAZ,
    ArrowUpDown,
    ArrowUpNarrowWide,
    ArrowUpWideNarrow,
    CalendarClock,
    CalendarPlus2,
    Check,
    CheckCheck,
    Clock1,
    Clock2,
    Clock3,
    Clock4,
    Clock6,
    Clock12,
    EllipsisVertical,
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
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWindowSize } from 'react-use'
import { z } from 'zod'

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
import { cn } from '@/shared/utils'

export const searchTasksSchema = z.object({
    searchTerm: z.string()
})

export type TSearchTasks = z.infer<typeof searchTasksSchema>

export default function Dashboard() {
    const t = useTranslations('dashboard')
    const [isOpenTaskSettings, setIsOpenTaskSettings] = useState(false)
    const [isOpenTaskMenu, setIsOpenTaskMenu] = useState(false)
    const [isHoverTask, setIsHoverTask] = useState<string | null>(null)
    const [isHoverTimeSlot, setIsHoverTimeSlot] = useState<number | null>(null)
    const [isSelectedTask, setIsSelectedTask] = useState<string | null>(null)

    const [isOpenScheduleSettings, setIsOpenScheduleSettings] = useState(false)

    const { height } = useWindowSize()
    const [timeStart, setTimeStart] = useState<number>(8 - 1)
    const [timeStartMinutes, setTimeStartMinutes] = useState<0 | 5 | 10 | 15 | 20 | 30>(30)

    const [timeEnd, setTimeEnd] = useState<number>(17 + 1)
    const [timeEndMinutes, setTimeEndMinutes] = useState<0 | 5 | 10 | 15 | 20 | 30>(0)

    const [operatingHours, setOperatingHours] = useState<number>(timeEnd - timeStart > 12 ? timeEnd - timeStart : 12)

    const [timeStep, setTimeStep] = useState<5 | 10 | 15 | 20 | 30 | 60>(30)
    const [showHours, setShowHours] = useState<number>(6)

    useEffect(() => {
        let timeSlotCount =
            timeStep === 60
                ? 12
                : timeStep < 30 && timeStep > 10
                  ? 4
                  : timeStep <= 10 && timeStep > 5
                    ? 3
                    : timeStep <= 5
                      ? 2
                      : 6

        setShowHours(timeSlotCount)
    }, [timeStep])

    useEffect(() => {
        const showOperatingHours = timeEnd - timeStart > 12 ? timeEnd - timeStart : 12
        setOperatingHours(showOperatingHours)
    }, [timeEnd, timeStart])

    const [isTime24Format, setIsTime24Format] = useState<boolean>(true)

    const startTotal = timeStart * 60 + timeStartMinutes
    const endTotal = timeEnd * 60 + timeEndMinutes

    const timeSlots: number[] = []
    for (let t = startTotal; t <= endTotal; t += timeStep) {
        timeSlots.push(t)
    }

    const form = useForm<TSearchTasks>({
        resolver: zodResolver(searchTasksSchema),
        defaultValues: {
            searchTerm: ''
        }
    })

    const { isDirty } = form.formState

    const heightCell = (height - 136) / showHours

    let currentSlotTime: number = timeStart
    const step = 60 / timeStep

    let countStep = 0
    let stepSlotTime = countStep

    const stepTimeIcon = {
        5: <Clock1 />,
        10: <Clock2 />,
        15: <Clock3 />,
        20: <Clock4 />,
        30: <Clock6 />,
        60: <Clock12 />
    }

    return (
        <div className='flex flex-1 flex-col gap-2 overflow-hidden p-2'>
            <section className='flex h-full w-full flex-1 gap-2'>
                <section className='w-full overflow-hidden rounded-lg bg-card border-20'>
                    <header className='flex h-14 items-center justify-between px-4 py-2 border-b-20'>
                        <div className='flex items-center gap-2'>
                            <span className='rounded-md bg-primary p-1.5'>
                                <ListTodo className='size-5 stroke-text-foreground' />
                            </span>
                            <span className='text-h4 font-normal text-text'>Schedules</span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <Button variant='outline' size='sm' className='pt-px'>
                                <Link href={PATHS.appointments}>{t('tasks.header.all')}</Link>
                            </Button>

                            <Button
                                size='icon'
                                icon='sm'
                                variant='primary'
                                tooltip={{
                                    children: 'Add new appointment',
                                    align: 'center',
                                    side: 'bottom'
                                }}
                                onClick={() => console.log('Add appointment')}
                            >
                                <CalendarPlus2 className='stroke-text-foreground' />
                            </Button>

                            <DropdownMenu
                                open={isOpenScheduleSettings}
                                onOpenChange={() => setIsOpenScheduleSettings(!isOpenScheduleSettings)}
                            >
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        icon='sm'
                                        tooltip={{
                                            children: 'Schedule settings',
                                            align: 'center',
                                            side: 'bottom'
                                        }}
                                    >
                                        <Settings className='stroke-[1.5px]' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end' className='min-w-[280px]'>
                                    <DropdownMenuItem onSelect={e => e.preventDefault()} className=''>
                                        <CalendarClock />
                                        <span className='w-full text-p-sm text-text'>Use 24 time format</span>
                                        <Switch
                                            className='border-25'
                                            checked={isTime24Format}
                                            onCheckedChange={() => setIsTime24Format(!isTime24Format)}
                                        />
                                    </DropdownMenuItem>

                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className='gap-2'>
                                            {stepTimeIcon[timeStep]}
                                            <span>Step time - {timeStep} min</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent className='ml-2.5 min-w-[200px]'>
                                            <DropdownMenuItem onClick={() => setTimeStep(5)}>
                                                <Clock1 />
                                                <span className='w-full text-p-sm text-text'>5 min</span>
                                                {timeStep === 5 && <Check />}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTimeStep(10)}>
                                                <Clock2 />
                                                <span className='w-full text-p-sm text-text'>10 min</span>
                                                {timeStep === 10 && <Check />}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTimeStep(15)}>
                                                <Clock3 />
                                                <span className='w-full text-p-sm text-text'>15 min</span>
                                                {timeStep === 15 && <Check />}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTimeStep(20)}>
                                                <Clock4 />
                                                <span className='w-full text-p-sm text-text'>20 min</span>
                                                {timeStep === 20 && <Check />}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTimeStep(30)}>
                                                <Clock6 />
                                                <span className='w-full text-p-sm text-text'>30 min</span>
                                                {timeStep === 30 && <Check />}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTimeStep(60)}>
                                                <Clock12 />
                                                <span className='w-full text-p-sm text-text'>60 min</span>
                                                {timeStep === 60 && <Check />}
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <ScrollArea className='flex h-full max-h-[calc(100vh-138px)] w-full' type='auto'>
                        <div className='flex flex-col'>
                            <div className='flex h-full'>
                                <div className='flex w-16 flex-col items-end justify-center bg-card border-r-20'>
                                    <ul className='flex h-full w-16 flex-col'>
                                        {Array(operatingHours * step + 2)
                                            .fill(null)
                                            .map((_, idx) => {
                                                if (idx === 0) {
                                                    return
                                                }
                                                let timeMeridiem = ''
                                                const isEvenNumber = !!(idx % 2)
                                                const isStepHour = timeStep === 60
                                                const isStartMinutes = timeStartMinutes !== 0
                                                const isMinutes = !isStartMinutes && !isEvenNumber

                                                if (countStep === 0 && idx > 1) {
                                                    countStep = step
                                                }
                                                if (countStep > 0) {
                                                    countStep = countStep - 1
                                                    stepSlotTime = stepSlotTime + timeStep
                                                }
                                                if (stepSlotTime === 60) {
                                                    stepSlotTime = 0
                                                }

                                                const currentStepSlotTime = stepSlotTime === 0 ? '00' : stepSlotTime
                                                currentSlotTime =
                                                    idx === 1
                                                        ? currentSlotTime
                                                        : stepSlotTime === 0
                                                          ? currentSlotTime + 1
                                                          : currentSlotTime

                                                if (!isTime24Format) {
                                                    timeMeridiem = currentSlotTime < 12 ? 'AM' : 'PM'
                                                }

                                                const currentSlotStepTime = !isStartMinutes
                                                    ? isEvenNumber
                                                        ? currentStepSlotTime
                                                        : isStepHour
                                                          ? '00'
                                                          : currentStepSlotTime
                                                    : timeStep

                                                return (
                                                    <li
                                                        key={idx}
                                                        onMouseEnter={() => setIsHoverTimeSlot(idx)}
                                                        onMouseLeave={() => setIsHoverTimeSlot(null)}
                                                        className='flex w-full items-center justify-end px-1'
                                                        style={{
                                                            height:
                                                                idx === 0
                                                                    ? heightCell / (60 / timeStep) / 2
                                                                    : heightCell / (60 / timeStep)
                                                        }}
                                                    >
                                                        <div
                                                            className={cn(
                                                                'flex h-6 items-start justify-end gap-[2px]',
                                                                {
                                                                    'items-center':
                                                                        !isTime24Format || isMinutes || !!countStep
                                                                }
                                                            )}
                                                        >
                                                            {(isStepHour
                                                                ? isStepHour
                                                                : isEvenNumber
                                                                  ? !countStep
                                                                  : !countStep) && (
                                                                <span className='bg-red text-p-lg leading-[18px] text-text-secondary'>
                                                                    {currentSlotTime}
                                                                </span>
                                                            )}
                                                            <div className='flex flex-col items-center'>
                                                                <span
                                                                    className={cn(
                                                                        '!text-label-md leading-[10px] text-text-secondary',
                                                                        {
                                                                            '!text-label-lg leading-[12px]':
                                                                                !!countStep || isMinutes
                                                                        }
                                                                    )}
                                                                >
                                                                    {currentSlotStepTime}
                                                                </span>
                                                                {!isTime24Format && (
                                                                    <span className='!text-label-md uppercase leading-[10px] text-text-secondary'>
                                                                        {timeMeridiem}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                    </ul>
                                </div>
                                <div className='flex h-full w-full flex-col bg-background'>
                                    <ul className='flex flex-1 flex-col'>
                                        {Array(operatingHours * step + 2)
                                            .fill(null)
                                            .map((_, idx) => {
                                                if (countStep === 0 && idx > 0) {
                                                    countStep = step
                                                }
                                                if (countStep > 0) {
                                                    countStep = countStep - 1
                                                    stepSlotTime = stepSlotTime + timeStep
                                                }

                                                if (stepSlotTime === 60) {
                                                    stepSlotTime = 0
                                                }
                                                const isEvenNumber = !!(idx % 2)
                                                const isStepHour = timeStep === 60
                                                const isStartMinutes = timeStartMinutes === 0
                                                const isMinutes = !!countStep && !isStartMinutes && !isEvenNumber

                                                const lastItem =
                                                    Array(operatingHours * (60 / timeStep) + 2).fill(null).length -
                                                        1 ===
                                                    idx

                                                return (
                                                    <li
                                                        key={idx}
                                                        className={cn('border-b-20 hover:bg-hover', {
                                                            'border-b-none': lastItem,
                                                            'border-dashed': !!countStep && !isMinutes && !isStepHour
                                                        })}
                                                        style={{
                                                            height:
                                                                idx === 0 || lastItem
                                                                    ? heightCell / (60 / timeStep) / 2
                                                                    : heightCell / (60 / timeStep)
                                                        }}
                                                    >
                                                        <div className='h-full w-full'>1</div>
                                                    </li>
                                                )
                                            })}
                                    </ul>
                                </div>
                            </div>
                            <Button className='group mt-auto h-14 w-full gap-2 rounded-none bg-background border-y-20 hover:bg-hover'>
                                <CalendarClock className='size-4 stroke-text' />
                                <span className='pt-[2px] text-p-md text-text'>Add a slot</span>
                            </Button>
                        </div>
                    </ScrollArea>
                </section>
                <section className='flex h-full w-full max-w-[520px] flex-col gap-2'>
                    <section className='flex h-full max-h-[240px] w-full gap-2'>
                        <div className='w-full rounded-lg bg-card p-4 border-20'>Widgets 1</div>
                        <div className='w-full rounded-lg bg-card p-4 border-20'>Widgets 2</div>
                    </section>
                    <section className='h-full w-full rounded-lg bg-card p-4 border-20'>
                        <header>Patients</header>
                    </section>
                </section>
                <section className='w-full max-w-[520px] overflow-hidden rounded-lg bg-card border-20'>
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
                                        <span className='w-full text-p-sm text-text'>
                                            {t('tasks.header.showCompleted')}
                                        </span>
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
                                                                {item.pinned
                                                                    ? t('tasks.task.unpin')
                                                                    : t('tasks.task.pin')}
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
            </section>
        </div>
    )
}
