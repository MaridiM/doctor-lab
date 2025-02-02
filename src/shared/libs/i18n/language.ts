'use server'

import { cookies } from 'next/headers'

import { COOKIE_NAME, TLanguage, defaultLanguage } from './config'

export async function getCurrentLanguage() {
    const cookieStore = await cookies()
    return (cookieStore.get(COOKIE_NAME)?.value ?? defaultLanguage) as TLanguage
}

export async function setLanguage(language: TLanguage) {
    const cookieStore = await cookies()
    return cookieStore.set(COOKIE_NAME, language)
}
