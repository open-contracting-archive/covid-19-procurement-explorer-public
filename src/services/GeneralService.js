import Api from './api'
import { getURI } from '../helpers/api'

class GeneralService {
    static async getStaticFilters() {
        try {
            const res = await Api.get(getURI('filter-parameters-static'))
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
}

export default GeneralService
