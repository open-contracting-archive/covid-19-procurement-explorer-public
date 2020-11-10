import axios from 'axios'

class CountryServices {
    static async CountryData() {
        const { data } = await axios.get(
            'https://covid19admin.py.staging.yipl.com.np/api/v1/country/'
        )

        return data
    }
}

export default CountryServices
