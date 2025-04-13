import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/shared/libs/i18n/request.ts')

const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
    },
}

export default withNextIntl(nextConfig)
