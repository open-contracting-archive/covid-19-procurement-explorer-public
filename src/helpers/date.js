import Default from '../constants/Default'
import * as dayjs from 'dayjs'
import Duration from 'dayjs/plugin/duration'

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

export const sortItemsByDate = (items, key) => {
    return items.sort((item1, item2) => {
        return dateDiff(item1[key], item2[key])
    })
}

export const durationInMonths = (duration) => {
    dayjs.extend(Duration)

    return Math.floor(dayjs.duration(duration.split(' ')[0], 'days').asMonths())
}
