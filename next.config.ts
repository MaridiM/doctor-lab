import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/shared/libs/i18n/request.ts')

const nextConfig: NextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: false,
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js'
            }
        }
    }
}

export default withNextIntl(nextConfig)
