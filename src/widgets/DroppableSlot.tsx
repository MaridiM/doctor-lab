'use client'

import { Translate, UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import { CSSProperties, memo, useMemo } from 'react'

interface IProps {
    id: string
    top: number
    height: number
    translate: {
        activeId: UniqueIdentifier | null
        translate: Translate | null
    }
    isVerticalRestriction: boolean
}

export const DroppableSlot = memo(({ id, top, height, translate, isVerticalRestriction }: IProps) => {
    const { setNodeRef, isOver } = useDroppable({ id })

    const dynamicTop = useMemo(() => top + (translate.translate?.y ?? 0), [top, translate.translate?.y])

    const style: CSSProperties = {
        top: dynamicTop,
        height,
        transition: translate ? 'none' : 'transform 0.1s linear',
        border: isOver ? '2px dashed #3b82f6' : 'none',
        backgroundColor: isOver ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        pointerEvents: 'auto',
        position: 'absolute',
        width: '100%',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d'
    }

    return (
        <>
            {isVerticalRestriction ? (
                <div ref={setNodeRef} className='absolute h-full w-full' />
            ) : (
                <div ref={setNodeRef} className='absolute flex w-full items-center justify-center' style={style}>
                    {isOver && <span className='text-xs font-medium text-blue-500'>DROP HERE</span>}
                </div>
            )}
        </>
    )
})
