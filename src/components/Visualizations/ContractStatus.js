import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, sumBy } from 'lodash'
import { useSelector } from 'react-redux'
import VisualizationService from '../../services/VisualizationService'
import ContractView from '../../constants/ContractView'
import Default from '../../constants/Default'
import { SimpleBarListChart } from './Charts'
import { CardContainer, ErrorHandler } from '../Utilities'

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

    return (
        <CardContainer
            label={label}
            viewType={viewType}
            loading={loading}
            viewHandler={setViewType}>
            <div>
                {!error ? (
                    <SimpleBarListChart
                        data={chartData}
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

ContractStatus.propTypes = {
    label: PropTypes.string,
    params: PropTypes.object
}

export default ContractStatus
