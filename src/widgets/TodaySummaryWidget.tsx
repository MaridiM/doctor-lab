'use client'

import { format } from 'date-fns'
import { Calendar, ChartNetwork, CheckCircle, CircleAlert, UserPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { WidgetHeader } from '@/shared/components'

export function TodaySummaryWidget() {
    const t = useTranslations('dashboard')

    const widgetTodaySummary = useMemo(() => {
        return {
            title: 'title',
            stats: [
                {
                    label: 'appointments',
                    value: 14,
                    icon: Calendar,
                    color: '#3B82F6'
                },
                {
                    label: 'newPatients',
                    value: 3,
                    icon: UserPlus,
                    color: '#10B981'
                },
                {
                    label: 'completedTasks',
                    value: 12,
                    icon: CheckCircle,
                    color: '#22C55E'
                },
                {
                    label: 'overdueTasks',
                    value: 2,
                    icon: CircleAlert,
                    color: '#F59E0B'
                }
            ],
            updatedAt: '2025-03-28T09:30:00Z'
        }
    }, [])

    return (
        <section className='flex h-full max-h-[240px] w-full flex-col overflow-hidden rounded-lg bg-card border-20'>
            <WidgetHeader
                title={t(`widget.todaySummary.${widgetTodaySummary.title}`)}
                icon={<ChartNetwork className='size-5 stroke-text-foreground' />}
            />
            <div className='flex h-full items-center justify-center'>
                <div className='grid w-full grid-cols-2 gap-2 p-2'>
                    {widgetTodaySummary.stats.map(({ icon: Icon, label, value, color }, idx) => {
                        return (
                            <div key={idx} className='flex items-center justify-center gap-3'>
                                <div
                                    key={idx}
                                    className='flex w-full min-w-[200px] max-w-[200px] items-center justify-start gap-3'
                                >
                                    <span className='rounded-full p-2' style={{ backgroundColor: color + '20' }}>
                                        <Icon color={color} className='size-5' />
                                    </span>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-p-sm text-text-secondary'>
                                            {t(`widget.todaySummary.${label}`)}
                                        </span>
                                        <span className='text-p-lg font-medium text-text'>{value}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <footer className='flex min-h-8 w-full items-center justify-end px-4 border-t-20'>
                <span className='text-p-sm text-text-tertiary'>
                    {t('widget.todaySummary.lastUpdated', { time: format(widgetTodaySummary.updatedAt, 'HH:mm:ss') })}
                </span>
            </footer>
        </section>
    )
}
