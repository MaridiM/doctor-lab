import type { ComponentProps, PropsWithChildren } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'

interface IProps {
    tooltip: string | ComponentProps<typeof TooltipContent>
}

export function Hint({ children, tooltip }: PropsWithChildren<IProps>) {
    if (typeof tooltip === 'string') {
        tooltip = {
            children: tooltip
        }
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent {...tooltip} />
            </Tooltip>
        </TooltipProvider>
    )
}
