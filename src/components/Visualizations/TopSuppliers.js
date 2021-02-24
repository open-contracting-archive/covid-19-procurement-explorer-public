import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { isEmpty, sumBy } from 'lodash'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'
import BarListChart from '../BarListSection/BarListChart'
import ContractView from '../../constants/ContractView'
import Default from '../../constants/Default'

const TopSuppliers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Top Suppliers', params } = props
    const [loading, setLoading] = useState(true)
    const currency = useSelector((state) => state.general.currency)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.TopSuppliers(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [params?.country, params?.buyer])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let dataSet =
                viewType === ContractView.VALUE
                    ? originalData.by_value
                    : originalData.by_number

            let total = sumBy(dataSet, (item) => {
                return viewType === ContractView.NUMBER
                    ? item.tender_count
                    : currency === Default.CURRENCY_LOCAL
                    ? item.amount_local
                    : item.amount_usd
            })

            let chartDataFormatted = dataSet.map((item) => {
                let actualValue =
                    viewType === ContractView.NUMBER
                        ? item.tender_count
                        : currency === Default.CURRENCY_LOCAL
                        ? item.amount_local
                        : item.amount_usd
                return {
                    name: item.supplier_name,
                    value: Math.ceil((actualValue / total) * 100),
                    amount: actualValue,
                    id: item.supplier_id
                }
            })
            setChartData(chartDataFormatted)
        }
    }, [originalData, viewType, currency])

    const isActiveTab = (type) => {
        return viewType === type ? 'active' : ''
    }

    return (
        <div className="bg-white rounded h-full">
            <div className="bg-white rounded p-4 pb-12">
                <div className="flex items-center justify-between flex-wrap mb-4">
                    <h3 className="mb-2 md:mb-0 w-full md:w-auto uppercase font-bold  text-primary-dark">
                        {trans(label)}
                    </h3>
                    <div className="w-full md:w-auto flex">
                        <ul className="contract-switch flex">
                            <li
                                className={`mr-4 cursor-pointer text-xs md:text-base ${isActiveTab(
                                    ContractView.VALUE
                                )}`}
                                onClick={() => setViewType(ContractView.VALUE)}>
                                {trans('By value')}
                            </li>
                            <li
                                className={`cursor-pointer text-xs md:text-base ${isActiveTab(
                                    ContractView.NUMBER
                                )}`}
                                onClick={() =>
                                    setViewType(ContractView.NUMBER)
                                }>
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
                                    <BarListChart
                                        data={chartData}
                                        text="suppliers"
                                        currency={currency}
                                        viewType={viewType}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TopSuppliers
