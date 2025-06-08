import { TAuthRoutes, TOrganizationRoutes } from './types'

export const PATHS = {
    home: '/',

    // Auth routes
    auth: (page: TAuthRoutes = ''): string => `/auth${page.length ? `/${page}` : ''}`,

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
    organizations: (page: TOrganizationRoutes = ''): string => `/organizations${page.length ? `/${page}` : ''}`,
    settings: '/settings'
}
