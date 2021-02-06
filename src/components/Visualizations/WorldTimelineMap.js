import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import useTrans from '../../hooks/useTrans'
import RaceMap from '../../components/Charts/RaceMap/RaceMap'
import CountryService from '../../services/CountryService'
import Loader from '../../components/Loader/Loader'
import { CONTINENTS, continentSelectList } from "../../helpers/country"

const options = continentSelectList

const WorldTimelineMap = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [contractType, setContractType] = useState('value')
    const [originalData, setOriginalData] = useState(null)
    const [mapData, setMapData] = useState({})
    const [sliderData, setSliderData] = useState([])
    const [yearMonth, setYearMonth] = useState('2020-01')

    const [selectedContinent, setSelectedContinent] = useState(options[0])
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        CountryService.GetGlobalMapData().then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData(null)
        }
    }, [])

    useEffect(() => {
        let dateObject = {}

        originalData && originalData.result.map((data) => {
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
            dateObject = { ...dateObject, [data.month]: countryObject }
        })
        setMapData(dateObject)
        setYearMonth(originalData && originalData.result[0].month)

        const keys =
            originalData &&
            originalData.result.map((data) => {
                return data.month
            })
        setSliderData(keys)

        return () => {
            setMapData({})
            setSliderData([])
        }
    }, [originalData])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    const handleContinentSelection = (selectedOption) => {
        setSelectedContinent(selectedOption)
    }

    return (
        <div>
            {!mapData ? (
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
                            defaultValue={options[0]}
                            onChange={(selectedOption) =>
                                handleContinentSelection(selectedOption)
                            }
                        />
                    </div>

                    <RaceMap
                        contractData={mapData}
                        contractType={contractType}
                        yearMonth={yearMonth}
                        sliderData={sliderData || []}
                        coordinates={CONTINENTS[selectedContinent.value]}
                    />
                </div>
            )}
        </div>
    )
}

export default WorldTimelineMap
