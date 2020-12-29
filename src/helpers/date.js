import Default from '../constants/Default'
import * as dayjs from 'dayjs'

export const formatDate = (dateString, format = Default.DISPLAY_DATE_SHORT) => {
    return dayjs(dateString).format(format)
}

export const dateDiff = (fromDateString, toDateString) => {
    return dayjs(fromDateString).diff(toDateString)
}
