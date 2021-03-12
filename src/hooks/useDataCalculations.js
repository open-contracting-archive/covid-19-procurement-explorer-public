import { dateDiff, formatDate } from "../helpers/date"
import { negativeValue, positiveValue } from "../constants/Theme"

const useDataCalculations = () => {
    return {
        areaChartData: (chartData, key = 'date') => {
            return chartData
                .map((item) => ({ ...item, date: formatDate(item[key], 'YYYY-MM-DD') }))
                .sort((item1, item2) => dateDiff(item1[key], item2[key]))
                .map((item) => ({ ...item, date: formatDate(item[key], 'MMMM YYYY') }))
        },

        changePercentage: (itemList, key = 'date') => {
            if (itemList.length) {
                const items = itemList.sort((a, b) => dateDiff(b[key], a[key]))
                const latest = items[0]['value']
                const previous = items[1]['value']
                const percentage = Math.round((latest / previous) * 100)
                const relativePercentage = latest > previous ? percentage : 100 - percentage
                const sign = relativePercentage === 0 ? '' : latest > previous ? '+' : '-'

                return sign + relativePercentage
            }

            return 0
        },

        colorValue: (value) => {
            return value >= 0 ? positiveValue : negativeValue
        }
    }
}

export default useDataCalculations
