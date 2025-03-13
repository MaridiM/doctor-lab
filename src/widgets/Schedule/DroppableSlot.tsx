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
        const { setNodeRef, isOver, rect } = useDroppable({ id })

        const dynamicTop = useMemo(() => top + (translate.y ?? 0), [top, translate.y])

        return (
            <>
                {isVerticalRestriction ? (
                    <div ref={setNodeRef} className='absolute h-full w-full' />
                ) : (
                    <div
                        ref={setNodeRef}
                        className={cn(
                            'pointer-events-auto absolute flex w-full items-center justify-center py-0.5 pl-0.5 pr-1 will-change-transform'
                        )}
                        style={{
                            top: dynamicTop,
                            height,
                            backfaceVisibility: 'hidden',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <div
                            className={cn('flex h-full flex-1 items-center justify-center rounded-md transition-all duration-300 ease-in-out', {
                                '0.1s linear transform': translate,
                                '!border-dashed bg-background border-lg-40': isOver,
                                '!border-dashed bg-negative-100 border-lg-40-negative': isOver && hasConflict
                            })}
                            style={{}}
                        >
                            {isOver && (
                                <div className='flex items-center justify-center gap-2'>
                                    <Expand
                                        className={cn(
                                            '!size-5 stroke-text-tertiary stroke-[1.5px] transition-all duration-300 ease-in-out',
                                            {
                                                'stroke-negative': hasConflict
                                            }
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            'bg-green- pt-1 !text-p-sm font-normal text-text-tertiary transition-all duration-300 ease-in-out',
                                            {
                                                'text-negative': hasConflict
                                            }
                                        )}
                                    >
                                        {label}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </>
        )
    }
)
