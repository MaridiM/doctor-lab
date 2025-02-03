'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed, RectangleEllipsis, UserRound } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaGithub, FaGoogle, FaTelegramPlane } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { boolean } from 'zod'

import {
    Button,
    Checkbox,
    Form,
    FormControl,
    FormField,
    FormItem,
    Input,
    LogoIcon,
    Separator,
    buttonVariants
} from '@/shared/components'
import { PATHS } from '@/shared/config'
import { type TLoginSchema, loginSchema } from '@/shared/schemas'
import { cn } from '@/shared/utils'

import { Footer, Header } from '@/widgets'

export default function Auth() {
    const t = useTranslations('auth.login')

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const form = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember_me: false
        }
    })

    const { isValid } = form.formState
    function onSubmit(data: TLoginSchema) {
        console.log('Login Form Data:', data)
    }

    function loginBySocial(social: 'google' | 'telegram' | 'github') {
        console.log('login by - ', social)
    }
    return (
        <div className='flex min-h-screen flex-col gap-2 px-5 py-2'>
            <Header logoMini={true} />
            <section className='flex flex-1 items-center justify-center'>
                <section className='flex w-full min-w-[280px] max-w-[400px] flex-col gap-6 rounded-xl bg-card px-6 py-9 shadow-md'>
                    <header className='flex flex-col items-center justify-center gap-6'>
                        <LogoIcon className='h-12' mini={false} />
                        <h1 className='text-h3 h-9 text-center font-medium uppercase drop-shadow'>{t('title')}</h1>
                    </header>

                    <div className='flex gap-4'>
                        <Button variant='outline' className='flex flex-1' onClick={() => loginBySocial('google')}>
                            <FaGoogle />
                        </Button>
                        <Button variant='outline' className='flex flex-1' onClick={() => loginBySocial('telegram')}>
                            <FaTelegramPlane />
                        </Button>
                        <Button variant='outline' className='flex flex-1' onClick={() => loginBySocial('github')}>
                            <FaGithub />
                        </Button>
                    </div>

                    <div className='relative flex h-6 items-center justify-center'>
                        <Separator className='m-auto w-[90%]' />
                        <span className='text-p-xs absolute h-full bg-card px-4 py-1 font-medium uppercase text-text-secondary'>
                            {t('or')}
                        </span>
                    </div>

                    <Form {...form}>
                        <form method='post' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className='border-porder flex items-center gap-4 rounded-md border px-4'>
                                                <UserRound className='h-5 w-5 stroke-text-tertiary' />
                                                <Input
                                                    placeholder='john.marlow@example.com'
                                                    type='email'
                                                    className='rounded-none border-none bg-transparent px-0 font-normal placeholder:text-text-tertiary'
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className='border-porder flex items-center gap-4 overflow-hidden rounded-md border px-1 pl-4'>
                                                <RectangleEllipsis className='h-5 w-5 stroke-text-tertiary' />
                                                <Input
                                                    placeholder='********'
                                                    type={showPassword ? 'text' : 'password'}
                                                    className='rounded-none border-none bg-transparent px-0 font-normal placeholder:text-text-tertiary'
                                                    autoComplete='off'
                                                    {...field}
                                                />
                                                <div
                                                    className='flex h-10 min-w-10 items-center justify-center'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <Eye className='h-4 w-4 stroke-text-tertiary' />
                                                    ) : (
                                                        <EyeClosed className='h-4 w-4 stroke-text-tertiary' />
                                                    )}
                                                </div>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className='flex items-center justify-between'>
                                <FormField
                                    control={form.control}
                                    name='remember_me'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className='flex items-center gap-2'>
                                                    <Checkbox
                                                        id='remember_me'
                                                        {...field}
                                                        value={''}
                                                        checked={field.value}
                                                        onCheckedChange={value => field.onChange(value)}
                                                    />
                                                    <label
                                                        htmlFor='remember_me'
                                                        className='text-p-sm pt-[0.5px] text-text-tertiary'
                                                    >
                                                        {t('rememberMe')}
                                                    </label>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Link
                                    href={PATHS.auth('forgot')}
                                    className='text-p-sm text-text-tertiary transition-colors duration-300 ease-in-out hover:text-text'
                                >
                                    {t('forgotPassword')}
                                </Link>
                            </div>

                            <Button className='uppercase' disabled={!isValid}>
                                {t('submit')}
                            </Button>
                        </form>
                    </Form>

                    <footer className='mt-2 flex flex-col items-center justify-center gap-4'>
                        <p className='text-p-sm text-text-tertiary'>
                            {t('createAccountText')}{' '}
                            <Link
                                href={PATHS.auth('create-account')}
                                className='text-primary transition-colors duration-300 ease-in-out hover:text-primary-hover'
                            >
                                {t('createAccountLink')}
                            </Link>
                        </p>

                        <Link
                            href={PATHS.dashboard}
                            className={cn(
                                'text-p-sm transition-color group !font-normal text-text-tertiary duration-300 ease-in-out hover:text-text',
                                buttonVariants({ variant: 'outline' })
                            )}
                        >
                            <FaArrowLeftLong className='fill-text-tertiary transition-transform duration-300 ease-in-out group-hover:-translate-x-2 group-hover:fill-text' />
                            {t('back')}
                        </Link>
                    </footer>
                </section>
            </section>
            <Footer />
        </div>
    )
}
