'use client'

import { Footer, Header } from '@/widgets'

export default function Home() {
    return (
        <div className='flex min-h-screen flex-col gap-2 px-5 py-2'>
            <Header useLoginButton />
            <section className='flex flex-1 items-center justify-center'>
                <h1 className='text-center text-[48px] text-text-tertiary'>
                    HERE WILL BE <br /> LENDING PAGE
                </h1>
            </section>
            <Footer />
        </div>
    )
}
