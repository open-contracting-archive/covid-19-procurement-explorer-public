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
}

export default ContractService
