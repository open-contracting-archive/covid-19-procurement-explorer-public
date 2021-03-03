import React, { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Select from 'react-select'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'
import GlobalMap from '../GlobalMap/GlobalMap'
import { CONTINENTS, continentSelectList } from '../../helpers/country'
import Loader from '../../components/Loader/Loader'
import ContractView from '../../constants/ContractView'
import ChartFooter from '../Utilities/ChartFooter'
import ErrorHandler from '../ErrorHandler'
import Default from '../../constants/Default'

const options = continentSelectList

const WorldMap = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const [originalData, setOriginalData] = useState({})
    const [contractType, setContractType] = useState(ContractView.VALUE)
    const [mapData, setMapData] = useState({})
    const [selectedContinent, setSelectedContinent] = useState(options[0])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.GlobalMap(params)
            .then((result) => {
                setLoading(false)
                if (result) {
                    setOriginalData(result)
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                setError(true)
            })

        return () => {
            setOriginalData({})
        }
    }, [params])

    useEffect(() => {
        let mapData = {}
        const parsedMapData =
            originalData.result &&
            originalData.result.map((data) => {
                return (mapData = {
                    ...mapData,
                    id: data.country_code,
                    value:
                        contractType === 'value'
                            ? data[Default.AMOUNT_USD]
                            : data[Default.TENDER_COUNT],
                    url: `/country/${data.country
                        .toLowerCase()
                        .replace(' ', '-')}/data`
                })
            })
        setMapData(parsedMapData)
    }, [originalData, contractType])

    // ===========================================================================
    // Handler and functions
    // ===========================================================================
    const handleContinentSelection = (selectedOption) => {
        setSelectedContinent(selectedOption)
    }

    return (
        <div className="flex flex-wrap -mx-4 -mb-4">
            <div className="w-full px-4 mb-4">
                <div className="">
                    <FullScreen handle={fullScreenHandler}>
                        <div className="relative p-4 bg-white rounded rounded-b-none">
                            <div className="flex flex-wrap md:flex-no-wrap md:justify-between world-map-chart mb-4">
                                <div className="w-full md:w-1/5 mb-4 md:mb-0">
                                    <Select
                                        className="select-filter text-sm"
                                        classNamePrefix="select-filter"
                                        options={options}
                                        value={selectedContinent}
                                        defaultValue={options[0]}
                                        onChange={(selectedOption) =>
                                            handleContinentSelection(
                                                selectedOption
                                            )
                                        }
                                    />
                                </div>
                                <ul className="contract-switch flex flex-1 md:flex-none text-center md:text-left">
                                    <li
                                        className={`cursor-pointer w-1/2 md:w-auto text-base pb-1 mr-2 md:mr-4 ${
                                            contractType === 'value'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            setContractType('value')
                                        }>
                                        {trans('By value')}
                                    </li>
                                    <li
                                        className={`cursor-pointer w-1/2 md:w-auto text-base pb-1 ${
                                            contractType === 'number'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            setContractType('number')
                                        }>
                                        {trans('By number')}
                                    </li>
                                </ul>
                            </div>
                            <div>
                                {loading ? (
                                    <Loader />
                                ) : !error ? (
                                    <GlobalMap
                                        data={mapData}
                                        contractType={contractType}
                                        coordinates={
                                            CONTINENTS[selectedContinent.value]
                                        }
                                    />
                                ) : (
                                    <ErrorHandler />
                                )}
                            </div>
                        </div>
                    </FullScreen>

                    <ChartFooter fullScreenHandler={fullScreenHandler} />
                </div>
            </div>
        </div>
    )
}

export default WorldMap
