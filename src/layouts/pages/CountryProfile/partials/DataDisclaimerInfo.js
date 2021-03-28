import React from 'react'
import { Link } from 'react-router-dom'

const DataDisclaimerInfo = (props) => {
    const { forwardUrl = null } = props

    return (
        <div className="md:-mt-10 mb-6">
            <p>
                While we’ve done our best to identify, include, and verify as
                much information as possible, it will be incomplete. <br />
                Please check our{' '}
                {forwardUrl ? (
                    <Link to={forwardUrl} className="text-primary-blue">
                        methodology
                    </Link>
                ) : (
                    'methodology'
                )}{' '}
                for general limitations and country-specific caveats.
            </p>
        </div>
    )
}

export default DataDisclaimerInfo
