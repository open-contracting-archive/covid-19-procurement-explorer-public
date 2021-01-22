import Default from '../constants/Default'
import * as dayjs from 'dayjs'

export const formatDate = (dateString, format = Default.DISPLAY_DATE_SHORT) => {
    return dayjs(dateString).format(format)
}

export const dateDiff = (fromDateString, toDateString) => {
    return dayjs(fromDateString).diff(toDateString)
}

export const formatTime = (timeString, format = 'h:mm A') => {
    return dayjs('2020-01-01T' + timeString).format(format)
}

export const formatYearText = (yearMonth) => {
    return yearMonth ? dayjs(yearMonth + '-01T').format('MMM, YYYY') : yearMonth
}
