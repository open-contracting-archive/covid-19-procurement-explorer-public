import countryProfiledata from '../data/country_profile.json'
import axios from 'axios'

class CountryProfileServices {
    static async getProfileByCountry(country) {
        return countryProfiledata[country] || null
    }

    static async CountryProfileData(id) {
        const { data } = await axios.get(
            'https://covid19admin.py.staging.yipl.com.np/api/v1/country/' + id
        )
        return data
    }

    static async CountryProfileTenderData(id) {
        const { data } = await axios.get(
            'https://covid19admin.py.staging.yipl.com.np/api/v1/tender/?country=' +
                id
        )
        return data
    }

    static async getTranslations(currentLocale) {
        const { data: translationData } = await axios.get(
            `https://covid19admin.py.staging.yipl.com.np/static/translations/${currentLocale}/words.json`
        )
        return { [currentLocale]: translationData }
    }
}

export default CountryProfileServices
