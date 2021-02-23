import React, { useEffect, useState } from 'react'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import Loader from '../Loader/Loader'
import { dateDiff, formatDate } from '../../helpers/date'
import HelpText from '../../components/HelpText/HelpText'

const Monopolization = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Monopolization', params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const { trans } = useTrans()
    const helpText = 'Average number of contracts per supplier'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.Monopolization(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [params?.country, params?.buyer])

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
                    date: formatDate(data.date, 'YYYY-MM-DD'),
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

    const convertDate = (data) => {
        return data.map((data) => {
            return {
                ...data,
                date: formatDate(data.date, 'MMMM YYYY')
            }
        })
    }

    const monopolizationLineChartDataRaw =
        originalData && lineChartData(originalData.line_chart)
    const monopolizationLineChartData =
        monopolizationLineChartDataRaw &&
        convertDate(sortDate(monopolizationLineChartDataRaw))
    const monopolizationAmount = originalData && originalData.average
    const monopolizationPercentage = originalData && originalData.difference

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
                ) : (
                    <div className="flex items-end">
                        <AreaChartBlock
                            chartData={monopolizationLineChartData}
                            totalAmount={monopolizationAmount}
                            percentage={monopolizationPercentage}
                            colorValue={
                                monopolizationPercentage <= 0
                                    ? '#3EEDA4'
                                    : '#FE5151 '
                            }
                            monopolization
                        />
                        <div className="flex-1" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Monopolization
