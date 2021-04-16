import React from 'react'

export const CountryBuyers = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './CountryBuyers')
)
export const CountryContracts = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './CountryContracts')
)
export const CountryData = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './CountryData')
)
export const CountryEquity = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './CountryEquity')
)
export const CountryInsights = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './CountryInsights')
)
export const CountryMethodology = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './CountryMethodology')
)
export const CountryProducts = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './CountryProducts')
)
export const CountrySuppliers = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './CountrySuppliers')
)
