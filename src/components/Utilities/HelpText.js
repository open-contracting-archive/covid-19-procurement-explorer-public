import React from 'react'
import { ReactComponent as HelpIcon } from '../../assets/img/icons/information.svg'
import useTrans from '../../hooks/useTrans'

const HelpText = (props) => {
    const { helpTextInfo } = props
    const { trans } = useTrans()

    return (
        <div className="tooltip-wrap inline-block relative ml-2">
            <div className="tooltip-icon">
                <HelpIcon />
            </div>
            <div className="tooltip-content absolute">
                <p>{trans(helpTextInfo)}</p>
            </div>
        </div>
    )
}

export default HelpText
