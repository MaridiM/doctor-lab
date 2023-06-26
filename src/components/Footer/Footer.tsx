import { Support } from 'components'
import { usePaths } from 'hooks'
import { FC } from 'react'
import { FooterProps } from 'types/props'
import { useTranslate } from 'utils/languages'

const Footer: FC<FooterProps> = () => {
    const { translation: { core: { support } } } = useTranslate('auth', [['core', true]])

    const { paths } = usePaths()
    
    return (
        <footer className="footer">
            <Support path={paths.support} text={support} />
        </footer>
    )
}

export default Footer
