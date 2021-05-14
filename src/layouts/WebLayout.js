import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { init } from 'cookie-though'
import cookieConfig from './../components/Utilities/CookieConfig'

const Header = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './_partials/header')
)
const Footer = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './_partials/footer')
)

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
