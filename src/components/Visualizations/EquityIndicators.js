import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { T } from '@transifex/react'
import { PieChart } from './Charts'
import VisualizationService from '../../services/VisualizationService'
import { formatNumber } from '../../helpers/number'
import ContractView from '../../constants/ContractView'
import useContractTransformers from '../../hooks/useContractTransformers'
import Default from '../../constants/Default'
import { CardContainer, ErrorHandler } from '../Utilities'

const colors = ['#ABBABF', '#DCEAEE']

const EquityIndicators = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Equity indicators',
        params,
        helpText = 'Total value of contracts defined as equitable. More information about equity indicators can be found in the methodology.'
    } = props
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [assignedValue, setAssignedValue] = useState(0)
    const currency = useSelector((state) => state.general.currency)
    const [error, setError] = useState(false)
    const { valueField, currencyCode } = useContractTransformers()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.EquityIndicators(params)
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
        if (originalData.length) {
            const formattedData = originalData.map((item) => {
                return {
                    value: item.type,
                    number: item[valueField(viewType)]
                }
            })
            const assignedValue = get(
                originalData.find((item) => item.type === 'assigned'),
                valueField(viewType),
                0
            )

            setChartData(formattedData)
            setAssignedValue(assignedValue)
        }

        return () => {
            setChartData([])
            setAssignedValue(0)
        }
    }, [originalData, viewType, currency])

    return (
        <CardContainer
            label={label}
            viewType={viewType}
            loading={loading}
            helpText={helpText}
            viewHandler={setViewType}
        >
            {!error ? (
                <div className="flex items-end">
                    <div>
                        <h3 className="mr-3">
                            <span className="text-sm block">
                                <T _str="Assigned" />
                            </span>
                            <span className="text-xl font-bold mr-2">
                                {viewType === ContractView.VALUE &&
                                currency &&
                                currency !== Default.CURRENCY_LOCAL
                                    ? '$'
                                    : ''}
                                {formatNumber(assignedValue)}
                            </span>
                            <span className="inline-block uppercase">
                                {currencyCode(viewType)}
                            </span>
                        </h3>
                    </div>
                    <div className="flex-1">
                        <PieChart data={chartData} colors={colors} />
                    </div>
                </div>
            ) : (
                <ErrorHandler />
            )}
        </CardContainer>
    )
}

EquityIndicators.propTypes = {
    label: PropTypes.string,
    params: PropTypes.object,
    helpText: PropTypes.string
}

export default EquityIndicators
