import countryContractMapdata from '../data/map_country.json'
import Api from './api'
import { API_URL } from '../helpers'

class CountryContractMapServices {
    static async getContractData() {
        return countryContractMapdata
    }

    static async GetGlobalMapData() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v1/vizualization/global_overview/`
            )
            return res.body
        } catch (error) {
            console.log(error)
        }
    }
}

export default CountryContractMapServices
