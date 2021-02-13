import React, { useState, useEffect } from 'react'
import Loader from '../../Loader/Loader'
import TreeMapChart from '../../Charts/TreeMapChart/TreeMapChart'
import useTrans from '../../../hooks/useTrans'
import VisualizationService from '../../../services/VisualizationService'
import ContractView from '../../../constants/ContractView'
import { isEmpty } from 'lodash'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import ChartFooter from '../../Utilities/ChartFooter'

const ProductCategoryMap = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ProductSummary(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData([])
        }
    }, [params?.country])

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
            <div className="bg-white rounded p-4 pb-0 md:pb-4">
                <FullScreen handle={fullScreenHandler}>
                    <div className="flex flex-wrap items-center justify-between md:mb-4">
                        <h3 className="mb-4 md:mb-0 w-full md:w-auto uppercase font-bold  text-primary-dark">
                            {trans('Product Category Map')}
                        </h3>
                        <div className="w-full md:w-auto flex">
                            <ul className="contract-switch flex">
                                <li
                                    className={`mr-4 cursor-pointer text-xs md:text-base ${isActiveTab(
                                        ContractView.VALUE
                                    )}`}
                                    onClick={() =>
                                        setViewType(ContractView.VALUE)
                                    }>
                                    {trans('By contract value')}
                                </li>
                                <li
                                    className={`cursor-pointer text-xs md:text-base ${isActiveTab(
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

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="pb-4">
                            <TreeMapChart data={chartData} />
                        </div>
                    )}
                </FullScreen>

                <ChartFooter fullScreenHandler={fullScreenHandler} />
            </div>
        </div>
    )
}

export default ProductCategoryMap
