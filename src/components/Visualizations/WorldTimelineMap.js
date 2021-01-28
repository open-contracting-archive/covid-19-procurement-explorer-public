import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import useTrans from '../../hooks/useTrans'
import RaceMap from '../../components/Charts/RaceMap/RaceMap'
import CountryService from '../../services/CountryService'
import Loader from '../../components/Loader/Loader'
import ShareButtons from '../../components/Library/ShareButtons'
import TenderTable from '../../components/Tables/TenderTable'
import { findByDisplayValue } from '@testing-library/react'

const WorldTimelineMap = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [contractType, setContractType] = useState('value')
    const [sliderData, setSliderData] = useState([])
    const [yearMonth, setYearMonth] = useState('2020-01')
    const [dataFromApi, setDataFromApi] = useState()
    const [contractDataApi, setContractDataApi] = useState({})
    const [selectedContinent, setSelectedContinent] = useState({
        value: 'all',
        label: 'All Continents'
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

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        CountryService.GetGlobalMapData().then((response) => {
            setDataFromApi(response)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        let dateObject = {}
        dataFromApi &&
            dataFromApi.result.map((data) => {
                let countryObject = {}
                data.details.map((detail) => {
                    if (detail.country_code !== 'ALL') {
                        countryObject = {
                            ...countryObject,
                            [detail.country_code]: {
                                value: detail.amount_usd,
                                number: detail.tender_count,
                                url: `/country/${detail.country
                                    .toLowerCase()
                                    .replace(' ', '-')}/data`
                            }
                        }
                    }
                })
                dateObject = {
                    ...dateObject,
                    [data.month]: countryObject
                }
            })
        setContractDataApi(dateObject)
        setYearMonth(dataFromApi && dataFromApi.result[0].month)

        const keys =
            dataFromApi &&
            dataFromApi.result.map((data) => {
                return data.month
            })
        setSliderData(keys)
    }, [dataFromApi])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================

    const handleContinentChange = (selectedOption) => {
        setSelectedContinent(selectedOption)
    }

    const continent = {
        all: {
            lat: 0,
            long: 0,
            zoomLevel: 1
        },
        asia: {
            lat: 44.94789322476297,
            long: 95.75037267845751,
            zoomLevel: 1.8
        },
        europe: {
            lat: 55.85406929584602,
            long: 28.24904034876191,
            zoomLevel: 1.8
        },
        africa: {
            lat: 6.426117205286786,
            long: 18.276615276175992,
            zoomLevel: 1.6
        },
        oceania: {
            lat: -31.065922730080157,
            long: 152.78101519406331,
            zoomLevel: 1.6
        },
        south_america: {
            lat: -15.173251268423256,
            long: -60.792112817153885,
            zoomLevel: 1.6
        },
        north_america: {
            lat: 56.51520886670177,
            long: -92.32043635079269,
            zoomLevel: 1.6
        },
        middle_east: {
            lat: 27.0,
            long: 38.25,
            zoomLevel: 1.6
        }
    }

    return (
        <div>
            {!contractDataApi ? (
                <Loader />
            ) : (
                <div>
                    <div className="flex justify-end world-map-chart mb-4">
                        <ul className="contract-switch flex">
                            <li
                                className={`mr-4 cursor-pointer ${
                                    contractType === 'value' ? 'active' : ''
                                }`}
                                onClick={() => setContractType('value')}>
                                {trans('By contract value')}
                            </li>
                            <li
                                className={`cursor-pointer ${
                                    contractType === 'number' ? 'active' : ''
                                }`}
                                onClick={() => setContractType('number')}>
                                {trans('By number of contracts')}
                            </li>
                        </ul>
                    </div>
                    <div className="w-1/5 absolute top-0 left-0 z-10 -mt-3">
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
                    <RaceMap
                        contractData={contractDataApi}
                        contractType={contractType}
                        yearMonth={yearMonth}
                        sliderData={sliderData || []}
                        coordinates={continent[selectedContinent.value]}
                    />
                </div>
            )}
        </div>
    )
}

export default WorldTimelineMap
