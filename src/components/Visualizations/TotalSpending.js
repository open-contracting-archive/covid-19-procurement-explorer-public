import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {get} from 'lodash'
import VisualizationServices from '../../services/visualizationServices'
import SimpleBarChart from '../charts/SimpleBarChart/SimpleBarChart'
import AreaChartBlock from '../charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'
import {dateDiff, formatDate} from "../../helpers/date";

function TotalSpending(params) {
    const barColorValue = '#ABBABF'

    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [totalSpending, setTotalSpending] = useState()
    const [loading, setLoading] = useState(true)

    const currency = useSelector((state) => state.general.currency)
    useEffect(() => {
        VisualizationServices.TotalSpending(params)
            .then((response) => {
                setTotalSpending(response)
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
            return dateDiff(date1, date2)
        })
    }

    // Total spending data
    const totalSpendingLineChartDataRaw =
        totalSpending &&
        lineChartData(get(totalSpending[currency], 'line_chart'))
    const totalSpendingLineChartData =
        totalSpendingLineChartDataRaw && sortDate(totalSpendingLineChartDataRaw)
    const totalSpendingAmount =
        totalSpending && get(totalSpending[currency], 'total')
    const totalSpendingPercentage =
        totalSpending && get(totalSpending[currency], 'increment')
    const totalSpendingBarChartData =
        totalSpending && get(totalSpending[currency], 'bar_chart')

    return (
        <div className="bg-white rounded p-4 h-full cursor-pointer">
            <h3 className="uppercase font-bold text-primary-dark">
                Total Spending
            </h3>
            {loading ? (
                <Loader sm/>
            ) : (
                <div className="flex items-end">
                    {/* Line area chart */}
                    <AreaChartBlock
                        chartData={totalSpendingLineChartData}
                        totalAmount={totalSpendingAmount}
                        percentage={totalSpendingPercentage}
                        currency={currency}
                    />
                    <div className="flex-1">
                        <SimpleBarChart
                            data={totalSpendingBarChartData}
                            barColorValue={barColorValue}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default TotalSpending
