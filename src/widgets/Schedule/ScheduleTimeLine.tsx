import { cn } from '@/shared/utils'

interface IProps {
    slots: any[]
    slotHeight: number
    isTime24Format: boolean
    calculateTime: (idx: number) => {
        adjustedHour: number
        minute: number
    }
}

export function ScheduleTimeLine({ slots, isTime24Format, slotHeight, calculateTime }: IProps) {
    return (
        <ul className='gap relative flex w-16 flex-col overflow-hidden bg-card border-r-20'>
            {slots.map((_, idx) => {
                const { adjustedHour, minute } = calculateTime(idx)
                const isMinuteZero = minute === 0
                const displayHour = isTime24Format ? adjustedHour : adjustedHour % 12 || 0
                const timeMeridiem = adjustedHour < 12 ? 'AM' : 'PM'

                return (
                    <li key={idx} className='flex w-full items-center justify-end pr-1' style={{ height: slotHeight }}>
                        <div className={cn('flex h-6 items-start')}>
                            {isMinuteZero && (
                                <span className='text-h4 leading-[20px] text-text-secondary'>{displayHour}</span>
                            )}
                            <div
                                className={cn('flex h-full w-4 flex-col items-center', {
                                    'justify-center': !isMinuteZero
                                })}
                            >
                                <span
                                    className={cn(
                                        'flex w-full justify-center !text-label-md leading-[10px] text-text-secondary'
                                    )}
                                >
                                    {minute.toString().padStart(2, '0')}
                                </span>

                                {!isTime24Format && isMinuteZero && (
                                    <span className='flex w-full justify-center !text-label-md uppercase leading-[10px] text-text-secondary'>
                                        {timeMeridiem}
                                    </span>
                                )}
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
