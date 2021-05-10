import React from 'react'
import PropTypes from 'prop-types'
import { T } from '@transifex/react'

function ErrorHandler(props) {
    const { message = null } = props
    return (
        <div className="container mx-auto py-12">
            <p className="text-red-10">
                {message ? (
                    <span>{message ? message : ''}</span>
                ) : (
                    <T _str="An error occurred while fetching data." />
                )}
            </p>
        </div>
    )
}

ErrorHandler.propTypes = {
    message: PropTypes.string
}
export default ErrorHandler
