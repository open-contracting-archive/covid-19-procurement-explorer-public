import { get } from 'lodash'

export const API_URL = process.env.REACT_APP_API_URL

const apiRoutes = {
    // visualization api
    'visualization.total-spending': 'api/v1/visualization/total-spending/',
    'visualization.total-contracts': 'api/v1/visualization/total-contracts/',
    'visualization.average-bids': 'api/v1/visualization/average-bids/',
    'visualization.direct-open': 'api/v1/visualization/direct-open/',
    'visualization.top-suppliers': 'api/v1/visualization/top-suppliers/',
    'visualization.top-buyers': 'api/v1/visualization/top-buyers/',
    'visualization.product-distribution':
        'api/v1/visualization/product-distribution/',
    'visualization.product-timeline': 'api/v1/visualization/product-timeline/',
    'visualization.product-timeline-race': 'api/v1/visualization/product-timeline-race/',
    'visualization.contract-status': 'api/v1/visualization/contract-status/',
    'visualization.quantity-correlation':
        'api/v1/visualization/quantity-correlation/',
    'visualization.monopolization': 'api/v1/visualization/monopolization/',
    'visualization.global-suppliers': 'api/v1/visualization/global-suppliers/',
    'visualization.equity-indicators':
        'api/v1/visualization/equity-indicators/',
    'visualization.world-map': 'api/v1/visualization/world-map/',
    'visualization.country-map': 'api/v1/visualization/country-map/',
    'visualization.world-map-race': 'api/v1/visualization/world-map-race/',
    'visualization.country-partners': 'api/v1/visualization/country-partners/',

    // Detail api
    'buyer-detail': 'api/v1/buyers',
    'supplier-detail': 'api/v1/suppliers',

    // table api
    'contracts': 'api/v1/contracts/',
    'buyers': 'api/v1/buyers/',
    'suppliers': 'api/v1/suppliers/',
    'products': 'api/v1/product/',

    // country api
    countries: 'api/v1/country/',

    // cms api
    pages: 'api/v2/pages/'
}

export const getURI = (routeName) => {
    return API_URL + get(apiRoutes, routeName)
}
