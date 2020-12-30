import React, { useEffect, useState } from 'react'
import * as dayjs from 'dayjs'
import useTrans from '../../hooks/useTrans'
import VisualizationServices from '../../services/visualizationServices'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'

function Monopolization() {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [monopolization, setMonopolization] = useState()
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.monopolization().then((response) => {
            setMonopolization(response)
            setLoading(false)
        })
    }, [])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // const totalSpendingLineChartData = get(totalSpending, 'usd.line_chart')
    // Function to manage data for line chart
    const lineChartData = (chartData) => {
        return (
            chartData &&
            chartData.map((data) => {
                return {
                    date: dayjs(data.date).format('MMMM YYYY'),
                    value: data.value
                }
            })
        )
    }

    // Function to sort by date
    const sortDate = (data) => {
        return data.sort((date1, date2) => {
            return dayjs(date1.date).diff(dayjs(date2.date))
        })
    }

    // Monopolization
    const monopolizationLineChartDataRaw =
        monopolization && lineChartData(monopolization.line_chart)

    const monopolizationLineChartData =
        monopolizationLineChartDataRaw &&
        sortDate(monopolizationLineChartDataRaw)
    const monopolizationAmount = monopolization && monopolization.average
    const monopolizationPercentage = monopolization && monopolization.difference

    return (
        <div className="bg-white rounded p-4 h-full">
            <div>
                <h3 className="uppercase font-bold  text-primary-dark">
                    {trans('Monopolization')}
                </h3>
                {loading ? (
                    <Loader sm />
                ) : (
                    <div className="flex items-end">
                        <AreaChartBlock
                            chartData={monopolizationLineChartData}
                            totalAmount={monopolizationAmount}
                            percentage={monopolizationPercentage}
                        />
                        <div className="flex-1"></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Monopolization
