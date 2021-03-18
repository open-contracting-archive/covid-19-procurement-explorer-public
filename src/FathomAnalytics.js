import React from 'react'

const FathomAnalytics = () => {
    const src = process.env.REACT_APP_FATHOM_SRC
    const siteKey = process.env.REACT_APP_FATHOM_SITE_KEY
    const excludedDomains = 'localhost,127.0.0.1,0.0.0.0'

    console.log('ere')
    return (
        <script src={src}
                data-site={siteKey}
                data-excluded-domains={excludedDomains}
                defer
        />
    )
}

export default FathomAnalytics
