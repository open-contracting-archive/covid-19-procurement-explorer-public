import React from 'react'

const FathomAnalytics = () => {
    const domain =
        process.env.REACT_APP_FATHOM_ANALYTICS_DOMAIN || 'cdn.usefathom.com'
    const siteKey = process.env.REACT_APP_FATHOM_ANALYTICS_ID
    const excludedDomains = 'localhost,127.0.0.1,0.0.0.0'

    return (
        <script
            src={`https://${domain}/script.js`}
            data-site={siteKey}
            data-excluded-domains={excludedDomains}
            data-spa="auto"
            defer
        />
    )
}

export default FathomAnalytics
