import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { T } from '@transifex/react'
import { SimpleBarChart, AreaChartBlock } from './Charts'
import VisualizationService from '../../services/VisualizationService'
import Visualization from '../../constants/Visualization'
import useDataCalculations from '../../hooks/useDataCalculations'
import { CardContainer, ErrorHandler } from '../Utilities'

const TotalContracts = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Total Contracts',
        params,
        modalHandler,
        helpText = 'Quantity of COVID related contracts'
    } = props
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState({
        tenderCount: 0,
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
        VisualizationService.TotalContracts(params)
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
            const lineChartData = get(originalData, 'line_chart', [])
            const barChartData = get(originalData, 'bar_chart')

            const formattedBarChartData =
                barChartData &&
                barChartData.map((data) => {
                    return {
                        method: data.method.replace(/_/g, ' '),
                        value: data.value
                    }
                })

            setChartData({
                tenderCount: get(originalData, 'total'),
                percentage: changePercentage(lineChartData),
                areaChart: areaChartData(lineChartData),
                barChart: formattedBarChartData
            })
        }
    }, [originalData])

    return (
        <CardContainer label={label} loading={loading} helpText={helpText}>
            {!error ? (
                <div className="flex flex-wrap items-end">
                    <div className="w-full">
                        <AreaChartBlock
                            chartData={chartData.areaChart}
                            totalAmount={chartData.tenderCount}
                            percentage={chartData.percentage}
                            colorValue={colorValue(chartData.percentage)}
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
                    className="cursor-pointer text-sm text-primary-blue block text-right"
                    onClick={() => modalHandler(Visualization.TOTAL_CONTRACTS)}>
                    <T _str="View in detail" /> →
                </span>
            )}
        </CardContainer>
    )
}

TotalContracts.propTypes = {
    label: PropTypes.string,
    params: PropTypes.object,
    modalHandler: PropTypes.func,
    helpText: PropTypes.string
}

export default TotalContracts
