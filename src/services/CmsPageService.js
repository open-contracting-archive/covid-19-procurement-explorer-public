import Api from './api'
import { API_URL, getURI } from '../helpers/api'

class CmsPageService {
    static async NewsList(queryParams) {
        try {
            const res = await Api.get(
                getURI('pages'),
                {
                    type: "content.InsightsPage",
                    fields: "*",
                    contents_type: "News",
                    ...queryParams
                }
            )

            return res.body
        } catch (error) {
            return error
        }
    }

    static async NewsDetail(id) {
        const res = await Api.get(getURI('pages') + `/${id}`)

        return res.body
    }

    static async BlogList(queryParams) {
        try {
            const res = await Api.get(
                getURI('pages'),
                {
                    type: "content.InsightsPage",
                    fields: "*",
                    contents_type: "Blog",
                    ...queryParams
                }
            )

            return res.body
        } catch (error) {
            return error
        }
    }

    static async BlogDetail(id) {
        const res = await Api.get(getURI('pages') + `/${id}`)

        return res.body
    }

    static async EventList(queryParams) {
        try {
            const res = await Api.get(
                getURI('pages'),
                {
                    type: "content.EventsPage",
                    fields: "*",
                    ...queryParams
                }
            )

            return res.body
        } catch (error) {
            return error
        }
    }

    static async EventDetail(id) {
        const res = await Api.get(getURI('pages') + `/${id}`)

        return res.body
    }

    static async InsightList(queryParams) {
        try {
            const res = await Api.get(
                getURI('pages'),
                {
                    type: "content.InsightsPage",
                    fields: "*",
                    ...queryParams
                }
            )

            return res.body
        } catch (error) {
            return error
        }
    }

    static async StaticPageDetail(queryParams) {
        const response = await Api.get(getURI('pages'), queryParams)

        if (response.body !== undefined && response.body.items !== undefined && response.body.items.length) {
            const result = await Api.get(getURI('pages') + response.body.items[0].id)
            return result.body
        }

        return response.body
    }


    static async ResourceList(queryParams) {
        try {
            const res = await Api.get(
                getURI('pages'),
                {
                    type: "content.ResourcesPage",
                    fields: "*",
                    ...queryParams
                }
            )

            return res.body
        } catch (error) {
            return error
        }
    }
    
    static async ResourceDetail(id) {
        const res = await Api.get(getURI('pages') + `/${id}`)

        return res.body
    }


    // static async InsightsDetailData(id) {
    //     const res = await Api.get(await `${API_URL}api/v2/pages/${id}`)
    //     return res.body
    // }
}

export default CmsPageService
