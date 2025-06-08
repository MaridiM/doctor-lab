interface IProps {
    mini?: boolean
    onlyText?: boolean
    shadowFilter?: string
    primaryFill?: string
    secondaryFill?: string
    className?: string
}

export type TIconProps = SVGProps<SVGSVGElement & IProps>
