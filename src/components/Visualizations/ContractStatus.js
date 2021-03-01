import React, { useEffect, useState } from 'react'
import { isEmpty, sumBy } from 'lodash'
import { useSelector } from 'react-redux'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import Loader from '../Loader/Loader'
import ContractView from '../../constants/ContractView'
import Default from '../../constants/Default'
import SimpleBarListChart from '../SimpleBarListSection/SimpleBarListChart'
import ErrorHandler from '../ErrorHandler'

const ContractStatus = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Contract status', params } = props
    const [loading, setLoading] = useState(true)
    const currency = useSelector((state) => state.general.currency)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [error, setError] = useState(false)
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ContractStatus(params)
            .then((result) => {
                setLoading(false)
                if (result) {
                    setOriginalData(result)
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                setError(true)
            })

        return () => {
            setOriginalData([])
        }
    }, [params?.country, params?.buyer])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let total = sumBy(originalData, (item) => {
                return viewType === ContractView.NUMBER
                    ? item[Default.TENDER_COUNT]
                    : currency === Default.CURRENCY_LOCAL
                    ? item[Default.AMOUNT_LOCAL]
                    : item[Default.AMOUNT_USD]
            })
            let chartDataFormatted = originalData.map((item) => {
                let actualValue =
                    viewType === ContractView.NUMBER
                        ? item[Default.TENDER_COUNT]
                        : currency === Default.CURRENCY_LOCAL
                        ? item[Default.AMOUNT_LOCAL]
                        : item[Default.AMOUNT_USD]
                return {
                    name: item.status,
                    value: Math.ceil((actualValue / total) * 100),
                    amount: actualValue
                }
            })
            setChartData(chartDataFormatted)
        }
    }, [originalData, viewType, currency])

    const isActiveTab = (type) => {
        return viewType === type ? 'active' : ''
    }

    return (
        <div className="bg-white rounded p-4 h-full">
            <div className="flex flex-wrap items-center justify-between mb-4">
                <h3 className="mb-4 md:mb-0 w-full md:w-auto uppercase font-bold  text-primary-dark">
                    {trans(label)}
                </h3>
                <div className="w-full md:w-auto flex md:justify-end">
                    <ul className="contract-switch flex">
                        <li
                            className={`mr-4 cursor-pointer ${isActiveTab(
                                ContractView.VALUE
                            )}`}
                            onClick={() => setViewType(ContractView.VALUE)}>
                            {trans('By value')}
                        </li>
                        <li
                            className={`cursor-pointer ${isActiveTab(
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
            ) : !error ? (
                <div className="flex">
                    <div className="flex-1">
                        <div className="flex-1 simple-tab -mt-10">
                            <div className="mt-10">
                                <SimpleBarListChart
                                    data={chartData}
                                    currency={currency}
                                    viewType={viewType}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <ErrorHandler />
            )}
        </div>
    )
}

export default ContractStatus
