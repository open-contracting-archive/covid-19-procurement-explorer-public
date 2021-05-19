import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { ErrorHandler, CardContainer } from '../Utilities'
import VisualizationService from '../../services/VisualizationService'
import { AreaChartBlock } from './Charts'
import useDataCalculations from '../../hooks/useDataCalculations'

const AverageBidsPerContract = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Average bids per contract', params } = props
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState({
        average: 0,
        percentage: 0,
        areaChart: []
    })
    const { areaChartData, changePercentage, colorValue } =
        useDataCalculations()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.AverageBids(params)
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
    }, [params?.country, params?.buyer])

    useEffect(() => {
        if (originalData) {
            const lineChartData = get(originalData, 'line_chart', [])
            setChartData({
                average: get(originalData, 'average', 0),
                percentage: changePercentage(lineChartData),
                areaChart: areaChartData(lineChartData)
            })
        }
    }, [originalData])

    return (
        <CardContainer label={label} loading={loading}>
            {!error ? (
                <div className="flex items-end">
                    <AreaChartBlock
                        chartData={chartData.areaChart}
                        totalAmount={chartData.average}
                        percentage={chartData.percentage}
                        colorValue={colorValue(chartData.percentage)}
                    />
                </div>
            ) : (
                <ErrorHandler />
            )}
        </CardContainer>
    )
}

AverageBidsPerContract.propTypes = {
    label: PropTypes.string,
    params: PropTypes.object
}

export default AverageBidsPerContract
