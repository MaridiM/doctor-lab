import { useDroppable } from '@dnd-kit/core'

interface IProps {
    id: string
    top: number
    height: number
}

export function DroppableSlot({ id, top, height }: IProps) {
    const { setNodeRef } = useDroppable({ id })
    return <div ref={setNodeRef} className='absolute w-full' style={{ top, height, pointerEvents: 'auto' }} />
}
