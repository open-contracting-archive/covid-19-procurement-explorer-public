import { get } from 'lodash'

export const API_URL = process.env.REACT_APP_API_URL

export const CONTINENTS = {
    all: {
        lat: 0,
        long: 0,
        zoomLevel: 1
    },
    asia: {
        lat: 44.94789322476297,
        long: 95.75037267845751,
        zoomLevel: 1.8
    },
    europe: {
        lat: 55.85406929584602,
        long: 28.24904034876191,
        zoomLevel: 1.8
    },
    africa: {
        lat: 6.426117205286786,
        long: 18.276615276175992,
        zoomLevel: 1.6
    },
    oceania: {
        lat: -31.065922730080157,
        long: 152.78101519406331,
        zoomLevel: 1.6
    },
    south_america: {
        lat: -15.173251268423256,
        long: -60.792112817153885,
        zoomLevel: 1.6
    },
    north_america: {
        lat: 56.51520886670177,
        long: -92.32043635079269,
        zoomLevel: 1.6
    },
    middle_east: {
        lat: 27.0,
        long: 38.25,
        zoomLevel: 1.6
    }
}

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
}

export const getURI = (routeName) => {
    return API_URL + get(apiRoutes, routeName)
}
