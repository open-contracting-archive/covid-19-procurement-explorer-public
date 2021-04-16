import React, { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationService from '../../../../services/VisualizationService'
import { CountryDetailMap } from '../../../../components/Visualizations'
import {
    Loader,
    ChartFooter,
    ErrorHandler
} from '../../../../components/Utilities'
import ContractView from '../../../../constants/ContractView'
import Default from '../../../../constants/Default'

const CountryMapElement = (props) => {
    const [loading, setLoading] = useState(true)
    const [viewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState({})
    const [mapData, setMapData] = useState([])
    const [error, setError] = useState(false)
    const fullScreenHandler = useFullScreenHandle()

    useEffect(() => {
        VisualizationService.CountryMap({ country: props.countryCode })
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
    }, [props?.countryCode])

    useEffect(() => {
        if (originalData.country_code) {
            const mapDataFormatted = [
                {
                    id: originalData.country_code,
                    value:
                        viewType === ContractView.VALUE
                            ? originalData[Default.AMOUNT_USD]
                            : originalData[Default.TENDER_COUNT]
                }
            ]
            setMapData(mapDataFormatted)
        }
    }, [originalData, viewType])

    return (
        <div className="mt-10 md:mt-0 w-full md:w-1/2 lg:w-62 px-2">
            <FullScreen handle={fullScreenHandler}>
                <div className="p-4 bg-white rounded rounded-b-none h-full relative">
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
    )
}

export default CountryMapElement
