import React from 'react'

export const GlobalData = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './GlobalData')
)
export const GlobalInsights = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './GlobalInsights')
)
export const GlobalContracts = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './GlobalContracts')
)
export const GlobalEquity = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './GlobalEquity')
)
export const GlobalBuyers = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './GlobalBuyers')
)
export const GlobalSuppliers = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './GlobalSuppliers')
)
export const GlobalProducts = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './GlobalProducts')
)
