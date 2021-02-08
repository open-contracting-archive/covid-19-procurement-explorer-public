import React, { useState, useEffect } from 'react'
import VisualizationService from '../../services/VisualizationService'
import { formatDate, dateDiff } from '../../helpers/date'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import HelpText from '../../components/HelpText/HelpText'

const Buyers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const { trans } = useTrans()
    const helpText = 'Number of buyers who cigned at least 1 COVID contract'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.BuyerSummary(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
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
        originalData && lineChartData(originalData.trend)
    const buyerSummaryLineChartData =
        buyerSummaryLineChartDataRaw && sortDate(buyerSummaryLineChartDataRaw)
    const buyerSummaryAmount = originalData && originalData.total
    const buyerSummaryPercentage = originalData && originalData.percentage

    return (
        <div className="bg-white rounded p-4 h-full">
            <div className="flex items-center">
                <h3 className="uppercase font-bold text-primary-dark inline-block">
                    {trans(label ? label : 'Buyers')}
                </h3>
                <HelpText helpTextInfo={helpText} />
            </div>
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
