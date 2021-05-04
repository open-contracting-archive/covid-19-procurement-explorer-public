import { has } from 'lodash'

export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/\\+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

export const useQuery = () => {
    return new URLSearchParams(window.location.search)
}

// convert to Camel Case
export const toCamelCase = (string) => {
    var arr = string.match(/[a-z]+|\d+/gi)
    return arr.map((m, i) => {
        let low = m.toLowerCase()
        if (i !== 0) {
            low = low.split('').map((s, k) => (k === 0 ? s.toUpperCase() : s))
                .join``
        }
        return low
    }).join``
}

export const hasValidProperty = (object, property) => {
    return has(object, property) && object[property]
}

export const siteUrl = window.location.origin

export const twitterHandle = 'covid19'

export const mediaUrl = (path) => {
    return process.env.REACT_APP_API_URL + `/media/${path}`
}

export const countryContractsUrl = (countryName) => {
    return (
        process.env.REACT_APP_API_URL +
        `/media/export/${countryName}_summary.xlsx`
    )
}

export const range = (start, end) => {
    if (start === end) return [start]
    return [start, ...range(start + 1, end)]
}

export const sortedItemsByKey = (list, key) => {
    return list.sort((a, b) => {
        if (a[key] < b[key]) {
            return -1
        }
        if (a[key] > b[key]) {
            return 1
        }
        return 0
    })
}
