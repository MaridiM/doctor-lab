import { FC } from 'react'
import { SVGProps } from '../types'

const LightSVG: FC<SVGProps> = ({ className }) => {
    return (
        <span className={className}>
              <svg id='LightSVG' className={`${className}-light`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path
                    d='M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 001-1 1 1 0 00-1-1H2a1 1 0 00-1 1 1 1 0 001 1zm18 0h2a1 1 0 001-1 1 1 0 00-1-1h-2a1 1 0 00-1 1 1 1 0 001 1zM11 2v2a1 1 0 001 1 1 1 0 001-1V2a1 1 0 00-1-1 1 1 0 00-1 1zm0 18v2a1 1 0 001 1 1 1 0 001-1v-2a1 1 0 00-2 0zM5.99 4.58a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06z' />
            </svg>
        </span>
    )
}

LightSVG.defaultProps = {
    className: 'icon'
}

export default LightSVG

