'use client'

import * as SwitchPrimitives from '@radix-ui/react-switch'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'

const Switch = forwardRef<
    ComponentRef<typeof SwitchPrimitives.Root>,
    ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors border-3xs-25 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-background',
            className
        )}
        {...props}
        ref={ref}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                'pointer-events-none block h-[18px] w-[18px] rounded-full bg-card shadow-lg transition-transform border-3xs-50 data-[state=checked]:translate-x-[17px] data-[state=unchecked]:translate-x-[0.5px]'
            )}
        />
    </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
