'use client'

import { Translate, useDroppable } from '@dnd-kit/core'
import { Expand } from 'lucide-react'
import { memo, useMemo } from 'react'

import { cn } from '@/shared/utils'

interface IProps {
    id: string
    top: number
    height: number
    translate: Translate
    isVerticalRestriction?: boolean
    hasConflict?: boolean
    label?: string
}

export const DroppableSlot = memo(
    ({ id, top, height, translate, isVerticalRestriction, hasConflict, label }: IProps) => {
        const { setNodeRef, isOver } = useDroppable({ id })
        const dynamicTop = useMemo(() => top + (translate?.y ?? 0), [top, translate?.y])

        return (
            <div
                ref={setNodeRef}
                className={cn(
                    'pointer-events-auto absolute flex w-full items-center justify-center py-0.5 pl-0.5 pr-1 will-change-transform',
                    { 'h-full w-full': isVerticalRestriction }
                )}
                style={{ top: dynamicTop, height }}
            >
                <div
                    className={cn(
                        'flex h-full flex-1 items-center justify-center rounded-md transition-all duration-300 ease-in-out',
                        {
                            '!border-dashed bg-background border-lg-40': isOver,
                            '!border-dashed bg-negative-100 border-lg-40-negative': isOver && hasConflict
                        }
                    )}
                >
                    {isOver && (
                        <div className='flex items-center justify-center gap-2'>
                            <Expand
                                className={cn(
                                    '!size-5 stroke-text-tertiary stroke-[1.5px] transition-all duration-300 ease-in-out',
                                    { 'stroke-negative': hasConflict }
                                )}
                            />
                            <span
                                className={cn('pt-1 !text-p-sm font-normal text-text-tertiary', {
                                    'text-negative': hasConflict
                                })}
                            >
                                {label}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        )
    }
)
