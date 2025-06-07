import { FC } from 'react'

import { Header } from '@/widgets'

const Dashboard: FC = () => {
    return (
        <div className='flex flex-1 flex-col'>
            <Header />
            <div className='flex flex-1 px-2 pb-2'>CONTENT</div>
        </div>
    )
}

export default Dashboard
