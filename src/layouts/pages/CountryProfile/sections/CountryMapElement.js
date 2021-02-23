import React, { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationService from '../../../../services/VisualizationService'
import CountryDetailMap from '../../../../components/Charts/CountryDetailMap/CountryDetailMap'
import useTrans from '../../../../hooks/useTrans'
import Loader from '../../../../components/Loader/Loader'
import ContractView from '../../../../constants/ContractView'
import ChartFooter from '../../../../components/Utilities/ChartFooter'
import ErrorHandler from '../../../../components/ErrorHandler'

const CountryMapElement = (props) => {
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState({})
    const [mapData, setMapData] = useState([])
    const [error, setError] = useState(false)
    const fullScreenHandler = useFullScreenHandle()
    const { trans } = useTrans()

    useEffect(() => {
        VisualizationService.CountryMap({ country: props.countryCode }).then(
            (result) => {
                setLoading(false)
                    if(result){
                        setOriginalData(result)
                    } else{
                        throw new Error()
                    }
                })
                .catch(()=>{
                    setError(true)
                })


        return () => {
            setOriginalData({})
        }
    }, [props?.countryCode])

    useEffect(() => {
        if (originalData.country_code) {
            const mapDataFormatted = [
                {
                    id: originalData.country_code,
                    value:
                        viewType === ContractView.VALUE
                            ? originalData.amount_usd
                            : originalData.tender_count
                }
            ]
            setMapData(mapDataFormatted)
        }
    }, [originalData, viewType])

    const isActiveTab = (type) => {
        return viewType === type ? 'active' : ''
    }

    return (
        <div className="mt-10 md:mt-0 w-full md:w-1/2 lg:w-62 px-2">
            <div className="p-4 pb-0 md:pb-4 bg-white rounded">
                <FullScreen handle={fullScreenHandler}>
                    <div className="relative">
                        {/* <div className="flex justify-end">
                        <ul className="contract-switch flex">
                            <li
                                className={`mr-4 cursor-pointer ${isActiveTab(ContractView.VALUE)}`}
                                onClick={() => setViewType(ContractView.VALUE)}>
                                {trans('By contract value')}
                            </li>
                            <li
                                className={`mr-4 cursor-pointer ${isActiveTab(ContractView.NUMBER)}`}
                                onClick={() => setViewType(ContractView.NUMBER)}>
                                {trans('By number of contracts')}
                            </li>
                        </ul>
                    </div> */}

                        <div className="h-full">
                            {loading ? (
                                <Loader />
                            ) : !error ? (
                                <CountryDetailMap
                                    data={mapData}
                                    countryCode={props.countryCode}
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
    )
}

export default CountryMapElement
