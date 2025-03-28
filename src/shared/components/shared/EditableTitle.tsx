'use client'

import { X } from 'lucide-react'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { Button, Form, FormControl, FormField, FormItem } from '../ui'
import { Input } from '../ui/Input'

interface IProps {
    initialTitle: string
    placeholder?: string
    isDirty?: boolean
    form: UseFormReturn<
        {
            title: string
        },
        any,
        undefined
    >
}

export function EditableTitle({
    initialTitle = 'Editable Title',
    placeholder = 'Input new title',
    form,
    isDirty
}: IProps) {
    const [title, setTitle] = useState(initialTitle)

    const [isEditing, setIsEditing] = useState(false)
    const [tempTitle, setTempTitle] = useState(title)

    const MAX_LENGTH = 64

    const handleDoubleClick = () => {
        setTempTitle(title)
        setIsEditing(true)
    }

    const handleSave = () => {
        setTitle(tempTitle)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setTempTitle(title)
        setIsEditing(false)
    }
    return (
        <div className='flex items-center gap-2' onDoubleClick={() => setIsEditing(true)}>
            {isEditing ? (
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem className='flex w-full items-center'>
                                    <FormControl>
                                        <div
                                            className='flex w-fit items-center gap-1 rounded-md border-20'
                                            style={{ width: 'calc(72ch + 32px)' }}
                                        >
                                            <Input
                                                type='text'
                                                maxLength={MAX_LENGTH}
                                                placeholder={placeholder}
                                                className='max-h-8 min-h-8 w-full border-none bg-transparent px-2 !text-h5 font-bold text-text focus:outline-none'
                                                autoFocus
                                                {...field}
                                            />
                                            <Button
                                                variant='outline'
                                                size='sm'
                                                icon='sm'
                                                className='min-w-8'
                                                onClick={handleSave}
                                            >
                                                <Check className='size-4 stroke-text' />
                                            </Button>

                                            <Button
                                                variant='outline'
                                                size='sm'
                                                icon='sm'
                                                className='min-w-8'
                                                onClick={handleCancel}
                                            >
                                                <X className='size-4 stroke-text' />
                                            </Button>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {isDirty && (
                            <Button variant='outline' size='icon' icon='sm' onClick={() => form.reset()}>
                                <X />
                            </Button>
                        )}
                    </form>
                </Form>
            ) : (
                <h2 className='text-h5 font-bold' onDoubleClick={handleDoubleClick}>
                    {title}
                </h2>
            )}
        </div>
    )
}
