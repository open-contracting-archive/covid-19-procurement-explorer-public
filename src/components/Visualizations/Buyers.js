import React, { useState, useEffect } from 'react'
import VisualizationServices from '../../services/visualizationServices'
import { formatDate, dateDiff } from '../../helpers/date'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'

const Buyers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [buyerSummary, setBuyerSummary] = useState()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.BuyerSummary(params).then((response) => {
            setBuyerSummary(response)
            setLoading(false)
        })
    }, [params?.country])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Function to manage data for line chart
    const lineChartData = (chartData) => {
        return (
            chartData &&
            chartData.map((data) => {
                return {
                    date: formatDate(data.month, 'MMMM YYYY'),
                    value: data.buyer_count
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

    // Buyer summary
    const buyerSummaryLineChartDataRaw =
        buyerSummary && lineChartData(buyerSummary.trend)
    const buyerSummaryLineChartData =
        buyerSummaryLineChartDataRaw && sortDate(buyerSummaryLineChartDataRaw)
    const buyerSummaryAmount = buyerSummary && buyerSummary.total
    const buyerSummaryPercentage = buyerSummary && buyerSummary.percentage

    return (
        <div className="bg-white rounded p-4 h-full">
            <h3 className="uppercase font-bold  text-primary-dark">
                {label ? label : 'Buyers'}
            </h3>
            {loading ? (
                <Loader sm />
            ) : (
                <div className="flex items-end">
                    <AreaChartBlock
                        chartData={buyerSummaryLineChartData}
                        totalAmount={buyerSummaryAmount}
                        percentage={buyerSummaryPercentage}
                        colorValue={
                            buyerSummaryPercentage < 0 ? '#FE5151' : '#3EEDA4'
                        }
                    />
                    <div className="flex-1" />
                </div>
            )}
        </div>
    )
}

export default Buyers
