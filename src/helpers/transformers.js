import { get } from 'lodash'
import { API_URL } from "./api"
import { formatDate } from "./date"

const getImageUrl = (data) => {
    const contentImage = get(data, 'content_image.meta.download_url')

    if (contentImage) {
        const fileName = contentImage.split('/').pop()
        return `${API_URL}/media/original_images/${fileName}`
    }

    return null
}

const getThumbnailUrl = (data) => {
    return ''
}

export const transformNews = (data) => {
    return {
        ...data,
        detailUrl: `/news/${data.id}`,
        formattedPublishDate: formatDate(data.news_date),
        contentsType: data.type,
        image: getImageUrl(data),
        thumbnail: getThumbnailUrl(data)
    }
}
