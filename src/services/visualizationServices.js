import Api from './api'
import { API_URL } from '../helpers'

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
    static async TotalSpending() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/total-spending/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TotalSpendingCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/total-spending/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TotalContracts() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/total-contracts/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TotalContractsCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/total-contracts/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async AverageBids() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/average-bids/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async AverageBidsCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/average-bids/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async DirectOpen() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/direct-open/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async DirectOpenCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/direct-open/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TopSuppliers() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/top-suppliers/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TopSuppliersCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/top-suppliers/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TopBuyers() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/top-buyers/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TopBuyersCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/top-buyers/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async ProductDistribution() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/product-distribution/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async ProductDistributionCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/product-distribution/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async ContractStatus() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/contract-status/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async ContractStatusCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/contract-status/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async QuantityCorrelation() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/quantity-correlation/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async QuantityCorrelationCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/quantity-correlation/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async monopolization() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/monopolization/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async monopolizationCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/monopolization/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async GlobalSuppliers() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/global-suppliers/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async CountrySuppliers(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/country-suppliers/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async Equity() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/equity-indicators/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async EquityCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/equity-indicators/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
}

export default VisualizationServices
