import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, sumBy } from 'lodash'
import VisualizationService from '../../services/VisualizationService'
import { BarListChart } from './Charts'
import ContractView from '../../constants/ContractView'
import Default from '../../constants/Default'
import { CardContainer, ErrorHandler } from '../Utilities'

const TopBuyers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Top Buyers', params } = props
    const [loading, setLoading] = useState(true)
    const currency = useSelector((state) => state.general.currency)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState([])
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [error, setError] = useState(false)

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.TopBuyers(params)
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
            setOriginalData({})
        }
    }, [params?.country, params?.supplier])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let dataSet =
                viewType === ContractView.VALUE
                    ? originalData.by_value
                    : originalData.by_number
            let total = sumBy(dataSet, (item) => {
                return viewType === ContractView.NUMBER
                    ? item[Default.TENDER_COUNT]
                    : currency === Default.CURRENCY_LOCAL
                    ? item[Default.AMOUNT_LOCAL]
                    : item[Default.AMOUNT_USD]
            })
            let chartDataFormatted = dataSet.map((item) => {
                let actualValue =
                    viewType === ContractView.NUMBER
                        ? item[Default.TENDER_COUNT]
                        : currency === Default.CURRENCY_LOCAL
                        ? item[Default.AMOUNT_LOCAL]
                        : item[Default.AMOUNT_USD]
                return {
                    name: item.buyer_name,
                    value: Math.ceil((actualValue / total) * 100),
                    amount: actualValue,
                    id: item.buyer_id
                }
            })
            setChartData(chartDataFormatted)
        }
    }, [originalData, viewType, currency])

    return (
        <CardContainer
            label={label}
            appendClass="pb-12"
            loading={loading}
            viewType={viewType}
            viewHandler={setViewType}>
            <div className="custom-horizontal-bar">
                {!error ? (
                    <BarListChart
                        data={chartData}
                        text="buyers"
                        currency={currency}
                        viewType={viewType}
                    />
                ) : (
                    <ErrorHandler />
                )}
            </div>
        </CardContainer>
    )
}

export default TopBuyers
