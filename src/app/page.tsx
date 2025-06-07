import { redirect } from 'next/navigation'

import { PATHS } from '@/shared/config'

export default function HomePage() {
    return redirect(PATHS.dashboard)
}
