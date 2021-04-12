import React, { Fragment } from 'react'
import Header from './_partials/header'
import Footer from './_partials/footer'

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
export default WebLayout
