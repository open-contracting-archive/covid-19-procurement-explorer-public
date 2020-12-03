import axios from 'axios'
import { API_URL } from '../helpers'

class InsightServices {
    static async NewsData() {
        const { data } = await axios.get(
            `${API_URL}api/v2/pages/?type=content.InsightsPage&&fields=*&&contents_type=News`
        )
        return data
    }

    static async NewsDetailData(id) {
        const { data } = await axios.get(`${API_URL}api/v2/pages/${id}`)
        return data
    }
}

export default InsightServices
