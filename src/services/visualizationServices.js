import Api from './api'
import { getURI } from '../helpers/api'

class VisualizationServices {
    static async GlobalMap() {
        try {
            const res = await Api.get(
                getURI('visualization.world-map')
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async CountryMap(params) {
        try {
            const res = await Api.get(
                getURI('visualization.country-map'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async TotalSpending(params) {
        try {
            const res = await Api.get(
                getURI('visualization.total-spending'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async TotalContracts(params) {
        try {
            const res = await Api.get(
                getURI('visualization.total-contracts'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async AverageBids(params) {
        try {
            const res = await Api.get(
                getURI('visualization.average-bids'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async DirectOpen(params) {
        try {
            const res = await Api.get(
                getURI('visualization.direct-open'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async TopSuppliers(params) {
        try {
            const res = await Api.get(
                getURI('visualization.top-suppliers'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async TopBuyers(params) {
        try {
            const res = await Api.get(
                getURI('visualization.top-buyers'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ProductDistribution(params) {
        try {
            const res = await Api.get(
                getURI('visualization.product-distribution'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ContractStatus(params) {
        try {
            const res = await Api.get(
                getURI('visualization.contract-status'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async QuantityCorrelation(params) {
        try {
            const res = await Api.get(
                getURI('visualization.quantity-correlation'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async monopolization(params) {
        try {
            const res = await Api.get(
                getURI('visualization.monopolization'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async GlobalSuppliers(params) {
        try {
            const res = await Api.get(
                getURI('visualization.global-suppliers'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async Equity(params) {
        try {
            const res = await Api.get(
                getURI('visualization.equity-indicators'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async TenderList(params) {
        try {
            const res = await Api.get(getURI('tenders'), params)
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ProductTimeline(params) {
        try {
            const res = await Api.get(getURI('visualization.product-timeline'), params)
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
}

export default VisualizationServices
