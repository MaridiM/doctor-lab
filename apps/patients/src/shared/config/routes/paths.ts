export const PATHS = {
    home: '/',

    // Auth routes
    auth: (page: 'create-account' | 'verify' | 'forgot' | 'change-password' | '' = ''): string =>
        `/auth${page.length ? `/${page}` : ''}`,

    // Guest dashboard routes
    dashboard: '/dashboard',
    patients: '/patients',
    appointments: '/appointments',
    tasks: '/tasks',
    support: '/support',
    feedback: '/feedback',
    staff: '/staff',
    messenger: '/messenger',
    news: '/news',
    organizations: '/organizations',
    settings: '/settings'
}
