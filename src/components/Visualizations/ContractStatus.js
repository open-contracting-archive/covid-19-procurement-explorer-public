import React, { useEffect, useState } from 'react'
import { isEmpty, sumBy } from 'lodash'
import { useSelector } from 'react-redux'
import useTrans from '../../hooks/useTrans'
import VisualizationServices from '../../services/visualizationServices'
import Loader from '../Loader/Loader'
import ContractView from "../../constants/ContractView"
import Default from "../../constants/Default"
import SimpleBarListChart from "../SimpleBarListSection/SimpleBarListChart"

const ContractStatus = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
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
        VisualizationServices.ContractStatus(params)
            .then((response) => {
                setOriginalData(response)
                setLoading(false)
            })
    }, [params])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let total = sumBy(originalData, (item) => {
                return viewType === ContractView.NUMBER
                    ? item.tender_count
                    : currency === Default.CURRENCY_LOCAL
                        ? item.amount_local
                        : item.amount_usd
            })
            let chartDataFormatted = originalData.map((item) => {
                let actualValue =
                    viewType === ContractView.NUMBER
                        ? item.tender_count
                        : currency === Default.CURRENCY_LOCAL
                        ? item.amount_local
                        : item.amount_usd
                return {
                    name: item.status,
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
        <div className="bg-white rounded p-6 pb-0 h-full">
            <div className="flex items-center justify-between">
                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                    {trans(label)}
                </h3>
                <div className="flex justify-end world-map-chart mb-4">
                    <ul className="contract-switch flex">
                        <li
                            className={`mr-4 cursor-pointer ${isActiveTab(
                                ContractView.VALUE
                            )}`}
                            onClick={() => setViewType(ContractView.VALUE)}>
                            {trans('By value')}
                        </li>
                        <li
                            className={`mr-4 cursor-pointer ${isActiveTab(
                                ContractView.NUMBER
                            )}`}
                            onClick={() => setViewType(ContractView.NUMBER)}>
                            {trans('By number')}
                        </li>
                    </ul>
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex">
                    <div className="flex-1">
                        <div className="flex-1 simple-tab -mt-10">
                            <div className="mt-10">
                                <SimpleBarListChart data={chartData} currency={currency} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContractStatus
