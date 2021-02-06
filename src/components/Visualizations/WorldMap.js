import React, { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Select from 'react-select'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'
import GlobalMap from '../GlobalMap/GlobalMap'
import { CONTINENTS, continentSelectList } from '../../helpers/country'
import Loader from '../../components/Loader/Loader'
import ContractView from "../../constants/ContractView"
import ChartFooter from "../Utilities/ChartFooter"

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
                <div className="bg-white rounded p-6">
                    <FullScreen handle={fullScreenHandler}>
                        <div className="relative">
                            <div className="flex justify-end">
                                <ul className="contract-switch flex">
                                    <li
                                        className={`mr-4 cursor-pointer ${
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
                                        className={`cursor-pointer ${
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

                            <div className="w-1/5 absolute top-0 left-0 z-10 -mt-3">
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
