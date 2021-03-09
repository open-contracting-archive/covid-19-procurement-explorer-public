import React, { Fragment, useEffect, useState, useMemo } from 'react'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { isEmpty } from 'lodash'
import useTrans from '../../hooks/useTrans'
import CountryService from '../../services/CountryService'
import RaceMap from '../../components/Charts/RaceMap/RaceMap'
import Loader from '../../components/Loader/Loader'
import ChartFooter from '../Utilities/ChartFooter'
import { CONTINENTS, continentSelectList } from '../../helpers/country'
import Visualization from '../../constants/Visualization'
import ContractView from '../../constants/ContractView'
import ContractViewSwitcher from '../Utilities/ContractViewSwitcher'
import Default from '../../constants/Default'
import PerCapitaSwitcher from '../Utilities/PerCapitaSwitcher'

const options = continentSelectList

const WorldTimelineMap = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const countries = useSelector((state) => state.general.countries)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [showPerCapita, setShowPerCapita] = useState(() => false)
    const [originalData, setOriginalData] = useState([])
    const [mapData, setMapData] = useState({})
    const [sliderData, setSliderData] = useState([])
    const [yearMonth, setYearMonth] = useState('2020-01')
    const [selectedContinent, setSelectedContinent] = useState(options[0])
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
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

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        CountryService.GetGlobalMapData().then((response) => {
            if (response.result) {
                setOriginalData(response.result)
            }

            setLoading(false)
        })

        return () => {
            setOriginalData(null)
        }
    }, [])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let dateObject = {}
            originalData.map((data) => {
                let countryObject = {}
                data.details.map((detail) => {
                    if (detail.country_code !== 'ALL') {
                        countryObject = {
                            ...countryObject,
                            [detail.country_code]: {
                                value: showPerCapita
                                    ? detail[Default.AMOUNT_USD] /
                                      countriesPopulation[detail.country_code]
                                    : detail[Default.AMOUNT_USD],
                                number: detail[Default.TENDER_COUNT],
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
            setYearMonth(originalData && originalData[0].month)

            const keys =
                originalData &&
                originalData.map((data) => {
                    return data.month
                })
            setSliderData(keys)
        }

        return () => {
            setMapData({})
            setSliderData([])
        }
    }, [originalData, showPerCapita])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    const handleContinentSelection = (selectedOption) => {
        setSelectedContinent(selectedOption)
    }

    return (
        <FullScreen handle={fullScreenHandler}>
            {!mapData ? (
                <Loader />
            ) : (
                <Fragment>
                    <section className="world-map-chart-container p-4 bg-white rounded rounded-b-none">
                        <div className="flex flex-wrap md:flex-no-wrap md:justify-between world-map-chart mb-4">
                            <div className="w-full md:w-1/5 mb-4 md:mb-0">
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
                            {viewType === ContractView.VALUE && (
                                <PerCapitaSwitcher
                                    show={showPerCapita}
                                    handleToggle={setShowPerCapita}
                                />
                            )}

                            <ContractViewSwitcher
                                style={'short'}
                                viewType={viewType}
                                viewHandler={(value) => {
                                    setViewType(value)
                                    setShowPerCapita(false)
                                }}
                            />
                        </div>
                        <RaceMap
                            contractData={mapData}
                            contractType={viewType}
                            yearMonth={yearMonth}
                            sliderData={sliderData || []}
                            coordinates={CONTINENTS[selectedContinent.value]}
                        />
                    </section>

                    <ChartFooter
                        fullScreenHandler={fullScreenHandler}
                        embeddedVisualization={{
                            key: Visualization.WORLD_MAP_RACE
                        }}
                    />
                </Fragment>
            )}
        </FullScreen>
    )
}

export default WorldTimelineMap
