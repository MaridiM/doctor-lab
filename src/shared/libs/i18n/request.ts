import { getRequestConfig } from 'next-intl/server'

import { TLanguage, defaultLanguage } from './config'
import { getCurrentLanguage } from './language'
import { translations } from './locales'

export default getRequestConfig(async () => {
    const locale: TLanguage = (await getCurrentLanguage()) ?? defaultLanguage
    return {
        locale,
        messages: translations[locale]
        // messages: (await import(`./locales/${locale}.json`)).default
    }
})
