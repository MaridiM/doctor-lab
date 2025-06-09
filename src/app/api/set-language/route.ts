'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { COOKIE_NAME } from '@/shared/libs/i18n'

export async function POST(request: Request) {
    const { language } = (await request.json()) as { language: string }
    const cookiesStory = await cookies()

    // Устанавливаем куку на сервере
    cookiesStory.set({
        name: COOKIE_NAME,
        value: language,
        path: '/', // убедитесь, что путь подходит под ваше приложение
        maxAge: 60 * 60 * 24 * 30 // например, месяц
    })
    return NextResponse.json({ success: true })
}