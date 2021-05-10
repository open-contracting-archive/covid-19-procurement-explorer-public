import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ sm }) => {
    return (
        <section
            className="flex items-center justify-center pb-8"
            style={{ height: `${sm ? '200px' : '400px'}` }}>
            <span className="loader" />
        </section>
    )
}

Loader.propTypes = {
    sm: PropTypes.bool
}

export default Loader
