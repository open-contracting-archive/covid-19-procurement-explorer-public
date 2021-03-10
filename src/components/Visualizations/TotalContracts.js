import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import Loader from '../Loader/Loader'
import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Visualization from '../../constants/Visualization'
import HelpText from '../../components/HelpText/HelpText'
import ErrorHandler from '../ErrorHandler'
import useDataCalculations from "../../hooks/useDataCalculations"

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
    const { trans } = useTrans()
    const { areaChartData, changePercentage, colorValue } = useDataCalculations()

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
            setChartData({
                tenderCount: get(originalData, 'total'),
                percentage: changePercentage(lineChartData),
                areaChart: areaChartData(lineChartData),
                barChart: get(originalData, 'bar_chart')
            })
        }
    }, [originalData])

    return (
        <div className="bg-white rounded p-4 h-full">
            <div className="flex items-center">
                <h3 className="uppercase font-bold text-primary-dark inline-block">
                    {trans(label)}
                </h3>
                <HelpText helpTextInfo={helpText} />
            </div>

            {loading ? (
                <Loader sm />
            ) : !error ? (
                <div className="flex flex-wrap items-end">
                    <div className="w-full md:w-2/5">
                        <AreaChartBlock
                            chartData={chartData.areaChart}
                            totalAmount={chartData.tenderCount}
                            percentage={chartData.percentage}
                            colorValue={colorValue(chartData.percentage)}
                        />
                    </div>

                    <div className="md:flex-1">
                        <SimpleBarChart
                            data={chartData.barChart}
                            chartKey="method"
                            chartValue="value"
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
                    {trans('View in detail')} →
                </span>
            )}
        </div>
    )
}

export default TotalContracts
