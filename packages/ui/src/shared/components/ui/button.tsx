import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, ComponentProps, forwardRef } from 'react'

import { cn } from '../../utils'

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const buttonVariants = cva(
    'flex justify-center items-center rounded-md transition-all duration-300 ease-in-out [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 gap-1',
    {
        variants: {
            variant: {
                default: '',
                primary: 'bg-primary !text-primary-foreground hover:bg-primary-hover',
                outline: 'bg-transparent !text-text-primary hover:bg-hover',
                ghost: 'border border-opacity-10 bg-transparent !text-text-primary hover:bg-hover hover:border-opacity-40 text-text'
            },
            size: {
                default: 'h-10 px-4 text-button-md [&_svg]:size-6',
                lg: 'h-12 px-5 text-button-lg [&_svg]:size-6',
                sm: 'h-8 px-3 text-button-md [&_svg]:size-5',
                xs: 'h-6 px-2 text-button-sm [&_svg]:size-4',
                icon: ''
            },
            icon: {
                default: 'p-0 h-10 w-10 [&_svg]:size-6',
                lg: 'p-0 h-12 w-12 [&_svg]:size-6',
                sm: 'p-0 h-8 w-8 [&_svg]:size-5',
                xs: 'p-0 h-6 w-6 [&_svg]:size-4'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean
    tooltip?: string | ComponentProps<typeof TooltipContent>
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, icon, tooltip, asChild = false, ...props }, ref) => {
        if (size !== 'icon' && !!icon) {
            size = 'icon'
        }
        if (size === 'icon' && !icon) {
            icon = 'default'
        }

        const Comp = asChild ? Slot : 'button'

        const button = <Comp className={cn(buttonVariants({ size, variant, icon, className }))} ref={ref} {...props} />

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
)
Button.displayName = 'Button'

export { Button, buttonVariants }
