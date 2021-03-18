import React from 'react'
import { Link } from 'react-router-dom'

const DataDisclaimerInfo = (props) => {
    const { forwardUrl = null } = props

    return (
        <div className="md:-mt-10 mb-6">
            <p>
                Data displayed on the COVID Contract Explorer can be incomplete.
            </p>
            {forwardUrl && (
                <p>
                    Please, check the Caveats and Limitations section of the {' '}
                    <Link
                        to={forwardUrl}
                        className="text-primary-blue">
                        data harvesting methodology
                    </Link>
                </p>
            )}
        </div>
    )
}

export default DataDisclaimerInfo
