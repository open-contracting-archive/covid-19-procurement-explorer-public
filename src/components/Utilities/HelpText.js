import React from 'react'
import PropTypes from 'prop-types'
import { T } from '@transifex/react'
import Icon from '../../assets/img/icons'

const HelpText = (props) => {
    const { helpTextInfo } = props

    return (
        <div className="tooltip-wrap inline-block relative ml-2">
            <div className="tooltip-icon">
                <Icon.Information />
            </div>
            <div className="tooltip-content absolute">
                <p>
                    <T _str={helpTextInfo} />
                </p>
            </div>
        </div>
    )
}

HelpText.propTypes = {
    helpTextInfo: PropTypes.string
}

export default HelpText
