import countryProfiledata from '../data/country_profile.json'
import axios from 'axios'
import { API_URL } from '../helpers'

class CountryProfileServices {
    static async getProfileByCountry(country) {
        return countryProfiledata[country] || null
    }

    static async CountryProfileData(slug) {
        const { data } = await axios.get(`${API_URL}api/v1/country/${slug}`)
        return data
    }

    static async CountryProfileTenderData(slug) {
        const { data } = await axios.get(
            `${API_URL}api/v1/tender/?country__name=${slug}`
        )
        return data
    }

    static async LoadMoreTenderData(url) {
        const { data } = await axios.get(url)
        return data
    }

    static async CountryProfileTenderDetailData(tenderId) {
        const { data } = await axios.get(`${API_URL}api/v1/tender/${tenderId}`)
        return data
    }

    static async getTranslations(currentLocale) {
        const { data: translationData } = await axios.get(
            `${API_URL}static/translations/${currentLocale}/words.json`
        )
        return { [currentLocale]: translationData }
    }
}

export default CountryProfileServices
