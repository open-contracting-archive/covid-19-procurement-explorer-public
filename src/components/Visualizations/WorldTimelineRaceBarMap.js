import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { isEmpty } from 'lodash'
import useTrans from '../../hooks/useTrans'
import BarChartRace from '../../components/Charts/BarChart/BarChartRace'
import CountryService from '../../services/CountryService'
import Loader from '../../components/Loader/Loader'
import { continentSelectList } from '../../helpers/country'
import ContractView from '../../constants/ContractView'

const WorldTimelineRaceBarMap = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [raceBarType, setRaceBarType] = useState('value')
    const [originalData, setOriginalData] = useState(null)
    const [chartData, setChartData] = useState({})
    const [selectedContinent, setSelectedContinent] = useState(null)
    const { trans } = useTrans()
    const options = continentSelectList

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
                        value:
                            raceBarType === 'value'
                                ? country.amount_usd
                                : country.tender_count
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
    }, [originalData, selectedContinent, raceBarType])

    const handleContinentSelection = (selectedOption) => {
        setSelectedContinent(selectedOption)
    }

    return (
        <div>
            <div className="flex flex-wrap md:flex-no-wrap md:justify-end world-map-chart mb-4">
                <ul className="contract-switch flex flex-1 md:flex-none text-center md:text-left">
                    <li
                        className={`mr-4 cursor-pointer w-full md:w-auto text-xs md:text-base pb-1 ${
                            raceBarType === 'value' ? 'active' : ''
                        }`}
                        onClick={() => setRaceBarType('value')}>
                        {trans('By contract')}
                    </li>
                    <li
                        className={`cursor-pointer w-full md:w-auto text-xs md:text-base pb-1 ${
                            raceBarType === 'number' ? 'active' : ''
                        }`}
                        onClick={() => setRaceBarType('number')}>
                        {trans('By number')}
                    </li>
                </ul>
            </div>
            <div className="w-1/5 absolute top-0 left-0 z-10">
                <Select
                    className="select-filter text-sm"
                    classNamePrefix="select-filter"
                    options={options}
                    defaultValue={options[0]}
                    isSearchable={false}
                    onChange={(selectedOption) =>
                        handleContinentSelection(selectedOption)
                    }
                />
            </div>
            {loading ? (
                <Loader />
            ) : isEmpty(chartData) ? (
                'No data available'
            ) : (
                !isEmpty(chartData) && <BarChartRace data={chartData} />
            )}
        </div>
    )
}

export default WorldTimelineRaceBarMap
