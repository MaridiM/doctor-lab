export const PATHS = {
    home: '/',

    // Auth routes
    auth: (page: 'create-account' | 'verify' | 'forgot' | 'change-password' | '' = ''): string =>
        `/auth${page.length ? `/${page}` : ''}`,

    // Guest dashboard routes
    dashboard: '/dashboard'
}
