'use client'

import { useTranslations } from 'next-intl'

import { Button, LogoIcon } from '@/shared/components'

import { ChangeLanguage, ChangeTheme } from '@/features'

export default function Home() {
    const t = useTranslations('home')

    return (
        <div className='flex min-h-screen flex-col gap-2 px-5 py-2'>
            <header className='flex min-h-12 items-center justify-between'>
                <div className='flex w-fit items-center gap-4'>
                    <LogoIcon mini={false} className='h-8' />
                </div>
                <div className='flex w-fit items-center gap-4'>
                    <ChangeLanguage className='transition-shadow-none h-10 min-w-10 bg-transparent p-0 pt-0.5 transition-colors duration-300 ease-in-out hover:bg-card hover:shadow' />
                    <ChangeTheme className='transition-shadow-none hover:bg-card hover:shadow' />
                    <Button className='min-w-[96px]'>{t('loginButton')}</Button>
                </div>
            </header>
            <section className='flex flex-1'>CONTENT</section>
            <footer className='flex min-h-12 items-center justify-center text-[10px] font-bold'>
                MaridiM | Doctor LAB &copy; 2025 v0.0.1_dev
            </footer>
        </div>
    )
}
