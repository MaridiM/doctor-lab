interface IProps {
    mini?: boolean
    shadowFilter?: string
    primaryFill?: string
    secondaryFill?: string
}

export type TIconProps = SVGProps<SVGSVGElement & IProps>
