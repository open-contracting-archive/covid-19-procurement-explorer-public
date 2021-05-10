import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Default from '../../constants/Default'

const MetaInformation = (props) => {
    const { title = null, canonicalLink, description, imageURL } = props
    return (
        <Helmet>
            {/* <!-- Primary Meta Tags --> */}
            <title>{`${title ? `${title} |` : ''} ${
                Default.SITE_TITLE
            }`}</title>
            <meta
                name="title"
                content={`${title ? `${title} |` : ''} ${Default.SITE_TITLE}`}
            />
            <meta name="description" content={description} />

            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:url" content={canonicalLink} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageURL} />

            {/* <!-- Twitter --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalLink} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageURL} />
        </Helmet>
    )
}

MetaInformation.propTypes = {
    title: PropTypes.string,
    canonicalLink: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string
}

export default MetaInformation
