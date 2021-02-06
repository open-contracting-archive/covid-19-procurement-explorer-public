import React, { useEffect, useState } from 'react'
import { isEmpty, get } from 'lodash'
import SankeyChart from '../Charts/SankeyChart/SankeyChart'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationService from '../../services/VisualizationService'
import ChartFooter from "../Utilities/ChartFooter"
import ContractView from "../../constants/ContractView"
import HelpText from '../../components/HelpText/HelpText'

const GlobalSuppliers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [chartType, setChartType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
    const helpText = 'Top 10 suppliers in each product category according to contracts value or number of signed contracts'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.GlobalSuppliers(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [params?.country])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let set1 = get(originalData, `by_${chartType}.product_country`, [])
                .map((item) => {
                    return {
                        from: item.product_name,
                        to: item.country_name,
                        value:
                            chartType === ContractView.VALUE ? item.amount_usd : item.tender_count
                    }
                })
            let set2 = get(originalData, `by_${chartType}.supplier_product`, [])
                .map((item) => {
                    return {
                        from: item.supplier_name,
                        to: item.product_name,
                        value:
                            chartType === ContractView.VALUE ? item.amount_usd : item.tender_count
                    }
                })
            setChartData([...set2, ...set1])
        }

        return () => {
            setChartData([])
        }
    }, [originalData, chartType])

    return (
        <div className="bg-white rounded p-4 simple-tab right-direction">
            <FullScreen handle={fullScreenHandler}>
                <div className="flex items-center justify-between">
                    <h3 className="uppercase font-bold text-primary-dark">
                        {trans(label)}
                    </h3>
                    <HelpText helpTextInfo={helpText} />
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

                {/* <ul className="flex items-center my-4">
                        <li className="inline-block mr-2 px-4 py-2 rounded-full bg-blue-50 text-white">
                            {trans('Global suppliers chain')}
                        </li>
                        <li className="inline-block mr-2 px-4 py-2 rounded-full bg-blue-0">
                            {trans('Global distribution chain')}
                        </li>
                    </ul> */}

                {loading ? (
                    <Loader />
                ) : (
                    <div className="flex mt-4">
                        <div className="flex-1">
                            <SankeyChart data={chartData} />
                        </div>
                    </div>
                )}
            </FullScreen>

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}

export default GlobalSuppliers
