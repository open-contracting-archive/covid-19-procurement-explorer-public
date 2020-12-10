import Api from './api'
import { API_URL } from '../helpers'

class VisualizationServices {
    static async TotalSpending() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/total_spending/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TotalSpendingCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/total_spending/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TotalContracts() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/total_contracts/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async TotalContractsCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/total_contracts/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async AverageBids() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/average_bids/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
    static async AverageBidsCountry(country) {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/average_bids/?country=${country}`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
}

export default VisualizationServices
