import Api from './api'
import { getURI } from '../helpers/api'

class ContractService {
    static async ContractList(params) {
        try {
            const res = await Api.get(getURI('contracts'), params)
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async FilterBuyersParameter(params) {
        try {
            const res = await Api.get(getURI('filter-parameters-buyers'), params)
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async FilterSuppliersParameter(params) {
        try {
            const res = await Api.get(getURI('filter-parameters-suppliers'), params)
            return res.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ProductList(params) {
        try {
            const res = await Api.get(getURI('products'), params)
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
}

export default ContractService
