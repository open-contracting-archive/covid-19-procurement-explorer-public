import Api from './api'
import { getURI } from '../helpers/api'

class ContractServices {
    static async FilterParameter() {
        try {
            const res = await Api.get(getURI('filter-parameter'))
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
}

export default ContractServices
