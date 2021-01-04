import Api from './api'
import { API_URL, getURI } from '../helpers/api'

class InsightServices {
    static async NewsData() {
        // const { data } = await axios.get(
        //     `${API_URL}api/v2/pages/?type=content.InsightsPage&&fields=*&&contents_type=News`
        // )
        // return data
        try {
            const res = await Api.get(
                await `${API_URL}api/v2/pages/?type=content.InsightsPage&&fields=*&&contents_type=News`
            )
            return res.body
        } catch (error) {
            return error
        }
    }

    static async NewsDetailData(id) {
        const res = await Api.get(await `${API_URL}api/v2/pages/${id}`)
        return res.body
    }

    static async BlogsData() {
        try {
            const res = await Api.get(
                await `${API_URL}api/v2/pages/?type=content.InsightsPage&&fields=*&&country=1&&contents_type=Blog`
            )
            return res.body
        } catch (error) {
            return error
        }
    }

    static async BlogsDetailData(id) {
        const res = await Api.get(await `${API_URL}api/v2/pages/${id}`)
        return res.body
    }

    static async EventsData() {
        try {
            const res = await Api.get(
                await `${API_URL}/api/v2/pages/?type=content.EventsPage&&fields=*`
            )
            return res.body
        } catch (error) {
            return error
        }
    }

    static async EventsDetailData(id) {
        const res = await Api.get(await `${API_URL}api/v2/pages/${id}`)
        return res.body
    }

    static async InsightsData() {
        try {
            const res = await Api.get(
                await `${API_URL}/api/v2/pages/?type=content.InsightsPage&fields=*`
            )
            return res.body
        } catch (error) {
            return error
        }
    }

    static async InsightsDetailData(id) {
        const res = await Api.get(await `${API_URL}api/v2/pages/${id}`)
        return res.body
    }

    static async StaticPageDetail(queryParams) {
        const response = await Api.get(getURI('pages'), queryParams)

        if (response.body !== undefined && response.body.items !== undefined && response.body.items.length) {
            const result = await Api.get(getURI('pages') + response.body.items[0].id)
            return result.body
        }

        return response.body
    }
}

export default InsightServices
