import axios from 'axios'
import { API_URL } from '../helpers'

class CountryServices {
    static async CountryData() {
        const { data } = await axios.get(`${API_URL}api/v1/country/`)
        return data
    }
}

export default CountryServices
