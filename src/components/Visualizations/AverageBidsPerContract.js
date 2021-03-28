import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import ErrorHandler from '../ErrorHandler'
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
    const {
        areaChartData,
        changePercentage,
        colorValue
    } = useDataCalculations()
    const { trans } = useTrans()

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
        <div className="bg-white rounded p-4 h-full">
            <h3 className="uppercase font-bold  text-primary-dark">
                {label || trans('Average bids per contract')}
            </h3>
            {loading ? (
                <Loader sm />
            ) : !error ? (
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
        </div>
    )
}

export default AverageBidsPerContract
