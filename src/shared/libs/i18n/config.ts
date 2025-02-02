export const COOKIE_NAME = 'language'
export const languages = ['ru', 'en'] as const
export const defaultLanguage: TLanguage = 'en'

export type TLanguage = (typeof languages)[number]
