import { ComponentProps, forwardRef } from 'react'

import { cn } from '@/shared/utils'

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                'border-40 flex h-10 w-full rounded-md bg-card px-4 pb-2 pt-[9px] text-p-md file:border-0 file:bg-transparent file:text-p-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-p-sm',
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = 'Input'

export { Input }
