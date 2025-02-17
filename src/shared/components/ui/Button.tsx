import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/shared/utils'

const buttonVariants = cva(
    'flex justify-center items-center rounded-sm transition-all duration-300 ease-in-out [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 gap-1',
    {
        variants: {
            variant: {
                default: '',
                primary: 'bg-primary !text-primary-foreground hover:bg-primary-hover',
                outline: 'bg-transparent !text-text-primary hover:bg-hover',
                ghost: 'border-10 bg-transparent !text-text-primary hover:bg-hover hover:border-40 text-text'
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
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, icon, asChild = false, ...props }, ref) => {
        size !== 'icon' && !!icon ? ((size = 'icon'), icon) : size
        size === 'icon' && !icon ? (icon = 'default') : icon

        const Comp = asChild ? Slot : 'button'
        return <Comp className={cn(buttonVariants({ size, variant, icon, className }))} ref={ref} {...props} />
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
