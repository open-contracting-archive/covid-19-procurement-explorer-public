import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { isEmpty, sumBy } from 'lodash'
import VisualizationServices from '../../services/visualizationServices'
import { Link } from 'react-router-dom'
import useTrans from "../../hooks/useTrans"
import BarListChart from "../BarListSection/BarListChart"
import ContractView from "../../constants/ContractView"
import Default from "../../constants/Default"

const TopBuyers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params, viewLink } = props
    const [loading, setLoading] = useState(true)
    const currency = useSelector((state) => state.general.currency)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.TopBuyers(params)
            .then((response) => {
                setOriginalData(response)
                setLoading(false)
            })
    }, [params])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let dataSet = viewType === ContractView.VALUE ? originalData.by_value : originalData.by_number
            let total = sumBy(dataSet, ((item) => {
                return viewType === ContractView.NUMBER ? item.tender_count : (currency === Default.CURRENCY_LOCAL ? item.amount_local : item.amount_usd)
            }))
            let chartDataFormatted = dataSet.map((item) => {
                let actualValue = viewType === ContractView.NUMBER ? item.tender_count : (currency === Default.CURRENCY_LOCAL ? item.amount_local : item.amount_usd)
                return {
                    name: item.buyer_name,
                    value: Math.ceil((actualValue / total) * 100),
                    amount: actualValue
                }
            })
            setChartData(chartDataFormatted)
        }
    }, [originalData, viewType])

    const isActiveTab = (type) => {
        return viewType === type ? 'active' : ''
    }

    return (
        <div className="bg-white rounded h-full">
            <div className="bg-white rounded p-6 pb-0">
                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                    {trans(label)}
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
                    <div className="flex">
                        <div className="flex-1">
                            <div className="flex-1 simple-tab -mt-10">
                                <div className="mt-10">
                                    <BarListChart data={chartData} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Link
                to={viewLink}
                className="text-primary-blue pt-3 pl-6 pb-6 inline-block">
                View All
            </Link>
        </div>
    )
}

export default TopBuyers
