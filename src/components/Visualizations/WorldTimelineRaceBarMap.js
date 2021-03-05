import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { isEmpty } from 'lodash'
import useTrans from '../../hooks/useTrans'
import BarChartRace from '../../components/Charts/BarChart/BarChartRace'
import CountryService from '../../services/CountryService'
import Loader from '../../components/Loader/Loader'
import { continentSelectList } from '../../helpers/country'
import Default from '../../constants/Default'
import ChartFooter from '../Utilities/ChartFooter'
import Visualization from '../../constants/Visualization'

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
    const fullScreenHandler = useFullScreenHandle()
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
                                ? country[Default.AMOUNT_USD]
                                : country[Default.TENDER_COUNT],
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
    }, [originalData, selectedContinent, raceBarType])

    const handleContinentSelection = (selectedOption) => {
        setSelectedContinent(selectedOption)
    }

    return (
        <div>
            <div className="world-map-chart-container p-4 bg-white rounded rounded-b-none">
                <div className="flex flex-wrap md:flex-no-wrap md:justify-between world-map-chart mb-4">
                    <div className="w-full md:w-1/5 mb-4 md:mb-0">
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
                    <ul className="contract-switch flex flex-1 md:flex-none text-center md:text-left">
                        <li
                            className={`mr-4 cursor-pointer w-1/2 md:w-auto text-base pb-1 ${
                                raceBarType === 'value' ? 'active' : ''
                            }`}
                            onClick={() => setRaceBarType('value')}>
                            {trans('By value')}
                        </li>
                        <li
                            className={`cursor-pointer w-1/2 md:w-auto text-base pb-1 ${
                                raceBarType === 'number' ? 'active' : ''
                            }`}
                            onClick={() => setRaceBarType('number')}>
                            {trans('By number')}
                        </li>
                    </ul>
                </div>
                {loading ? (
                    <Loader />
                ) : isEmpty(chartData) ? (
                    'No data available'
                ) : (
                    !isEmpty(chartData) && <BarChartRace data={chartData} />
                )}
            </div>
            <ChartFooter
                fullScreenHandler={fullScreenHandler}
                embeddedVisualization={{
                    key: Visualization.WORLD_TIMELINE_RACE_BAR
                }}
            />
        </div>
    )
}

export default WorldTimelineRaceBarMap
