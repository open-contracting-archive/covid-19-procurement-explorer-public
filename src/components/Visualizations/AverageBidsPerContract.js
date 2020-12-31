import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import VisualizationServices from '../../services/visualizationServices'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import { dateDiff, formatDate } from '../../helpers/date'

function AverageBidsPerContract(params) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [averageBids, setAverageBids] = useState()
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.AverageBids(params).then((response) => {
            setAverageBids(response)
            setLoading(false)
        })
    }, [])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Function to manage data for line chart
    const lineChartData = (chartData) => {
        return (
            chartData &&
            chartData.map((data) => {
                return {
                    date: formatDate(data.date, 'MMMM YYYY'),
                    value: data.value
                }
            })
        )
    }

    // Function to sort by date
    const sortDate = (data) => {
        return data.sort((date1, date2) => {
            return dateDiff(date1.date, date2.date)
        })
    }

    // Average bids
    const averageBidsLineChartDataRaw =
        averageBids && lineChartData(averageBids.line_chart)
    const averageBidsLineChartData =
        averageBidsLineChartDataRaw && sortDate(averageBidsLineChartDataRaw)
    const averageBidsAmount = averageBids && averageBids.average
    const averageBidsPercentage = averageBids && averageBids.difference

    return (
        <div className="bg-white rounded p-4 h-full">
            <h3 className="uppercase font-bold  text-primary-dark">
                {trans('Average bids per contract')}
            </h3>
            {loading ? (
                <Loader sm />
            ) : (
                <div className="flex items-end">
                    <AreaChartBlock
                        chartData={averageBidsLineChartData}
                        totalAmount={averageBidsAmount}
                        percentage={averageBidsPercentage}
                    />
                    <div className="flex-1" />
                </div>
            )}
        </div>
    )
}

export default AverageBidsPerContract
