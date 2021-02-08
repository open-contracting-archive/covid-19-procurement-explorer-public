import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import { dateDiff, formatDate } from '../../helpers/date'
import Visualization from '../../constants/Visualization'
import HelpText from '../../components/HelpText/HelpText'

const TotalContracts = (props) => {
    const barColorValue = '#ABBABF'

    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Total Contracts', params, modalHandler } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const { trans } = useTrans()
    const helpText = 'Quantity of COVID related contracts'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.TotalContracts(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [params?.country, params?.buyer, params?.supplier])

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

    // Total contracts data
    const totalContractLineChartDataRaw =
        originalData && lineChartData(originalData.line_chart)
    const totalContractLineChartData =
        totalContractLineChartDataRaw && sortDate(totalContractLineChartDataRaw)
    const totalContractAmount = originalData && originalData.total
    const totalContractPercentage = originalData && originalData.difference
    const totalContractBarChartData = originalData && originalData.bar_chart

    return (
        <div className="bg-white rounded p-4 h-full">
            <div className="flex items-center">
                <h3 className="uppercase font-bold text-primary-dark inline-block">
                    {trans(label ? label : 'Total Contracts')}
                </h3>
                <HelpText helpTextInfo={helpText} />
            </div>

            {loading ? (
                <Loader sm />
            ) : (
                <div className="flex items-end">
                    <div className="w-2/5">
                        <AreaChartBlock
                            chartData={totalContractLineChartData}
                            totalAmount={totalContractAmount}
                            percentage={Math.round(totalContractPercentage, 2)}
                            colorValue={
                                Math.round(totalContractPercentage, 2) < 0
                                    ? '#FE5151'
                                    : '#3EEDA4'
                            }
                        />
                    </div>

                    <div className="flex-1">
                        <SimpleBarChart
                            data={totalContractBarChartData}
                            barColorValue={barColorValue}
                            chartKey="method"
                            chartValue="value"
                        />
                    </div>
                </div>
            )}
            {modalHandler && (
                <span
                    className="cursor-pointer"
                    onClick={() => modalHandler(Visualization.TOTAL_CONTRACTS)}>
                    View more
                </span>
            )}
        </div>
    )
}

export default TotalContracts
