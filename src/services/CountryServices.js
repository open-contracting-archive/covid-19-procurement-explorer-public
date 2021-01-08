import axios from "axios"
import Api from './api'
import { API_URL, getURI } from '../helpers/api'

class CountryServices {
    static async Countries() {
        try {
            const response = await Api.get(getURI('countries'))
            return response.body
        } catch (error) {
            console.log(error)
        }
    }

    static async CountryProfileData(slug) {
        try {
            const response = await Api.get(getURI('countries') + `/${slug}`)
            return response.body
        } catch (error) {
            console.log(error)
        }
    }

    static async CountryProfileTenderData(slug) {
        try {
            const response = await Api.get(getURI('tenders', { 'country__name': slug }))
            return response.body
        } catch (error) {
            console.log(error)
        }
    }

    static async LoadMoreTenderData(url) {
        try {
            const response = await Api.get(url)
            return response.body
        } catch (error) {
            console.log(error)
        }
    }

    static async ContractDetailData(contractsId) {
        try {
            const response = await Api.get(`${getURI('contracts')}/${contractsId}`)
            return response.body
        } catch (error) {
            console.log(error)
        }
    }

    static async getTranslations(currentLocale) {
        const { data: translationData } = await axios.get(
            `${API_URL}static/translations/${currentLocale}/words.json`
        )
        return { [currentLocale]: translationData }
    }

    static async GetGlobalMapData() {
        try {
            const res = await Api.get(getURI('visualization.world-map-race'))

            return res.body
        } catch (error) {
            console.log(error)
        }
    }
}

export default CountryServices
