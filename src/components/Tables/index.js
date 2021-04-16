import React from 'react'

export const ContractTable = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './ContractTable')
)
export const SupplierTable = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './SupplierTable')
)
export const BuyerTable = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './BuyerTable')
)
export const ProductTable = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './ProductTable')
)
export const OverallStatisticsTable = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './OverallStatisticsTable')
)
export const InsightTable = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './InsightTable')
)
