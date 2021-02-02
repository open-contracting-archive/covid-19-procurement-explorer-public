import React, { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationServices from '../../../../services/visualizationServices'
import CountryMap from '../../../../components/Charts/CountryMap/CountryMap'
import CountryDetailMap from '../../../../components/Charts/CountryDetailMap/CountryDetailMap'
import useTrans from '../../../../hooks/useTrans'
import Loader from '../../../../components/Loader/Loader'
import { ReactComponent as DownloadIcon } from '../../../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../../../assets/img/icons/ic_fullscreen.svg'
import ContractView from "../../../../constants/ContractView"

const CountryMapElement = (props) => {
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState({})
    const [mapData, setMapData] = useState([])
    const handle = useFullScreenHandle()
    const { trans } = useTrans()

    useEffect(() => {
        VisualizationServices.CountryMap({ country: props.countryCode })
            .then((response) => {
                setOriginalData(response)
                setLoading(false)
            })
    }, [props?.countryCode])

    useEffect(() => {
        if (originalData.country_code) {
            const mapDataFormatted = [
                {
                    id: originalData.country_code,
                    value: viewType === ContractView.VALUE ? originalData.amount_usd : originalData.tender_count
                }
            ]
            setMapData(mapDataFormatted)
        }
    }, [originalData, viewType])

    const isActiveTab = (type) => {
        return viewType === type ? 'active' : ''
    }

    return (
        <div className="w-full md:w-1/2 lg:w-62 px-4 mb-4 bg-white rounded py-6">
            <FullScreen handle={handle}>
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
                        {loading ? (<Loader />) : (
                            // <CountryMap data={mapData} countryCode={countryCode} />
                            <CountryDetailMap data={mapData} countryCode={props.countryCode} />
                        )}
                    </div>
                </div>
            </FullScreen>
            <div
                className="flex items-center justify-between pt-4 border-t border-blue-0 text-sm
                                             text-primary-blue -mx-6 px-6">
                <div className="flex">
                    <span className="flex items-center">
                        <DownloadIcon className="mr-2 inline-block" />{' '}
                        <span className="cursor-pointer">Download</span>
                    </span>
                    <span className="ml-8 flex items-center">
                        <ShareIcon className="mr-2 inline-block" />{' '}
                        <span className="cursor-pointer">Share</span>
                    </span>
                </div>
                <div>
                    <span className="flex items-center">
                        <button onClick={handle.enter}>
                            <span className="cursor-pointer">
                                View full screen
                            </span>
                            <FullViewIcon className="ml-2 inline-block" />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CountryMapElement
