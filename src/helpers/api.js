import { get } from 'lodash'

export const API_URL = process.env.REACT_APP_API_URL

const apiRoutes = {
    'visualization.total-spending': 'api/v1/visualization/total-spending/',
    'visualization.total-contracts': 'api/v1/visualization/total-contracts/',
    'visualization.average-bids': 'api/v1/visualization/average-bids/',
    'visualization.direct-open': 'api/v1/visualization/direct-open/',
    'visualization.top-suppliers': 'api/v1/visualization/top-suppliers/',
    'visualization.top-buyers': 'api/v1/visualization/top-buyers/',
    'visualization.product-distribution': 'api/v1/visualization/product-distribution/',
    'visualization.contract-status': 'api/v1/visualization/contract-status/',
    'visualization.quantity-correlation': 'api/v1/visualization/quantity-correlation/',
    'visualization.monopolization': 'api/v1/visualization/monopolization/',
    'visualization.global-suppliers': 'api/v1/visualization/global-suppliers/',
    'visualization.equity-indicators': 'api/v1/visualization/equity-indicators/',
    'tenders': 'api/v1/tender/',
    'pages': 'api/v2/pages/',
    'countries': 'api/v1/country/',
    'visualization.world-map': 'api/v1/visualization/world-map/',
    'visualization.country-map': 'api/v1/visualization/country-map/',
    'visualization.world-map-race': 'api/v1/visualization/world-map-race/',
}

export const getURI = (routeName) => {
    return API_URL + get(apiRoutes, routeName)
}
