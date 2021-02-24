import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart'
import useTrans from '../../hooks/useTrans'
import VisualizationService from '../../services/VisualizationService'
import AreaChartBlock from '../Charts/AreaChart/AreaChartBlock'
import { dateDiff, formatDate } from '../../helpers/date'
import Visualization from '../../constants/Visualization'
import HelpText from '../../components/HelpText/HelpText'
import ErrorHandler from '../ErrorHandler'

const barColorValue = '#ABBABF'

const TotalContracts = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const {
        label = 'Total Contracts',
        params,
        modalHandler,
        helpText = 'Quantity of COVID related contracts'
    } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const [error, setError] = useState(false)
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.TotalContracts(params)
        .then((result) => {
            setLoading(false)
            if(result){
                setOriginalData(result)
            } else{
                throw new Error()
            }
        })
        .catch(()=>{
            setError(true)
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

    // Function to convert date format
    const convertDate = (data) => {
        return data.map((data) => {
            return {
                ...data,
                date: formatDate(data.date, 'MMMM YYYY')
            }
        })
    }

    // Total contracts data
    const totalContractLineChartDataRaw =
        originalData && lineChartData(originalData.line_chart)
    const totalContractLineChartData =
        totalContractLineChartDataRaw &&
        convertDate(sortDate(totalContractLineChartDataRaw))
    const totalContractAmount = originalData && originalData.total
    const totalContractPercentage = originalData && originalData.difference
    const totalContractBarChartData = originalData && originalData.bar_chart

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

                    <div className="md:flex-1">
                        <SimpleBarChart
                            data={totalContractBarChartData}
                            barColorValue={barColorValue}
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
                    onClick={() => modalHandler(Visualization.TOTAL_CONTRACTS)}>
                    View in detail →
                </span>
            )}
        </div>
    )
}

export default TotalContracts
