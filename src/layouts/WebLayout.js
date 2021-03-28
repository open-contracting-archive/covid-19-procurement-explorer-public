import React, { Fragment } from 'react'
import Header from './_partials/header'
import Footer from './_partials/footer'
import FathomAnalytics from '../FathomAnalytics'

const WebLayout = (props) => {
    const { children } = props

    return (
        <Fragment>
            {process.env.NODE_ENV === 'production' &&
                process.env.REACT_APP_FATHOM_SRC &&
                process.env.REACT_APP_FATHOM_SITE_KEY && <FathomAnalytics />}
            <Header />
            {children}
            <Footer />
        </Fragment>
    )
}
export default WebLayout
