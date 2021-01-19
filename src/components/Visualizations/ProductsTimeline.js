import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import StackedChart from '../Charts/StackedChart/StackedChart'
import useTrans from '../../hooks/useTrans'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationServices from '../../services/visualizationServices'
import { groupBy } from 'lodash'
import { dateDiff, formatDate } from '../../helpers/date'
import { slugify } from '../../helpers/general'

const ProductsTimeline = ({ label, params }) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()
    const handle = useFullScreenHandle()
    const [apiData, setApiData] = useState([])
    const [chartData, setChartData] = useState([])
    const [chartType, setChartType] = useState('value')

    // Function to sort by date
    const sortDate = (data) => {
        return data.sort((date1, date2) => {
            return dateDiff(date1.month, date2.month)
        })
    }

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.ProductTimeline(params).then((response) => {
            setApiData(response)
        })
    }, [])

    useEffect(() => {
        const groupedData = groupBy(apiData, (item) =>
            formatDate(item.date, 'MMM YYYY')
        )
        const chartData = Object.keys(groupedData).map((key) => {
            let products = {}
            groupedData[key].forEach((item) => {
                products[slugify(item.product_name)] =
                    chartType === 'value' ? item.amount_usd : item.tender_count
            })

            return {
                month: key,
                ...products
            }
        })

        const finalChartData = sortDate(chartData)

        setChartData(finalChartData)
        setLoading(false)
    }, [apiData, chartType])

    return (
        <div className="bg-white rounded p-4 h-full simple-tab">
            <FullScreen handle={handle}>
                <div className="flex items-center justify-between">
                    <h3 className="uppercase font-bold  text-primary-dark">
                        {label}
                    </h3>
                    <div className="flex justify-end world-map-chart mb-4">
                        <ul className="contract-switch flex">
                            <li
                                className={`mr-4 cursor-pointer ${
                                    chartType === 'value' ? 'active' : ''
                                }`}
                                onClick={() => setChartType('value')}>
                                {trans('By contract value')}
                            </li>
                            <li
                                className={`cursor-pointer ${
                                    chartType === 'number' ? 'active' : ''
                                }`}
                                onClick={() => setChartType('number')}>
                                {trans('By number of contracts')}
                            </li>
                        </ul>
                    </div>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <div>
                        <StackedChart data={chartData} />
                    </div>
                )}
            </FullScreen>
            <div
                className="flex items-center justify-between pt-4 border-t border-blue-0 text-sm
                                             text-primary-blue -mx-4 px-4">
                <div className="flex items-center">
                    <div className="flex items-center mr-6">
                        <DownloadIcon className="mr-2 inline-block" />
                        <span>Download</span>
                    </div>
                    <span className="flex items-center">
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

export default ProductsTimeline
