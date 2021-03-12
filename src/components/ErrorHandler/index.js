import React from 'react'

function ErrorHandler(props) {
    const { message } = props
    return (
        <div className="container mx-auto py-12">
            <p className="text-red-10">
                An error occurred while fetching data.
                <span>{message ? message : ''}</span>
            </p>
        </div>
    )
}

export default ErrorHandler
