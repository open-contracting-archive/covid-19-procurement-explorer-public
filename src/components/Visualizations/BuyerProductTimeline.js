import React, { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import useTrans from '../../hooks/useTrans'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import Loader from '../../components/Loader/Loader'
import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart'
import VisualizationServices from '../../services/visualizationServices'

const BuyerProductTimeline = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [chartData, setChartData] = useState([])
    const [apiData, setApiData] = useState([])
    const [buyerProductTimelineType, setBuyerProductTimelineType] = useState(
        'value'
    )
    const { trans } = useTrans()
    const handle = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.ProductTimelineRace(params).then((response) => {
            setApiData(response)
            setLoading(false)
        })
    }, [params])

    useEffect(() => {
        const groupedData = apiData.slice(-1).pop()

        if (groupedData) {
            const formattedData = groupedData.details.map((detail) => {
                return {
                    product: detail.product_name,
                    value:
                        buyerProductTimelineType === 'value'
                            ? detail.amount_usd
                            : detail.tender_count
                }
            })
            setChartData(formattedData)
            setLoading(false)
        }
    }, [apiData, buyerProductTimelineType])

    const barColorValue = '#ABBABF'

    return (
        <div className="bg-white rounded p-4 h-full">
            <FullScreen handle={handle}>
                <div className="flex justify-between">
                    <h3 className="uppercase font-bold  text-primary-dark">
                        {label}
                    </h3>

                    <div className="flex justify-end">
                        <ul className="contract-switch flex">
                            <li
                                className={`mr-4 cursor-pointer ${
                                    buyerProductTimelineType === 'value'
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() =>
                                    setBuyerProductTimelineType('value')
                                }>
                                {trans('By contract value')}
                            </li>
                            <li
                                className={`cursor-pointer ${
                                    buyerProductTimelineType === 'number'
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() =>
                                    setBuyerProductTimelineType('number')
                                }>
                                {trans('By number of contracts')}
                            </li>
                        </ul>
                    </div>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <SimpleBarChart
                            data={chartData}
                            height="600px"
                            barColorValue={barColorValue}
                            chartKey="product"
                            chartValue="value"
                            axisRotation="270"
                        />
                        <div
                            className="flex items-center justify-between pt-4 border-t border-blue-0 text-sm
                                             text-primary-blue -mx-4 px-4">
                            <div className="flex items-center">
                                <div className="flex items-center mr-6">
                                    <DownloadIcon className="mr-2 inline-block" />
                                    <span>Download</span>
                                </div>
                                <span className="worldmap-share flex items-center relative">
                                    <ShareIcon className="mr-2 inline-block" />{' '}
                                    <span className="cursor-pointer">
                                        Share
                                    </span>
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
                    </>
                )}
            </FullScreen>
        </div>
    )
}

export default BuyerProductTimeline
