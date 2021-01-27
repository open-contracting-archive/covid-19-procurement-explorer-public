import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import useTrans from '../../hooks/useTrans'
import RaceBarChart from '../../components/Charts/RaceBarChart/RaceBarChart'
import CountryService from '../../services/CountryService'
import Loader from '../../components/Loader/Loader'

const WorldTimelineRaceBarMap = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [raceBarType, setRaceBarType] = useState('value')
    const [raceBarDataApi, setRaceBarDataApi] = useState(null)
    const [selectedContinent, setSelectedContinent] = useState({
        value: 'all',
        label: 'All Continent'
    })
    const { trans } = useTrans()
    const options = [
        { value: 'all', label: 'All Continent' },
        { value: 'asia', label: 'Asia' },
        { value: 'europe', label: 'Europe' },
        { value: 'africa', label: 'Africa' },
        { value: 'oceania', label: 'Oceania' },
        { value: 'south_america', label: 'South America' },
        { value: 'north_america', label: 'North America' },
        { value: 'middle_east', label: 'Middle East' }
    ]

    useEffect(() => {
        CountryService.GetGlobalMapData().then((response) => {
            const raceBarChartformatted = response.result.reduce(
                (formattedData, d) => ({
                    ...formattedData,
                    [d.month]: d.details.map((detail) => ({
                        country:
                            detail.country == 'Global' ? '' : detail.country,
                        value:
                            raceBarType === 'value'
                                ? detail.amount_usd
                                : detail.tender_count
                    }))
                }),
                {}
            )
            setRaceBarDataApi(raceBarChartformatted)
            setLoading(false)
        })
    }, [raceBarType])

    console.log(raceBarDataApi, 'Data')

    return (
        <div>
            <div className="flex justify-end">
                <ul className="contract-switch flex">
                    <li
                        className={`mr-4 cursor-pointer ${
                            raceBarType === 'value' ? 'active' : ''
                        }`}
                        onClick={() => setRaceBarType('value')}>
                        {trans('By contract value')}
                    </li>
                    <li
                        className={`cursor-pointer ${
                            raceBarType === 'number' ? 'active' : ''
                        }`}
                        onClick={() => setRaceBarType('number')}>
                        {trans('By number of contracts')}
                    </li>
                </ul>
            </div>
            <div className="hidden w-1/5 absolute top-0 left-0 z-10 -mt-3">
                <Select
                    className="select-filter text-sm"
                    classNamePrefix="select-filter"
                    options={options}
                    value={selectedContinent}
                    defaultValue={options[0]}
                    onChange={(selectedOption) =>
                        handleContinentChange(selectedOption)
                    }
                />
            </div>
            {!raceBarDataApi ? (
                <Loader />
            ) : (
                <RaceBarChart data={raceBarDataApi} />
            )}
        </div>
    )
}

export default WorldTimelineRaceBarMap
