'use client'

import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components'

import { IMenu } from './TaskItem'

interface IProps {
    items: IMenu[]
}

export function TaskMenuMore({ items }: IProps) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    return (
        <DropdownMenu open={isOpenMenu} onOpenChange={() => setIsOpenMenu(!isOpenMenu)}>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' icon='xs'>
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='min-w-[280px]'>
                {items.map(({ icon: Icon, label, onSelect }, idx) => {
                    return (
                        <DropdownMenuItem key={idx} onSelect={onSelect}>
                            <span className='flex size-6 min-w-6 items-center justify-center'>
                                <Icon className='size-[18px] stroke-[1.75px]' />
                            </span>
                            <span className='w-full text-p-sm text-text'>{label}</span>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
