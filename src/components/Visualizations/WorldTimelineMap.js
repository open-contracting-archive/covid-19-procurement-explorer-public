import React, { Fragment, useEffect, useState } from 'react'
import Select from 'react-select'
import useTrans from '../../hooks/useTrans'
import RaceMap from '../../components/Charts/RaceMap/RaceMap'
import CountryService from '../../services/CountryService'
import Loader from '../../components/Loader/Loader'
import { CONTINENTS, continentSelectList } from '../../helpers/country'

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

        originalData &&
            originalData.result.map((data) => {
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
        <Fragment>
            {!mapData ? (
                <Loader />
            ) : (
                <section>
                    <div className="flex flex-wrap md:flex-no-wrap md:justify-between world-map-chart mb-4">
                        <div className="w-full md:w-1/5">
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
                        {contractType === 'value' ? (
                            <div className="my-4 w-full md:flex justify-center md:my-0 items-center text-center">
                                <span className="mr-2 text-sm">
                                    Spending USD
                                </span>
                                <div className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        className="toggle-switch-checkbox"
                                        name="toggleSwitch"
                                        id="toggleSwitch"
                                    />
                                    <label
                                        className="toggle-switch-label"
                                        htmlFor="toggleSwitch">
                                        <span className="toggle-switch-inner"></span>
                                        <span className="toggle-switch-switch"></span>
                                    </label>
                                </div>
                                <span className="ml-2 text-sm">
                                    Spending USD per capita
                                </span>
                            </div>
                        ) : (
                            ''
                        )}
                        <ul className="contract-switch flex flex-1 md:flex-none text-center md:text-left">
                            <li
                                className={`mr-4 cursor-pointer w-full md:w-auto text-xs md:text-base pb-1 ${
                                    contractType === 'value' ? 'active' : ''
                                }`}
                                onClick={() => setContractType('value')}>
                                {trans('By value')}
                            </li>
                            <li
                                className={`cursor-pointer w-full md:w-auto text-xs md:text-base pb-1 ${
                                    contractType === 'number' ? 'active' : ''
                                }`}
                                onClick={() => setContractType('number')}>
                                {trans('By number')}
                            </li>
                        </ul>
                    </div>
                    <RaceMap
                        contractData={mapData}
                        contractType={contractType}
                        yearMonth={yearMonth}
                        sliderData={sliderData || []}
                        coordinates={CONTINENTS[selectedContinent.value]}
                    />
                </section>
            )}
        </Fragment>
    )
}

export default WorldTimelineMap
