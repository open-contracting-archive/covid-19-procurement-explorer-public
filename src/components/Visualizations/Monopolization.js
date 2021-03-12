import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'
import HelpText from '../../components/HelpText/HelpText'
import ErrorHandler from '../ErrorHandler'
import { negativeValue, positiveValue } from "../../constants/Theme"
import useDataCalculations from "../../hooks/useDataCalculations"

const Monopolization = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Monopolization',
        params,
        helpText = 'Average number of contracts per supplier'
    } = props
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [chartData, setChartData] = useState({
        average: 0,
        percentage: 0,
        areaChart: []
    })
    const { areaChartData, changePercentage } = useDataCalculations()
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.Monopolization(params)
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
                average: get(originalData, 'average'),
                percentage: changePercentage(lineChartData),
                areaChart: areaChartData(lineChartData)
            })
        }
    }, [originalData])

    const colorValue = (value) => {
        return value < 0 ? positiveValue : negativeValue
    }

    return (
        <div className="bg-white rounded p-4 h-full">
            <div>
                <div className="flex items-center">
                    <h3 className="uppercase font-bold text-primary-dark inline-block">
                        {trans(label)}
                    </h3>
                    <HelpText helpTextInfo={helpText} />
                </div>
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
                        <div className="flex-1" />
                    </div>
                ) : (
                    <ErrorHandler />
                )}
            </div>
        </div>
    )
}

export default Monopolization
