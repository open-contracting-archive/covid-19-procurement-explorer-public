import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Header = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './_partials/header')
)
const Footer = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './_partials/footer')
)

const WebLayout = (props) => {
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
