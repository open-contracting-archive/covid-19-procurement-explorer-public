import Http from 'axios'
import querystring from 'querystring'

class Api {
    constructor() {
        Http.defaults.timeout = 300000
    }

    async get(resource, params = {}) {
        var config = {
            headers: {
                'Content-Type':
                    'application/octet-stream/x-www-form-urlencoded;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            }
        }

        let paramData = {
            params: params
        }

        try {
            let res = {}
            // let key = encodeURIComponent(resource + JSON.stringify(params))

            // if (cache[key]) {
            // res = cache[key];
            // } else {
            res = await Http.get(resource, paramData, config)
            // cache[key] = res;
            // }

            return this.successResponse(res)
        } catch (error) {
            return this.errorResponse(error)
        }
    }

    async post(resource, params) {
        var config = {
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=utf-8'
            }
        }

        try {
            let response = await Http.post(
                resource,
                querystring.stringify(params),
                config
            )
            return this.successResponse(response)
        } catch (error) {
            return this.errorResponse(error)
        }
    }

    errorResponse(error) {
        if (error.response) {
            return this.response(error.response)
        } else {
            return this.response({
                data: 'Network Error'
            })
        }
    }

    successResponse(response) {
        return this.response(response)
    }

    response({ data, status, headers }) {
        return {
            body: data,
            status,
            headers
        }
    }
}

export default new Api()
