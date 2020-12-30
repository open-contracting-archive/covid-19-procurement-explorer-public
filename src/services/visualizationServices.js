import Api from './api'
import { API_URL, getApi } from '../helpers'

class VisualizationServices {
    static async GlobalMap() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/world-map/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async CountryMap(countryCode) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/country-map/?country=${countryCode}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TotalSpending(params) {
        try {
            const res = await Api.get(
                getApi('visualization.total-spending'),
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
                getApi('visualization.total-contracts'),
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
                getApi('visualization.average-bids'),
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
                getApi('visualization.direct-open'),
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
                getApi('visualization.top-suppliers'),
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
                getApi('visualization.top-buyers'),
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
                getApi('visualization.product-distribution'),
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
                getApi('visualization.contract-status'),
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
                getApi('visualization.quantity-correlation'),
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
                getApi('visualization.monopolization'),
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
                getApi('visualization.global-suppliers'),
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
                getApi('visualization.equity-indicators'),
                params
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
}

export default VisualizationServices
