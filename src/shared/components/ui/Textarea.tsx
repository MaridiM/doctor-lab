import { forwardRef } from 'react'

import { cn } from '@/shared/utils'

const Textarea = forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                'border-40 flex w-full rounded-md bg-card px-3 py-2 text-p-md text-text placeholder:text-text-tertiary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-p-sm',
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Textarea.displayName = 'Textarea'

export { Textarea }
