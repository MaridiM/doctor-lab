'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Columns3, Plus, Rows3, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, EditableTitle } from '@/shared/components'
import { TEditableTitle, editableTitleSchema } from '@/shared/schemas'

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
