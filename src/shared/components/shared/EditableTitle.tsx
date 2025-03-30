'use client'

import { Pencil, X } from 'lucide-react'
import { Check } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useClickAway } from 'react-use'

import { cn } from '@/shared/utils'

import { Button, Form, FormControl, FormField, FormItem } from '../ui'
import { Input } from '../ui/Input'

interface IProps {
    maxLength?: number
    width?: string
    initialTitle: string
    className?: string
    setIsEditTitle?: (isEditTitle: boolean) => void
    classNameInput?: string
    classNameWrapper?: string
    placeholder?: string
    form: UseFormReturn<
        {
            title: string
        },
        any,
        undefined
    >
}

export function EditableTitle({
    form,
    maxLength,
    setIsEditTitle,
    className,
    classNameInput,
    classNameWrapper,
    width = 'auto',
    initialTitle = 'Editable Title',
    placeholder = 'Input new title'
}: IProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHover, setIsHover] = useState(false)
    const [title, setTitle] = useState(initialTitle)
    const [isEditing, setIsEditing] = useState(false)
    const [tempTitle, setTempTitle] = useState(title)

    useClickAway(ref, () => setIsEditing(false))

    const handleOnClick = useCallback(() => {
        setTempTitle(title)
        setIsEditing(true)
        form.setValue('title', title)
    }, [title, setTempTitle, setIsEditing, form])

    const handleSave = useCallback(() => {
        setTitle(tempTitle)
        setIsEditing(false)
    }, [tempTitle, setTitle, setIsEditing])

    const handleCancel = useCallback(() => {
        setTempTitle(title)
        setIsEditing(false)
    }, [title])

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setTempTitle(e.target.value)
            form.setValue('title', e.target.value)
        },
        [form, setTempTitle]
    )

    useEffect(() => {
        if (setIsEditTitle) {
            setIsEditTitle(isEditing)
        }
    }, [isEditing, setIsEditTitle])

    return (
        <div
            className='flex w-full items-center'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onDoubleClick={handleOnClick}
        >
            {isEditing ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className='flex w-full items-center'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem className='flex w-full items-center'>
                                    <FormControl>
                                        <div
                                            ref={ref}
                                            className={cn(
                                                'relative flex w-full items-center gap-1 pr-px',
                                                classNameWrapper
                                            )}
                                            style={{ width }}
                                        >
                                            <Input
                                                type='text'
                                                maxLength={maxLength}
                                                placeholder={placeholder}
                                                className={cn(
                                                    'text-notext-text max-h-8 min-h-8 w-full border-none bg-transparent px-2 placeholder:text-text-tertiary focus:outline-none',
                                                    classNameInput
                                                )}
                                                autoFocus
                                                {...field}
                                                value={tempTitle}
                                                onChange={handleOnChange}
                                            />
                                            <Button
                                                variant='outline'
                                                size='icon'
                                                icon='sm'
                                                className={cn('group size-7 min-w-7', {
                                                    'opacity-0': !form.getValues('title').length
                                                })}
                                                onClick={handleSave}
                                            >
                                                <Check className='!size-[18px] stroke-[1.5px]' />
                                            </Button>

                                            <Button
                                                variant='outline'
                                                size='icon'
                                                icon='sm'
                                                className='group size-7 min-w-7'
                                                onClick={handleCancel}
                                            >
                                                <X className='!size-[18px] stroke-[1.5px]' />
                                            </Button>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            ) : (
                <div className='flex items-center gap-1'>
                    <span className={cn(className)} onDoubleClick={handleOnClick}>
                        {title}
                    </span>
                    <Button
                        variant='outline'
                        size='icon'
                        icon='xs'
                        className={cn(
                            'group flex size-7 min-w-7 items-center justify-center transition-opacity duration-100 ease-in-out',
                            {
                                'opacity-0': !isHover
                            }
                        )}
                        onClick={handleOnClick}
                    >
                        <Pencil className='!size-[14px] stroke-[1.75px]' />
                    </Button>
                </div>
            )}
        </div>
    )
}
