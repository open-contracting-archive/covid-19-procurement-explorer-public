import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import CountryService from '../../services/CountryService'
import Loader from '../../components/Loader/Loader'
import BarChartRace from '../Charts/BarChart/BarChartRace'
import ContractView from '../../constants/ContractView'

const ContractTrend = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { viewType = ContractView.VALUE, selectedContinent } = props
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState({})
    const [loading, setLoading] = useState(true)
    const dataColumn =
        viewType === ContractView.VALUE ? 'amount_usd' : 'tender_count'

    useEffect(() => {
        CountryService.GetGlobalMapData().then((response) => {
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
                        // href: 'https://www.worldometers.info/img/flags/us-flag.gif'
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

export default ContractTrend
