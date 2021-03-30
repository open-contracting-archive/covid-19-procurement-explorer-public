import React, { useState, useEffect, useMemo } from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import CountryService from '../../services/CountryService'
import Loader from '../../components/Loader/Loader'
import BarChartRace from '../Charts/BarChart/BarChartRace'
import ContractView from '../../constants/ContractView'
import Default from '../../constants/Default'
import PerCapitaSwitcher from '../../components/Utilities/PerCapitaSwitcher'

const ContractTrend = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { viewType = ContractView.VALUE, selectedContinent } = props
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState({})
    const [loading, setLoading] = useState(true)
    const countries = useSelector((state) => state.general.countries)
    const [showPerCapita, setShowPerCapita] = useState(() => false)
    const countriesPopulation = useMemo(() => {
        return countries.reduce((acc, current) => {
            return current.country_code_alpha_2 !== 'gl'
                ? {
                      ...acc,
                      [current.country_code_alpha_2.toUpperCase()]: current.population
                  }
                : acc
        }, {})
    }, [countries])
    const dataColumn =
        viewType === ContractView.VALUE
            ? Default.AMOUNT_USD
            : Default.TENDER_COUNT

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
                        value: showPerCapita
                            ? country[dataColumn] /
                              countriesPopulation[country.country_code]
                            : country[dataColumn],
                        href: `https://res.cloudinary.com/dyquku6bs/image/upload/v1614148469/country-flags/${country.country_code.toLowerCase()}-flag.gif`
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
    }, [
        originalData,
        selectedContinent,
        showPerCapita,
        countriesPopulation,
        dataColumn
    ])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : isEmpty(chartData) ? (
                <div className="mt-4">No data available</div>
            ) : (
                !isEmpty(chartData) && (
                    <div className="md:-mt-10">
                        <PerCapitaSwitcher
                            show={showPerCapita}
                            handleToggle={setShowPerCapita}
                            id="contractTogglePerCapita"
                        />
                        <BarChartRace data={chartData} viewType={viewType} />
                    </div>
                )
            )}
        </div>
    )
}

export default ContractTrend
