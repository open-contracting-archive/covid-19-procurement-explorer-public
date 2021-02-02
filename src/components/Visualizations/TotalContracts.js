import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart'
import useTrans from '../../hooks/useTrans'
import VisualizationServices from '../../services/visualizationServices'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import { dateDiff, formatDate } from '../../helpers/date'

const TotalContracts = (props) => {
    const barColorValue = '#ABBABF'

    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Total Contracts', params } = props
    const [loading, setLoading] = useState(true)
    const [totalContracts, setTotalContracts] = useState()
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.TotalContracts(params).then((response) => {
            setTotalContracts(response)
            setLoading(false)
        })
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
        totalContracts && lineChartData(totalContracts.line_chart)
    const totalContractLineChartData =
        totalContractLineChartDataRaw && sortDate(totalContractLineChartDataRaw)
    const totalContractAmount = totalContracts && totalContracts.total
    const totalContractPercentage = totalContracts && totalContracts.difference
    const totalContractBarChartData = totalContracts && totalContracts.bar_chart

    return (
        <div className="bg-white rounded p-4 h-full">
            <h3 className="uppercase font-bold  text-primary-dark">{label}</h3>
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
        </div>
    )
}

export default TotalContracts
