import React, { useState, useEffect } from 'react'
import Loader from '../../Loader/Loader'
import TreeMapChart from '../../Charts/TreeMapChart/TreeMapChart'
import useTrans from '../../../hooks/useTrans'
import VisualizationServices from '../../../services/visualizationServices'
import ContractView from '../../../constants/ContractView'
import { isEmpty } from 'lodash'
import { ReactComponent as DownloadIcon } from '../../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../../assets/img/icons/ic_fullscreen.svg'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

const ProductCategoryMap = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const handle = useFullScreenHandle()
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.ProductSummary(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })
    }, [params])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let chartDataFormatted = originalData.map((item) => {
                return {
                    name: item.product_name,
                    value:
                        viewType === ContractView.VALUE
                            ? item.amount_usd
                            : item.tender_count
                }
            })

            setChartData(chartDataFormatted)
        }
    }, [originalData, viewType])

    const isActiveTab = (type) => {
        return viewType === type ? 'active' : ''
    }

    return (
        <div className="w-full mb-6">
            <div className="bg-white rounded p-4">
                <FullScreen handle={handle}>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="uppercase font-bold  text-primary-dark">
                            {trans('Product Category Map')}
                        </h3>
                        <div className="flex justify-end world-map-chart">
                            <ul className="contract-switch flex">
                                <li
                                    className={`mr-4 cursor-pointer ${isActiveTab(
                                        ContractView.VALUE
                                    )}`}
                                    onClick={() =>
                                        setViewType(ContractView.VALUE)
                                    }>
                                    {trans('By contract value')}
                                </li>
                                <li
                                    className={`cursor-pointer ${isActiveTab(
                                        ContractView.NUMBER
                                    )}`}
                                    onClick={() =>
                                        setViewType(ContractView.NUMBER)
                                    }>
                                    {trans('By number of contracts')}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {loading ? <Loader /> : <TreeMapChart data={chartData} />}
                </FullScreen>
                <div
                    className="mt-4 flex items-center justify-between pt-4 border-t border-blue-0 text-sm
                                             text-primary-blue -mx-4 px-4">
                    <div className="flex items-center">
                        <div className="flex items-center mr-6">
                            <DownloadIcon className="mr-2 inline-block" />
                            <span>{trans('Download')}</span>
                        </div>
                        <span className="flex items-center">
                            <ShareIcon className="mr-2 inline-block" />{' '}
                            <span className="cursor-pointer">
                                {trans('Share')}
                            </span>
                        </span>
                    </div>

                    <div>
                        <span className="flex items-center">
                            <button onClick={handle.enter}>
                                <span className="cursor-pointer">
                                    {trans('View full screen')}
                                </span>
                                <FullViewIcon className="ml-2 inline-block" />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCategoryMap
