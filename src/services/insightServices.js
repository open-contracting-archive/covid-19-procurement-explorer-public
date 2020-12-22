import Api from './api'
import { API_URL } from '../helpers'

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
}

export default InsightServices
