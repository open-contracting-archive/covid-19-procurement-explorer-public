import React from 'react'
import { T } from '@transifex/react'
import { ReactComponent as HelpIcon } from '../../assets/img/icons/information.svg'

const HelpText = (props) => {
    const { helpTextInfo } = props

    return (
        <div className="tooltip-wrap inline-block relative ml-2">
            <div className="tooltip-icon">
                <HelpIcon />
            </div>
            <div className="tooltip-content absolute">
                <p>
                    <T _str={helpTextInfo} />
                </p>
            </div>
        </div>
    )
}

export default HelpText
