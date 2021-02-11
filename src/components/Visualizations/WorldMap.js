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
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.GlobalMap(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
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
                            ? data.amount_usd
                            : data.tender_count,
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
                <div className="bg-white rounded p-4 pb-0 md:pb-4">
                    <FullScreen handle={fullScreenHandler}>
                        <div className="relative">
                            <div className="flex flex-wrap md:flex-no-wrap md:justify-end world-map-chart mb-4">
                                <ul className="contract-switch flex flex-1 md:flex-none text-center md:text-left">
                                    <li
                                        className={`cursor-pointer w-full md:w-auto text-xs md:text-base pb-1 mr-2 md:mr-4 ${
                                            contractType === 'value'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            setContractType('value')
                                        }>
                                        {trans('By contract value')}
                                    </li>
                                    <li
                                        className={`cursor-pointer w-full md:w-auto text-xs md:text-base pb-1 ${
                                            contractType === 'number'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            setContractType('number')
                                        }>
                                        {trans('By number of contracts')}
                                    </li>
                                </ul>
                            </div>

                            <div className="w-full md:w-1/5 md:absolute top-0 left-0 z-10 md:-mt-3">
                                <Select
                                    className="select-filter text-sm"
                                    classNamePrefix="select-filter"
                                    options={options}
                                    value={selectedContinent}
                                    defaultValue={options[0]}
                                    onChange={(selectedOption) =>
                                        handleContinentSelection(selectedOption)
                                    }
                                />
                            </div>
                            <div>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <GlobalMap
                                        data={mapData}
                                        contractType={contractType}
                                        coordinates={
                                            CONTINENTS[selectedContinent.value]
                                        }
                                    />
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
