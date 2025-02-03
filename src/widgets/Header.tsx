import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'

import { LogoIcon, buttonVariants } from '@/shared/components'
import { PATHS } from '@/shared/config'
import { cn } from '@/shared/utils'

import { ChangeLanguage, ChangeTheme } from '@/features'

interface IProps {
    useLoginButton?: boolean
    logoMini?: boolean
}

export function Header({ useLoginButton, logoMini = false }: IProps) {
    const t = useTranslations('core.header')

    return (
        <header className='flex min-h-12 items-center justify-between'>
            <Link href={PATHS.home} className='flex w-fit items-center gap-4'>
                <LogoIcon mini={logoMini} className='h-8' />
            </Link>
            <div className='flex w-fit items-center gap-4'>
                <ChangeLanguage className='transition-shadow-none h-10 min-w-10 bg-transparent p-0 pt-0.5 transition-colors duration-300 ease-in-out hover:bg-card hover:shadow' />
                <ChangeTheme className='transition-shadow-none hover:bg-card hover:shadow' />
                {useLoginButton && (
                    <Link href={PATHS.auth()} className={cn('min-w-[96px]', buttonVariants({ variant: 'default' }))}>
                        {t('loginButton')}
                    </Link>
                )}
            </div>
        </header>
    )
}
