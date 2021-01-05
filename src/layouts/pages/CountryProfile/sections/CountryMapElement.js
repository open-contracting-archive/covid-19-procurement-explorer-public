import React, { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import CountryMap from "../../../../components/Charts/CountryMap/CountryMap"
import { ReactComponent as DownloadIcon } from "../../../../assets/img/icons/ic_download.svg"
import { ReactComponent as ShareIcon } from "../../../../assets/img/icons/ic_share.svg"
import { ReactComponent as FullViewIcon } from "../../../../assets/img/icons/ic_fullscreen.svg"
import VisualizationServices from "../../../../services/visualizationServices"
import useTrans from "../../../../hooks/useTrans"
import Loader from "../../../../components/Loader/Loader"

const CountryMapElement = ({ countryCode }) => {
    const [loading, setLoading] = useState(true)
    const [contractType, setContractType] = useState('value')
    // const [countryVisualizationData, setCountryVisualizationData] = useState([])
    const [mapData, setMapData] = useState()
    const handle = useFullScreenHandle()
    const { trans } = useTrans()

    useEffect(() => {
        if (countryCode !== undefined && countryCode !== null) {
            VisualizationServices.CountryMap({ country: countryCode })
                .then((response) => {
                    const mapData = [
                        {
                            id: response.country_code,
                            value:
                                contractType === 'value'
                                    ? response.amount_usd
                                    : response.tender_count
                        }
                    ]
                    setMapData(mapData)
                    setLoading(false)
                })
        }
    }, [countryCode])

    const isActiveTab = (type) => {
        return contractType === type ? 'active' : ''
    }

    return (
        <div className="w-full md:w-1/2 lg:w-62 px-4 mb-4 bg-white rounded p-6">
            <FullScreen handle={handle}>
                <div className="relative">
                    <div className="flex justify-end">
                        <ul className="contract-switch flex">
                            <li className={`mr-4 cursor-pointer ${isActiveTab('value')}`} onClick={() => setContractType('value')}>
                                {trans('By contract value')}
                            </li>
                            <li className={`mr-4 cursor-pointer ${isActiveTab('number')}`} onClick={() => setContractType('value')}>
                                {trans('By number of contracts')}
                            </li>
                        </ul>
                    </div>

                    <div className="h-full">
                        {loading ? (<Loader />) : (
                            <CountryMap data={mapData} countryCode={countryCode} />
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
                            <span className="cursor-pointer">View full screen</span>
                            <FullViewIcon className="ml-2 inline-block" />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CountryMapElement
