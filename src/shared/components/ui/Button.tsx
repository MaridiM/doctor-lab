'use client'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { cn } from '@/shared/utils/index'

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none  aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90 dark:bg-destructive/60',
                outline: 'border border-border/20 bg-transparent shadow-xs hover:bg-hover hover:text-text',
                secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-hover hover:text-text',
                link: 'text-primary underline-offset-4 hover:underline'
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

function Button({
    className,
    variant,
    size,
    tooltip,
    asChild = false,
    ...props
}: ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
        tooltip?: string | ComponentProps<typeof TooltipContent>
    }) {
    const Comp = asChild ? Slot : 'button'

    const button = <Comp data-slot='button' className={cn(buttonVariants({ variant, size, className }))} {...props} />

    if (!tooltip) {
        return button
    }

    if (typeof tooltip === 'string') {
        tooltip = {
            children: tooltip
        }
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent {...tooltip} />
        </Tooltip>
    )
}

export { Button, buttonVariants }
