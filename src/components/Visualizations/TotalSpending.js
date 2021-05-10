import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { T } from '@transifex/react'
import VisualizationService from '../../services/VisualizationService'
import { SimpleBarChart, AreaChartBlock } from './Charts'
import Visualization from '../../constants/Visualization'
import useDataCalculations from '../../hooks/useDataCalculations'
import { CardContainer, ErrorHandler } from '../Utilities'

const TotalSpending = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Total Spending',
        params,
        modalHandler,
        helpText = 'Total value of COVID related contracts'
    } = props
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const currency = useSelector((state) => state.general.currency)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState({
        amount: 0,
        percentage: 0,
        areaChart: [],
        barChart: []
    })
    const { areaChartData, changePercentage, colorValue } =
        useDataCalculations()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.TotalSpending(params)
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
    }, [params?.country, params?.buyer, params?.supplier])

    useEffect(() => {
        if (originalData) {
            const lineChartData = get(
                originalData,
                `${currency}.line_chart`,
                []
            )

            const barChartData = get(originalData, `${currency}.bar_chart`)

            const formattedBarChartData =
                barChartData &&
                barChartData.map((data) => {
                    return {
                        method: data.method.replace(/_/g, ' '),
                        value: data.value
                    }
                })

            setChartData({
                amount: get(originalData, `${currency}.total`),
                percentage: changePercentage(lineChartData),
                areaChart: areaChartData(lineChartData),
                barChart: formattedBarChartData
            })
        }
    }, [originalData, currency])

    return (
        <CardContainer label={label} loading={loading} helpText={helpText}>
            {!error ? (
                <div className="flex flex-wrap items-end">
                    <div className="w-full">
                        <AreaChartBlock
                            chartData={chartData.areaChart}
                            totalAmount={chartData.amount}
                            percentage={chartData.percentage}
                            colorValue={colorValue(chartData.percentage)}
                            currency={currency}
                        />
                    </div>
                    <div className="w-full">
                        <SimpleBarChart
                            data={chartData.barChart}
                            chartKey="method"
                            chartValue="value"
                            height="200px"
                        />
                    </div>
                </div>
            ) : (
                <ErrorHandler />
            )}

            {!error && modalHandler && (
                <span
                    className="block text-sm text-right cursor-pointer text-primary-blue"
                    onClick={() => modalHandler(Visualization.TOTAL_SPENDING)}>
                    <T _str="View in detail" /> →
                </span>
            )}
        </CardContainer>
    )
}

TotalSpending.propTypes = {
    label: PropTypes.string,
    params: PropTypes.object,
    modalHandler: PropTypes.func,
    helpText: PropTypes.string
}

export default TotalSpending
