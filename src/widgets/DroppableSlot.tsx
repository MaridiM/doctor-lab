'use client'

import { useDroppable } from '@dnd-kit/core'
import { CSSProperties, memo } from 'react'

interface IProps {
    id: string
    top: number
    height: number
    isActive?: boolean
}

export const DroppableSlot = memo(({ id, top, height, isActive }: IProps) => {
    const { setNodeRef, isOver } = useDroppable({ id })

    const style: CSSProperties = {
        top,
        height,
        pointerEvents: 'auto',
        border: isOver ? '2px dashed #3b82f6' : 'none',
        backgroundColor: isOver ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        position: 'absolute',
        width: '100%',
        transition: isOver ? 'none' : 'all 0.2s ease' // Убираем анимацию при активном перетаскивании
    }

    return (
        <div ref={setNodeRef} className='absolute flex w-full items-center justify-center' style={style}>
            {isOver && <span className='text-xs font-medium text-blue-500'>DROP HERE</span>}
        </div>
    )
})
