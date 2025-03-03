import { useDroppable } from '@dnd-kit/core'

export function DroppableSlot({ id }: { id: string }) {
    const { setNodeRef } = useDroppable({ id })
    return <div ref={setNodeRef} className='absolute h-full w-full' />
}
