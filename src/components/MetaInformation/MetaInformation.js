import React from 'react'
import { Helmet } from 'react-helmet'

const MetaInformation = ({ title, canonicalLink, description, imageURL }) => {
    return (
        <Helmet>
            {/* <!-- Primary Meta Tags --> */}
            <title>{`${
                title ? `${title} |` : ''
            } Covid-19 Contract Explorer`}</title>
            <meta
                name="title"
                content={`${
                    title ? `${title} |` : ''
                } Covid-19 Contract Explorer`}
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

export default MetaInformation
