'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import {
    Form,
    FormField,
    FormItem,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components'
import { languages, setLanguage } from '@/shared/libs/i18n'
import { type TChangeLanguageSchema, changeLanguageSchema } from '@/shared/schemas'
import { cn } from '@/shared/utils'

interface IProps {
    className?: string
}

export function ChangeLanguage({ className }: IProps) {
    const [isPanding, startTransition] = useTransition()
    const locale = useLocale()

    const form = useForm<TChangeLanguageSchema>({
        resolver: zodResolver(changeLanguageSchema)
    })

    function onSubmit(data: TChangeLanguageSchema) {
        startTransition(async () => {
            try {
                await setLanguage(data.language)
            } catch (error) {
                console.log(error)
            }
        })
    }

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name='language'
                render={({ field }) => (
                    <FormItem>
                        <Select
                            onValueChange={value => {
                                field.onChange(value)
                                form.handleSubmit(onSubmit)()
                            }}
                        >
                            <SelectTrigger
                                className={cn(
                                    'border-none bg-transparent font-normal hover:bg-hover disabled:opacity-75 transition-colors ease-in-out duration-300',
                                    className
                                )}
                                arrow={false}
                                disabled={isPanding}
                            >
                                <SelectValue placeholder={locale.toLocaleUpperCase()} />
                            </SelectTrigger>
                            <SelectContent className='min-w-10' classNameViewport='flex flex-col gap-0.5'>
                                {languages.map(language => {
                                    const currentLanguage = language === locale
                                    return (
                                        <SelectItem
                                            key={language}
                                            value={language}
                                            disabled={isPanding}
                                            className={cn('', {
                                                'bg-primary-100 hover:!bg-primary-100': currentLanguage
                                            })}
                                        >
                                            {language.toLocaleUpperCase()}
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
            />
        </Form>
    )
}
