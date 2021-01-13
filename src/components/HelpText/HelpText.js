import React from 'react'
import { ReactComponent as HelpIcon } from '../../assets/img/icons/information.svg'

const HelpText = ({ helpTextInfo }) => {
    return (
        <div className="tooltip-wrap inline-block relative ml-2">
            <div className="tooltip-icon">
                <HelpIcon />
            </div>
            <div className="tooltip-content absolute">
                <p>{helpTextInfo}</p>
            </div>
        </div>
    )
}

export default HelpText
