'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
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
import { languages } from '@/shared/libs/i18n'
import { type TChangeLanguageSchema, changeLanguageSchema } from '@/shared/schemas'
import { cn } from '@/shared/utils'

interface IProps {
    className?: string
}

export function ChangeLanguage({ className }: IProps) {
    const [isPending, startTransition] = useTransition()
    const locale = useLocale()
    const router = useRouter()

    const form = useForm<TChangeLanguageSchema>({
        resolver: zodResolver(changeLanguageSchema)
    })

    // Обёртка над fetch, которая меняет куку и обновляет страницу
    async function switchLanguage(lang: string) {
        await fetch('/api/set-language', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ language: lang })
        })
        // перезагружаем серверный рендер, чтобы next-intl подхватил новую куку
        router.refresh()
    }

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name='language'
                render={({ field }) => (
                    <FormItem>
                        <Select
                            // при выборе языка меняем поле и запускаем смену языка
                            onValueChange={value => {
                                field.onChange(value)
                                startTransition(() => {
                                    switchLanguage(value)
                                })
                            }}
                        >
                            <SelectTrigger
                                className={cn(
                                    'hover:bg-hover size-9 min-w-9 border-none bg-transparent font-normal shadow-none transition-colors duration-300 ease-in-out disabled:opacity-75',
                                    className
                                )}
                                arrow={false}
                                disabled={isPending}
                            >
                                <SelectValue placeholder={locale.toLocaleUpperCase()} />
                            </SelectTrigger>
                            <SelectContent className='min-w-10' classNameViewport='flex flex-col gap-0.5'>
                                {languages.map(language => {
                                    const current = language === locale
                                    return (
                                        <SelectItem
                                            key={language}
                                            value={language}
                                            disabled={isPending}
                                            className={cn('', {
                                                'bg-primary-100 hover:!bg-primary-100': current
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
