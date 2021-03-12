import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import VisualizationService from '../../services/VisualizationService'
import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import HelpText from '../../components/HelpText/HelpText'
import Visualization from '../../constants/Visualization'
import ErrorHandler from '../ErrorHandler'
import useDataCalculations from "../../hooks/useDataCalculations"

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
    const { trans } = useTrans()
    const { areaChartData, changePercentage, colorValue } = useDataCalculations()

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
            const lineChartData = get(originalData, `${currency}.line_chart`, [])
            setChartData({
                amount: get(originalData, `${currency}.total`),
                percentage: changePercentage(lineChartData),
                areaChart: areaChartData(lineChartData),
                barChart: get(originalData, `${currency}.bar_chart`)
            })
        }
    }, [originalData, currency])

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
                            totalAmount={chartData.amount}
                            percentage={chartData.percentage}
                            colorValue={colorValue(chartData.percentage)}
                            currency={currency}
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
                    onClick={() => modalHandler(Visualization.TOTAL_SPENDING)}>
                    {trans('View in detail')} →
                </span>
            )}
        </div>
    )
}

export default TotalSpending
