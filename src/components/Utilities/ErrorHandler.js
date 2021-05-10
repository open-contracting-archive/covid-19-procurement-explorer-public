import React from 'react'
import PropTypes from 'prop-types'
import { T } from '@transifex/react'

function ErrorHandler(props) {
    const { message } = props
    return (
        <div className="container mx-auto py-12">
            <p className="text-red-10">
                <T _str="An error occurred while fetching data." />
                <span>{message ? message : ''}</span>
            </p>
        </div>
    )
}

ErrorHandler.propTypes = {
    message: PropTypes.string
}
export default ErrorHandler
