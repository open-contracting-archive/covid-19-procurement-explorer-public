import React, { useState, useEffect } from 'react'
import Loader from "../../Loader/Loader"
import TreeMapChart from "../../Charts/TreeMapChart/TreeMapChart"
import useTrans from "../../../hooks/useTrans"
import VisualizationServices from "../../../services/visualizationServices"
import ContractView from "../../../constants/ContractView"
import { isEmpty } from 'lodash'

const ProductCategoryMap = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.ProductSummary(params)
            .then((response) => {
                setOriginalData(response)
                setLoading(false)
            })
    }, [params])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let chartDataFormatted = originalData.map((item) => {
                return {
                    name: item.product_name,
                    value: viewType === ContractView.VALUE ? item.amount_usd : item.tender_count
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
                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                    {trans('Product Category Map')}
                </h3>
                <div className="flex justify-end world-map-chart mb-4">
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
                </div>

                {loading ? (<Loader />) : (
                    <TreeMapChart data={chartData} />
                )}
            </div>
        </div>
    )
}

export default ProductCategoryMap
