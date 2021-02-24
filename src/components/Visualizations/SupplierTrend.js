import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import CountryService from '../../services/CountryService'
import Loader from '../../components/Loader/Loader'
import BarChartRace from '../Charts/BarChart/BarChartRace'

const SupplierTrend = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { selectedContinent } = props
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState({})
    const [loading, setLoading] = useState(true)
    const dataColumn = 'supplier_count'

    useEffect(() => {
        CountryService.SupplierTrend().then((response) => {
            setOriginalData(response.result)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [])

    useEffect(() => {
        let chartData
        if (!isEmpty(originalData)) {
            chartData = originalData.reduce((formattedData, item) => {
                let filtered = item.details
                    .filter((country) => country.country_code !== 'gl')
                    .filter((country) =>
                        !selectedContinent || selectedContinent.value === 'all'
                            ? true
                            : country.country_continent ===
                              selectedContinent.value
                    )
                    .map((country) => ({
                        country: country.country,
                        value: country[dataColumn]
                    }))
                const sum = filtered.reduce(
                    (total, item) => (total += item.value),
                    0
                )

                return sum > 0
                    ? { ...formattedData, [item.month]: filtered }
                    : { ...formattedData }
            }, {})
            setChartData(chartData)
        }

        return () => {
            chartData = null
        }
    }, [originalData, selectedContinent])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : isEmpty(chartData) ? (
                <div className="mt-4">No data available</div>
            ) : (
                !isEmpty(chartData) && <BarChartRace data={chartData} />
            )}
        </div>
    )
}

export default SupplierTrend
