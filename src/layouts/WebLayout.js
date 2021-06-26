import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { init } from 'cookie-though'
import cookieConfig from './../components/Utilities/CookieConfig'
import Header from './_partials/header'
import Footer from './_partials/footer'

const WebLayout = (props) => {
    if (process.env.NODE_ENV === 'production') {
        init(cookieConfig)
    }
    const { children } = props

    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
        </Fragment>
    )
}

WebLayout.propTypes = {
    children: PropTypes.element
}
export default WebLayout
